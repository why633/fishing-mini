import { setData, getData, showToast, globalTabindex } from '../../../utils/util.js'
import * as store from '../../../store/index.js'

const app = getApp()
//获取应用实例
Page({
  data: {
    name: '',
    idCard: '',
    subing: false
  },

  onReady: function (e) {
  },

  onLoad: function (opt) {
    // if (!getData('sessionID')) {
    //   showToast("登录状态错误，请绑定微信后再试", 'none');
    //   return wx.navigateBack()
    // }
    // this.walletInfo()
  },

  onHide () {

  },

  onShow () {
  },
  onNameChange (event) {
    this.setData({
      name: event.detail
    })
  },
  onIdCardChange (event) {
    this.setData({
      idCard: event.detail
    })
  },
  submit () {
    this.setData({
      subing: true
    })
    let { name, idCard } = this.data;
    if (!name || !name.length) {
      this.setData({
        subing: false
      })
      return showToast('姓名不能为空', 'none')
    }
    if (!idCard || !idCard.length) {
      this.setData({
        subing: false
      })
      return showToast('身份证不能为空', 'none')
    }
    const self = this
    store.certification({name: name, idCard: idCard}, (res) => {
      self.setData({
        subing: false
      })
      if(res.code == 200) {
        return wx.navigateBack()
      }
    }, (err) => {
      console.log(err)
    })
  }
})