// index//pkresult/pkresult.js
const app = getApp();
const common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myChooseItem: [],     //用户的答题结果
    rivalChooseItem: [],  //对手的答题结果
    pkwords:[],           //pk的单词
    my:[],                //用户的信息
    rival:[],             //对手的信息
    myscore:0,            //我的成绩
    rivalscore:0,         //对手的成绩
    resultUrl:'',         //结果图片地址
    result:'',            //结果
    id:'',                //记录在数据库表中的id
    myError:[],           //记录用户做错的单词
  },
  //关闭websocket连接
  closeConn:function(){
    wx.closeSocket();
    wx.onSocketClose(function (res) {
      console.log('WebSocket已关闭!')
    })
  },
  updRecord:function(){
    common.getData('updRoomStatus.do', {
      id: this.data.id,
      status: 2
    }).then((res) => {
      console.log(res.data)
    })
    this.insError();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.closeConn();
    var myChooseItem=JSON.parse(options.myChooseItem);
    var rivalChooseItem=JSON.parse(options.rivalChooseItem);
    var pkwords=JSON.parse(options.pkwords);
    var my=JSON.parse(options.my);
    var rival=JSON.parse(options.rival);
    var myscore=options.myscore;
    var rivalscore=options.rivalscore
    var id=options.id
    console.log(pkwords)
    this.setData({
      myChooseItem:myChooseItem,
      rivalChooseItem:rivalChooseItem,
      pkwords:pkwords,
      my:my,
      rival:rival,
      myscore:myscore,
      rivalscore:rivalscore,
      id:id
    })
    for(var i=0;i<this.data.pkwords.length;i++){
      if(this.data.myChooseItem[i]==false){
        this.data.myError.push(this.data.pkwords[i])
      }
    }
    this.updRecord();
    this.setPageData();
  },
  insError:function(){
    var that=this;
    common.getData('insErrorWords.do',{
      nickName: app.globalData.userInfo.nickName,
      pkwords:JSON.stringify(that.data.myError)
    }).then((res)=>{
      console.log(res)
    })
  },
  setPageData:function(){
    if (this.data.myscore < this.data.rivalscore) {
      this.setData({
        resultUrl: '../../icons/pk/lose.png',
        result: 'YOU LOSE'
      })
    } else {
      this.setData({
        resultUrl: '../../icons/pk/win.png',
        result: 'YOU WIN'
      })
    }
  },
  bindReturn:function(){
    wx.redirectTo({
      url: '../wordPK/wordPK',
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

  }
})