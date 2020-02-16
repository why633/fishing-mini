import { getData, showToast, globalTabindex, setData } from '../../../utils/util.js'
import conf from "../../../config.js";
// adaptPadding,
import * as store from '../../../store/index.js'
import moment from '../../../utils/moment.js'

const app = getApp()
//获取应用实例
Page({
  data: {
    imgUrls: [
      "../../../assets/banner.jpg"
    ],
    id: null,
    event: {},
    count: 0,
    application: null,
    currentMoney: 0,
    count: 1,
    time: '',
    user: '',
    autoplay: true,
    interval: 5000,
    adinterval: 5000,
    duration: 1000,
    systemWidth: 0,
    eventInfo: {}
  },

  onReady: function (e) {
    wx.showShareMenu({ withShareTicket: true });
  },

  createApplication () {
    // 判断是否授权登录
    if (!getData('sessionID')) {
      wx.showToast({
        title: '请授权登录',
        icon: 'none',
        duration: 1500,
        success: function(){
          setTimeout(function(){
            return wx.switchTab({
              url: '../../me/me'
            })
          }, 1600)
        }
      })
      return
    }
    // 判断是否绑定手机号
    console.log(getData('userInfo'))
    if (!getData('userInfo').phone) {
      wx.showToast({
        title: '请绑定手机',
        icon: 'none',
        duration: 1500,
        complete: function(){
          setTimeout(function(){
            return wx.navigateTo({
              url: '../../me/bind/bind'
            })
          }, 1600)
        }
      })
      return
    }
    if (getData('userInfo').nickName == '小程序用户') {
      console.log('小程序用户')
      const _this = this
      wx.getUserInfo({
        success(res) {
          console.log(res.userInfo)
          const userInfo = {
            nickName: res.userInfo.nickName,
            gender: res.userInfo.gender,
            headImg: res.userInfo.avatarUrl
          }
          store.editUse(JSON.stringify(userInfo), (res) => {
            console.log(res)
            console.log('修改用户名')
            const user = res.data
            setData('userInfo', user)
            const params = {
              eventId: _this.data.id,
              count: _this.data.count,
              tranAmount: _this.data.eventInfo.money * _this.data.count
            }
            // 报名
            store.applicationGame(JSON.stringify(params), (res => {
              console.log(res)
              console.log(JSON.stringify(res.data))
              if (res.code == 200) {
                wx.navigateTo({
                  url: '../../me/applicationdetail/applicationdetail?event=' + JSON.stringify(res.data)
                })
              } else {
                showToast(res.message, 'none')
              }
            }))
          })
        }
      })
    } else {
      const params = {
        eventId: this.data.id,
        count: this.data.count,
        tranAmount: this.data.eventInfo.money * this.data.count
      }
      // 报名
      store.applicationGame(JSON.stringify(params), (res => {
        console.log(res)
        console.log(JSON.stringify(res.data))
        if (res.code == 200) {
          wx.navigateTo({
            url: '../../me/applicationdetail/applicationdetail?event=' + JSON.stringify(res.data)
          })
        } else {
          showToast(res.message, 'none')
        }
      }))
    }
  },

  onLoad: function (opt) {
    let eventId = opt.id
    if (opt.scene) {
      eventId = decodeURIComponent(opt.scene)
    }
    this.setData({
      id: eventId
    })
    const self = this;
    store.eventInfo({ eventId: eventId }, (res) => {
      const resData = res.data
      self.timeInterval(resData.endTime);
      self.setData({
        imgUrls: [resData.coverImage] || [],
        eventInfo: resData
      })
    })
  },

  plus () {
    let count = this.data.count >= 6 ? this.data.count : this.data.count + 1;
    this.setData({ count, currentMoney: parseFloat(count * (this.data.event.money || 0)).toFixed(2) })
  },

  sub () {
    let count = this.data.count <= 1 ? this.data.count : this.data.count - 1;
    this.setData({ count, currentMoney: parseFloat(count * (this.data.event.money || 0)).toFixed(2) })
  },

  formatDuring (mss) {
    let days = parseInt((String)(mss / (1000 * 60 * 60 * 24)));
    let hours = parseInt((String)((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let minutes = parseInt((String)((mss % (1000 * 60 * 60)) / (1000 * 60)));
    let seconds = parseInt((String)((mss % (1000 * 60)) / 1000));
    return days + " 天 " + hours + " 小时 " + minutes + " 分 " + seconds + " 秒 ";
  },

  timeInterval (endTime) {
    let interval = setInterval(() => {
      let left = endTime - Date.now();
      if (left < 0) clearInterval(interval);
      this.setData({
        time: left <= 0 ? '活动已结束~' : '报名截止时间: ' + this.formatDuring(left)
      })
    }, 1000);
  },

  onHide () {

  },

  backhome () {
    wx.switchTab({
      url: '../../index/index'
    });
  },

  onShow () {
    this.setData({
      systemWidth: wx.getSystemInfoSync().windowWidth,
      width: wx.getSystemInfoSync().windowWidth * 0.96 - 20
    })
  }
})