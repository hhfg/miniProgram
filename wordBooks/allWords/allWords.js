// pages/wordBook/allWords/allWords.js
const app = getApp();
const common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words:[],
    change:[],
    page:0,
    urlParam:'',
    datas:{},
    chooseText:''
  },
  setParam:function(text){
    var that=this;
    that.setData({
      chooseText:text
    })
    if (text == "全部单词") {
      that.setData({
        urlParam: 'selAllWords.do',
        datas: {
          nickName: app.globalData.userInfo.nickName,
          page: that.data.page,
          id: app.globalData.userData.bookid
        }
      })
    } else if (text == "已学词") {
      that.setData({
        urlParam: 'selLearnedWords.do',
        datas:{
          nickName: app.globalData.userInfo.nickName,
          page:that.data.page
        }
      })
    } else if (text == "收藏夹") {
      that.setData({
        urlParam: 'selCollectWords.do',
        datas: {
          nickName: app.globalData.userInfo.nickName,
          page:that.data.page
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setParam(options.text)
    common.sendRequest(that.data.urlParam,that.data.datas).then((res) => {
      that.setData({
        change: res
      })
      for(var item in that.data.change){
        delete that.data.change[item].choose;
        delete that.data.change[item].chooseEn
      }
      console.log(that.data.change);
      for (var i = 0; i < that.data.change.length; i++) {
        that.data.change[i].trans = "释义"
      }
      that.setData({
        words: that.data.change
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
    var that=this;
    that.setData({
      page:that.data.page+1
    })
    if(that.data.chooseText=="全部单词"){
      that.setData({
        datas: {
          nickName: app.globalData.userInfo.nickName,
          page: that.data.page,
          id: app.globalData.userData.bookid
        }
      })
    }else if(that.data.chooseText=="已学词"){
      that.setData({
        datas: {
          nickName: app.globalData.userInfo.nickName,
          page: that.data.page
        }
      })
    }else if(that.data.chooseText=="收藏夹"){
      that.setData({
        datas: {
          nickName: app.globalData.userInfo.nickName,
          page: that.data.page
        }
      })
    }
    common.getData(that.data.urlParam,that.data.datas).then((res)=>{
      that.setData({
        change: res.data
      })
      console.log(that.data.change)
      for (var i = 0; i < that.data.change.length; i++) {
        that.data.change[i].trans = "释义"
      }
      that.setData({
        words:that.data.words.concat(that.data.change)
      })
      that.setData({
        words:that.data.words
      })
    }).catch((res)=>{
      console.log(res)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindTranslate:function(e){
    var that=this;
    var index=e.currentTarget.dataset.id
    var text = e.currentTarget.dataset.text
    var trans = 'words[' + index + '].trans'
    if(text=="释义"){   
      that.setData({
        [trans]: that.data.words[index].explanation
      })
    }else{
      that.setData({
        [trans]: '释义'
      })
    }
  },
  bindWordCard:function(e){
    var that=this;
    var word = JSON.stringify(e.currentTarget.dataset.word)
    //var word=e.currentTarget.dataset.word
    console.log(word)
    wx.navigateTo({
      url: '../wordCard/wordCard?word='+encodeURIComponent(word),
    })
  }
})