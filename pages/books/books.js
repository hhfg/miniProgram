// pages/books/books.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:[],
    book:[]  
  },
  bindClick:function(e,id){
    var that=this;
    var typeName='';
    var index = e.currentTarget.dataset.id-1;
    var flag='type['+index+'].isShow'
    that.setData({
      [flag]:!that.data.type[index].isShow
    })
    typeName=e.currentTarget.dataset.text;
    wx.request({
      url: 'http://192.168.1.108:8080/MiniProgram/selByType.do',
      method:'GET',
      data:{
        type:typeName
      },
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        that.setData({
          book:res.data
        })
        console.log(that.data.book)
      },
      fail:function(res){
        console.log(fail);
      }
    })
  },
  bindChangeIt:function(e){
    console.log(e.currentTarget.dataset.text)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'http://192.168.1.108:8080/MiniProgram/selAllType.do',
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        that.setData({
          type:res.data
        })
        that.data.type.forEach((r)=>{
          r.isShow=false;
        })
        that.setData({
          type:that.data.type,
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