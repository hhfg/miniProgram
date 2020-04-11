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
    rid:0,
    playA:[],
    playB:[],
    roomid:0,
    flag:false
  },
  createConn:function(roomid){
    var that=this;
    // 创建webSocket连接
    wx.connectSocket({
      url: 'ws://192.168.1.105:8080/MiniProgram/getServer/'+roomid+"/" + app.globalData.userData.uid,
      header:{
        'content-type':'Application/json'
      },
      method:'GET'
    });
    // 监听webSocket打开事件
    wx.onSocketOpen(function(res){
      //flag为false说明是发起者进来，在建立连接后在后端创建对战记录
      if(that.data.flag==false){
        common.getData("insRecord.do", {
          roomid: roomid,
          playA: app.globalData.userData.uid,
          status:-1
        }).then((res) => {
          console.log(res.data)
        })
      }else{
        common.getData("updRecord.do",{
          playB:app.globalData.userData.uid,
          roomid:roomid
        }).then((res)=>{
          console.log(res.data)
        })
      }
    });
    wx.onSocketMessage(function (res) {
      if (res.data == "true") {
        that.setData({
          waiting: false,
          canStart: true
        })
      }
    })
    wx.onSocketError(function(res){
      console.log("WebSocket连接打开失败，请检查")
    })
  },
  send:function(roomid){
    if(this.data.socketOpen){
      //发送
      wx.sendSocketMessage({
        data: roomid,
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
    //发起者携带参数名为id进来
    if(options.id!=null){
      console.log(options.id)
      this.createConn(options.id)
    }
    //好友携带参数roomid进来
    if(options.roomid!=null){
      this.setData({
        flag:true
      })
      this.createConn(options.roomid);
    }
    //this.createConn();
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