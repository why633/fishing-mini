import * as store from '../../store/index.js'
Page({
  data: {
    phone: ''
  },

  onReady: function (e) {
    // wx.login({
    //   success (res) {
    //     console.log(res)
    //   }
    // })
  },

  onLoad: function () {

  },

  onHide () {

  },

  onShow () {

  },
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
  }
})