const app = getApp();
const common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stepText: 10,//设置倒计时初始值
    windowWidth: '',//屏幕,
    playA: [],   //玩家A的信息
    playB: [],   //玩家B的信息
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
    ascore:0,    //玩家A的分数
    bscore:0,    //玩家B的分数
    myscore:0,    //我的分数
    apercent:0,
    bpercent:0
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
  countdown: function () {
    var date = new Date();
    this.setData({
      start: date.getTime()
    })
    console.log(date.getTime())
    var step = 1,//计数动画次数
      num = 0,//计数倒计时秒数（n - num）
      start = 1.5 * Math.PI,// 开始的弧度
      end = -0.5 * Math.PI,// 结束的弧度
      time = null;// 计时器容器      
    var animation_interval = 1000,// 每1秒运行一次计时器
      n = 10; // 当前倒计时为10秒
    var that = this;
    // 倒计时前先绘制整圆的圆环
    this.ringMove(start, end, n, num);
    // 创建倒计时
    var that = this;
    time = setInterval(function () {
      if (step <= n) {
        end = end + 2 * Math.PI / n
        num++
        that.ringMove(start, end, n, num);
        step++;
      } else {
        step = 1;
        num = 0;
        n = 10;
        //销毁计时器
        clearInterval(time);
        //获取下一个单词
        that.nextWord();
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
  nextWord: function () {
    //开始倒计时
    this.countdown();
    this.setData({
      pkword: this.data.pkwords[this.data.index]
    })
    this.autoplay()
  },
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
    this.setData({
      playA: JSON.parse(options.playA),
      playB: JSON.parse(options.playB),
      roomid:options.roomid
    })
    this.getPKWords();
  },
  getPKWords: function () {
    var that=this;
    console.log(this.data.playA.id + ";" + app.globalData.userData.uid)
    if (app.globalData.userData.uid == this.data.playA.id) {
      wx.sendSocketMessage({
        data: "2"
      })
    }
    wx.onSocketMessage(function (res) {
      console.log(res.data)
      if (res.data.length >= 5) {
        that.countdown();
        that.setData({
          pkwords: JSON.parse(res.data),
          pkword: JSON.parse(res.data)[that.data.index]
        })
        that.autoplay()
      } else {//否则是对方的成绩
        if (app.globalData.userData.uid == that.data.playA.id) {
          that.setData({
            bscore: res.data,
            bpercent: (parseInt(res.data) / 1440) * 100
          })
        } else {
          that.setData({
            ascore: res.data,
            apercent: (parseInt(res.data) / 1440) * 100
          })
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
  bindChoose:function(e){
    //获取当前时间
    var date = new Date()
    this.setData({
      index:this.data.index+1
    })
    //如果选择正确
    if (e.currentTarget.dataset.ex == this.data.pkword.explanation) {
      this.play('http://img.tukuppt.com/newpreview_music/09/00/62/5c893bc616c6053343.mp3')
      //计算所用时间
      this.setData({
        end: date.getTime()
      })
      var second = ((this.data.end - this.data.start) / 1000).toFixed(1)
      var score=(10-second)*10+100
      this.setData({
        myscore:this.data.myscore+score
      })
      console.log("myscore:"+this.data.myscore)
      //如果本用户是玩家A，则将myscore赋给ascore
      if (app.globalData.userData.uid == this.data.playA.id) {
        this.setData({
          ascore: this.data.myscore,
          apercent:(this.data.myscore/1440)*100
        })
      } else {
        this.setData({
          bscore: this.data.myscore,
          bpercent:(this.data.myscore/1440)*100
        })
      }
      this.send(this.data.myscore)
    } else {
      this.play('http://img.tukuppt.com/newpreview_music/09/00/60/5c89396f017e881994.mp3')
    }
  }
})