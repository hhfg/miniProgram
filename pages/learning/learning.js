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
    pos:0,              //当前学习单词是第几个
    len: 0,             //学习的单词的个数
    word:'',            //显示在页面上的单词对象
    words:[],           //将返回的对象存到word中
    ex_array:[],        //将释义分割字符串后存储在数组中
    coll_array:[],      //将词汇搭配分割字符串后存储在数组中
    reviewWords:[],     //返回的需要复习的单词存到reviewWords中
    reviewWord:[],      //当前复习的单词
    index:0,            //当前复习的单词是第几个
    learningFlag: false,
    reviewFlag: false,
    chooseFlag: false,
    spellFlag: false,
    footerFlag:true,
    goAheadFlag:false,
    englishWord:'',      //练习填写英语单词的变量
    practise:false,
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
  loadingLearningData:function(){
    var that=this;
    var page = that.data.pos;
    that.setData({
      learningFlag: true,
      reviewFlag: false,
      index:0,
      practise:true
    })
    common.sendRequest("selLearningWords.do",{
      nickName:app.globalData.userInfo.nickName,
      num:app.globalData.userData.dayNum,
      start:app.globalData.userData.lastWordId,
      bookid: app.globalData.userData.bookid
    }).then((res)=>{
      //返回的单词存到words中
      console.log(res)
      that.setData({
        words: res
      })
      that.setData({
        len: res.length
      })
      this.changeField(that.data.pos);
      common.sendRequest('selReviewWords.do', {
        nickName: app.globalData.userInfo.nickName,
        review:1
      }).then((res) => {
        console.log(res)
        that.setData({
          reviewWords: res
        })
      })
    }).catch((res)=>{
      console.log(res)
    })
  },
  //获取需要复习的单词
  selReview:function(){
    var that=this;
    common.sendRequest("selReviewWords.do",{
      nickName:app.globalData.userInfo.nickName,
      review:0
    }).then((res)=>{
      console.log(res);
      that.setData({
        reviewWords:res
      })
      console.log(that.data.reviewWords)
      that.setReviewData(that.data.index);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    //this.selReview();
    //this.loadingData();
    if(app.globalData.userData.haveToReview==0){
      console.log("不需要复习");
      this.loadingLearningData();
    }else{
      console.log("需要复习");
      this.selReview();
    }
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
  //播放音频
  play:function(url){
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
  // 点击上一个
  previousWord: function () {
    var that=this;
    if (that.data.pos == 0) {
    } else {
      that.setData({
        pos: that.data.pos - 1
      })
      that.changeField(that.data.pos);
    }
  },
  // 点击下一个
  nextWord: function () {
    var that=this;
    //设置单词的status为1
    this.updateStatus(app.globalData.userInfo.nickName, 1, that.data.words[that.data.pos].id)
    // common.setStatus("updStatus.do", {
    //   nickName: app.globalData.userInfo.nickName,
    //   status:1,
    //   id: that.data.words[that.data.pos].id
    // }).then((res)=>{
     
    // })
    // 如果已经到最后一个单词
    if (that.data.pos === (that.data.len - 1)) { 
      that.setData({
        learningFlag:false,
        reviewFlag:true
      })
      //开始复习
      that.setReviewData(that.data.index);
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
  // 修改单词字段,pos从0开始
  changeField:function(pos){
    var that=this;
    that.setData({
      word: that.data.words[pos]
    })
    console.log(that.data.word)
    //自动播放读音
    var url = that.data.word.us_mp3;
    url = url.substring(1, url.length - 1)
    this.play(url);
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
  setReviewData:function(index){
    var that=this;
    var ran=this.getRandom();
    that.setData({
      learningFlag: false,
      reviewFlag: true,
      reviewWord: that.data.reviewWords[index]
    })
    //0表示选择练习，1表示拼写练习
    if(ran==0){
      that.setData({
        chooseFlag:true,
        spellFlag:false
      })
      var url = that.data.reviewWord.uk_mp3;
      url = url.substring(1, url.length - 1)
      this.play(url);
    }else{
      that.setData({
        chooseFlag:false,
        spellFlag:true,
        englishWord: ''
      })
    }
  },
  //点击选项
  bindChooseWord:function(e){
    var that=this;
    var ind=that.data.index;
    if (that.data.practise == false) {
      this.updateStatus(app.globalData.userInfo.nickName, 2, that.data.reviewWords[that.data.index].id)
    }
    var reviewWords=that.data.reviewWords
    //如果选择正确
    if (e.currentTarget.dataset.ex == reviewWords[ind].explanation){
      if ((ind+1)==reviewWords.length){
        //跳转到已完成学习页面，让用户进行打卡
        //如果是练习已结束
        if (that.data.practise==true){
          that.clockIn();
          // wx.redirectTo({
          //   url: '../clockIn/clockIn',
          // })
        } 
        else if (that.data.practise == false) { //如果是复习
          this.loadingLearningData();
        }
      }else{
        ind = ind + 1
        that.setData({
          index: ind
        })
        this.setReviewData(that.data.index)       
      }
    }
    //如果选错，跳出单词卡界面
    else{
      that.setData({
        learningFlag:true,
        reviewFlag:false,
        footerFlag:false,
        goAheadFlag:true,
      })
      this.setCorrectWord(that.data.index);
    }

  },
  //点击继续做题
  bindGoAhead:function(){
    var that=this;
    var index=that.data.index+1;
    that.setData({
      index: that.data.index + 1
    })
    //如果已练习到最后一个单词
    if(index==that.data.reviewWords.length){
      if (that.data.practise == true) {
        that.clockIn();
        // wx.redirectTo({
        //   url: '../clockIn/clockIn',
        // })
      } else if(that.data.practise==false){ //如果是复习
        this.loadingLearningData();
      }
    }else{
      that.setData({
        learningFlag: false,
        reviewFlag: true,    
        reviewWord: that.data.reviewWords[index],
        englishWord: '',        
      })
    }
  },
  //获取得到输入的单词
  getEnglishWord:function(e){
    var that=this
    that.setData({
      englishWord:e.detail.value,
    })
  },
  bindConfirm:function(e){
    var that=this;
    if (that.data.practise == false) {
      this.updateStatus(app.globalData.userInfo.nickName, 2, that.data.reviewWords[that.data.index].id)
    }
    //如果拼写正确
    if(that.data.englishWord==e.currentTarget.dataset.word){
      if(that.data.index+1==that.data.reviewWords.length){
        if (that.data.practise == true) {
          that.clockIn();
          // wx.redirectTo({
          //   url: '../clockIn/clockIn',
          // })
        } else if (that.data.practise == false) { //如果是复习
          this.loadingLearningData();
        }
      }else{
        console.log("拼写正确");      
        that.setData({
          englishWord: '',
          index: that.data.index + 1,
        })
        this.setReviewData(that.data.index);
      }
    }
    else{
      that.setData({
        learningFlag:true,
        reviewFlag:false,
        footerFlag: false,
        goAheadFlag: true,
        //当前复习的单词的位置加1
      })
      this.setCorrectWord(that.data.index);

    }
  },
  //随机获取一个数字
  getRandom:function(){
    var random = Math.floor(Math.random() * 2);
    return random
  },
  setCorrectWord:function(index){
    var that = this;
    that.setData({
      word: that.data.reviewWords[index]
    })
    //自动播放读音
    var url = that.data.word.us_mp3;
    url = url.substring(1, url.length - 1)
    this.play(url);
    // 释义
    that.setData({
      ex_array: that.data.word.explanation.split(";")
    })
    // 词汇搭配
    if (that.data.word.collocation != null) {
      that.setData({
        coll_array: that.data.word.collocation.split(";")
      })
    }
  },
  //更新status
  updateStatus:function(nickName,status,id){
    console.log(nickName,status,id)
    common.setStatus("updStatus.do",{
      nickName:nickName,
      status:status,
      id:id
    }).then((res)=>{
      console.log(res)
    })
  },
  //打卡
  clockIn:function(){
    var date = new Date();
    var sign_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    wx.request({
      url: 'http://localhost:8080/MiniProgram/insSignRecord.do',
      data: {
        nickName: app.globalData.userInfo.nickName,
        date: sign_date,
        learned_num: app.globalData.userData.dayNum
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.navigateTo({
          url: '../clockIn/clockIn',
        })
      }
    })

  }
})