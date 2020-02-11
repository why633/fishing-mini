import * as store from '../../store/index.js'
Page({
  data: {
    searchData: {
      sort: 1,
      pageNo: 1,
      pageSize: 10
    },
    totalCount: 0,
    goodsData: []
  },
  onLoad: function () {
    this.getGoodsList()
  },
  // 获取商品列表
  getGoodsList () {
    const params = this.data.searchData
    store.goodsList(params,(res)=>{
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
    this.setData({
      searchData: this.data.searchData
    })
    this.getGoodsList()
  },
  // 下拉加载更多
  loadMore () {
    if (this.data.goodsData.length < this.data.totalCount) {
      this.data.searchData.pageNo = this.data.searchData.pageNo + 1
      this.setData({
        searchData: this.searchData
      })
      this.getGoodsList()
    }
  }
})
