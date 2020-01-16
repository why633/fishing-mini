import QRCode from '../../utils/weapp-qrcode.js'
import { getData, showToast, encodeUtf8 } from '../../utils/util.js'
Page({
  data: {
  },
  onLoad: function () {
    // 判断是否授权登录
    if (!getData('sessionID')) {
      showToast("登录状态错误，请绑定微信后再试", 'none');
      return wx.switchTab({
        url: '../me/me'
      })
    }
    // 判断是否绑定手机号
    if (!getData('userInfo').phone) {
      showToast("账户状态错误，请绑定手机再报名", 'none');
      return wx.navigateTo({
        url: '../../me/bind/bind'
      })
    }
    const qrCodeData = encodeUtf8(`${getData('userInfo').id}#${getData('userInfo').headImg}#${getData('userInfo').nickName}`)
    new QRCode('myQrcode', {
      text: qrCodeData,
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
