import { getData, showToast, globalTabindex } from '../../../utils/util.js'
import conf from "../../../config.js";
// adaptPadding,
import * as store from '../../../store/index.js'
import moment from '../../../utils/moment.js'

const app = getApp()
//获取应用实例
Page({
  data: {
    applications: [],
    events: [],
    tab: '未付款',
    pageSize: 10,
    total: 0,
    pageNo: 1,
    width: 0,
    systemWidth: 0
  },

  onReady: function (e) {
    wx.showShareMenu({ withShareTicket: true });
  },

  onLoad: function (opt) {
    const self = this;
    store.applicationList({ payStatus: '1', pageSize: self.data.pageSize, pageNo: self.data.pageNo }, (data) => {
      console.log(data)
      self.setData({
        applications: self.data.applications.concat((data.data || [])),
        total: data.data.length
      })
    });
  },

  tapName: function (event) {
    console.dir(event.currentTarget.dataset.tab);
    let self = this;
    this.setData({ tab: event.currentTarget.dataset.tab == '未付款' ? '1' : '2', applications: [] });
    store.applicationList({ payStatus: self.data.tab, pageNo: self.data.pageNo, pageSize: self.data.pageSize }, (data) => {
      self.setData({
        applications: self.data.applications.concat((data.data || [])),
        total: data.data.length
      })
    });
  },

  go (event) {
    wx.navigateTo({
      url: '../applicationdetail/applicationdetail?id=' + event.currentTarget.dataset.id
    })
  },

  onHide () {

  },
  onReachBottom () {
    this.setData({
      pageNo: this.data.pageNo + 1
    })
    store.applicationList({ payStatus: event.currentTarget.dataset.tab, pageNo: self.data.pageNo, pageSize: self.data.pageSize }, (data) => {
      self.setData({
        applications: self.data.applications.concat((data.data || [])),
        total: data.data.length
      })
    })
  },

  onShow () {
    this.setData({
      systemWidth: wx.getSystemInfoSync().windowWidth,
      width: wx.getSystemInfoSync().windowWidth * 0.96 - 20
    })
  }
})