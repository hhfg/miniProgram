// pages/books/books.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mybook:'',
    type:[],
    book:[],
    current:-1
  },
  bindClick:function(e){
    var that=this;
    // 当前点击的类型
    let typeName = e.currentTarget.dataset.text;;
    // 当前点击的index
    let index = e.currentTarget.dataset.index;
    let current = -1
    // 获取当前点击的类型的所有书名
    that.getBookMess(typeName,index)
    // 设置current==index，显示view
    if (this.data.current != index) {
      current = index
    }
    this.setData({
      current: current
    })
  },

  bindChangeIt:function(e){
    var that=this;
    let flag=0;   
    wx.showModal({
      title: '提示',
      content: '确定选择此书吗',
      success(res){
        if(res.confirm){
          that.setMyBook(e.currentTarget.dataset.text,e.currentTarget.dataset.id);
        }else{
          console.log("用户选择了取消")
        }
      }
    })
    this.onShow();
  },
  setMyBook:function(bookname,id){
    var that=this;
    wx.request({
      url: app.globalData.url + '/setMyBook.do',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {
        username: app.globalData.username,
        bookid: id
      },
      success: function (res) {
        // 更新成功
        if (res.data == 1) {
          // 设置全局变量mybook的值
          app.globalData.mybook = bookname
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000,
            success:function(){
              setTimeout(function(){
                wx.navigateTo({
                  url: '../learningPlan/learningPlan',
                },1000);
              })
            }
          })
          that.setData({
            mybook:bookname
          })
        }
        // 更新不成功
        else if (res.data == 0) {
          wx.showToast({
            title: '设置失败，请重新选择',
            icon: 'none',
            duration: 1000
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败',
          duration: 1000
        })
      }
    })
  },
  //请求所有类型
  getTypeMess: function () {
    var that = this;
    wx.request({
      url: app.globalData.url+'/selAllType.do',
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
  //请求当前点击的类型的所有书名
  getBookMess: function (typeName,index) {
    var that = this;
    var books='type['+index+'].book'
    console.log(typeName,index)
    wx.request({
      url: app.globalData.url +'/selByType.do',
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
    this.setData({
      mybook:app.globalData.mybook
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
    this.setData({
      mybook:app.globalData.mybook
    })
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