var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:228,
    mybook:app.globalData.mybook,
    learningNum:app.globalData.mybook.wordNum
  },
  //换书
  bindChangeBook: function () {
    wx.navigateTo({
      url: '../books/books',
      success: function (res) {
        console.log(res)
      },
      fail: function () {
        //fail
      },
      complete: function () {
        //complete
      }
    })
  },
  // 开始学习
  bindLearning:function(){
    wx.navigateTo({
      url: '../learning/learning',
      success:function(res){
        console.log(res);
      },
      fail:function(){
        //fail
      },
      complete:function(){
        //complete
      }
    })
  },
  //查词
  bindSearch:function(){
    console.log("search");
    wx.navigateTo({
      url: '../search/search',
      success: function (res) {
        console.log(res);
      },
      fail: function () {
        //fail
      },
      complete: function () {
        //complete
      }
    })
  },
    // 获取用户选择的单词书名
  getBookMess: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + '/selBookByUser.do',
      method: 'GET',
      data: {
        username: app.globalData.username
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          mybook: {
            bookName: res.data.bookName,
            wordNum: res.data.wordNum
          }
        })
        app.globalData.mybook = that.data.mybook
      },
      fail: function (res) {
        console.log("fail")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    wx.checkSession({
      success:function(){
        console.log("登录状态未过期");
      },
      fail:function(){
        wx.navigateTo({
          url: '../login/login',
        })
      }
    })
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权")

        } else {
          console.log("未授权")
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
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