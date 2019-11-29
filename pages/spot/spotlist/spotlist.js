import { getData, showToast, globalTabindex} from '../../../utils/util.js'
import conf from "../../../config.js";
// adaptPadding,
import * as store from '../../../store/index.js'
import moment from '../../../utils/moment.js'

const app = getApp()
//获取应用实例
Page({
  data: {
    systemWidth: 0,
    spots:[],
    tab: 'game',
    inputValue:'',
    limit: 10,
    total: 0,
    skip: 0,
    width:0
  },

  onReady: function (e) {
    wx.showShareMenu ({withShareTicket: true});
  },


  go(e) {
    return wx.navigateTo({
      url: '../spotdetail/spotdetail?id=' + e.currentTarget.dataset.id
    });
  },
  
  query: function(event) {
    var self = this;
    this.setData({ spots: [] });
    store.search({ tab: 'spot', key: this.data.inputValue || '', skip: 0, limit: self.data.limit },(data) => {
        self.setData({
          spots: self.data.spots.concat((data.data || [])).map(x => {
            x.stars = self.stars(x.star);
            return x;
          }),
          total: data.total,
          skip: data.skip
      });
    });
  },

  inputBind: function(event) {
    this.setData({
        inputValue: event.detail.value
    })
  },

  loadMore:function (event) {
    let self = this;
    store.search({ tab: 'spot', key: this.data.inputValue, skip: self.data.skip + 1, limit: self.data.limit },(data) => {
        self.setData({
          spots: self.data.spots.concat((data.data || [])).map(x => {
            x.stars = self.stars(x.star);
            return x;
          }),
          total: data.total,
          skip: data.skip
      });
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

  onLoad: function() {
    const self = this;
    store.search({ tab: 'spot', skip:0, limit: self.data.limit },(data) => {
        self.setData({
          spots: self.data.spots.concat((data.data || [])).map(x => {
            x.stars = self.stars(x.star);
            return x;
          }),
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