const setData = (k, v) => wx.setStorageSync(k, v)
const getData = k => wx.getStorageSync(k)

let globalTabindex = 0;
export function setGlobaleTabindex(index) {
  globalTabindex = index
}
export function getGlobalTabindex() {
  return globalTabindex
}

const remoData = k => wx.removeStorageSync(k);
const link = url => wx.navigateTo({
  url
})
const dialPhone = (phoneNumber, cb) => {
  wx.makePhoneCall({
    phoneNumber: phoneNumber,
    success() {
      console.log('dial success')
      if (cb) cb()
    },
    fail() {
      console.log('dial failed')
      if (cb) cb('dial failed')
    }
  })
}

const showModal = (obj, callback) => {
  wx.showModal({
    // 是否显示取消按钮
    showCancel: obj.showCancel || false,
    title: obj.title || '提示',
    content: obj.content || '',
    success: function (res) {
      if (res.confirm) {
        typeof callback == "function" && callback.call();
      } else if (res.cancel) {
        typeof callback == "function" && callback.call();
      }
    }
  })
}

const showToast = (title, icon) => {
  wx.showToast({
    title,
    icon,
    duration: 2000
  })
}

// 如果用户没有登陆的话那么就跳转到登陆页面去
const isLogin = callback => {
  const session = getData("sessionID")
  if (!session) {
    callback && callback()
    remoData('sessionID')
    remoData('userInfo')
    link("/pages/login/index")
  }
}

// 获取指定时间
const getTime = day => {
  day = day || 0;
  let d = new Date();
  let date = new Date(d);
  date.setDate(d.getDate() + day);
  return date;
}

// 转化时间
const getDate = time => {
  if (!time || time === undefined || time === '~') return "~";

  return time.getFullYear() + "年" +
    (time.getMonth() + 1) +
    "月" + time.getDate() + "日";
}

const doHandleMonth = (month) => {
  let m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
}

const getDateNum = (day) => {
  day = day || 0
  let today = new Date();

  let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

  today.setTime(targetday_milliseconds); //注意，这行是关键代码  

  let tYear = today.getFullYear();
  let tMonth = today.getMonth();
  let tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "/" + tMonth + "/" + tDate;
}


/**
 * 去除数据重复
 */
const Repeat = (arr) => {
  for (var i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) != i) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
}

function adaptPadding(self) {
  var app = getApp()
  if (app.globalData.statusBarHeight) {
    self.setData({
      paddingTop: self.global.statusBarHeight
    })
    return
  }

  wx.getSystemInfo({
    success: function (res) {
      self.setData({
        paddingTop: res.statusBarHeight
      })
    },
  })
}

// utf-8编码
function encodeUtf8(str) {
  var out, i, len, c;
  out = "";
  len = str.length;
  for(i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
    } else {
      out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
    }
  }
  return out;
}

module.exports = {
  setData,
  adaptPadding,
  getData,
  remoData,
  showModal,
  getTime,
  Repeat,
  getDate,
  showToast,
  link,
  isLogin,
  dialPhone,
  getDateNum,
  encodeUtf8
}