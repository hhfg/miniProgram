// pages/learning/learning.js
const app = getApp();
const common = require("../../utils/common.js")
var startX, endX;
var moveFlag = true;// 判断执行滑动事件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pos:0,
    len: 0,
    word:'',
    words:[],         //将返回的对象存到word中
    ex_array:[],      //将释义分割字符串后存储在数组中
    coll_array:[],    //将词汇搭配分割字符串后存储在数组中

  },

  touchStart: function (e) {
    startX = e.touches[0].pageX; // 获取触摸时的原点
    moveFlag = true;
  },
  // 触摸移动事件
  touchMove: function (e) {
    endX = e.touches[0].pageX; // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 50) {
        this.previousWord();
        moveFlag = false;
      }
      if (startX - endX > 50) {
        this.nextWord();
        moveFlag = false;
      }
    }

  },
  // 触摸结束事件
  touchEnd: function (e) {
    moveFlag = true; // 回复滑动事件
  },
  loadingData:function(){
    var that=this;
    var page = that.data.pos;
    common.sendRequest("selWords.do",{
      bookName:app.globalData.mybook.bookName,
      num:app.globalData.userData.haveToLearn,
      start:app.globalData.userData.lastWordId
    }).then((res)=>{
      that.setData({
        words: res
      })
      that.setData({
        len: res.length
      })
      that.setData({
        word: that.data.words[page]
      })
      that.setData({
        ex_array: that.data.word.explanation.split(";")
      })
      // 词汇搭配
      that.setData({
        coll_array: that.data.word.collocation.split(";")
      })
    }).catch((res)=>{
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    //this.loadingData()

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
  pronouncePlayUS: function (event) {
    var url = event.currentTarget.dataset.url
    url = url.substring(1, url.length - 1)
    this.play(url)
  },
  pronouncePlayUK: function (event) {
    var url = event.currentTarget.dataset.url
    url = url.substring(1, url.length - 1)
    this.play(url)
  },
  play:function(url){
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = url
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  // 点击上一个
  previousWord: function () {
    var that=this;
    if (that.data.pos == 0) {
    } else {
      that.setData({
        pos: that.data.pos - 1
      })
      that.changeField();
    }
  },
  // 点击下一个
  nextWord: function () {
    // 如果已经到最后一个单词
    var that=this;
    if (that.data.pos === (that.data.len - 1)) {
      
    } else {
      that.setData({
        pos: that.data.pos + 1
      })
      that.changeField()
    }
  },
  // 修改单词字段
  changeField:function(){
    var that=this;
    that.setData({
      word: that.data.words[that.data.pos]
    })
    // 释义
    that.setData({
      ex_array: that.data.word.explanation.split(";")
    })
    // 词汇搭配
    that.setData({
      coll_array: that.data.word.collocation.split(";")
    })
  }
})