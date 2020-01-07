import { Get, Post, $get, $post } from '../utils/http.js'
import moment from '../utils/moment.js'
import { showToast } from '../utils/util'


// swipers
export function swipers(cb, failcb) {
  return Post({
    url: '/app/top',
    data: {},
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}


// spot api
export function spotSwipers(cb, failcb) {
  return Post({
    url: '/app/spot/top',
    data: {},
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

// 文章列表
export function tabArticle(body, cb, failcb) {
  wx.showLoading({
    title: '加载中...',
  })
  return Post({
    url: '/article/top/by/tab',
    data: body,
    success(data) {
      wx.hideLoading();
      cb(data)
    },
    fail(error) {
      wx.hideLoading();
      failcb && failcb()
    }
  })
}

export function fishArticle(body, cb, failcb) {
  wx.showLoading({
    title: '加载中...',
  })
  return Post({
    url: '/article/list/fish',
    data: body,
    success(data) {
      wx.hideLoading();
      cb(data)
    },
    fail(error) {
      wx.hideLoading();
      failcb && failcb()
    }
  })
}

export function getEvent(body, cb, failcb) {
  wx.showLoading({
    title: '加载中...',
  })
  return Post({
    url: '/event/list/all',
    data: body,
    success(data) {
      wx.hideLoading();
      cb(data)
    },
    fail(error) {
      wx.hideLoading();
      failcb && failcb()
    }
  })
}

export function getEventInfo(body, cb, failcb) {
  return Post({
    url: '/event/by/id',
    data: body,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}


export function search(body, cb, failcb) {
  wx.showLoading({
    title: '加载中...',
  })
  return Post({
    url: '/app/search',
    data: body,
    success(data) {
      wx.hideLoading();
      cb(data)
    },
    fail(error) {
      wx.hideLoading();
      failcb && failcb()
    }
  })
}

export function getSpotInfo(body, cb, failcb) {
  return Post({
    url: '/spot/by/id',
    data: body,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

export function getApplication(body, cb, failcb) {
  return Post({
    url: '/application/list',
    data: body,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

export function getApplicationInfo(body, cb, failcb) {
  return Post({
    url: '/application/by/id',
    data: body,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}


export function bindWechat(body, cb, failcb) {
  return Post({
    url: '/user/bind/miniprogram',
    data: body,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}


export function getUserInfo(body, cb, failcb) {
  return Post({
    url: '/user/info',
    data: body,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

export function createApplication(body, cb, failcb) {
  wx.showLoading({
    title: '订单请求中',
  });
  return Post({
    url: '/event/create/application',
    data: body,
    success(data) {
      wx.hideLoading();
      cb(data)
    },
    fail(error) {
      wx.showToast('加载失败,稍后重试', 'none');
      failcb && failcb()
    }
  })
}

export function payEvent(body, cb, failcb) {
  wx.showLoading({
    title: '请求支付中',
  });
  return Post({
    url: '/application/paysign/by/miniprogram',
    data:body,
    success(data) {
      wx.hideLoading();
      cb(data)
    },
    fail(error) {
      wx.showToast('加载失败,稍后重试', 'none');
      failcb && failcb()
    }
  })
}


export function getArticle(body, cb, failcb) {
  wx.showLoading({
    title: '加载中...',
  });
  return Post({
    url: '/article/id',
    data:body,
    success(data) {
      wx.hideLoading();
      cb(data)
    },
    fail(error) {
      wx.showToast('加载失败,稍后重试', 'none');
      failcb && failcb()
    }
  })
}


export function getFishArticle(body, cb, failcb) {
  wx.showLoading({
    title: '加载中...',
  });
  return Post({
    url: '/article/id/fish',
    data:body,
    success(data) {
      wx.hideLoading();
      cb(data)
    },
    fail(error) {
      wx.showToast('加载失败,稍后重试', 'none');
      failcb && failcb()
    }
  })
}

export function isFan(body, cb, failcb) {
 
  return Post({
    url: '/user/is/fan',
    data:body,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

export function bindPhone(body, cb, failcb) {
  return Post({
    url: '/user/bind/phone/miniprogram',
    data:body,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb(error)
    }
  })
}


export function getBindCode(body, cb, failcb) {
 
  return Post({
    url: '/user/bind/code',
    data:body,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb(error)
    }
  })
}


/* 渔悦接口 */

// 获取轮播图
export function swiperData(params, cb, failcb) {
  return $get({
    url: '/info/homepage/getBanner',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

// 获取资讯详情
export function detailInfo(params, cb, failcb) {
  return $get({
    url: '/info/detailInfo/getById',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

// 获取活动赛事列表
export function searchEvent(params, cb, failcb) {
  return $get({
    url: '/event/searchEvent/getByCity',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

// 根据钓场id获取活动赛事列表
export function searchEventBySpotId(params, cb, failcb) {
  return $get({
    url: '/event/searchEvent/getBySpotId',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

// 获取活动赛事详情
export function eventInfo(params, cb, failcb) {
  return $get({
    url: '/event/searchEvent/getByEventId',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}


// 获取热门钓场
export function hotSpot(params, cb, failcb) {
  return $post({
    url: '/spot/hot/info',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

// 获取资讯列表
export function article(params, cb, failcb) {
  return $get({
    url: '/info/shortInfo/getNewHot',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

// 获取渔获列表
export function fishCatch(params, cb, failcb) {
  return $get({
    url: '/info/list/fishCatchBySpot',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

// 获取钓场列表
export function spotList(params, cb, failcb) {
  return $post({
    url: '/spot/info',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

// 获取钓场详情信息
export function spotInfo(params, cb, failcb) {
  return $get({
    url: '/spot/api/byId',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

// 解密手机号
export function decryptPhone(params, cb, failcb) {
  return $post({
    url: '/user/userLogin/decryptPhone',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

// 小程序登录
export function programLogin(params, cb, failcb) {
  return $get({
    url: '/user/userLogin/programLogin',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

// 摇号
export function lotNumber(params, cb, failcb) {
  return $get({
    url: '/event/lotNumber/manual',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

// 报名
export function applicationGame(params, cb, failcb) {
  return $post({
    url: '/order/application/apply/game',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

// 我的订单
export function applicationList(params, cb, failcb) {
  return $get({
    url: '/order/application/enroll/list',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}

// 绑定手机号
export function bindPhoneNum(params, cb, failcb) {
  return $get({
    url: '/user/userLogin/bindPhone',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}
// 获取验证吗
export function sendCode(params, cb, failcb) {
  return $get({
    url: '/user/userLogin/sendCode',
    data: params,
    success(data) {
      cb(data)
    },
    fail(error) {
      failcb && failcb()
    }
  })
}
