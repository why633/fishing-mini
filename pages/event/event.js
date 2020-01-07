import { getData, showToast, globalTabindex } from '../../utils/util.js'
import conf from "../../config.js";
// adaptPadding,
import * as store from '../../store/index.js'
import moment from '../../utils/moment.js'

const app = getApp()
const WEEKS = ['日', '一', '二', '三', '四', '五', '六'];
//获取应用实例
Page({
  data: {
    systemWidth: 0,
    events: [],
    tab: '2',
    limit: 10,
    total: 0,
    skip: 1,
    width: 0,
    weeks: [],
    day: moment().format('YYYYMMDD')
  },

  onReady: function (e) {
    let cc = 0;
    let weeks = [];

    while (cc < 7) {
      let temp = moment().add(cc, 'days')
      let d = temp.format('YYYYMMDD');
      weeks.push({
        key: d,
        date: '周' + WEEKS[temp.day()],
        month: ''
      });
      cc++;
    }
    this.setData({ weeks })
    console.log('ready')
    wx.showShareMenu({ withShareTicket: true });
  },

  tapType: function (event) {
    let self = this;
    this.setData({ tab: event.currentTarget.dataset.tab, events: [] });
    store.searchEvent({ areaId: 110100, type: this.data.tab, pageNo: 1, day: this.data.day }, (res) => {
      self.setData({
        events: self.data.events.concat((res.data.list || [])),
        total: res.data.page.totalCount,
        skip: res.data.page.pageNo
      })
    })
  },

  go (e) {
    console.log(e.currentTarget.dataset)
    return wx.navigateTo({
      url: './eventdetail/eventdetail?event=' + JSON.stringify(e.currentTarget.dataset.event)
    });
  },

  tapDay: function (event) {
    console.log(event.currentTarget.dataset)
    let self = this;
    this.setData({ day: event.currentTarget.dataset.day, events: [] });
    store.searchEvent({ areaId: 110100, type: this.data.tab, pageNo: 1, day: event.currentTarget.dataset.day }, (res) => {
      self.setData({
        events: self.data.events.concat((res.data.list || [])),
        total: res.data.page.totalCount,
        skip: res.data.page.pageNo
      })
    })
  },

  loadMore: function (event) {
    let self = this;
    store.searchEvent({ areaId: 110100, type: this.data.tab, pageNo: self.data.skip + 1, day: this.data.day }, (res) => {
      console.log(res)
      self.setData({
        events: self.data.events.concat((res.data.list || [])),
        total: res.data.page.totalCount,
        skip: res.data.page.pageNo
      })
    })
  },

  onLoad: function () {
    const self = this;
    store.searchEvent({ areaId: 110100, type: this.data.tab, pageNo: 1, day: this.data.day }, (res) => {
      console.log(res)
      self.setData({
        events: self.data.events.concat((res.data.list || [])),
        total: res.data.page.totalCount,
        skip: res.data.page.pageNo
      })
    })
  },

  onHide () {

  },

  onShow () {
    this.setData({
      systemWidth: wx.getSystemInfoSync().windowWidth,
      width: wx.getSystemInfoSync().windowWidth * 0.96 - 20
    })
  }
})