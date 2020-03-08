// pages/learningPlan/learningPlan.js
const app = getApp();
const common = require("../../utils/common.js")
const util = require("../../utils/util.js")
const date = new Date()
const years = []
const months = []
const days = []
const bigMonth = [1, 3, 5, 7, 8, 10, 12]
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    years: years,
    months: months,
    month:0,
    days: days,
    day:0,
    year: date.getFullYear(),
    value: [9999, 0, 0],
    learningDay:0,
    learningNum:0,
  },
  contains: function (arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] == obj) {
        return true;
      }
    }
  },
  setDays: function (day) {
    const temp = [];
    for (let i = 1; i <= day; i++) {
      temp.push(i)
    }
    this.setData({
      days: temp,
    })
  },
  bindChange: function (e) {
    const val = e.detail.value;
    const setYear = this.data.years[val[0]];
    const setMonth = this.data.months[val[1]];
    const setDay = this.data.days[val[2]];
    // 闰年
    if (setMonth == 2) {
      if ((setYear % 4 == 0 && setYear % 100 != 0) || setYear % 400 == 0) {
        //闰年
        this.setDays(29);
      } else {
        this.setDays(28);
      }
    } else {
      if (this.contains(bigMonth, setMonth)) {
        this.setDays(31)
      } else {
        this.setDays(30)
      }
    }
    const time = util.formatDate(new Date()); //当天日期
    const endTime = this.data.years[val[0]] + "-" + this.data.months[val[1]] + "-" + this.data.days[val[2]]; //选择的
    let temp = new Date(time.replace(/-/g, "/"));//解析字符串
    let etemp = new Date(endTime.replace(/-/g, "/"));
    let learningDay = parseInt((etemp.getTime() - temp.getTime()) / (1000 * 60 * 60 * 24));
    let num = parseInt(app.globalData.mybook.wordNum / learningDay) 
    this.setData({
      learningDay:learningDay,
      year: setYear,
      month:setMonth,
      day: setDay,
      learningNum:num
    })    
  },
  // 点击确定后
  bindConfirm:function(){
    console.log(this.data.year + "-" + this.data.month + "-" + this.data.day)
    let time = this.data.year + "-" + this.data.month + "-" + this.data.day
    let haveToLearn=this.data.learningNum
    let learningDay=this.data.learningDay
    common.sendRequest("updPersonalData.do",{haveToLearn:haveToLearn,endTime:time,learningDay:learningDay}).then((res)=>{
      console.log(res)
      // 跳出提示框设置成功
      wx.showToast({
        title: '设置成功',
        icon: 'success',
        duration: 1000,
        success: function () {
          setTimeout(function () {
            wx.reLaunch({
              url: '../index/index',
            })
          })
        }
      })
    }).catch((res)=>{
      wx.showModal({
        title: '设置失败',
        content: '请重新设置',
        showCancel: false,
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置日期选择器默认选中的是当天日期
    let time = util.formatDate(new Date())
    let month=time.split('-')[1]
    let day=time.split('-')[2]
    if(month<10){
      month=month.substring(1,month.length)-1
    }else{
      month=month-1;
    }
    if(day<10){
      day = day.substring(1, month.length) - 1
    }else{
      day=day-1;
    }
    var m='value[1]'
    var d='value[2]'
    this.setData({
      [m]:month,
      [d]:day
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