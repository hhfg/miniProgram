// index//wordPK/wordPK.js
var app = getApp();
var common = require("../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mybank:'',
    width: wx.getSystemInfoSync().windowWidth-40,
    id:0,
    count:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    common.sendRequest('getPlayerData.do',{
      uid:app.globalData.userData.uid
    }).then((res)=>{
      that.setData({
        mybank:res.bank
      })
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
    if(this.data.id!=0){
      if(this.data.count==0){
        wx.navigateTo({
          url: '../waitRival/waitRival?id=' + this.data.id,
        })
      }
      this.setData({
        count:this.data.count+1
      })
    }
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
  onShareAppMessage: function (res) {
    if(res.from=='button'){
      var ran = (Math.random() * 100 + 10).toFixed(0)
      this.setData({
        id: ran
      })
      return {
        title: '测试分享', //弹出分享时显示的标题
        path: 'index/waitRival/waitRival?shareid=' + this.data.id, //传递参数到指定页面
      };
      
    }
  },
  changeQuestionBank:function(){
    wx.navigateTo({
      url: '../questionBank/questionBank',
    })
  },
  bindGame:function(){
    if(this.data.mybank==''){
      wx.showModal({
        title: '提示',
        content: '请先选择题库',
        success:function(res){
          if(res.confirm){
            wx.navigateTo({
              url: '../questionBank/questionBank',
            })
          }
        }
      })     
    }else{
     wx.redirectTo({
       url: '../waitRival/waitRival'
     })
    }
  }
})