Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchArray: [{
      name: "海南省",
      id: "01",
      child: [{
        id: "01-1",
        name: "郑州"
      }, {
        id: "01-2",
        name: "开封"
      }, {
        id: "01-3",
        name: "开封3"
      }]
    }, {
      name: "河南",
      id: "02",
      child: [{
        id: "02-1",
        name: "郑州1"
      }, {
        id: "01-2",
        name: "开封1"
      }]
    }]
  },
  showList(e) {
    let index = 0;
    let arrayItem = this.data.searchArray;//获取循环数组对象
    for (let item of arrayItem) {
      //如果当前点击的对象id和循环对象里的id一致
      if (item.id == e.currentTarget.dataset.id) {
        //判断当前对象中的isShow是否为true（true为显示，其他为隐藏） 
        if (arrayItem[index].isShow == "" || arrayItem[index].isShow == undefined) {
          arrayItem[index].isShow = "true"
        } else {
          arrayItem[index].isShow = ""
        }
      }
      index++;
    }
    //将数据动态绑定 
    this.setData({
      searchArray: arrayItem
    })
  },
  onLoad: function (options) {

  }
})