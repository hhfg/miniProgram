// pages/login/login.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      app.globalData.userInfo=e.detail.userInfo;
      wx.login({
        success:function(res){
          var code=res.code
          if(code){
            wx.request({
              url: app.globalData.url + '/decodeUsers.do',
              data: {
                code: code
              },
              success:function(res){
                let openid=res.data.openid;
                wx.request({
                  url: app.globalData.url+'/login.do',
                  data:{
                    openid:openid,
                    nickName:e.detail.userInfo.nickName,
                    avatarUrl:e.detail.userInfo.avatarUrl,
                    gender:e.detail.userInfo.gender,
                    province:e.detail.userInfo.province,
                    city:e.detail.userInfo.city
                  },
                  success:function(res){
                    console.log("用户的id:"+res.data);
                  },
                  fail:function(){
                    console.log("用户存入数据库失败");
                  }
                })
              },
              fail:function(res){
                console.log("获取用户openid失败")
              }
            })
          }else{
            console.log("获取用户登录凭证失败");
          }
        }
      })
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '../index/index'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
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

  }
})