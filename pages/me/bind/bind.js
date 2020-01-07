import { setData, getData, showToast, globalTabindex } from '../../../utils/util.js'
import conf from "../../../config.js";
// adaptPadding,
import * as store from '../../../store/index.js'
import moment from '../../../utils/moment.js'

const app = getApp()
//获取应用实例
Page({
  data: {
    user: {},
    systemWidth: 0,
    phone: '',
    error: '',
    sms: '',
    sendTxt: '发送验证码',
    disabled: false,
    godisable: false
  },

  onReady: function (e) {
    wx.showShareMenu({ withShareTicket: true });
  },

  onLoad: function (opt) {
    console.dir(app.globalData.user);
    if (!getData('sessionID')) {
      showToast("登录状态错误，请绑定微信后再试", 'none');
      return wx.navigateBack()
    }
    // if(!getData('sessionID')) {
    //   showToast("登录状态错误，请绑定微信后再试", 'none');
    //   return wx.navigateBack()
    // } else {
    //   if( !app.globalData.user || !app.globalData.user._id  || !app.globalData.user.userInfo  || !app.globalData.user.userInfo.unionid) {
    //     showToast("登录状态错误，请绑定微信后再试", 'none');
    //     return wx.navigateBack();
    //   }
    // }
  },

  onChange (event) {
    // event.detail 为当前输入的值
    let error = '';
    if (!/^1[3456789]\d{9}$/.test(event.detail)) {
      error = '手机号格式错误';
    } else {
      error = '';
    }
    this.setData({
      phone: event.detail,
      error
    })
    console.log(event.detail);
  },


  onCodeChange (event) {
    // event.detail 为当前输入的值
    this.setData({
      sms: event.detail
    })
    console.log(event.detail);
  },

  bind () {
    let self = this;
    this.setData({
      godisable: true
    })
    let { phone, sms } = this.data;
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      self.setData({
        godisable: false
      })
      return showToast('手机号格式错误', 'none')
    }
    if (!sms || !sms.length) {
      self.setData({
        godisable: false
      })
      return showToast('验证码不能为空', 'none')
    }
    console.dir(app.globalData.user)
    store.bindPhoneNum({
      phone,
      code: sms
    }, (res) => {
      app.globalData.user = res.data
      wx.navigateBack();
      wx.hideLoading();
    });
    // store.bindPhone({
    //   phone,
    //   code:sms,
    //   _id: app.globalData.user._id,
    //   unionid: app.globalData.user.userInfo.unionid 
    // },(data) => {
    //   self.setData({
    //     godisable: false
    //   })
    //   if(data.status == 'ok') {
    //     setData('sessionID', data.token);
    //     wx.showToast('绑定成功','none');
    //     wx.showLoading({
    //       title: '数据同步中...',
    //     });
    //     store.getUserInfo({},(data) => {
    //       if(data && data.user) app.globalData.user = data.user;
    //       wx.navigateBack();
    //       wx.hideLoading();
    //     },(error) => {
    //       wx.hideLoading();
    //       wx.navigateBack();
    //     });
    //   } else {
    //     showToast(data && data.status && data.status.message ? data.status.message: '系统错误，绑定失败', 'none');
    //   }
    // });
  },

send() {
  if (!/^1[3456789]\d{9}$/.test(this.data.phone)) {
    return showToast('手机号格式错误', 'none')
  }
  this.setData({
    disabled: true
  })
  let c = 60;
  let interval = setInterval(() => {
    c -= 1;
    this.setData({
      sendTxt: (c < 0 ? 0 : c) + ' 秒后重新获取'
    });
  }, 1000);
  setTimeout(() => {
    clearInterval(interval);
    this.setData({
      sendTxt: '重新获取',
      disabled: false
    });
  }, 1000 * 60)
  store.sendCode({
    phone: this.data.phone,
    type: 2
  }, (data) => {
    console.dir(data);
  });
},

onHide() {

},

onShow() {
  this.setData({
    systemWidth: wx.getSystemInfoSync().windowWidth,
    width: wx.getSystemInfoSync().windowWidth * 0.96 - 20
  })
}
})