import { setData, getData, showToast, globalTabindex } from '../../../utils/util.js'
import conf from "../../../config.js";
// adaptPadding,
import * as store from '../../../store/index.js'
import moment from '../../../utils/moment.js'

const app = getApp()
//获取应用实例
Page({
  data: {
    walletData: {}
  },

  onReady: function (e) {
  },

  onLoad: function (opt) {
    if (!getData('sessionID')) {
      showToast("登录状态错误，请绑定微信后再试", 'none');
      return wx.navigateBack()
    }
    this.walletInfo()
  },

  goDownloadApp () {
    wx.navigateTo({
      url: '../../download/download'
    })
  },

  walletInfo () {
    store.walletInfo({}, (res) => {
      console.log(res.data)
      this.setData({
        walletData: res.data
      })
    })
  },

  onHide () {

  },

  onShow () {
  }
})