//app.js
var app=getApp();
App({
  onLaunch: function () {
    var that=this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
      fail:function(){
        callback(false)
      }
    }),
    wx.getUserInfo({   
      success:function(res){
        that.globalData.userInfo=res.userInfo
        console.log(that.globalData.userInfo)
      }
    })
  },

    globalData: {
    //url:'http://192.168.1.100:8080/MiniProgram',
    url:'http://localhost:8080/MiniProgram',
    userInfo: null,
    userData:null,
    //选择的词书的信息（书名，单词数）
    mybook:{
      bookName:'',
      wordNum:0
    }
  }
})