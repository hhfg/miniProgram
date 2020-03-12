// pages/learning/learning.js
const app = getApp();
const common = require("../../utils/common.js")
var startX, endX;
var moveFlag = true;// 判断执行滑动事件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pos:0,             //当前学习单词是第几个
    len: 0,            //学习的单词的个数
    word:'',           //显示在页面上的单词对象
    words:[],          //将返回的对象存到word中
    ex_array:[],       //将释义分割字符串后存储在数组中
    coll_array:[],     //将词汇搭配分割字符串后存储在数组中
    reviewWords:[],    //返回的需要复习的单词存到reviewWords中
    reviewWord:[],     //当前复习的单词
    index:0,           //当前复习的单词是第几个
    learningFlag: true,
    reviewFlag: false,
    chooseFlag: true,
    spellFlag: false,
    footerFlag:true,
    goAheadFlag:false,
  },

  touchStart: function (e) {
    startX = e.touches[0].pageX; // 获取触摸时的原点
    moveFlag = true;
  },
  // 触摸移动事件
  touchMove: function (e) {
    endX = e.touches[0].pageX; // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 50) {
        this.previousWord();
        moveFlag = false;
      }
      if (startX - endX > 50) {
        this.nextWord();
        moveFlag = false;
      }
    }

  },
  // 触摸结束事件
  touchEnd: function (e) {
    moveFlag = true; // 回复滑动事件
  },
  loadingData:function(){
    var that=this;
    var page = that.data.pos;
    common.sendRequest("selWords.do",{
      nickName:app.globalData.userInfo.nickName,
      bookName:app.globalData.mybook.bookName,
      num:app.globalData.userData.haveToLearn,
      start:app.globalData.userData.lastWordId
    }).then((res)=>{
      //返回的单词存到words中
      console.log(res)
      that.setData({
        words: res
      })
      that.setData({
        len: res.length
      })
      that.setData({
        word: that.data.words[page]
      })
      that.setData({
        ex_array: that.data.word.explanation.split(";")
      })
      // 词汇搭配
      that.setData({
        coll_array: that.data.word.collocation.split(";")
      })
      common.sendRequest('selReviewWords.do', {
        nickName: app.globalData.userInfo.nickName
      }).then((res) => {
        that.setData({
          reviewWords: res
        }),
        that.setData({
          reviewWord: that.data.reviewWords[0]
        })
        console.log("2" + that.data.reviewWord)
      })
    }).catch((res)=>{
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.loadingData()
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
  play:function(url){
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = url
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  // 点击上一个
  previousWord: function () {
    var that=this;
    if (that.data.pos == 0) {
    } else {
      that.setData({
        pos: that.data.pos - 1
      })
      that.changeField();
    }
  },
  // 点击下一个
  nextWord: function () {
    var that=this;
    //设置单词的status为1
    common.setStatus("updStatus.do", {
      nickName: app.globalData.userInfo.nickName,
      id: that.data.words[that.data.pos].id
    }).then((res)=>{
     
    })
    // 如果已经到最后一个单词
    if (that.data.pos === (that.data.len - 1)) { 
      that.setData({
        learningFlag:false,
        reviewFlag:true
      })
      that.setReviewData();
    } 
    //将pos+1
    else {
      that.setData({
        pos: that.data.pos + 1
      })
      //修改单词字段
      that.changeField(that.data.pos)
    }
  },
  // 修改单词字段
  changeField:function(pos){
    var that=this;
    that.setData({
      word: that.data.words[pos]
    })
    // 释义
    that.setData({
      ex_array: that.data.word.explanation.split(";")
    })
    // 词汇搭配
    if(that.data.word.collocation!=null){
      that.setData({
        coll_array: that.data.word.collocation.split(";")
      })
    }
  },
  setReviewData:function(){
    var that=this;
    that.setData({
      learningFlag: false,
      reviewFlag: true,
      reviewWord: that.data.reviewWords[0]
    })
    // common.sendRequest('selReviewWords.do',{
    //   // nickName:app.globalData.userInfo.nickName
    //   // }).then((res)=>{
    //   //   that.setData({
    //   //     reviewWords: res
    //   //   }),
    //   //   that.setData({
    //   //     reviewWord: that.data.reviewWords[0]
    //   //   })
    //   // })
    // that.setData({
    //   learningFlag: false,
    //   reviewFlag: true,
    //   reviewWord: reviewWords[0]
    // })
  },
  //点击选项
  bindChooseWord:function(e){
    var that=this;
    var ind=that.data.index;
    console.log(ind);
    var reviewWords=that.data.reviewWords
    console.log(that.data.reviewWord)
    //如果选择正确
    if (e.currentTarget.dataset.ex == reviewWords[ind].correctEx){
      if ((ind+1)==reviewWords.length){
        //跳转到已完成学习页面，让用户进行打卡
        wx.redirectTo({
          url: '../clockIn/clockIn',
        })
      }else{
        ind = ind + 1
        that.setData({
          index: ind
        })
        that.setData({
          reviewWord: reviewWords[ind]
        })
      }
    }
    //如果选错，跳出单词卡界面
    else{
      that.setData({
        learningFlag:true,
        reviewFlag:false,
        footerFlag:false,
        goAheadFlag:true,
        //当前复习的单词的位置加1
        index:that.data.index+1
      })
      this.changeField(ind)
    }
  },
  //点击继续做题
  bindGoAhead:function(){
    var that=this;
    var ind=that.data.index;
    that.setData({
      learningFlag: false,
      reviewFlag: true,
      reviewWord:that.data.reviewWords[ind]
    })
  }
})