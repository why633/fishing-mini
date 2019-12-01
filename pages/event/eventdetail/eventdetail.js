import { getData, showToast, globalTabindex} from '../../../utils/util.js'
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
    id:null,
    event:{},
    count: 0,
    application:null,
    currentMoney:0,
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
    wx.showShareMenu ({withShareTicket: true});
  },

  createApplication() {
    if(!getData('sessionID')) {
      showToast("登录状态错误，请绑定微信后再试", 'none');
      return wx.switchTab({
        url: '../../me/me'
      })
    } 
    if( !app.globalData.user || !app.globalData.user._id  || !app.globalData.user.phone) {
      showToast("账户状态错误，请绑定手机再报名", 'none');
      return wx.navigateTo({
        url: '../../me/bind/bind'
      })
    }
    store.createApplication({
      id: this.data.event._id,
      count: this.data.count
    }, (data) => {
      //'"5d6389232671ef00063a5bd4"'
      if(data.application && data.application._id) {
        wx.navigateTo({
          url: '../../me/applicationdetail/applicationdetail?id=' +  data.application._id
        })
      } else {
        showToast(data && data.status && data.status.message ? data.status.message : '报名失败','none');
      }
    });
  },

  onLoad: function(opt) {
    // let { id="5d64f976f1b44e00067d6549", scene } = opt;
    // if(scene) id = scene;
    this.setData({ id: opt.id });
    const self = this;
    // store.getEventInfo({ id, user: app.globalData.user ?  app.globalData.user._id: null },(data) => {
    //     self.timeInterval(data.event.timeX);
    //     self.setData({
    //       event: data.event,
    //       application: data.application ? data.application:  null,
    //       imgUrls: data.event.posters || [],
    //       currentMoney: parseFloat(data.event.money || 0).toFixed(2)
    //     })
    // });
    store.eventInfo({eventId: opt.id}, (res)=>{
      const resData = res.data
      self.timeInterval(resData.endTime);
      self.setData({
        imgUrls: [resData.coverImage] || [],
        eventInfo: resData
      })
    })
  },

  plus() {
    let count = this.data.count >= 6 ? this.data.count: this.data.count + 1;
    this.setData({ count, currentMoney: parseFloat(count * (this.data.event.money || 0)).toFixed(2) })
  },

  sub() {
    let count = this.data.count <= 1 ? this.data.count: this.data.count - 1;
    this.setData({ count, currentMoney: parseFloat(count * (this.data.event.money || 0)).toFixed(2)  })
  },

  formatDuring(mss) {
    let days = parseInt((String)(mss / (1000 * 60 * 60 * 24)));
    let hours = parseInt((String)((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let minutes = parseInt((String)((mss % (1000 * 60 * 60)) / (1000 * 60)));
    let seconds = parseInt((String)((mss % (1000 * 60)) / 1000));
    return days + " 天 " + hours + " 小时 " + minutes + " 分 " + seconds + " 秒 ";
  },

  timeInterval(endTime) {
    let interval = setInterval(() => {
      let left = endTime - Date.now();
      if(left < 0) clearInterval(interval);
      this.setData({
        time: left <= 0 ? '活动已结束~' : '报名截止时间: ' + this.formatDuring(left)
      })
    }, 1000);
  },

  onHide() {
   
  },

  backhome() {
    wx.switchTab({
      url: '../../index/index'
    });
  },

  onShow() {
    this.setData({
      systemWidth: wx.getSystemInfoSync().windowWidth,
      width: wx.getSystemInfoSync().windowWidth * 0.96 - 20
    })
  }
})