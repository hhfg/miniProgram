// mine//learningRecord/learningRecord.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;
var chartData = {
  main: {
    title: '总成交量',
    data: [5, 10, 5, 5, 15, 5, 10],
    categories: ['3.21', '3.22', '3.23', '3.24', '3.25', '3.26', '3.27']
  },

};
Page({
  data: {
    chartTitle: '总成交量',
    isMainChartDisplay: true
  },
  onReady: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: chartData.main.categories,
      series: [{
        name: '成交量',
        data: chartData.main.data,
        format: function (val, name) {
          return val + '个';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '个';
        },
        title: 'hello',
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 200,
    });
  }
});