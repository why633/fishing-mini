// adaptPadding,
import * as store from '../../../store/index.js'
//获取应用实例
Page({
  data: {
    systemWidth: 0,
    spots: [],
    tab: 'game',
    inputValue: '',
    limit: 10,
    total: 0,
    skip: 1,
    width: 0
  },

  onReady: function (e) {
    wx.showShareMenu({ withShareTicket: true });
  },


  go (e) {
    return wx.navigateTo({
      url: '../spotdetail/spotdetail?id=' + e.currentTarget.dataset.id
    });
  },

  query: function (event) {
    var self = this;
    this.setData({ spots: [] });
    store.getSpotList({ searchType: '1', key: this.data.inputValue, pageNo: 1, pageSize: self.data.limit }, (res) => {
      console.log(res)
      self.setData({
        spots: self.data.spots.concat((res.data.list || [])).map(x => {
          x.stars = self.stars(x.star);
          return x;
        }),
        total: res.data.page.totalCount,
        skip: res.data.page.pageNo + 1
      })
    })
    // store.spotList({ spotName: this.data.inputValue || '', pageNo: 1, pageSize: self.data.limit }, (res) => {
    //   console.log(res)
    //   self.setData({
    //     spots: self.data.spots.concat((res.data.list || [])).map(x => {
    //       x.stars = self.stars(x.star);
    //       return x;
    //     }),
    //     total: res.data.page.totalCount,
    //     skip: res.data.page.pageNo
    //   })
    // })
  },

  inputBind: function (event) {
    this.setData({
      inputValue: event.detail.value
    })
  },

  loadMore: function (event) {
    let self = this;
    store.getSpotList({ searchType: '1', key: this.data.inputValue, pageNo: self.data.skip, pageSize: self.data.limit }, (res) => {
      console.log(res)
      self.setData({
        spots: self.data.spots.concat((res.data.list || [])).map(x => {
          x.stars = self.stars(x.star);
          return x;
        }),
        total: res.data.page.totalCount,
        skip: res.data.page.pageNo + 1
      })
    })
    // store.spotList({ spotName: this.data.inputValue || '', pageNo: self.data.skip + 1, pageSize: self.data.limit }, (res) => {
    //   console.log(res)
    //   self.setData({
    //     spots: self.data.spots.concat((res.data.list || [])).map(x => {
    //       x.stars = self.stars(x.star);
    //       return x;
    //     }),
    //     total: res.data.page.totalCount,
    //     skip: res.data.page.pageNo
    //   })
    // })
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

  onLoad: function () {
    const self = this;
    store.getSpotList({ searchType: '1', pageNo: self.data.skip, pageSize: self.data.limit }, (res) => {
      console.log(res)
      self.setData({
        spots: self.data.spots.concat((res.data.list || [])).map(x => {
          x.stars = self.stars(x.star);
          return x;
        }),
        total: res.data.page.totalCount,
        skip: res.data.page.pageNo + 1
      })
    })
    // store.spotList({ pageNo: self.data.skip, pageSize: self.data.limit }, (res) => {
    //   console.log(res)
    //   self.setData({
    //     spots: self.data.spots.concat((res.data.list || [])).map(x => {
    //       x.stars = self.stars(x.star);
    //       return x;
    //     }),
    //     total: res.data.page.totalCount,
    //     skip: res.data.page.pageNo
    //   })
    // })
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