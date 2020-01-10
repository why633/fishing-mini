// adaptPadding,
import * as store from '../../../store/index.js'

//获取应用实例
Page({
  data: {
    imgUrls: [
      "../../../assets/banner.jpg"
    ],
    id: null,
    spot: {},
    count: 0,
    application: null,
    currentMoney: 0,
    count: 1,
    time: '',
    user: '',
    events: [],
    articles: [],
    tab: "活动|赛事",
    systemWidth: 0,
    stars: [],
    limit: 10,
    total: 0,
    skip: 1,
    fishCatchPageNo: 1,
    fishCatchTotalCount	: 0,
    infoData: {}
  },
  onReady: function (e) {
    wx.showShareMenu({ withShareTicket: true });
  },
  onLoad: function (opt) {
    const self = this;
    // 钓场信息
    let spotId = opt.id;
    if (opt.scene) {
      spotId = decodeURIComponent(opt.scene)
    }
    this.setData({
      id: spotId
    })
    store.spotInfo({ spotId: spotId }, (res) => {
      const resData = res.data
      this.setData({
        id: resData.id,
        imgUrls: [resData.icon],
        stars: self.stars(resData.star || 0),
        infoData: resData,
        fishes: resData.fishes.split(',')
      })
      self.getEventList()
    })
    
  },
  // 活动、赛事列表
  getEventList () {
    store.searchEventBySpotId({ pageNo: this.data.skip, spotId: this.data.id }, (res) => {
      this.setData({
        events: this.data.events.concat((res.data.list || [])),
        total: res.data.page.totalCount,
        skip: res.data.page.pageNo
      })
    })
  },
  // 获取鱼获列表
  getFishCatch () {
    store.fishCatch({ pageNo: this.data.fishCatchPageNo, spotId: this.data.id  }, (res)=>{
      console.log(res)
      const resData = res.data
      this.setData({
        articles: this.data.articles.concat((resData.list || [])),
        fishCatchTotalCount: resData.page.totalCount,
        fishCatchPageNo: resData.page.pageNo
      });
    })
  },

  tapName: function (event) {
    console.dir(event.currentTarget.dataset.tab);
    let self = this;
    this.setData({ tab: event.currentTarget.dataset.tab, events: [], articles: [], skip: 1 });
    if (event.currentTarget.dataset.tab == '活动|赛事') {
      self.getEventList()
    }
    if (event.currentTarget.dataset.tab == '渔获') {
      this.setData({
        fishCatchPageNo: 1
      })
      self.getFishCatch()
    }
  },
  go (event) {
    wx.navigateTo({
      url: '../../event/eventdetail/eventdetail?id=' + event.currentTarget.dataset.id
    })
  },
  loadMore: function (event) {
    let self = this;
    if (this.data.tab == '活动|赛事') {
      self.setData({
        skip: this.data.skip+1
      });
      self.getEventList()
    }
    if (this.data.tab == '渔获') {
      // store.fishArticle({ spot: this.data.spot._id, skip: self.data.skip + 1, limit: self.data.limit }, (data) => {
      //   self.setData({
      //     articles: self.data.articles.concat((data.articles || [])),
      //     total: data.total,
      //     skip: data.skip
      //   });
      // });
      this.setData({
        fishCatchPageNo: self.data.fishCatchPageNo + 1
      })
      self.getFishCatch()
    }
  },
  backhome () {
    wx.switchTab({
      url: '../../index/index'
    });
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
  onShow () {
    this.setData({
      systemWidth: wx.getSystemInfoSync().windowWidth,
      width: wx.getSystemInfoSync().windowWidth * 0.96 - 20
    })
  }
})