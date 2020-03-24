// pages/wordBook/wordBook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  bindLook:function(e){
    var text = e.currentTarget.dataset.text
    if(text=="全部单词"){
      wx.navigateTo({
        url: '../../wordBooks/allWords/allWords?text=全部单词',
      })
    }else if(text=="已学词"){
      wx.navigateTo({
        url: '../../wordBooks/allWords/allWords?text=已学词',
      })
    }else if(text=="收藏夹"){
      wx.navigateTo({
        url: '../../wordBooks/allWords/allWords?text=收藏夹',
      })
    }
  }
})