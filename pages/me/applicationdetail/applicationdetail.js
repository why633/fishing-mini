import { getData, showToast, globalTabindex} from '../../../utils/util.js'
import conf from "../../../config.js";
// adaptPadding,
import * as store from '../../../store/index.js'
import moment from '../../../utils/moment.js'

const app = getApp()
//获取应用实例
Page({
  data: {
    application:{},
    systemWidth: 0,
    qrurl: null,
    payok: false,
  },

  onReady: function (e) {
    wx.showShareMenu ({withShareTicket: true});
  },

  event() {
    wx.navigateTo({
      url: '../../event/eventdetail/eventdetail?id=' + this.data.application.event._id
    });
  },

  onLoad: function(opt) {
    console.log(JSON.parse(opt.event))
    this.setData({
      applicationInfo: JSON.parse(opt.event)
    })
    return
    let { id } = opt
    this.setData({
      // qrurl: conf.HOST + 'api/wallet/qr/' + id
      qrurl: conf.FISHING_HOST + 'api/wallet/qr/' + id
    })
    const self = this;
    store.getApplicationInfo({ id },(data) => {
        self.setData({
          application: data.application,
          payok: data.application.status === '已付款'
        })
    });
  },

  pay() {
    if(this.data.payok) return showToast('订单已支付,刷新重试');
    let self = this;
    store.payEvent({
      id: this.data.application._id,
      payType: 'wechat'
    },(data) => {
      if(data && data.payObj) {
        wx.requestPayment(Object.assign(data.payObj, {
          success:function(res){
            self.setData({
              payok: 1,
            })
          },
          fail:function(res){
          },
          complete:function(res){
          }
        }))
      }
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