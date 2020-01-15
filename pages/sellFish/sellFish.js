import QRCode from '../../utils/weapp-qrcode.js'
import { getData, showToast } from '../../utils/util.js'
Page({
  data: {
  },
  onLoad: function () {
    if (!getData('sessionID')) {
      showToast("登录状态错误，请绑定微信后再试", 'none');
      return wx.switchTab({
        url: '../me/me'
      })
    }
    new QRCode('myQrcode', {
      text: getData('userInfo').id,
      width: 200,
      height: 200,
      padding: 0, // 生成二维码四周自动留边宽度，不传入默认为0
      correctLevel: QRCode.CorrectLevel.Q, // 二维码可辨识度
      callback: (res) => {
        console.log(res.path)
        // 接下来就可以直接调用微信小程序的api保存到本地或者将这张二维码直接画在海报上面去，看各自需求
      }
    })
  }
})
