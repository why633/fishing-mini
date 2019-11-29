Component({ 
  options: { 
    multipleSlots: true // 在组件定义时的选项中启用多slot支持 
  }, 
  /** 
   * 组件的属性列表 
   * 用于组件自定义设置 
  */ 
  properties: {
    // 弹窗标题 
    label: {
      type: String,
      value: '首页'
    },
    url:{
      type: String,
      value: '首页'
    }
  }, 
  /** 
   * 私有数据,组件的初始数据 
   * 可用于模版渲染 
   */ 
  data: { // 弹窗显示控制 
    isShow: false
  }, 
  /**
   * 组件的方法列表 
   * 更新属性和数据的方法与更新页面数据的方法类似 
  */ 
  methods: { 
    /** 
    * 公有方法 
    */
    //隐藏弹框 
    go() { 
      this.switchTab({
        url: this.data.url
      })
    }
  } 
})