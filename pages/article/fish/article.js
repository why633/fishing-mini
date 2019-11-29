import { getData, showToast, globalTabindex} from '../../../utils/util.js'
import conf from "../../../config.js";
// adaptPadding,
import * as store from '../../../store/index.js'
import moment from '../../../utils/moment.js'
const WxParse = require('../../../wxParse/wxParse.js');
const app = getApp()
//获取应用实例
Page({
  data: {
    id:'',
    article: {},
    disabled: false,
    isfan: false
  },
  onReady: function (e) {
    let self = this;
   
  },
  bindKeyInput(e) {
    this.setData({ mark: e.detail.value });
  },

  onLoad: function(opts) {
    let { article="5d624712019c0300068b8aa5" } = opts;
    this.setData({ id: article })
    let self = this;
    store.getFishArticle({ article, user: app.globalData.user ?  app.globalData.user._id: null  }, (data) => {
      self.setData({
          article: data.article
      });
    });
    if(getData('sessionID')) {
      store.isFan({ targetUser: (this.data.article.user && this.data.article.user._id) ? this.data.article.user._id : this.data.article.user }, (data) => {
        self.setData({
            isfan: data.relation ? true : false
        });
      });
    }
  },
  favor() {
    showToast("开发中，敬请期待","none");
  },
  onHide() {
   
  },
  backhome() {
    wx.switchTab({
      url: '../../index/index'
    });
  },
  onShow() {
      let self = this;
  }
})