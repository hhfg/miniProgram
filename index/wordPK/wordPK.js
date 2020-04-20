// index//wordPK/wordPK.js
var app = getApp();
var common = require("../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mybank:'',
    width: wx.getSystemInfoSync().windowWidth-40,
    id:0,
    count:0
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
    var that=this
    common.sendRequest("selPersonalData.do", {
      nickName: app.globalData.userInfo.nickName
    }).then((res) => {
      //将数据存储在userData中 
      app.globalData.userData = res
      that.setData({
        userData: res
      })
      this.setData({
        mybank: app.globalData.userData.bank
      })
    })
    if(this.data.id!=0){
      if(this.data.count==0){
        wx.navigateTo({
          url: '../waitRival/waitRival?id=' + this.data.id
        })
      }
      this.setData({
        count:this.data.count+1
      })
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
  onShareAppMessage: function (res) {
    if(res.from=='button'){
      var ran = (Math.random() * 90 + 10).toFixed(0)
      this.setData({
        id: ran
      })
      return {
        title: '测试分享', //弹出分享时显示的标题
        path: 'index/waitRival/waitRival?roomid=' + ran, //传递参数到指定页面
      };
      
    }
  },
  changeQuestionBank:function(){
    wx.navigateTo({
      url: '../questionBank/questionBank',
    })
  }
})