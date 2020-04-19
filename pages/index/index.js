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
    scoreData: {},
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
    let links = ['../event/event', '../score/score', '../sellFish/sellFish', '../branchGame/branchGame'];
    if (links[event.currentTarget.dataset.id]) {
      if (event.currentTarget.dataset.id == 1) {
        // 判断是否授权登录
        if (!getData('sessionID')) {
          wx.showToast({
            title: '请授权登录',
            icon: 'none',
            duration: 1500,
            success: function(){
              setTimeout(function(){
                return wx.switchTab({
                  url: '../me/me'
                })
              }, 1600)
            }
          })
          return
        }
        // 判断是否绑定手机号
        console.log(getData('userInfo'))
        if (!getData('userInfo').phone) {
          wx.showToast({
            title: '请绑定手机',
            icon: 'none',
            duration: 1500,
            complete: function(){
              setTimeout(function(){
                return wx.navigateTo({
                  url: '../me/bind/bind'
                })
              }, 1600)
            }
          })
          return
        }
        wx.navigateTo({
          url: links[event.currentTarget.dataset.id]
        })
      } else if (event.currentTarget.dataset.id == 0) {
        wx.navigateTo({
          url: links[event.currentTarget.dataset.id]
        }) 
      } else {
        return wx.navigateTo({
          url: links[event.currentTarget.dataset.id]
        })
      }
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
        spots: (res.data.list || []).map(x => {
          x.stars = self.stars(x.star);
          return x;
        }),
      });
      console.log(self.data.spots)
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

  createApplication () {
    // 判断是否授权登录
    if (!getData('sessionID')) {
      showToast("登录状态错误，请绑定微信后再试", 'none');
      return wx.switchTab({
        url: '../../me/me'
      })
    }
    // 判断是否绑定手机号
    console.log(getData('userInfo'))
    if (!getData('userInfo').phone) {
      showToast("账户状态错误，请绑定手机再报名", 'none');
      return wx.navigateTo({
        url: '../../me/bind/bind'
      })
    }
  },
  // 获取积分数据
  getScoreInfo () {
    const _this = this
    console.log(getData('userInfo'))
    store.scoreInfo({}, (res) => {
      console.log(res.data)
      res.data.headImg = getData('userInfo').headImg||'/assets/user_icon.png'
      res.data.nickName = getData('userInfo').nickName||'--'
      _this.setData({
        scoreData: res.data
      })
    })
  },
  stars (num) {
    let stars = [];
    let count = 0;
    while (count < 5) {
      if (num - count >= 1) {
        stars.push('/assets/star_full.png');
      } else if (num - count < 1 && num - count > 0) {
        stars.push('/assets/star_half.png');
      } else {
        stars.push('/assets/star_none.png');
      }
      count++;
    }
    return stars;
  },
  goSpotList () {
    return wx.navigateTo({
      url: '../spot/spotlist/spotlist'
    });
  },
  goSpotDetail (e) {
    return wx.navigateTo({
      url: '../spot/spotdetail/spotdetail?id=' + e.currentTarget.dataset.id
    });
  },

  onHide () {

  },

  onShow () {
    this.setData({
      systemWidth: wx.getSystemInfoSync().windowWidth,
      width: wx.getSystemInfoSync().windowWidth * 0.96 - 20
    })
    this.getScoreInfo()
  }
})