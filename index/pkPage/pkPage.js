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
    myscore:0    //我的分数
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
  countdown:function(){
    var date=new Date()
    this.setData({
      start:date.getTime()
    })
    console.log(this.data.start)
    var step = 1,//计数动画次数
      num = 0,//计数倒计时秒数（n - num）
      start = 1.5 * Math.PI,// 开始的弧度
      end = -0.5 * Math.PI,// 结束的弧度
      time = null;// 计时器容器
    var animation_interval = 1000,// 每1秒运行一次计时器
      n = 10; // 当前倒计时为10秒
    // 动画函数
    function animation() {
      if (step <= n) {
        end = end + 2 * Math.PI / n;
        ringMove(start, end);
        step++;
      } else {
        clearInterval(time);

      }
    };
    // 画布绘画函数
    function ringMove(s, e) {
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
      // 每完成一次全程绘制就+1
      num++;
    }
    // 倒计时前先绘制整圆的圆环
    ringMove(start, end);
    // 创建倒计时
    time = setInterval(animation, animation_interval);
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
        data: "p" + this.data.roomid+";"+this.data.playA.id,
      })
    }
    wx.onSocketMessage(function (res) {
      that.countdown();
      that.setData({
        pkwords: JSON.parse(res.data),
        pkword: JSON.parse(res.data)[that.data.index]
      })
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
    var date = new Date()
    this.setData({
      index:this.data.index+1
    })
    if (e.currentTarget.dataset.ex == this.data.pkword.explanation) {
      this.setData({
        end: date.getTime()
      })
      var second = ((this.data.end - this.data.start) / 1000).toFixed(1)
      var score=(10-second)*10+100
      console.log(second+",score:"+score)
      if (app.globalData.userData.uid == this.data.playA.id) {
        this.setData({
          ascore: this.data.ascore+score
        })
      } else {
        this.setData({
          bscore: this.data.bscore+score
        })
      }
      // this.setData({
      //   pkword:this.data.pkwords[this.data.index]
      // })
    } else {
    }
  },
  setScore:function(){
    console.log(app.globalData.userData.uid+";"+this.data.playA.id)
    if (app.globalData.userData.uid == this.data.playA.id) {
      this.setData({
        ascore: this.data.myscore
      })
    } else {
      this.setData({
        bscore: this.data.myscore
      })
    }
  }
})