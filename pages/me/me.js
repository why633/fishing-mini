import { getData, showToast, globalTabindex, setData, remoData} from '../../utils/util.js'
import conf from "../../config.js";
// adaptPadding,
import * as store from '../../store/index.js'
import moment from '../../utils/moment.js'

const app = getApp()
//获取应用实例
Page({
  data: {
    user: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false
  },

  onReady: function (e) {
    wx.showShareMenu ({withShareTicket: true});
  },

  goApplication() {
    if(getData('sessionID')) wx.navigateTo({
      url: './application/application'
    })
    else {
      showToast('请绑定微信后查看','none')
    }
  },

  alert() {
    showToast('开发中,敬请期待','none')
  },

  onLoad: function() {
    let self = this;
    if(!app.globalData.user) {
      if (app.globalData.userInfo) {
          wx.login({
            success: res => {
             if(res.code) {
              store.bindWechat(Object.assign(app.globalData.userInfo, { code: res.code }), (data) => {
                if(data.status !== 'ok') {
                  setData('sessionID', data.token);
                  self.setData({ user: data.user, hasUserInfo: true });
                  showToast('登录成功', 'none');
                  return showToast(data.message || '绑定失败, 稍后再试', 'none');
                }
              });
             } else {
              showToast('稍后重试', 'none')
             }
            }
          })
      } else if (this.data.canIUse){
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {


          wx.login({
            success: res => {
             if(res.code) {
              store.bindWechat(Object.assign(app.globalData.userInfo, { code: res.code }), (data) => {
                if(data.status !== 'ok') {
                  return showToast(data.message || '绑定失败, 稍后再试', 'none');
                }
                setData('sessionID', data.token);
                self.setData({ user: data.user, hasUserInfo: true });
                showToast('绑定成功', 'none');
              });
             } else {
              showToast('稍后重试', 'none')
             }
            }
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            wx.login({
            success: res => {
               if(res.code) {
                store.bindWechat(Object.assign(app.globalData.userInfo, { code: res.code }), (data) => {
                  if(data.status !== 'ok') {
                    return showToast(data.message || '绑定失败, 稍后再试', 'none');
                  }
                  setData('sessionID', data.token);
                  self.setData({ user: data.user, hasUserInfo: true });
                  showToast('绑定成功', 'none');
                });
               } else {
                showToast('稍后重试', 'none')
               }
              }
            })
          }
        })
      }
    } else {
      this.setData({
        user: app.globalData.user || {},
        hasUserInfo: true
      })
    }
  },

  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo;
    console.dir(e.detail);
    let self = this;
    wx.login({
      success: res => {
       let code = res.code;
       if(code) {
          store.bindWechat(Object.assign(e.detail.userInfo, { encryptedData: e.detail.encryptedData, iv: e.detail.iv, code: code }), (data) => {
            if(data.status !== 'ok') {
                return showToast(data.status && data.status.message ?  data.status.message : '绑定失败, 稍后再试', 'none');
            }
            setData('sessionID', data.token);
            self.setData({ user: data.user, hasUserInfo: true });
            app.globalData.user = data.user;
            showToast('绑定成功', 'none');
            if(!data.user.phone) wx.navigateTo({
              url: './bind/bind'
            })
          });
       } else {
         showToast('授权失败,稍后重试', 'none')
       }
      }
    })
  },
  logout() {
    app.globalData.user = null;
    remoData('sessionID');
    this.setData({
      user: null, hasUserInfo: false
    })
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