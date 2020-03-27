const CHARTS = require('../../utils/wxcharts.js'); // 引入wx-charts.js文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataInfo: [
      {
        id: 1,
        subNum: "C1609050001",
        percentage: 30,
        grade: "SPCC",
        spec: "2.5*1200*C",
        weight: 500
      },
      {
        id: 2,
        subNum: "A1609050001",
        percentage: 80,
        grade: "SPCC",
        spec: "3.5*1200*C",
        weight: 100
      }
    ]
  },
  ringShow: function () {
    for (var i in this.data.dataInfo) {
      var item = this.data.dataInfo[i];
      let ring = {
        canvasId: "ringGraph" + item.id, // 与canvas-id一致
        type: "ring",
        series: [
          {
            name: "已完成",
            data: item.percentage,
            color: '#ff6600'
          },
          {
            name: "未完成",
            data: 100 - item.percentage,
            color: '#eeeeee'
          }
        ],
        width: 100,
        height: 100,
        dataLabel: false,
        legend: false,
        title: { // 显示百分比
          name: item.percentage + '%',
          color: '#333333',
          fontSize: 14
        },
        extra: {
          pie: {
            offsetAngle: -90
          },
          ringWidth: 6,
        }
      };
      new CHARTS(ring);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ringShow()
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