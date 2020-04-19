import { getData, showToast, globalTabindex, setData, remoData } from '../../utils/util.js'
import * as store from '../../store/index.js'

const app = getApp()
//获取应用实例
Page({
  data: {
    user: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    userData: {}
  },

  onReady: function (e) {
    wx.showShareMenu({ withShareTicket: true });
  },

  goApplication () {
    if (getData('sessionID')) wx.navigateTo({
      url: './application/application'
    })
    else {
      showToast('请绑定微信后查看', 'none')
    }
  },

  goAuthen () {
    if (getData('sessionID')) {
      const self = this
      console.log(self.data.user)
      store.checkIdCard({userId: self.data.user.id}, (res) => {
        console.log(res.data.value)
        if(res.data.value){
          showToast('您已认证', 'none')
        } else {
          wx.navigateTo({
            url: './authen/authen'
          })
        }
      })
    } else {
      showToast('请绑定微信后查看', 'none')
    }
  },

  alert () {
    showToast('开发中,敬请期待', 'none')
  },

  onLoad: function () {
    let self = this;
    if (getData('sessionID')) {
      console.log(getData('userInfo'))
      this.setData({
        user: getData('userInfo'),
        hasUserInfo: true
      })
      self.getMyUserInfo()
    } else {
      this.setData({
        user: null, hasUserInfo: false
      })
    }
  },

  getUserInfo (e) {
    app.globalData.userInfo = e.detail.userInfo;
    console.dir(e.detail);
    let self = this;
    wx.getUserInfo({
      success(res) {
        console.log("获取用户信息成功", res)
        wx.login({
          success: res => {
            let code = res.code;
            console.log(code)
            if (code) {
              store.programLogin({ wxCode: res.code }, (data) => {
                console.log(data)
                setData('sessionID', data.data.token);
                let user = data.data
                self.setData({ user: user, hasUserInfo: true });
                // app.globalData.user = user
                setData('userInfo', user);
                showToast('登录成功', 'none');
                self.getMyUserInfo()
              })
            } else {
              showToast('授权失败,稍后重试', 'none')
            }
          }
        })
      },
      fail(res) {
        showToast('授权失败,稍后重试', 'none')
      }
    })
    
  },
  // 获取我的相关信息
  getMyUserInfo () {
    let self = this
    store.getMyUserInfo({}, (res) => {
      console.log(res.data)
      self.setData({
        userData: res.data
      })
      console.log(self.data.userData)
    })
  },
  logout () {
    remoData('sessionID');
    remoData('userInfo');
    this.setData({
      user: null, hasUserInfo: false, userData: {}
    })
  },
  goWallet () {
    if (getData('sessionID')) wx.navigateTo({
      url: './wallet/wallet'
    })
    else {
      showToast('请绑定微信后查看', 'none')
    }
  },
  onHide () {

  },

  onShow () {
    this.onLoad();
    this.setData({
      systemWidth: wx.getSystemInfoSync().windowWidth,
      width: wx.getSystemInfoSync().windowWidth * 0.96 - 20
    })
  }
})