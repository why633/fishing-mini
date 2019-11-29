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
    title: '我是标题',
    date: '2018-09-09 12:00',
    times:  0,
    width: '70%',
    mark: '',
    marks: []
  },
  onReady: function (e) {
    let self = this;
   
  },
  bindKeyInput(e) {
    this.setData({ mark: e.detail.value });
  },

  onLoad: function(opts) {
    let { article } = opts;
    this.setData({ id: article })
    let self = this;
    store.getArticle({ article }, (data) => {
      let { title, content, createdAt, marks=[],times=0 } = data.article;
      WxParse.wxParse('article', 'html', content, self, 5);
      self.setData({
          times,
          title,
          date: moment(createdAt).format('YYYY-MM-DD HH:mm')
      });
    });
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