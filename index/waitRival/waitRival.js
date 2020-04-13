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
    id:0,
    playA:[],
    playB:[],
    roomid:0,
    flag:false
  },
  createConn:function(roomid){
    var that=this;
    // 创建webSocket连接
    wx.connectSocket({
      url: 'ws://192.168.1.106:8080/MiniProgram/getServer/'+roomid+"/" + app.globalData.userData.uid,
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
          status: -1
        }).then((res) => {
          console.log("id:" + res.data)
          that.setData({
            id: res.data
          })
        })
      }else{
        common.getData("updRecord.do", {
          roomid: roomid,
          playB: app.globalData.userData.uid,
          status: 0
        }).then((res) => {
          that.setData({
            id: res.data
          })
          that.send(roomid);
        })
      }
    });
    wx.onSocketMessage(function (res) {
      if (res.data == "true") {
        common.getData('getUserMess.do',{
          id:that.data.id
        }).then((res)=>{
          that.setData({
            playA:res.data[0],
            playB:res.data[1]
          })
        })
        that.setData({
          waiting: false,
          canStart: true
        })
      }else if(res.data="start"){
        wx.navigateTo({
          url: '../pkPage/pkPage?playA=' + JSON.stringify(that.data.playA) + '&playB=' + JSON.stringify(that.data.playB),
        })
      }
    })
    wx.onSocketError(function(res){
      console.log("WebSocket连接打开失败，请检查")
    })
  },
  send:function(roomid){
    //如果可以开始，则发送0为后端,0用来后端判断是否应该开始
    if(this.data.canStart==true){
      wx.sendSocketMessage({
        data: "0"+roomid,
      });
    }
    //否则发送房间号给后台
    else{
      wx.sendSocketMessage({
        data: roomid,
      });
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
      this.setData({
        roomid:options.id
      })
      this.createConn(options.id)
    }
    //好友携带参数roomid进来
    if(options.roomid!=null){
      this.setData({
        flag:true
      })
      this.createConn(options.roomid);
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
  },
  startGame:function(){
    this.send(this.data.roomid)
  }
})