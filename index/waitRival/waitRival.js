// index//waitRival/waitRival.js
const app = getApp();
const common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waiting: true,
    canStart: false,
    socketOpen: false,
    id: 0,             //记录在数据库的id
    playA: [],
    playB: [],
    roomid: 0,
    flag: '',
    pos: 0
  },
  createConn: function (roomid) {
    var that = this;
    // 创建webSocket连接
    wx.connectSocket({
      url: 'ws://192.168.116.1:8080/MiniProgram/getServer/' + roomid + "/" + app.globalData.userData.uid,
      header: {
        'content-type': 'Application/json'
      },
      method: 'GET',
    });
    // 监听webSocket打开事件
    wx.onSocketOpen(function (res) {
      //flag为false说明是发起者进来，在建立连接后在后端创建对战记录
      // if(that.data.flag=="1"){
      //   common.getData("insRecord.do", {
      //     roomid: roomid,
      //     playA: app.globalData.userData.uid,
      //     status: -1
      //   }).then((res) => {
      //     console.log("id:" + res.data)
      //     that.setData({
      //       id: res.data
      //     })
      //   })
      // }else if(that.data.flag=="2"){//对手进来后，更改房间状态
      //   common.getData("updRecord.do", {
      //     roomid: roomid,
      //     playB: app.globalData.userData.uid,
      //     status: 0
      //   }).then((res) => {
      //     that.setData({
      //       id: res.data
      //     })
      //     that.send(roomid);
      //   })
      // }else if(that.data.flag=="0"){
      //   console.log("已经满了")
      // }
    });
    wx.onSocketMessage(function (res) {
      console.log(res.data)
      if (res.data == "0") {
        console.log("房间已满");
      }
      if (res.data == "1") {
        common.getData("insRecord.do", {
          roomid: roomid,
          playA: app.globalData.userData.uid,
          status: -1
        }).then((res) => {
          console.log("id:" + res.data)
          that.setData({
            id: res.data
          })
        })
      } else if (res.data == "2") {
        common.getData("updRecord.do", {
          roomid: roomid,
          playB: app.globalData.userData.uid,
          status: 0
        }).then((res) => {
          that.setData({
            id: res.data
          })
          that.send(roomid);
        })
      }
      else if (res.data == "true") {
        common.getData('getUserMess.do', {
          id: that.data.id
        }).then((res) => {
          console.log(res.data)
          that.setData({
            playA: res.data[0],
            playB: res.data[1]
          })
          if (that.playA.avatarUrl == null) {
            var pic = 'playA.avatarUrl'
            that.setData({
              [pic]: '../../icons/head/headPic.png'
            })
          }
          if (that.playB.avatarUrl == null) {
            var pic = 'playB.avatarUrl'
            that.setData({
              [pic]: '../../icons/head/headPic.png'
            })
          }
        })
        that.setData({
          waiting: false,
          canStart: true
        })
      } else if (res.data = "start") {
        wx.navigateTo({
          url: '../pkPage/pkPage?playA=' + JSON.stringify(that.data.playA) + '&playB=' + JSON.stringify(that.data.playB) + '&roomid=' + that.data.roomid + '&id=' + that.data.id,
        })
      } else if (res.data == "0") {
        console.log("房间已满");
      }
    })
    wx.onSocketError(function (res) {
      console.log("WebSocket连接打开失败，请检查")
    })
  },
  send: function () {
    //如果可以开始，则发送1给后端
    if (this.data.canStart == true) {
      wx.sendSocketMessage({
        data: "s",
      });
    }
    //否则发送0给后端，表示可以切换界面用户已进来
    else {
      wx.sendSocketMessage({
        data: "t",
      });
    }
  },
  closeConn: function (e) {
    wx.closeSocket();
    wx.onSocketClose(function (res) {
      console.log('WebSocket已关闭!')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发起者携带参数名为id进来，在后台创建记录
    console.log(options)
    var that = this;
    if (options.id != null) {
      this.setData({
        roomid: options.id
      })
      this.createConn(options.id)
    }
    //好友携带参数roomid进来
    if (options.roomid != null) {
      this.setData({
        flag: true,
        roomid: options.roomid
      })
      this.createConn(options.roomid);
    }
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
    if (this.data.pos == 0) {
      this.setData({
        pos: 1
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '你已离开战斗',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../wordPK/wordPK',
            })
          }
        }
      })
    }
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

  },
  bindAbandon: function () {
    this.closeConn();
    wx.switchTab({
      url: '../../pages/index/index',
    })
  },
  startGame: function () {
    var that = this;
    common.getData('updRoomStatus.do', {
      id: this.data.id,
      status: 1
    }).then((res) => {
      if (res.data != 0) {
        that.send()
      }
    })
  }
})