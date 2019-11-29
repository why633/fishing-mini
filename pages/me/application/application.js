import { getData, showToast, globalTabindex} from '../../../utils/util.js'
import conf from "../../../config.js";
// adaptPadding,
import * as store from '../../../store/index.js'
import moment from '../../../utils/moment.js'

const app = getApp()
//获取应用实例
Page({
  data: {
    applications:[],
    events:[],
    tab: '未付款',
    limit: 10,
    total: 0,
    skip: 0,
    width:0,
    systemWidth: 0
  },

  onReady: function (e) {
    wx.showShareMenu ({withShareTicket: true});
  },

  onLoad: function(opt) {
    const self = this;
    store.getApplication({ status: '未付款' },(data) => {
        self.setData({
          applications: self.data.applications.concat((data.applications || [])),
          total: data.total,
          skip: data.skip
        })
    });
  },

  tapName:function (event) {
    console.dir(event.currentTarget.dataset.tab);
    let self = this;
    this.setData({ tab: event.currentTarget.dataset.tab, applications: [] });
    store.getApplication({ status: event.currentTarget.dataset.tab, skip:0, limit: self.data.limit },(data) => {
        self.setData({
          applications: self.data.applications.concat((data.applications || [])),
          total: data.total,
          skip: data.skip
        })
      });
  },

  go(event) {
    wx.navigateTo({
      url: '../applicationdetail/applicationdetail?id=' + event.currentTarget.dataset.id
    }) 
  },
 
  onHide() {
   
  },

  onShow() {
    this.setData({
      systemWidth: wx.getSystemInfoSync().windowWidth,
      width: wx.getSystemInfoSync().windowWidth * 0.96 - 20
    })
  }
})