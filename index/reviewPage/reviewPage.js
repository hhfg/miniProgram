// index//reviewPage/reviewPage.js
const app = getApp();
const common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseFlag: false,    //看英文选择中文
    spellFlag: false,     //看中文拼写单词
    chooseCNFlag: false,  //听音选择中文释义
    chooseENFlag:false,   //看中文选择英文
    spellENFlag:true,     //听发音拼写单词
    reviewWords: [],
    reviewWord:{},
    englishWord:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date=options.date;
    var that=this;
    common.sendRequest("getReviewWords.do",{
      nickName:app.globalData.userInfo.nickName,
      date:date
    }).then((res)=>{
      that.setData({
        reviewWords:res,
        reviewWord:res[0]
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
  pronouncePlayUS: function (event) {
    var url = event.currentTarget.dataset.url
    url = url.substring(1, url.length - 1)
    this.play(url)
    console.log("play")
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
  //选择中文释义
  bindChoose:function(e){
    var that=this;
    console.log(e.currentTarget.dataset.ex)
    if(e.currentTarget.dataset.ex==that.data.reviewWord.explanation){
      console.log("correct");
    }else{
      console.log("error")
    }
  },
  //得到输入的英语单词
  getEnglishWord:function(e){
    var that=this;
    that.setData({
      englishWord:e.detail.value
    })
  },
  bindConfirm:function(){
    var that=this;
    if(that.data.reviewWord.word==that.data.englishWord){
      console.log("correct");
    }else{
      console.log("error")
    }
  },
  bindChooseWord:function(e){
    var that=this;
    if(e.currentTarget.dataset.word==that.data.reviewWord.word){
      console.log("correct");
    }else{
      console.log("error")
    }
  }
})