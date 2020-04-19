// index//pkresult/pkresult.js
const app = getApp();
const common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myChooseItem: [],
    rivalChooseItem: [],
    pkwords:[],
    my:[],
    rival:[],
    myscore:0,
    rivalscore:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myChooseItem=JSON.parse(options.myChooseItem);
    var rivalChooseItem=JSON.parse(options.rivalChooseItem);
    var pkwords=JSON.parse(options.pkwords);
    var my=JSON.parse(options.my);
    var rival=JSON.parse(options.rival);
    var myscore=options.myscore;
    var rivalscore=options.rivalscore
    console.log(myChooseItem);
    console.log(rivalChooseItem);
    this.setData({
      myChooseItem:myChooseItem,
      rivalChooseItem:rivalChooseItem,
      pkwords:pkwords,
      my:my,
      rival:rival,
      myscore:myscore,
      rivalscore:rivalscore
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