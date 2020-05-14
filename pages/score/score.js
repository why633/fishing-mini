import * as store from '../../store/index.js'
Page({
  data: {
    searchData: {
      sort: 1,
      type: '',
      pageNo: 1,
      pageSize: 10
    },
    classArray: ['全部'],
    objClassArray: [
      {
        id: '',
        name: '全部'
      }
    ],
    classIndex: 0,
    totalCount: 0,
    goodsData: []
  },
  onLoad: function () {
    this.getGoodsList()
    this.getGoodSType()
  },
  // 获取商品分类
  getGoodSType () {
    store.getType({}, (res)=>{
      console.log(res.data.value)
      const resData = res.data.value
      resData.map(item => {
        this.data.classArray.push(item.name)
        this.data.objClassArray.push(item)
      })
      this.setData({
        classArray: this.data.classArray,
        objClassArray: this.data.objClassArray
      })
    })
  },
  // 获取商品列表
  getGoodsList () {
    const params = this.data.searchData
    store.goodsList(params, (res)=>{
      console.log(res)
      this.setData({
        goodsData: this.data.searchData.pageNo==1?res.data.list:this.data.goodsData.concat(res.data.list),
        totalCount: res.data.page.totalCount
      })
    })
  },
  // 排序
  changeSort (event) {
    this.data.searchData.sort = this.data.searchData.sort == 1 ? 2 : 1
    this.data.searchData.pageNo = 1
    this.setData({
      searchData: this.data.searchData
    })
    this.getGoodsList()
  },
  // 分类切换
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.objClassArray[e.detail.value].id)
    this.data.searchData.type = this.data.objClassArray[e.detail.value].id
    this.data.searchData.pageNo = 1
    this.setData({
      classIndex: e.detail.value,
      searchData: this.data.searchData
    })
    this.getGoodsList()
  },
  // 下拉加载更多
  loadMore () {
    if (this.data.goodsData.length < this.data.totalCount) {
      this.data.searchData.pageNo = this.data.searchData.pageNo + 1
      this.setData({
        searchData: this.data.searchData
      })
      this.getGoodsList()
    }
  },
  // 跳转详情
  goDetail (e) {
    return wx.navigateTo({
      url: './goodDetail/goodDetail?id=' + e.currentTarget.dataset.id
    });
  },
})
