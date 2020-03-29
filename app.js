//app.js
var app=getApp();
App({
  require: function ($uri) { return require($uri) },
  onLaunch: function () {
    var that=this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getStorage({
      key: 'learningSet',
      success: function(res) {
      },
      fail:function(res){
        wx.setStorage({
          key: 'learningSet',
          data: [true,false,true,false,true,true]
      //看单词选择中文,听音选择中文释义,听发音拼写单词,看中文选择单词,看中文拼写单词        
        })
      }
    })
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
      wordNum:0,
      bookid:0
    }
  }
})