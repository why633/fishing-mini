import * as store from '../../../store/index.js'
Page({
  data: {
    phone: '',
    seat: '10'
  },

  onReady: function (e) {

  },

  onLoad: function (e) {
    console.log(e)
    this.setData({
      phone: e.phone
    })
    this.lotNumber()
  },

  onHide () {

  },

  onShow () {

  },
  // 摇号
  lotNumber () {
    const params = {
      phone: this.data.phone,
      eventId: 9
    }
    store.lotNumber(params, (res) => {
      console.log(res)
      this.setData({
        seat: res.data.value
      })
    })
  },
  // 关闭
  close () {
    wx.switchTab({
      url: '../../index/index'
    });
  }
})