// wordBooks//wordCard/wordCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:[],
    ex_array:'',
    coll_array:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var word=JSON.parse(options.word)
    console.log(word)
    that.setData({
      word:word,
    })
    that.setData({
      ex_array: that.data.word.explanation.split(";")
    })
    // 词汇搭配
    if (that.data.word.collocation != null) {
      that.setData({
        coll_array: that.data.word.collocation.split(";")
      })
    } else {
      that.setData({
        coll_array: ''
      })
    }
    //this.changeField()
  },
  changeField:function(){
    var that=this;
    that.setData({
      ex_array: that.data.word.explanation.split(";")
    })
    // 词汇搭配
    if (that.data.word.collocation != null) {
      that.setData({
        coll_array: that.data.word.collocation.split(";")
      })
    } else {
      that.setData({
        coll_array: ''
      })
    }
  },
  //点击播放美式发音
  pronouncePlayUS: function (event) {
    var url = event.currentTarget.dataset.url
    url = url.substring(1, url.length - 1)
    this.play(url)
  },
  //点击播放英式发音
  pronouncePlayUK: function (event) {
    var url = event.currentTarget.dataset.url
    url = url.substring(1, url.length - 1)
    this.play(url)
  },
  //播放音频
  play: function (url) {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = url
    innerAudioContext.onPlay(() => {
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
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