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
    learningSet:{
      chooseFlag: true,    //看单词选择中文
      chooseCNFlag: false,  //听音选择中文释义
      spellENFlag: true,    //听发音拼写单词
      chooseENFlag: false,   //看中文选择单词
      spellFlag: false,     //看中文拼写单词
    }
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
    console.log(e.detail)
  },
  bindChooseCN:function(e){
    console.log(e.detail)
  },
  bindSpellEN:function(e){
    console.log(e.detail)
  },
  bindChooseENFlag:function(e){
    console.log(e.detail)
  },
  bindSpell:function(e){
    console.log(e.detail)
  }
})