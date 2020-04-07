// index//waitRival/waitRival.js
const app = getApp();
const common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waiting: true,
    canStart:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.shareid)
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
      common.getSetting().then((res)=>{
        if(res=="未授权"){
          wx.redirectTo({
            url: '../../index/login/login',
          })
        }else if(res=='已授权'){
          console.log("已授权")
        }
      }).catch((res)=>{
        console.log(res)
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
  onShareAppMessage: function () {

  }
})