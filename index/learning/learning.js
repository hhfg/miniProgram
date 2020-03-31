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
    chooseFlag: false,    //看单词选择中文
    chooseCNFlag: false,  //听音选择中文释义
    spellENFlag: false,    //听发音拼写单词
    chooseENFlag: false,   //看中文选择单词
    spellFlag: false,     //看中文拼写单词
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
    footerFlag:false,
    goAheadFlag:false,
    englishWord:'',      //练习填写英语单词的变量
    practise:false,
    collectUrl:"../../icons/learning/collect.png",
    learningSet:[],
    soundEffect: false
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
      goAheadFlag:false,
      footerFlag:true,
      index:0,
      practise:true,
      pos:0
    })
    that.setData({
      reviewFlag:false
    })
    common.sendRequest("selLearningWords.do",{
      nickName:app.globalData.userInfo.nickName,
      num:app.globalData.userData.dayNum,
      start:app.globalData.userData.lastWordId,
      bookid: app.globalData.userData.bookid,
      uid:app.globalData.userData.uid
    }).then((res)=>{
      //返回的单词存到words中
      that.setData({
        words: res,
        word:res[0]
      })
      this.changeField(that.data.pos);
      common.sendRequest('selReviewWords.do', {
        nickName: app.globalData.userInfo.nickName,
        review:1,
        bookid: app.globalData.userData.bookid
      }).then((res) => {
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
      review:0,
      bookid:app.globalData.userData.bookid
    }).then((res)=>{
      that.setData({
        reviewWords:res,
        reviewFlag:true
      })
      that.setReviewData(that.data.index);
    })
  },
  setReviewData: function (index) {
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
    switch (this.data.learningSet[ran]) {
      case 'chooseFlag':
        this.setData({
          chooseFlag: true
        })
        this.autoplay();
        break;
      case 'chooseCNFlag':
        this.setData({
          chooseCNFlag: true
        })
        this.autoplay();
        break;
      case 'spellENFlag':
        this.setData({
          spellENFlag: true
        })
        this.autoplay();
        break;
      case 'chooseENFlag':
        this.setData({
          chooseENFlag: true
        })
        break;
      case 'spellFlag':
        this.setData({
          spellFlag: true
        })
        break;
    }
  },
  setLearningSet: function (learningSet) {
    var that = this;
    let i = 0;
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
  autoplay: function () {
    let url = this.data.reviewWord.uk_mp3;
    url = url.substring(1, url.length - 1);
    this.play(url);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取学习设置
    var learningSet = wx.getStorageSync('learningSet')
    this.data.soundEffect = learningSet[5]
    this.setLearningSet(learningSet);
    //如果haveToReview为0（需要复习的单词个数为0，直接获取需要学习的单词
    if(app.globalData.userData.haveToReview==0){
      this.setData({
        learningFlag:true,
        reviewFlag:false
      })
      this.loadingLearningData();
    }else{
      //否则获取需要复习的单词
      this.setData({
        reviewFlag:true,
        learningFlag:false
      })
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
      that.setData({
        word:that.data.words[that.data.pos]
      })
      that.changeField();
    }
  },
  // 点击下一个
  nextWord: function () {
    var that=this;
    //设置单词的status为1
    that.updateStatus(1, that.data.word.id)
    that.setData({
      pos: that.data.pos + 1
    })
    let index=that.data.pos
    // 如果已经到最后一个单词
    if (that.data.pos === that.data.words.length) { 
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
        word:that.data.words[index]
      })
      //修改单词字段
      that.changeField()
    }
  },
  // 修改单词字段,pos从0开始
  changeField:function(){
    var that=this;
    if(that.data.learningFlag==true){
      that.setData({
        collectUrl: "../../icons/learning/collect.png"
      })
      if (that.data.word.collect == 1) {
        that.setData({
          collectUrl: "../../icons/learning/collected.png"
        })
      }
    }
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
    }else{
      that.setData({
        coll_array:''
      })
    }
  },
  //随机获取一个数字
  getRandom:function(){
    var random = Math.floor(Math.random() * this.data.learningSet.length);
    return random
  },
  //得到输入的英语单词
  getEnglishWord: function (e) {
    var that = this;
    that.setData({
      englishWord: e.detail.value
    })
  },
  bindGoAhead: function () {
    var that = this;
    that.setData({
      learningFlag: false,
      reviewFlag: true,
    })
    that.setReviewData(that.data.index)
  },
  //选择中文释义
  bindChoose: function (e) {
    var that = this;
    if (e.currentTarget.dataset.ex == that.data.reviewWord.explanation) {
      that.ifCorrect();
    } else {
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
  //听发音拼写单词
  bindConfirmEN: function (e) {
    var that = this;
    if (that.data.reviewWord.word == that.data.englishWord) {
      that.ifCorrect();
    } else {
      that.ifError();
    }
    that.setData({
      englishWord: ""
    })
  },
  //看中文选择单词
  bindChooseEN: function (e) {
    var that = this;
    if (e.currentTarget.dataset.word == that.data.reviewWord.word) {
      that.ifCorrect();
    } else {
      that.ifError();
    }
  },
  //看中文拼写单词
  bindConfirm: function () {
    var that = this;
    if (that.data.reviewWord.word == that.data.englishWord) {
      that.ifCorrect();
    } else {
      that.ifError();
    }
    that.setData({
      englishWord: ""
    })

  },
  ifCorrect: function () {
    var that = this;
    if (that.data.soundEffect == true) {
      if (that.data.chooseFlag == true || that.data.chooseCNFlag == true || that.data.chooseENFlag == true)
        that.play('http://img.tukuppt.com/newpreview_music/09/00/62/5c893bc616c6053343.mp3')
    }
    if (that.data.practise == false) {
      that.updateStatus(2, that.data.reviewWord.id)
    }
    if (that.data.index + 1 == that.data.reviewWords.length) {
      if(that.data.practise==false){
        that.loadingLearningData();
      }else{
        that.clockIn();
      }
    } else {
      that.setData({
        index: that.data.index + 1
      })
      that.setReviewData(that.data.index)
    }
  },
  ifError: function () {
    var that = this;
    if (that.data.soundEffect == true) {
      if (that.data.chooseFlag == true || that.data.chooseCNFlag == true || that.data.chooseENFlag == true) {
        that.play('http://img.tukuppt.com/newpreview_music/09/00/60/5c89396f017e881994.mp3')
      }
    }
    if (that.data.practise == true) {
      that.updateStatus(2, that.data.reviewWord.id)
    }
    that.setData({
      learningFlag: true,
      goAheadFlag:true,
      footerFlag:false,
      reviewFlag: false,
      word: that.data.reviewWord,
      index: that.data.index + 1
    })
    that.data.reviewWords.push(that.data.reviewWord);
    that.changeField()
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
  updateStatus:function(status,id){
    common.setStatus("updStatus.do",{
      nickName:app.globalData.userInfo.nickName,
      status:status,
      id:id
    }).then((res)=>{
    })
  },
  //打卡
  clockIn:function(){
    var date = new Date();
    var sign_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    common.sendRequest('insSignRecord.do',{
      nickName: app.globalData.userInfo.nickName,
      date: sign_date,
      learned_num: app.globalData.userData.dayNum
    }).then((res)=>{
      wx.navigateTo({
        url: '../clockIn/clockIn',
      })
    })
  },
  bindCollect:function(){
    var that=this;
    var wordCollect='word.collect'
    if (that.data.collectUrl==="../../icons/learning/collect.png"){
      common.setStatus('setCollect.do',{
        nickName:app.globalData.userInfo.nickName,
        collect:1,
        id:that.data.word.id
        }).then((res)=>{
          that.setData({
            collectUrl: "../../icons/learning/collected.png",
            [wordCollect]:1
          })
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 1000,
          })
        })
    }else{
      common.setStatus('setCollect.do', {
        nickName: app.globalData.userInfo.nickName,
        collect: 0,
        id: that.data.word.id
      }).then((res) => {
        that.setData({
          collectUrl: "../../icons/learning/collect.png",
          [wordCollect]: 0
        })
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 1000,
        })
      })
    }
  }
})