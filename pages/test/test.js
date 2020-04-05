// index//wordPK/wordPK.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'',
    sendMsg:[],
    socketOpen:false,
    resData:[]
  },
  createConn:function(){
    var page=this;
    wx.connectSocket({
      url: 'ws://localhost:8080/MiniProgram/getServer',
      data:{
        x:'',
        y:''
      },
      hearder:{
        'content-type':'Application/json'
      },
      method:'GET',
    });
    wx.onSocketOpen(function(res){
      console.log(res);
      page.setData({
        socketOpen:true
      })
      console.log('WebSocket连接已打开')
    });
    wx.onSocketError(function(res){
      console.log("WebSocket连接打开失败，请检查!")
    })
  },
  send:function(e){
    if(this.data.socketOpen){
      console.log(this.data.socketOpen);
      wx.sendSocketMessage({
        data: this.data.msg,
      })
      var sendMsg=this.data.sendMsg;
      sendMsg.push(this.data.msg);
      this.setData({
        sendMsg:sendMsg
      })
      var page=this;
      wx.onSocketMessage(function(res){
        var resData=page.data.resData;
        resData.push(res.data);
        page.setData({
          resData:resData
        })
        console.log(resData);
        console.log("收到服务器内容:"+res.data)
      })
    }else{
      console.log("WebSocket连接打开失败，请检查")
    }
  },
  closeConn:function(e){
    wx.closeSocket();
    wx.onSocketClose(function(res){
      console.log('WebSocket已关闭')
    })
  },
  getMsg:function(e){
    var page=this;
    page.setData({
      msg:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  chooseIt:function(e){
    console.log(e.currentTarget.dataset.id)
  }
})