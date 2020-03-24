// pages/search/search.js
const app = getApp();
const common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:"",
    flag:false,
    ifFlag:false,
    result:'',
    ex_array:'',
    coll_array:''
  },
  bindGetText:function(e){
    var that=this
    that.setData({
      word:e.detail.value
    })
    common.sendRequest("searchWord.do",{
      word:that.data.word
      }).then((res)=>{
        if(res==""){
          that.setData({
            ifFlag:true,
            flag:false
          })
        }else{
          that.setData({
            result:res
          })
          that.changeField();
        }
      }).catch((res)=>{
        console.log(res)
      })
  },
  changeField:function(){
    var that=this;
    that.setData({
      ex_array: that.data.result.explanation.split(";")
    })
    // 词汇搭配
    if (that.data.result.collocation != null) {
      that.setData({
        coll_array: that.data.result.collocation.split(";")
      })
    }
    that.setData({
      flag:true,
      ifFlag:false
    })
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
  // 查询搜索的接口方法
  search: function () {
  
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

  }
})