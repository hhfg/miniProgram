// index//pkresult/pkresult.js
const app = getApp();
const common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myChooseItem: [],     //用户的答题结果
    rivalChooseItem: [],  //对手的答题结果
    pkwords:[],           //pk的单词
    my:[],                //用户的信息
    rival:[],             //对手的信息
    myscore:0,            //我的成绩
    rivalscore:0,         //对手的成绩
    resultUrl:'',         //结果图片地址
    result:''             //结果
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
    this.setData({
      myChooseItem:myChooseItem,
      rivalChooseItem:rivalChooseItem,
      pkwords:pkwords,
      my:my,
      rival:rival,
      myscore:myscore,
      rivalscore:rivalscore
    })
    if(this.data.myscore<this.data.rivalscore){
      this.setData({
        resultUrl:'../../icons/pk/win.png',
        result:'YOU WIN'
      })
    }else{
      this.setData({
        resultUrl:'../../icons/pk/lose.png',
        result:'YOU LOSE'
      })
    }
  },
  bindReturn:function(){
    wx.redirectTo({
      url: '../wordPK/wordPK',
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