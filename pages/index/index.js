const app=getApp();
const common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:0,
    userData:app.globalData.userData,
    mybook:app.globalData.mybook
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
    var that = this;
    console.log("onload")
    //查看是否授权
    common.getSetting().then((res)=>{
      if(res==="已授权"){
        //请求后台数据
        common.sendRequest("selPersonalData.do",{
          nickName:app.globalData.userInfo.nickName}
          ).then((res)=>{
          //将数据存储在userData中 
          app.globalData.userData=res
          that.setData({
            userData:res
          })        
          common.sendRequest("selBookById.do",{id:that.data.userData.bookid}).then((res)=>{
            that.setData({
              'mybook.bookName':res.bookName,
              'mybook.wordNum':res.wordNum
            })
            app.globalData.mybook=that.data.mybook
          }).catch((res)=>{
            console.log(res)
          })
        }).catch((res)=>{
          console.log(res)
        })
      }else if(res=="未授权"){
        //跳转到登录页
        wx.navigateTo({
          url: '../login/login',
        })
      }
    }).catch((res)=>{
      console.log(res)
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