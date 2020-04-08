// index//waitRival/waitRival.js
const app = getApp();
const common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waiting: true,
    canStart:false,
    socketOpen:false,
    sendMsg:[],
    resData:['hello'],
    id:0
  },
  createConn:function(){
    var that=this;
    console.log("id"+that.data.id)
    // 创建webSocket连接
    wx.connectSocket({
      url: 'ws://192.168.1.105:8080/MiniProgram/getServer/'+that.data.id,
      header:{
        'content-type':'Application/json'
      },
      method:'GET'
    });
    // 监听webSocket打开事件
    wx.onSocketOpen(function(res){
      console.log(res)
      that.setData({
        socketOpen:true
      });
      console.log("WebSocket连接已打开")
    });
    wx.onSocketError(function(res){
      console.log("WebSocket连接打开失败，请检查")
    })
  },
  send:function(){
    if(this.data.socketOpen){
      console.log(this.data.socketOpen)
      //发送
      wx.sendSocketMessage({
        data: this.data.id,
      });
      var that=this;
      //收到服务器的内容
      wx.onSocketMessage(function(res){
        console.log("收到服务器内容:"+res.data)
        if(res.data=="true"){
          that.setData({
            waiting:false,
            canStart:true
          })
        }
      })
    }
  },
  closeConn:function(e){
    wx.closeSocket();
    wx.onSocketClose(function(res){
      console.log('WebSocket已关闭!')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    //console.log(options.shareid)
    if(options.shareid==null){
      this.createConn()
    }else if(options.shareid!=null){
      this.setData({
        id: options.shareid
      })
     this.setData({
       socketOpen:true
     }) 
     this.send()
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var obj=wx.getLaunchOptionsSync()
    if(obj.scene=='1001'){
      console.log("在app内点击好友对战进入")
    }else if(obj.scene='1011'){
      // common.getSetting().then((res)=>{
      //   if(res=="未授权"){
      //     wx.redirectTo({
      //       url: '../../index/login/login',
      //     })
      //   }else if(res=='已授权'){
      //     console.log("已授权")
      //   }
      // }).catch((res)=>{
      //   console.log(res)
      // })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindAbandon:function(){
    this.closeConn();
    wx.switchTab({
      url: '../../pages/index/index',
    })
  }
})