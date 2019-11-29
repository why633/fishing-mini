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
    articles:[],
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

  loadMore:function (event) {
    let self = this;
    store.fishArticle({ skip: self.data.skip + 1, limit: self.data.limit },(data) => {
        self.setData({
          articles: self.data.articles.concat((data.articles || [])),
          total: data.total,
          skip: data.skip
      });
    });
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

  onLoad: function() {
    const self = this;
    store.spotSwipers((data) => {
      self.setData({
        imgUrls: (data.swipers || [])
      });
    });
    store.fishArticle({ skip:0, limit: self.data.limit },(data) => {
        self.setData({
          articles: self.data.articles.concat((data.articles || [])),
          total: data.total,
          skip: data.skip
        })
    });
  },

  goSpot() {
    return wx.navigateTo({
      url: './spotlist/spotlist'
    });
  },

  goEvent() {
    return wx.switchTab({
      url: '../event/event'
    });
  },

  go(event) {
     return wx.navigateTo({
      url: '../article/fish/article?article=' + event.currentTarget.dataset.id
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