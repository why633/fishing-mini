import * as store from '../../../store/index.js'
import { showToast } from '../../../utils/util.js';
Page({
  data: {
    id: '',
    coverList: [],
    name: '',
    price: '',
    descImg: ''
  },
  onLoad: function (opt) {
    console.log(opt)
    let eventId = opt.id
    if (opt.scene) {
      eventId = decodeURIComponent(opt.scene)
    }
    console.log(eventId)
    this.setData({
      id: eventId
    })
    this.getGoodDetail()
  },
  getGoodDetail () {
    store.goodDetail({goodsId: this.data.id}, (res) => {
      console.log(res)
      this.setData({
        coverList: res.data.coverList,
        name: res.data.name,
        price: res.data.price,
        descImg: res.data.descImg
      })
    })
  },
  bay () {
    // showToast("请下载钓鱼排行榜app进行兑换", "none")
    wx.navigateTo({
      url: '../../download/download'
    })
  }
})
