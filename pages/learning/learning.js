// pages/learning/learning.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pos:0,
    word:'',
    words:[],         //将返回的对象存到word中
    ex_array:[],     //将释义分割字符串后存储在数组中
    coll_array:[]    //将词汇搭配分割字符串后存储在数组中
  },
  pronouncePlayUS:function(event){
    var url = event.currentTarget.dataset.url
    url=url.substring(1,url.length-1)
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
  pronouncePlayUK: function (event) {
    var url = event.currentTarget.dataset.url
    url = url.substring(1, url.length - 1)
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

  previousWord: function () {
    var that=this;
    if(that.data.pos==0){
      
    }else{
      that.setData({
        pos:that.data.pos-1
      })
    }
    that.onReady()
  },
  nextWord: function () {
    var that=this;
    that.setData({
      pos:that.data.pos+1
    })

    that.onReady()
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that=this;
    wx.request({
      //url: 'http://localhost:8080/MiniProgram/selWords.do',
      url:'http://192.168.1.108:8080/MiniProgram/selWords.do',
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      // 返回数据成功，并将对象存到words中
      success:function(res){
        that.setData({
          words:res.data,      
        })
        console.log(that.data.word)  
      },
      fail:function(res){
        console.log("fail")
      }
    })
  }, 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    // 设置当前页面的单词
    that.setData({
      word: that.data.words[that.data.pos]
    })
    // 释义
    that.setData({
      ex_array: that.data.words[that.data.pos].explanation.split(";")
    })
    // 词汇搭配
    that.setData({
      coll_array: that.data.words[that.data.pos].collocation.split(";")
    })
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