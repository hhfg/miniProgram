// pages/books/books.js
const app = getApp();
const common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookname:'', //之前已选中的书
    mybook:app.globalData.mybook,
    type:[],
    current:-1,
    num:0
  },
  //点击了某种类型
  bindClick:function(e){
    var that=this;
    // 当前点击的index
    let index = e.currentTarget.dataset.index;
    let current = -1
    // 设置current==index，显示view
    if (this.data.current != index) {
      current = index
    }
    this.setData({
      current: current
    })
  },
  //点击更换书
  bindChangeIt:function(e){
    console.log(e.currentTarget.dataset.typeid)
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定选择此书吗',
      success(res){
        //用户点击了确定
        if(res.confirm){    
          //调用函数将用户名和点击的书名的id传过去      
          that.setMyBook(e.currentTarget.dataset.bookname, e.currentTarget.dataset.id,e.currentTarget.dataset.num);
        }else{
          console.log("用户选择了取消")
        }
      }
    })
    this.onShow();
  },
  //设置我选择的词书
  setMyBook:function(bookname,id,num){
    var that=this;
    //向后台发送请求
    common.sendRequest("setMyBook.do",{
      nickName: app.globalData.userInfo.nickName,
      bookid:id
      }).then((res)=>{
        //返回1表示更新数据成功
        if(res==1){
          //更新mybook
          that.setData({
            'mybook.bookName':bookname,
            'mybook.wordNum':num
          })
          console.log(that.data.mybook)
          app.globalData.mybook=that.data.mybook
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000,
            success:function(){
              setTimeout(function(){
                wx.navigateTo({
                  url: '../learningPlan/learningPlan',
                },1000);
              })
            }
          })
        }
        //否则设置失败
        else{
          wx.showToast({
            title: '设置失败，请重新选择',
            icon: 'none',
            duration: 1000
          })
        }
      }).catch((res)=>{
        console.log(res)
        wx.showModal({
          title: '加载数据失败',
          content: '请检查网络连接',
          showCancel: false,
        })
      })
  },
  //加载页面数据
  loadingData: function () {
    var that = this;
    return new Promise(function(resolve,reject){
      common.sendRequest("selAllType.do", {}).then((res) => {
        that.setData({
          type: res
        })
        resolve(true)
      }).catch((res) => {
        reject(false)
        console.log(res)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.loadingData()
    var that=this;
    that.loadingData();

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
    this.setData({
      mybook:app.globalData.mybook
    })
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