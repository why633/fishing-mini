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
    articles: [],
    events: [],
    spots: [],
    tab: '最热',
    limit: 10,
    total: 0,
    skip: 1,
    width: 0,
    tabs: []
  },

  onReady: function (e) {
    wx.showShareMenu({ withShareTicket: true });
  },

  loadMore: function (event) {
    let self = this;
    store.fishCatch({ pageNo: this.data.skip + 1, pageSize: this.data.limit, spotId: 1 }, (res) => {
      console.log(res)
      self.setData({
        articles: self.data.articles.concat((res.data.list || [])),
        total: res.data.page.totalCount,
        skip: res.data.page.pageNo,
      })
    })
  },

  swiperNav (event) {
    console.dir(event);
    let type = event.currentTarget.dataset.type;
    let id = event.currentTarget.dataset.id;
    let url = '../spot/spotdetail/spotdetail?id=' + id;
    if (url) {
      return wx.navigateTo({
        url
      });
    } else {
      showToast("开发中，敬请期待", "none");
    }
  },

  onLoad: function () {
    const self = this;
    store.fishCatch({ pageNo: this.data.skip, pageSize: this.data.limit, spotId: 1 }, (res) => {
      console.log(res)
      self.setData({
        articles: self.data.articles.concat((res.data.list || [])),
        total: res.data.page.totalCount,
        skip: res.data.page.pageNo,
      })
    })

    // 热门钓场数据获取
    store.hotSpot({ areaId: 110100, pageSize: 6 }, (res) => {
      console.log(res)
      self.setData({
        imgUrls: (res.data.list || [])
      });
    })
  },

  goSpot () {
    return wx.navigateTo({
      url: './spotlist/spotlist'
    });
  },

  goEvent () {
    return wx.switchTab({
      url: '../event/event'
    });
  },

  go (event) {
    return wx.navigateTo({
      url: '../article/fish/article?article=' + event.currentTarget.dataset.id
    });
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