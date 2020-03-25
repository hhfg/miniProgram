Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseEnFlag:false,
    spellEnFlag:false,
    chooseCNFlag:true,
    reviewWord:{
      word:'spite',
      us_pron:'美 [spaɪt] ',
      uk_mp3: 'https://dictionary.blob.core.chinacloudapi.cn/media/audio/tom/f9/92/F99234157F7B58FD690C17D037A9A033.mp3',
      choose:[
        'n.怨恨,恶意;v.故意使烦恼,存心使苦恼;',
        'adv.主要地,根本地;',
        'n.挫折,阻碍;',
        'v.抑制,阻止,控制,约束（自己）;'
      ],
      explanation:'n.怨恨,恶意;v.故意使烦恼,存心使苦恼;'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  },
  pronouncePlayUS:function(event){
    var url = event.currentTarget.dataset.url
    //url = url.substring(1, url.length - 1)
    this.play(url)
    console.log("play")
  },
  //播放音频
  play: function (url) {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = url
    innerAudioContext.onPlay(() => {
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
})