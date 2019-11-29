import { getData, showToast, globalTabindex} from '../../utils/util.js'
import conf from "../../config.js";
// adaptPadding,
import * as store from '../../store/index.js'
import moment from '../../utils/moment.js'

const app = getApp()
const WEEKS = ['日','一','二','三','四','五','六'];
//获取应用实例
Page({
  data: {
    systemWidth: 0,
    events:[],
    tab: 'game',
    limit: 10,
    total: 0,
    skip: 0,
    width:0,
    weeks:[],
    day: moment().format('YYYYMMDD')
  },

  onReady: function (e) {
    let cc = 0;
    let weeks = [];

    while(cc < 7) {
      let temp  = moment().add(cc,'days')
      let d = temp.format('YYYYMMDD');
      weeks.push({
        key: d,
        date: '周' + WEEKS[temp.day()],
        month: ''
      });
      cc++;
    }
    this.setData({ weeks })
    wx.showShareMenu ({withShareTicket: true});
  },

  tapType:function (event) {
    console.dir(event.currentTarget.dataset.tab);
    let self = this;
    this.setData({ tab: event.currentTarget.dataset.tab, events: [] });
    store.getEvent({ type:event.currentTarget.dataset.tab, day: this.data.day, skip:0, limit: self.data.limit },(data) => {
        self.setData({
          events: self.data.events.concat((data.events || [])),
          total: data.total,
          skip: data.skip
        })
      });
  },

  go(e) {
    return wx.navigateTo({
      url: './eventdetail/eventdetail?id=' + e.currentTarget.dataset.id
    });
  },
  
  tapDay:function (event) {
    console.dir(event.currentTarget.dataset.day);
    let self = this;
    this.setData({ day: event.currentTarget.dataset.day, events: [] });
    store.getEvent({ type: this.data.tab, day: event.currentTarget.dataset.day, skip:0, limit: self.data.limit },(data) => {
        self.setData({
          events: self.data.events.concat((data.events || [])),
          total: data.total,
          skip: data.skip
        })
      });
  },




  loadMore:function (event) {
    let self = this;
    store.getEvent({ type: this.data.tab, day: this.data.day, skip: self.data.skip + 1, limit: self.data.limit },(data) => {
        self.setData({
          events: self.data.events.concat((data.events || [])),
          total: data.total,
          skip: data.skip
      });
    });
  },

  onLoad: function() {
    const self = this;
    store.spotSwipers((data) => {
      self.setData({
        imgUrls: (data.swipers || [])
      });
    });
    store.getEvent({ type: this.data.tab, day: this.data.day, skip:0, limit: self.data.limit },(data) => {
        self.setData({
          events: self.data.events.concat((data.events || [])),
          total: data.total,
          skip: data.skip
        })
    });
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