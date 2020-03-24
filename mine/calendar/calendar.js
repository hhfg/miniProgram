const app = getApp();
const common = require("../../utils/common.js")
const util = require('../../utils/util.js')
const date = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMonthDateLen: 0, // 当月天数
    preMonthDateLen: 0, // 当月中，上月多余天数
    allArr: [], // 
    nowData: "",
    currentYear: date.getFullYear(),
    currentMonth: date.getMonth() + 1,
    clockDay: '',
    nowYear: date.getFullYear(),
    nowMonth: date.getMonth() + 1,
    sign_date: ''
  },
  // 获取某年某月总共多少天
  getDateLen: function (year, month) {
    let actualMonth = month - 1;
    let timeDistance = +new Date(year, month) - +new Date(year, actualMonth);
    return timeDistance / (1000 * 60 * 60 * 24);
  },
  // 获取某月1号是周几
  getFirstDateWeek: function (year, month) {
    return new Date(year, month - 1, 1).getDay()
  },
  // 上月 年、月
  preMonth: function (year, month) {
    if (month == 1) {
      return {
        year: --year,
        month: 12
      }
    } else {
      return {
        year: year,
        month: --month
      }
    }
  },
  // 下月 年、月
  nextMonth: function (year, month) {
    if (month == 12) {
      return {
        year: ++year,
        month: 1
      }
    } else {
      return {
        year: year,
        month: ++month
      }
    }
  },
  // 获取当月数据，返回数组
  getCurrentArr: function () {
    let currentMonthDateLen = this.getDateLen(this.data.currentYear, this.data.currentMonth) // 获取当月天数
    let currentMonthDateArr = [] // 定义空数组
    if (currentMonthDateLen > 0) {
      for (let i = 1; i <= currentMonthDateLen; i++) {
        currentMonthDateArr.push({
          year: this.data.currentYear,
          month: this.data.nowMonth, // 只是为了增加标识，区分上下月
          date: i,
          isSelected: false
        })
      }
    }
    this.setData({
      currentMonthDateLen
    })
    return currentMonthDateArr
  },
  // 获取当月中，上月多余数据，返回数组
  getPreArr: function () {
    let preMonthDateLen = this.getFirstDateWeek(this.data.currentYear, this.data.currentMonth) // 当月1号是周几 == 上月残余天数）
    let preMonthDateArr = [] // 定义空数组
    if (preMonthDateLen > 0) {
      let { year, month } = this.preMonth(this.data.currentYear, this.data.currentMonth) // 获取上月 年、月
      let date = this.getDateLen(year, month) // 获取上月天数
      for (let i = 0; i < preMonthDateLen; i++) {
        preMonthDateArr.unshift({ // 尾部追加
          year: this.data.currentYear,
          month: this.data.nowMonth - 1,
          date: date,
          isSelected: false
        })
        date--
      }
    }
    this.setData({
      preMonthDateLen
    })
    return preMonthDateArr
  },
  // 获取当月中，下月多余数据，返回数组
  getNextArr: function () {
    let nextMonthDateLen = 35 - this.data.preMonthDateLen - this.data.currentMonthDateLen // 下月多余天数
    let nextMonthDateArr = [] // 定义空数组
    if (nextMonthDateLen > 0) {
      for (let i = 1; i <= nextMonthDateLen; i++) {
        nextMonthDateArr.push({
          year: this.data.currentYear,
          month: this.data.nowMonth + 1,
          date: i,
          isSelected: false
        })
      }
    }
    return nextMonthDateArr
  },
  // 整合当月所有数据
  getAllArr: function () {
    var that = this;
    let preArr = this.getPreArr()
    let currentArr = this.getCurrentArr()
    let nextArr = this.getNextArr()
    let isSelected = false
    let allArr = [...preArr, ...currentArr, ...nextArr]
    that.setData({
      allArr
    })
    let sendObj = {
      currentYear: that.data.currentYear,
      currentMonth: that.data.currentMonth,
      nowYear: that.data.nowYear,
      nowMonth: that.data.nowMonth,
      nowDate: that.data.nowDate,
      allArr: allArr
    }
    that.triggerEvent('sendObj', sendObj)
    console.log(that.data.clockDay)
    that.data.clockDay.forEach(function (item, index) {
      for (var i = 0; i < allArr.length; i++) {
        if (item.year == allArr[i].year && item.month == allArr[i].month && item.date == allArr[i].date) {
          let selected = 'allArr[' + i + '].isSelected'
          that.setData({
            [selected]: true
          })
        }
      }
    })
  },
  // 点击 上月
  gotoPreMonth: function () {
    if (this.data.nowMonth == 1) {
      this.setData({
        nowMonth: 12
      })
    } else {
      this.setData({
        nowMonth: this.data.nowMonth - 1
      })
    }
    let { year, month } = this.preMonth(this.data.currentYear, this.data.currentMonth)
    this.setData({
      currentYear: year,
      currentMonth: month
    })
    this.getAllArr()
  },
  // 点击 下月
  gotoNextMonth: function () {
    if (this.data.nowMonth == 12) {
      this.setData({
        nowMonth: 1
      })
    } else {
      this.setData({
        nowMonth: this.data.nowMonth + 1
      })
    }
    let { year, month } = this.nextMonth(this.data.currentYear, this.data.currentMonth)
    this.setData({
      currentYear: year,
      currentMonth: month
    })
    this.getAllArr()
  },
  getNowData: function (e) {
    var data = e.currentTarget.dataset.day;
    var currency = e.currentTarget.dataset.currency;
    if (currency == 1) {
      this.setData({
        nowYear: this.data.currentYear,
        nowMonth: this.data.currentMonth,
        nowDate: data
      })
    }
    console.log(data)
    this.getAllArr()
  },
  //解析从后台传过来的打卡日期
  parseDate: function () {
    var that = this;
    var index = 0
    that.data.sign_date.forEach(function (item) {
      var date = item.split("-");
      var year = 'clockDay[' + index + '].year'
      var month = 'clockDay[' + index + '].month'
      var day = 'clockDay[' + index + '].date'
      that.setData({
        [year]: parseInt(date[0]),
        [month]: parseInt(date[1]),
        [day]: parseInt(date[2])
      })
      index = index + 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //console.log(this.data.nowYear+"-"+this.data.nowMonth+"-"+this.data.nowDay)
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    that.setData({
      nowData: time
    });
    common.sendRequest('selSignDate.do', {
      nickName: app.globalData.userInfo.nickName
    }).then((res) => {
      console.log(res)
      that.setData({
        sign_date: res
      })
      that.parseDate(that.data.sign_date);
      that.getAllArr()
    }).catch((res) => {

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.getAllArr()
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