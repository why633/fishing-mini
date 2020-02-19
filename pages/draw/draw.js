import * as store from '../../store/index.js'
import { setData, showToast } from '../../utils/util.js'
Page({
  data: {
    phone: '',
    eventId: ''
  },

  onReady: function (e) {
    let _this = this
    wx.login({
      success (res) {
        console.log(res)
        _this.programLogin(res.code)
      }
    })
  },

  onLoad: function (opt) {
    let eventId = ''
    if (opt.scene) {
      eventId = decodeURIComponent(opt.scene)
    }
    console.log(opt.scene)
    console.log(eventId)
    this.setData({
      eventId: eventId
    })
  },

  onHide () {

  },

  onShow () {

  },
  // 获取手机号
  getPhoneNumber (e) {
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { //用户点击允许
      console.log('fail user deny')
      showToast('授权失败,稍后重试', 'none')
      return
    }
    let _this = this
    wx.login({
      success (res) {
        const params = {
          code: res.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        }
        store.decryptPhone(JSON.stringify(params), (res) => {
          _this.setData({
            phone: res.data.phoneNumber
          })
          wx.navigateTo({
            url: './seat/seat?phone=' + res.data.phoneNumber + '&eventId=' + _this.data.eventId
          })
        })
      }
    })
  },
  // 小程序登录
  programLogin (wxCode) {
    store.programLogin({wxCode: wxCode}, (res) => {
      console.log(res)
      setData('sessionID', res.data.token);
    })
  }
})