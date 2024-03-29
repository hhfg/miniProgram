const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: ''
  },
  //更改学习计划
  bindDateChange: function (e) {
    wx.navigateTo({
      url: '../../mine/learningPlan/learningPlan',
      success:function(res){
      },
      fail:function(res){
        console.log("fail")
      }
    })
  },
  //打卡日历
  bindCalendar: function () {
    wx.navigateTo({
      url: '../../mine/calendar/calendar',
      success: function (res) {
      },
      fail: function () {
        //fail
      },
      complete: function () {
        //complete
      }
    })
  },
  //设置每日学习提醒时间
  bindTimeChange: function (e) {
    // console.log(e.detail.value)
    // wx.showToast({
    //   title: '修改成功',
    //   icon: 'success',
    //   duration: 2000
    // })
    wx.requestSubscribeMessage({
      tmplIds: ['8eJZmVnkDe7gLPkXCk5hTFFq8AQrurCWKgjuRPDZ2WM'],
      success:function(res){
        console.log("已授权接受订阅消息")
      }
    })
  },
  //学习记录
  bindLearningRecord: function () {
    wx.navigateTo({
      url: '../../mine/learningRecord/learningRecord',
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
  //学习设置
  bindLearningSet: function () {
    wx.navigateTo({
      url: '../../mine/learningSet/learningSet',
      success: function (res) {

      },
      fail: function () {
        //fail
      },
      complete: function () {
        //complete
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.shareid)
    var that=this;
    that.setData({
      userData: app.globalData.userData
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