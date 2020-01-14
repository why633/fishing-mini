import { getData, showToast, globalTabindex } from '../../utils/util.js'
import conf from "../../config.js";
// adaptPadding,
import * as store from '../../store/index.js'
import moment from '../../utils/moment.js'

const app = getApp()
//获取应用实例
Page({
  data: {
    imgUrls: [
      "../../assets/banner.jpg"
    ],
    autoplay: true,
    interval: 5000,
    adinterval: 5000,
    duration: 1000,
    systemWidth: 0,
    inputValue: '',
    tabArticles: [],
    events: [],
    spots: [],
    tab: '热门资讯',
    limit: 10,
    total: 0,
    skip: 1,
    width: 0,
    tabs: []
  },

  onReady: function (e) {
    wx.showShareMenu({ withShareTicket: true });
  },

  go (event) {
    //let article = event.currentTarget.dataset.id;
    return wx.navigateTo({
      url: '../article/normal/article?id=' + event.currentTarget.dataset.id
    })
  },

  swiperNav (event) {
    console.dir(event);
    let type = event.currentTarget.dataset.type;
    let id = event.currentTarget.dataset.id;
    let url = null;

    // type 1：钓场，2：活动，3：赛事，4：文章
    if (type == '2' || type == '3') {
      url = '../event/eventdetail/eventdetail?id=' + id
    }
    if (type == '1') {
      url = '../spot/spotdetail/spotdetail?id=' + id
    }
    if (type == '4') {
      url = '../article/normal/article?id=' + id
    }
    if (url) {
      return wx.navigateTo({
        url
      });
    } else {
      showToast("开发中，敬请期待", "none");
    }
  },

  goEvent (event) {
    return wx.navigateTo({
      url: '../event/eventdetail/eventdetail?id=' + event.currentTarget.dataset.id
    })
  },

  goSpot (event) {
    return wx.navigateTo({
      url: '../spot/spotdetail/spotdetail?id=' + event.currentTarget.dataset.id
    })
  },

  link (event) {
    let links = ['../event/event', undefined, '../spot/spotlist/spotlist', undefined];
    if (links[event.currentTarget.dataset.id]) {
      if (event.currentTarget.dataset.id == 0) wx.switchTab({
        url: links[event.currentTarget.dataset.id]
      })
      else return wx.navigateTo({
        url: links[event.currentTarget.dataset.id]
      })
    } else {
      showToast("开发中，敬请期待", 'none')
    }
  },

  tapName: function (event) {
    console.dir(event.currentTarget.dataset.tab);
    let self = this;
    this.setData({ tab: event.currentTarget.dataset.tab, tabArticles: [] });
    // this.setData({ tab: event.currentTarget.dataset.tab });
    store.article({ order: this.data.tab == '热门资讯' ? 'hot' : 'time', pageNo: 1 }, (res) => {
      self.setData({
        tabArticles: self.data.tabArticles.concat((res.data.list || [])),
        total: res.data.page.totalCount,
        skip: res.data.page.pageNo
      })
    })
  },

  loadMore: function (event) {
    let self = this;
    store.article({ order: this.data.tab == '热门资讯' ? 'hot' : 'time', pageNo: self.data.skip + 1 }, (res) => {
      self.setData({
        tabArticles: self.data.tabArticles.concat((res.data.list || [])),
        total: res.data.page.totalCount,
        skip: res.data.page.pageNo
      })
    })
  },

  onLoad: function () {
    const self = this;
    store.swipers((data) => {
      self.setData({
        // imgUrls: (data.swipers || []),
        // events: (data.events || [])
      });
    });
    // 顶部轮播数据获取
    store.swiperData({ bannerType: 1 }, (res) => {
      self.setData({
        imgUrls: (res.data || []),
      })
    })
    // 热门赛事活动轮播数据获取
    store.searchEvent({ areaId: 110100, pageNo: 1, pageSize: 8 }, (res) => {
      console.log(res)
      self.setData({
        events: self.data.events.concat((res.data.list || []))
      })
    })
    // 热门钓场轮播数据获取
    store.hotSpot({ areaId: 110100, pageSize: 6 }, (res) => {
      self.setData({
        spots: (res.data.list || [])
      });
    })
    // 获取资讯列表
    store.article({ order: this.data.tab == '热门资讯' ? 'hot' : 'time' }, (res) => {
      self.setData({
        tabArticles: self.data.tabArticles.concat((res.data.list || [])),
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