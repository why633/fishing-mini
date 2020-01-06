Page({
  data: {
    phone: '123'
  },

  onReady: function (e) {

  },

  onLoad: function (e) {
    console.log(e)
    this.setData({
      phone: e.phone
    })
  },

  onHide () {

  },

  onShow () {

  }
})