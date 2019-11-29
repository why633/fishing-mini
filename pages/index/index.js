import { getData, showToast, globalTabindex} from '../../utils/util.js'
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
    tabArticles:[],
    events:[],
    spots:[],
    tab: '最热',
    limit: 10,
    total: 0,
    skip: 0,
    width:0,
    tabs:[]
  },

  onReady: function (e) {
    wx.showShareMenu ({withShareTicket: true});
  },

  go(event) {
    //let article = event.currentTarget.dataset.id;
    return wx.navigateTo({
      url: '../article/normal/article?article=' + event.currentTarget.dataset.id
    })
  },

  swiperNav(event) {
    console.dir(event);
    let type = event.currentTarget.dataset.type;
    let id = event.currentTarget.dataset.id;
    let url = null;
    if(type == 'activity' || type == 'game') {
      url = '../event/eventdetail/eventdetail?id=' + id
    }
    if(type == 'spot') {
      url = '../spot/spotdetail/spotdetail?id=' + id
    }
    if(type == 'article') {
      url = '../article/normal/article?article=' + id
    } 
    if(url) {
      return wx.navigateTo({
        url
      });
    } else {
      showToast("开发中，敬请期待","none");
    }
  },

  goEvent(event) {
     return wx.navigateTo({
      url: '../event/eventdetail/eventdetail?id=' + event.currentTarget.dataset.id
    })
  },

  goSpot(event) {
     return wx.navigateTo({
      url: '../spot/spotdetail/spotdetail?id=' + event.currentTarget.dataset.id
    })
  },

  link(event) {
    let links = ['../event/event', undefined, '../spot/spotlist/spotlist', undefined];
    if(links[event.currentTarget.dataset.id]) {
      if(event.currentTarget.dataset.id == 0) wx.switchTab({
        url: links[event.currentTarget.dataset.id]
      })
      else return wx.navigateTo({
        url: links[event.currentTarget.dataset.id]
      })
    } else {
      showToast("开发中，敬请期待", 'none')
    }
  },
 
  tapName:function (event) {
    console.dir(event.currentTarget.dataset.tab);
    let self = this;
    this.setData({ tab: event.currentTarget.dataset.tab, tabArticles: [] });
    store.tabArticle({ tab:event.currentTarget.dataset.tab, skip:0, limit: self.data.limit },(data) => {
        self.setData({
          tabArticles: self.data.tabArticles.concat((data.articles || [])),
          total: data.total,
          skip: data.skip
        })
      });
  },

  loadMore:function (event) {
    let self = this;
    store.tabArticle({ tab:this.data.tab, skip: self.data.skip + 1, limit: self.data.limit },(data) => {
        self.setData({
          tabArticles: self.data.tabArticles.concat((data.articles || [])),
          total: data.total,
          skip: data.skip
      });
    });
  },

  onLoad: function() {
    const self = this;
    store.swipers((data) => {
      self.setData({
        imgUrls: (data.swipers || []),
        events: (data.events || []),
        spots:(data.spots || [])
      });
    });
    store.tabArticle({ tab: this.data.tab, skip:0, limit: self.data.limit },(data) => {
        self.setData({
          tabArticles: self.data.tabArticles.concat((data.articles || [])),
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