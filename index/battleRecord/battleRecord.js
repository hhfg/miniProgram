// index//battleRecord/battleRecord.js
const app = getApp();
const common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    battleRecord:[],
    count:0,
    win:0,
    winPercent:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    common.getData('selRecord.do',{
      id:app.globalData.userData.uid
    }).then((res)=>{
      console.log(res.data)
      that.setData({
        battleRecord:res.data,
        count:res.data.length
      })
      for (var i = 0; i < that.data.battleRecord.length; i++){
        that.data.battleRecord[i].result=''
      }
      var num=0;
      for(var i=0;i<that.data.battleRecord.length;i++){
        if(that.data.battleRecord[i].playA==app.globalData.userData.uid){
          if (that.data.battleRecord[i].ascore < that.data.battleRecord[i].bscore){
            var result='battleRecord['+i+'].result'
            that.setData({
              [result]:'失败'
            })
          }else{
            var result = 'battleRecord[' + i + '].result'
            num++;
            that.setData({
              [result]: '胜利',
              win:that.data.win+1,
              winPercent: (num / that.data.count * 100).toFixed(2)
            })
          }
        } else if (that.data.battleRecord[i].playB == app.globalData.userData.uid){
          if (that.data.battleRecord[i].ascore < that.data.battleRecord[i].bscore) {
            var result = 'battleRecord[' + i + '].result'
            num++;
            that.setData({
              [result]: '胜利',
              win: that.data.win+1,
              winPercent:(num/that.data.count*100).toFixed(2)
            })
          } else {
            var result = 'battleRecord[' + i + '].result'
            that.setData({
              [result]: '失败'
            })
          }
        }
      }
    })
    
  },
  getUserPic:function(){
    var that=this;

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