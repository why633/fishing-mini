import * as store from '../../store/index.js'
Page({
  data: {
    device: ''
  },
  onReady: function (e) {
    
  },
  onLoad: function () {
    const _this = this
    wx.getSystemInfo({
      success:function(res){
        // wx.showToast({
        //   title: res.platform,
        //   icon: 'success',
        //   duration: 1000,
        //   mask: true
        // })
        _this.setData({
          device: res.platform
        })
      }
    })
  },
  showIosCode () {
    wx.previewImage({
      current: 'http://fish.diaoyuphb.com/fishing/QRcode/ios-download.png' , // 当前显示图片的http链接
      urls: ['http://fish.diaoyuphb.com/fishing/QRcode/ios-download.png'] // 需要预览的图片http链接列表
    })
  },
  showAndroidCode () {
    wx.previewImage({
      current: 'http://fish.diaoyuphb.com/fishing/QRcode/android-download.jpeg' , // 当前显示图片的http链接
      urls: ['http://fish.diaoyuphb.com/fishing/QRcode/android-download.jpeg'] // 需要预览的图片http链接列表
    })
  }
})
