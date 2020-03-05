function sendRequest(url, data) {
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
        if (res.statusCode == 200) {
          resolve(res.data)
        } else {
          wx.showModal({
            title: '服务器出错',
            content: '请重新试试',
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
//检测是否授权
function getSetting(){
  return new Promise(function(resolve,reject){
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          resolve("已授权")
        } else {
          resolve("未授权")
        }
      }
    })
  })
}
module.exports={
  sendRequest:sendRequest,
  getSetting:getSetting
}