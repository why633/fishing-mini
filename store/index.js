import { Get, Post } from '../utils/http.js'
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









