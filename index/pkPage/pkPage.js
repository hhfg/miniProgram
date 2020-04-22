const app = getApp();
const common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stepText: 8,//设置倒计时初始值
    windowWidth: '',//屏幕,
    playA: [],   //玩家A的信息
    height: 0,   //纵向进度条的位置高度
    left: 0,
    top: 0,
    right: 0,
    pkwords:[],  //获取的pk单词数组
    pkword:[],   //当前pk的单词
    roomid:0,    //房间id
    index:0,     //当前第几道题
    start:0,     //某一道题开始的时间（毫秒时间戳
    end:0,       //某一道题选择正确结束的时间（毫秒时间戳
    myscore:0,   //玩家A的分数
    rivalscore:0,//玩家B的分数
    mypercent:0,  //玩家A的分数占比
    rivalpercent:0,  //玩家B的分数占比
    me:[],       //我的信息
    rival:[],     //对手的信息
    mchoosed:false, //用来判断自己是否已经答题
    rchoosed:false, //用来判断对手是否已经答题
    time:null,
    mychoose: ['', '', '', ''],
    rivalchoose:['','','',''],
    btnClass: ['', '', '', ''],
    rivaltemp:'',
    ridx:null,
    myChooseItem:[false,false,false,false,false,false,false],
    rivalChooseItem:[false,false,false,false,false,false,false],
    id:0
  },
  getParam:function(){
    try {
      var res = wx.getSystemInfoSync();
      this.setData({
        windowWidth: res.windowWidth,
        height: (res.windowHeight * 0.8).toFixed(0),
        left: res.windowWidth - (res.windowHeight * 0.8 * 0.5).toFixed(0) - 20,
        top: (res.windowHeight * 0.8 * 0.5).toFixed(0) - 10,
        right: res.windowWidth - (res.windowHeight * 0.8 * 0.5).toFixed(0) - 20
      })
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
  },
  //倒计时 
  countdown: function () {
    var date = new Date();
    this.setData({
      start: date.getTime()
    })
    var step = 1,//计数动画次数
      num = 0,//计数倒计时秒数（n - num）
      start = 1.5 * Math.PI,// 开始的弧度
      end = -0.5 * Math.PI;// 结束的弧度
     // time = null;   
    var animation_interval = 1000,// 每1秒运行一次计时器
      n = 8; // 当前倒计时为10秒
    var that = this;
    // 倒计时前先绘制整圆的圆环
    this.ringMove(start, end, n, num);
    // 创建倒计时
    var that = this;
    that.data.time = setInterval(function () {
      if (step <= n) {
        end = end + 2 * Math.PI / n
        num++
        that.ringMove(start, end, n, num);
        step++;
      } else {//时间到了
        //销毁计时器
        clearInterval(that.data.time);
        if(that.data.index+1==that.data.pkwords.length){
          wx.closeSocket();
          wx.onSocketClose(function (res) {
            console.log('WebSocket已关闭!')
          })
          wx.redirectTo({
            url: '../pkresult/pkresult?myChooseItem=' + JSON.stringify(that.data.myChooseItem) + "&rivalChooseItem=" + JSON.stringify(that.data.rivalChooseItem) + '&pkwords=' + JSON.stringify(that.data.pkwords) + '&my=' + JSON.stringify(that.data.me) + '&rival=' + JSON.stringify(that.data.rival) + '&myscore=' + that.data.myscore + '&rivalscore=' + that.data.rivalscore,
          })
        }else{
          step = 1;
          num = 0;
          n = 8;     
          //获取下一个单词
          that.nextWord();
        }
      }
    }, animation_interval)
  },
  ringMove: function (s, e, n, num) {
    var context = wx.createCanvasContext('secondCanvas')
    // 绘制圆环
    context.setStrokeStyle('#87CEFA')
    context.beginPath()
    context.setLineWidth(4)
    context.arc(42, 42, 25, s, e, true)
    context.stroke()
    context.closePath()
    // 绘制倒计时文本
    context.beginPath()
    context.setLineWidth(1)
    context.setFontSize(20)
    context.setFillStyle('#0D0D0D')
    context.setTextAlign('center')
    context.setTextBaseline('middle')
    context.fillText(n - num + '', 42, 42, 25)
    context.fill()
    context.closePath()
    context.draw()
  },

  //自动播放
  autoplay: function () {
    let url = this.data.pkword.us_mp3;
    url = url.substring(1, url.length - 1);
    this.play(url);
  },
  //播放音频
  play: function (url) {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = url
    innerAudioContext.onPlay(() => {
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getParam();
    console.log(options.id)
    //playA为发起者的信息
    this.setData({
      playA: JSON.parse(options.playA),
    })
    //如果本用户是发起者
    if (app.globalData.userData.uid == this.data.playA.id) {
      this.setData({//将playA的信息赋给me,将playB的信息赋给rival
        me: JSON.parse(options.playA),
        rival: JSON.parse(options.playB),
        roomid: options.roomid,
        id:options.id
      })
    } else {
      this.setData({
        me: JSON.parse(options.playB),
        rival: JSON.parse(options.playA),
        roomid: options.roomid,
        id:options.id
      })
    }
    this.getPKWords();
  },
  //下一道题
  nextWord: function () {
    var that=this
    //开始倒计时
    for (var i = 0; i < 4; i++) {
      var my = 'mychoose[' + i + ']'
      var rival='rivalchoose['+i+']'
      var btn = 'btnClass[' + i + ']'
      this.setData({
        [my]: '',
        [rival]:'',
        [btn]: ''
      })
    }
    this.setData({
      index:this.data.index+1,
    })
    //如果是最后一题，提示双倍分数
    if(this.data.index+1==this.data.pkwords.length){
      wx.showToast({
        title: '最后一题双倍分数',
        icon:'none',
        duration:1000,
        mask:true
      })
      setTimeout(function(){
        that.getNext();
      },1000)
    }else{
      this.getNext();
    }
  },
  getNext:function(){
    this.countdown();
    this.setData({
      pkword: this.data.pkwords[this.data.index],
      mchoosed: false,
      rchoosed: false
    })
    this.autoplay()
  },
  //获取单词
  getPKWords: function () {
    var that=this;
    if (app.globalData.userData.uid == this.data.playA.id) {
      wx.sendSocketMessage({
        data: "p"
      })
    }
    wx.onSocketMessage(function (res) {
      if (res.data.length > 10) {
        console.log('pkpkpkpkp')
        that.countdown();
        that.setData({
          pkwords: JSON.parse(res.data),
          pkword: JSON.parse(res.data)[that.data.index]
        })
        that.autoplay()
      } else if(res.data=="next"){//进行下一个单词
        console.log("next"+(that.data.index+1))
        //clearInterval(that.data.time)
        if (that.data.index+1 == that.data.pkwords.length) {
          wx.redirectTo({
            url: '../pkresult/pkresult?myChooseItem='+JSON.stringify(that.data.myChooseItem)+"&rivalChooseItem="+JSON.stringify(that.data.rivalChooseItem)+'&pkwords='+JSON.stringify(that.data.pkwords)+'&my='+JSON.stringify(that.data.me)+'&rival='+JSON.stringify(that.data.rival)+'&myscore='+that.data.myscore+'&rivalscore='+that.data.rivalscore+'&id='+that.data.id,
          })
        }
        else{
          that.nextWord();
        }
      }else if(res.data=="left"){
        console.log("对手已离开");
        clearInterval(that.data.time);
        // wx.closeSocket();
        // wx.onSocketClose(function (res) {
        //   console.log('WebSocket已关闭!')
        // })
        wx.showModal({
          title: '提示',
          content: '对手已离开',
          showCancel:false,
          success:function(res){
            if(res.confirm){
              wx.redirectTo({
                url: '../wordPK/wordPK',
              })
            }
          }
        })
      }else {//否则是对方的成绩加选项
        var score=res.data.split(";")[0]          //获取对手的成绩
        var idx = parseInt(res.data.split(";")[1])//获取对手的选项
        var chooseItem='rivalChooseItem['+that.data.index+']'
        if (score==that.data.rivalscore){          //收到的成绩如果和之前的相等，说明选择错误
          that.setData({
            rivaltemp:'error',
            [chooseItem]:false
          })
        }else{
          that.setData({
            rivaltemp:'correct',
            [chooseItem]:true
          })
        }       
        that.setData({
          ridx:idx,
          rchoosed: true,                        //设置对手已经选择了的标记
          rivalscore: score,                     //将发送过来的成绩赋给对手的成绩
          rivalpercent: (parseInt(score) / 1440) * 100
        })
        //如果双方都已选择完毕
        if (that.data.mchoosed == true && that.data.rchoosed == true) {
          var rival = 'rivalchoose[' + idx + ']'
          var btn = 'btnClass[' + idx + ']'
          if (that.data.rivaltemp == 'correct') {
            that.setData({
              [rival]: '../../icons/pk/correct.png',
              [btn]: '#87CEFA'
            })
          } else {
            that.setData({
              [rival]: '../../icons/pk/error.png',
              [btn]: '#87CEFA'
            })
          }
          setTimeout(function(){
            that.send("n")//发送n给后端，表示可进行下一道题
          },800)
          clearInterval(that.data.time)//销毁定时器
        }    
      }
    })
  },
  //发送成绩到websocket
  send:function(score){
    wx.sendSocketMessage({
      data: score.toString(),
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.drawProgressbg();
  },
  drawProgressbg: function () {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(6);// 设置圆环的宽度
    ctx.setStrokeStyle('white'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath();//开始一个新的路径
    ctx.arc(42, 42, 25, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)//半径为90的圆的路径到当前路径
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onUnload:function(){
    console.log("卸载");
    clearInterval(this.data.time)
    wx.closeSocket();
    wx.onSocketClose(function (res) {
      console.log('WebSocket已关闭!')
    })
  },
  bindChoose:function(e){
    if(this.data.mchoosed==false){
      //获取用户选择的选项
      var idx = e.currentTarget.dataset.idx
      //获取当前时间
      var date = new Date()
      //如果选择正确
      if (e.currentTarget.dataset.ex == this.data.pkword.explanation) {
        //播放音效
        this.play('http://img.tukuppt.com/newpreview_music/09/00/62/5c893bc616c6053343.mp3')
        var chooseItem='myChooseItem['+this.data.index+']'
        var my = 'mychoose[' + idx + ']'
        var btn = 'btnClass[' + idx + ']'
        //计算所用时间
        this.setData({
          end: date.getTime(),
          [my]: '../../icons/pk/correct.png',
          [btn]: '#87CEFA',
          [chooseItem]:true                  //记录用户本道题选择正确
        })
        var second = ((this.data.end - this.data.start) / 1000).toFixed(1)
        if(this.data.index+1==this.data.pkwords.length){//如果是最后一题,分数双倍
          var score = ((8 - second) * 10 + 100)*2
        }else{
          var score = (8 - second) * 10 + 100
        }
        this.setData({
          myscore: this.data.myscore + score
        })
        this.setData({
          mypercent: (this.data.myscore / 1440) * 100
        })
      } else {//如果选择错误
        var chooseItem = 'myChooseItem[' + this.data.index + ']'
        var my = 'mychoose[' + idx + ']'
        var btn = 'btnClass[' + idx + ']'
        this.setData({
          [my]: '../../icons/pk/error.png',
          [btn]: '#87CEFA',
          [chooseItem]:false
        })
        this.play('http://img.tukuppt.com/newpreview_music/09/00/60/5c89396f017e881994.mp3')
      }
      //发送用户的成绩加选项给对方
      this.send(this.data.myscore + ";" + idx)
      //设置本用户已经选择
      this.setData({
        mchoosed: true
      })
      //如果双方都已选择
      if(this.data.rchoosed==true&&this.data.mchoosed==true){
        var that=this;
        var rival = 'rivalchoose[' + that.data.ridx + ']'
        var btn = 'btnClass[' + that.data.ridx + ']'
        if (that.data.rivaltemp == 'correct') {
          that.setData({
            [rival]: '../../icons/pk/correct.png',
            [btn]: '#87CEFA'
          })
        } else {
          that.setData({
            [rival]: '../../icons/pk/error.png',
            [btn]: '#87CEFA'
          })
        }
        setTimeout(function(){
          console.log('对手已答完然后我才答完');
          that.send("n");      //发送n到后台，可进行下一道题
        },800)
        clearInterval(this.data.time)//销毁计时器
      }
    }
  }
})