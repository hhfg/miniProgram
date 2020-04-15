const app=getApp();
const common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:0,
    userData:app.globalData.userData,
    mybook:app.globalData.mybook,
    percent:0
  },
  //查看打卡日历
  clockIn:function(){
    wx.navigateTo({
      url: '../../mine/calendar/calendar',
    })
  },
  //换书
  bindChangeBook: function () {
    wx.navigateTo({
      url: '../../index/books/books',
      success: function (res) {
        console.log(res)
      },
      fail: function () {
        //fail
      },
      complete: function () {
        //complete
      }
    })
  },
  // 开始学习
  bindLearning:function(){
    //如果bookid=0说明还未选择单词书
    if(app.globalData.userData.bookid==0){
      wx.navigateTo({
        url: '../../index/books/books',
        success: function (res) {
          console.log(res);
        },
        fail: function () {
          //fail
        },
      })
    }else{
       //如果已设置单词书但为制定学习计划，跳转到制定学习计划页面 
      if(app.globalData.userData.dayNum==0){
        wx.navigateTo({
          url: '../../mine/learningPlan/learningPlan',
          success:function(res){
            console.log(res);
          }
        })
      }else{
        //如果haveToLearn和haveToReview都为0说明今日已学习完成
        if(app.globalData.userData.haveToLearn==0&&app.globalData.userData.haveToReview==0){
          wx.showModal({
            title: '今日学习任务已完成',
            content: '是否继续学习？',
            success:function(res){
              if(res.cancel){
                //点击取消
              }else{
                //点击确定
                wx.navigateTo({
                  url: '../../index/learning/learning',
                })
              }
            }
          })
        }else{//否则跳转到学习页面
          wx.navigateTo({
            url: '../../index/learning/learning',
          })
        }
      }
    }
  },
  //PK
  bindPK:function(){
    wx.navigateTo({
      url: '../../index/wordPK/wordPK',
    })
  },
  //复习
  bindReview:function(){
    wx.navigateTo({
      url: '../../index/review/review',
    })
  },
  //查词
  bindSearch:function(){
    wx.navigateTo({
      url: '../../index/search/search',
      success: function (res) {
        console.log(res);
      },
      fail: function () {
        //fail
      },
      complete: function () {
        //complete
      }
    })
  },
  // 获取用户选择的单词书名
  getBookMess: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + '/selBookByUser.do',
      method: 'GET',
      data: {
        username: app.globalData.username
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          mybook: {
            bookName: res.data.bookName,
            wordNum: res.data.wordNum
          }
        })
        app.globalData.mybook = that.data.mybook
      },
      fail: function (res) {
        console.log("fail")
      }
    })
  },
  loading:function(){
    var that=this;
    common.sendRequest("selPersonalData.do", {
      nickName: app.globalData.userInfo.nickName
    }).then((res) => {
      //将数据存储在userData中 
      app.globalData.userData = res
      that.setData({
        userData: res
      })
      if (that.data.userData.bookid != 0) {
        common.sendRequest("selBookById.do", { id: that.data.userData.bookid }).then((res) => {
          that.setData({
            'mybook.bookName': res.bookName,
            'mybook.wordNum': res.wordNum,
            'mybook.bookid': that.data.userData.bookid
          })
          app.globalData.mybook = that.data.mybook
          that.setData({
            percent: Math.round(app.globalData.userData.completedNum / (app.globalData.mybook.wordNum) * 10000) / 100.00 + "%"
          })
        }).catch((res) => {
          console.log(res)
        })
      }
    }).catch((res) => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //查看是否授权
    common.getSetting().then((res)=>{
      if(res==="已授权"){
        //请求后台数据
        this.loading();
      }else if(res=="未授权"){
        //跳转到登录页
        wx.navigateTo({
          url: '../../index/login/login',
        })
      }
    }).catch((res)=>{
      console.log(res)
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
    //this.loading()
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