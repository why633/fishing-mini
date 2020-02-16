import { getData, showToast, globalTabindex, setData, remoData } from '../../utils/util.js'
import * as store from '../../store/index.js'

const app = getApp()
//获取应用实例
Page({
  data: {
    user: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false
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
  logout () {
    remoData('sessionID');
    remoData('userInfo');
    this.setData({
      user: null, hasUserInfo: false
    })
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