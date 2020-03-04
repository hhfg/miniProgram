var app=getApp();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatDate = date =>{
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year,month,day].map(formatNumber).join('-')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function requestData(url, data) {
  var that = this;
  return new Promise(function (resolve, reject) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://192.168.1.104:8080/MiniProgram/' + url,
      data: data,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        if(res.statusCode==200){
          resolve(res.data)
        }else{
          wx.showModal({
            title: '加载数据失败',
            content: '请检查网络连接',
            showCancel: false,
          })
        }
      },
      fail: function (res) {
        wx.hideLoading();
        reject(res.data)
      }
    })
  })
}
function showError() {
  wx.showModal({
    title: '加载失败',
    content: '请检查网络连接',
    showCancel: false,
  })
}
module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  requestData:requestData
}

