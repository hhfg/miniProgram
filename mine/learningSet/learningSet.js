// pages/learningSet/learningSet.js
array: ['思考模式', '经典模式']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['思考模式', '经典模式'],
    value: '思考模式',
    index: 0,
    learningSet:{}
  },
  bindModeChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var learningSet=wx.getStorageSync('learningSet')
    this.setData({
      learningSet:learningSet
    })
    console.log(this.data.learningSet)
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
  bindChoose:function(e){
    this.setData({
      'learningSet[0]':e.detail.value
    })
    wx.setStorageSync("learningSet", this.data.learningSet)
  },
  bindChooseCN:function(e){
    this.setData({
      'learningSet[1]': e.detail.value
    })
    wx.setStorageSync("learningSet", this.data.learningSet)
  },
  bindSpellEN:function(e){
    this.setData({
      'learningSet[2]': e.detail.value
    })
    wx.setStorageSync("learningSet", this.data.learningSet)
  },
  bindChooseENFlag:function(e){
    this.setData({
      'learningSet[3]': e.detail.value
    })
    wx.setStorageSync("learningSet", this.data.learningSet)
  },
  bindSpell:function(e){
    this.setData({
      'learningSet[4]': e.detail.value
    })
    wx.setStorageSync("learningSet", this.data.learningSet)
  },
  bindSoundEffect:function(e){
    this.setData({
      'learningSet[5]':e.detail.value
    })
    wx.setStorageSync("learningSet", this.data.learningSet)
  }
})