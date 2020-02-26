// pages/books/books.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:[],
    book:[],
    current:-1
  },
  bindClick:function(e){
    var that=this;
    let typeName = e.currentTarget.dataset.text;;
    let index = e.currentTarget.dataset.index;
    let current = -1
    console.log(index)
    that.getBookMess(typeName,index)
    if (this.data.current != index) {
      current = index
    }
    this.setData({
      current: current
    })
  },
  bindChangeIt:function(e){
    console.log(e.currentTarget.dataset.text)
  },
  getTypeMess: function () {
    var that = this;
    wx.request({
      url: 'http://192.168.1.108:8080/MiniProgram/selAllType.do',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          type: res.data
        })
        that.data.type.forEach((r) => {
          r.book = [];
        })
        that.setData({
          type: that.data.type,
        })
      },
      fail: function (res) {
        console.log("fail")
      }
    })
  },
  getBookMess: function (typeName,index) {
    var that = this;
    var books='type['+index+'].book'
    console.log(typeName,index)
    wx.request({
      url: 'http://192.168.1.108:8080/MiniProgram/selByType.do',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data:{
        type:typeName
      },
      success: function (res) {
        that.setData({
          [books]:res.data
        })
        console.log(res.data)
      },
      fail: function (res) {
        console.log("fail")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTypeMess()
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