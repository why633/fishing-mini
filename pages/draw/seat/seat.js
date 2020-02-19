import * as store from '../../../store/index.js'
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    phone: '',
    seat: '--',
    eventId: '',
    nickName: ''
  },

  onReady: function (e) {

  },

  onLoad: function (e) {
    this.setData({
      phone: e.phone,
      eventId: e.eventId
    })
  },

  onHide () {

  },

  onShow () {

  },
  // 摇号
  lotNumber () {
    const params = {
      phone: this.data.phone,
      eventId: this.data.eventId,
      nickName: this.data.nickName
    }
    wx.showLoading({title: '摇号中…'})
    store.lotNumber(params, (res) => {
      wx.hideLoading()
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
  },
  bindGetUserInfo () {
    const _this = this
    wx.getUserInfo({
      success(res) {
        _this.setData({
          nickName: res.userInfo.nickName
        })
        _this.lotNumber()
      },
      fail(res) {
        showToast('授权失败,稍后重试', 'none')
      }
    })
  }
})