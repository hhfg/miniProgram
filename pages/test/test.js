const app = getApp()

Page({
  data: {
    list: [
      {
        title: "标题1",
        text: "内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1",
      },
      {
        title: "标题2",
        text: "内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2",
      },
      {
        title: "标题3",
        text: "内容3",
      },
    ],
    current: -1,
  },
  changeFn(e) {
    let index = e.currentTarget.dataset.index
    let current = -1
    console.log(index)
    if (this.data.current != index) {
      current = index
    }
    this.setData({
      current: current
    })
  }
})
