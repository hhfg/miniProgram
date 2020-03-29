const app = getApp();
const common = require("../../utils/common.js")
var wxCharts = require('../../utils/wxcharts.js');
var columnChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chartTitle: '最近一周学习记录',
    isMainChartDisplay: true,
    windowWidth: '',
    height: '',
    day: app.globalData.userData.clockInDay,
    count:app.globalData.userData.haveLearned,
    chartData:{
      title: '最近一周学习记录',
      data: [0,0,0,0,0,0,0],
      categories: [0, 0, 0, 0, 0, 0, 0]
    },
    dayNum:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    try {
      var res = wx.getSystemInfoSync();
      this.setData({
        windowWidth: res.windowWidth,
        height: res.windowHeight
      })
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    common.sendRequest('selCount.do',{
      uid:app.globalData.userData.uid
    }).then((res)=>{
      console.log(res)
      that.setData({
        dayNum: res
      })
      that.setChartData();
    })
  },
  setChartData:function(){
    var that=this;
    that.data.dayNum.forEach(function (item, index) {
      let num = 'chartData.data[' + index + ']'
      let date = 'chartData.categories[' + index + ']'
      that.setData({
        [num]: item.num,
        [date]: item.date
      })
    })
    that.setData({
      chartData: that.data.chartData
    })
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: this.data.chartData.categories,
      series: [{
        name: '学习量',
        data: this.data.chartData.data,
        format: function (val, name) {
          return val + '个';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '个';
        },
        fontColor: '#87CEEB',
        min: 0
      },
      xAxis: {
        disableGrid: false,
        fontColor: '#87CEEB',
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: this.data.windowWidth,
      height: 200,
    });
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