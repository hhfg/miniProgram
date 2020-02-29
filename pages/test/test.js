const date=new Date()
const years=[]
const months=[]
const days=[]
const bigMonth=[1,3,5,7,8,10,12]
for(let i=1990;i<=date.getFullYear();i++){
  years.push(i)
}
for(let i=1;i<=12;i++){
  months.push(i)
}
for(let i=1;i<=31;i++){
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    years:years,
    year:date.getFullYear(),
    months:months,
    month:2,
    days:days,
    day:2,
    year:date.getFullYear(),
    value:[9999,1,1]
  },
  showToask:function(){
    wx.showToast({
      title: '成功',
      icon:'success',
      duration:2000
    })
  },
  contains:function(arr,obj){
    var i=arr.length;
    while(i--){
      if(arr[i]==obj){
        return true;
      }
    }
  },
  setDays:function(day){
    const temp=[];
    for(let i=1;i<=day;i++){
      temp.push(i)
    }
    this.setData({
      days:temp,
    })
  },
  showLoading:function(){
    wx.showLoading({
      title: '加载中...',
    }),setTimeout(function(){
      wx.hideLoading()
    },2000)
  },
  bindChange:function(e){
    const val=e.detail.value;
    const setYear=this.data.years[val[0]];
    const setMonth = this.data.months[val[1]];
    const setDay = this.data.days[val[2]];
    // 闰年
    if(setMonth==2){
      if ((setYear % 4 == 0 && setYear % 100 != 0)||setYear%400==0){
        //闰年
        this.setDays(29);
      }else{
        this.setDays(28);
      }
    } else {
      if (this.contains(bigMonth, setMonth)) {
        this.setDays(31)
      } else {
        this.setDays(30)
      }
    }
    this.setData({
      year:setYear,
      month:setMonth,
      day:setDay
    })
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
    
  }
})