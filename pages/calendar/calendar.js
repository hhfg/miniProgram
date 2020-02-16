// pages/calendar/calendar.js
const conf = {
  data: {
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant'
    }
  },
  doSomeThing() {
    // 调用日历方法
    this.calendar.enableArea(['2018-10-7', '2018-10-28']);
  }
};
Page(conf);