import { getData, showToast, globalTabindex} from '../../../utils/util.js'
import conf from "../../../config.js";
// adaptPadding,
import * as store from '../../../store/index.js'
import moment from '../../../utils/moment.js'

const app = getApp()
//获取应用实例
Page({
  data: {
    imgUrls: [
      "../../../assets/banner.jpg"
    ],
    id:null,
    spot:{},
    count: 0,
    application:null,
    currentMoney:0,
    count: 1,
    time: '',
    user: '',
    events:[],
    articles:[],
    tab:"活动|赛事",
    systemWidth: 0,
    eventCount:0,
    applicationCount:0,
    favorCount:0,
    stars:[],
    limit: 10,
    total: 0,
    skip: 0,
  },
  onReady: function (e) {
    wx.showShareMenu ({withShareTicket: true});
  },
  onLoad: function(opt) {
    let { id="5d244606ba79a10006726961", scene } = opt;
    if(scene) id = scene;
    this.setData({ id });
    const self = this;
    store.getSpotInfo({ id },(data) => {
        self.setData({
          spot: data.spot,
          imgUrls: data.spot.posters || [],
          stars: self.stars(data.spot.star || 0),
          eventCount: data.eventCount || 0,
          applicationCount: data.applicationCount || 0,
          favorCount: data.favorCount || 0
        })
    });
    store.getEvent({ spot: id, skip: 0, limit: self.data.limit },(data) => {
        self.setData({
          events: self.data.events.concat((data.events || [])),
          total: data.total,
          skip: data.skip
        });
    });
  },

  tapName:function (event) {
    console.dir(event.currentTarget.dataset.tab);
    let self = this;
    this.setData({ tab: event.currentTarget.dataset.tab, events: [], articles:[] });
    if(event.currentTarget.dataset.tab == '活动|赛事') {
      store.getEvent({ spot: this.data.spot._id, skip: 0, limit: self.data.limit },(data) => {
        self.setData({
          events: self.data.events.concat((data.events || [])),
          total: data.total,
          skip: data.skip
        });
      });
    }
    if(event.currentTarget.dataset.tab == '渔获') {
      store.fishArticle({  spot: this.data.spot._id, skip: 0, limit: self.data.limit },(data) => {
        self.setData({
          articles: self.data.articles.concat((data.articles || [])),
          total: data.total,
          skip: data.skip
        });
      });
    }
  },
  go(event) {
    wx.navigateTo({
      url: '../../event/eventdetail/eventdetail?id=' + event.currentTarget.dataset.id
    })
  },
  loadMore:function (event) {
    let self = this;
    if(this.data.tab == '活动|赛事') {
       store.getEvent({ spot: this.data.spot._id, skip: self.data.skip + 1, limit: self.data.limit },(data) => {
        self.setData({
          events: self.data.events.concat((data.events || [])),
          total: data.total,
          skip: data.skip
        });
      });
    }
    if(this.data.tab ==  '渔获') {
      store.fishArticle({ spot: this.data.spot._id, skip: self.data.skip + 1, limit: self.data.limit },(data) => {
        self.setData({
          articles: self.data.articles.concat((data.articles || [])),
          total: data.total,
          skip: data.skip
        });
      });
    }
  },
  backhome() {
    wx.switchTab({
      url: '../../index/index'
    });
  },

  stars(num) {
    let stars = [];
    let count = 0;
    while(count < 5) {
      if(num - count >= 1) {
        stars.push('/assets/star_full.png');
      } else if (num - count < 1 && num - count > 0) {
        stars.push('/assets/star_half.png');
      } else {
        stars.push('/assets/star_none.png');
      }
      count ++;
    }
    return stars;
  },
  onShow() {
    this.setData({
      systemWidth: wx.getSystemInfoSync().windowWidth,
      width: wx.getSystemInfoSync().windowWidth * 0.96 - 20
    })
  }
})