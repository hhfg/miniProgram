// index//reviewPage/reviewPage.js
const app = getApp();
const common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseFlag: false,    //看单词选择中文
    chooseCNFlag: false,  //听音选择中文释义
    spellENFlag: false,    //听发音拼写单词
    chooseENFlag:false,   //看中文选择单词
    spellFlag: false,     //看中文拼写单词
    reviewWords: [],
    reviewWord:{},
    englishWord:'',
    learningSet:[],
    index:0,
    correctWord:false,
    reviewFlag:true,
    word:'',
    ex_array:'',
    coll_array:''
  },
  setLearningSet:function(learningSet){
    var that=this;
    let i=0;
    learningSet.forEach(function (item, index) {
      if (item == true) {
        switch (index) {
          case 0:
            that.data.learningSet[i] = 'chooseFlag'
            i++;
            break;
          case 1:
            that.data.learningSet[i] = 'chooseCNFlag'
            i++;
            break;
          case 2:
            that.data.learningSet[i] = 'spellENFlag'
            i++;
            break;
          case 3:
            that.data.learningSet[i] = 'chooseENFlag'
            i++;
            break;
          case 4:
            that.data.learningSet[i] = 'spellFlag'
            i++;
            break;
        }
      }
    })
  },
  getReviewData:function(date){
    var that=this;
    common.sendRequest("getReviewWords.do", {
      nickName: app.globalData.userInfo.nickName,
      date: date
    }).then((res) => {
      that.setData({
        reviewWords: res,
      })
      that.setReviewData(that.data.index)
    })
  },
  setReviewData:function(index){
    var ran=this.getRandom();
    this.setData({
      chooseFlag: false,    //看单词选择中文
      chooseCNFlag: false,  //听音选择中文释义
      spellENFlag: false,    //听发音拼写单词
      chooseENFlag: false,   //看中文选择单词
      spellFlag: false,     //看中文拼写单词
    })
    this.setData({
      reviewWord: this.data.reviewWords[index],
    })
    switch (this.data.learningSet[ran]){
      case 'chooseFlag':
        this.setData({
          chooseFlag:true
        })
        break;
      case 'chooseCNFlag':
        this.setData({
          chooseCNFlag: true
        })
        let url=this.data.reviewWord.uk_mp3
        url = url.substring(1, url.length - 1)
        this.play(url)
        break;
      case 'spellENFlag':
        this.setData({
          spellENFlag: true
        })
        break;
      case 'chooseENFlag':
        this.setData({
          chooseENFlag: true
        })
        break;
      case 'chooseCNFlag':
        this.setData({
          chooseCNFlag: true
        })
        break;
    }

  },
  //随机获取一个数字
  getRandom: function () {
    var random = Math.floor(Math.random() * this.data.learningSet.length);
    return random
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date=options.date;
    var learningSet = wx.getStorageSync('learningSet')
    this.getReviewData(date);
    this.setLearningSet(learningSet)
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
  //得到输入的英语单词
  getEnglishWord: function (e) {
    var that = this;
    that.setData({
      englishWord: e.detail.value
    })
  },
  // 修改单词字段,pos从0开始
  changeField: function (pos) {
    var that=this
    // 释义
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
  bindGoAhead:function(){
    var that=this;
    that.setData({
      correctWord: false,
      reviewFlag: true,
    })
    that.setReviewData(that.data.index)
  },
  //选择中文释义
  bindChoose:function(e){
    var that=this;
    if(e.currentTarget.dataset.ex==that.data.reviewWord.explanation){
      that.ifCorrect();
    }else{
      that.ifError();
    }
  },
  //听音选择中文释义
  bindChooseCN: function (e) {
    var that = this;
    if (e.currentTarget.dataset.ex == that.data.reviewWord.explanation) {
      that.ifCorrect();
    } else {
      that.ifError();
    }
  },
  //看中文拼写单词
  bindConfirm:function(){
    var that=this;
    if(that.data.reviewWord.word==that.data.englishWord){
      console.log("Confirm");
    }else{
      console.log("error")
    }
  },

  //看中文选择单词
  bindChooseEN:function(e){
    var that=this;
    if(e.currentTarget.dataset.word==that.data.reviewWord.word){
      console.log("ChooseEN");
    }else{
      console.log("error")
    }
  },
  //听发音拼写单词
  bindConfirmEN:function(e){
    var that = this;
    if (that.data.reviewWord.word == that.data.englishWord) {
      console.log("confirmEN");
    } else {
      console.log("error")
    }
  },
  ifCorrect:function(){
    var that=this;
    if (that.data.index + 1 == that.data.reviewWords.length) {
      console.log("结束");
    } else {
      that.setData({
        index: that.data.index + 1
      })
      that.setReviewData(that.data.index)
    }
  },
  ifError:function(){
    var that=this;
    that.setData({
      correctWord: true,
      reviewFlag: false,
      word: that.data.reviewWord,
      index: that.data.index + 1
    })
    that.data.reviewWords.push(that.data.reviewWord);
    that.changeField()
  }
})