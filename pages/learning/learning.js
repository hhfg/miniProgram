// pages/learning/learning.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    words:'',         //将返回的对象存到word中
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
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'http://localhost:8080/MiniProgram/selWords.do',
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        that.setData({
          words:res.data,    
        })
        that.setData({
          ex_array: that.data.words.explanation.split(";")
        })
        that.setData({
          coll_array:that.data.words.collocation.split(";")
        })

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