import * as store from '../../store/index.js'
import { setData } from '../../utils/util.js'
Page({
  data: {
    phone: ''
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

  onLoad: function () {

  },

  onHide () {

  },

  onShow () {

  },
  // 获取手机号
  getPhoneNumber (e) {
    let _this = this
    wx.login({
      success (res) {
        const params = {
          code: res.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        }
        console.log(params)
        store.decryptPhone(JSON.stringify(params), (res) => {
          console.log(res.data.phoneNumber)
          _this.setData({
            phone: res.data.phoneNumber
          })
          wx.navigateTo({
            url: './seat/seat?phone=' + res.data.phoneNumber
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