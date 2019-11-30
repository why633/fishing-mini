import cof from "../config.js";
import { getData, showToast, link, remoData } from "./util.js";

/**
 * 网络请求
 * param
 *  headers header头
 *  method 请求方式
 *  url 请求地址
 *  data 请求时候带的数据
 *  success 成功
 *  fail失败
 */
const Request = param => {
  let headers = { "Content-Type": 'application/json', "Authorization": "Bearer " + getData("sessionID")  }
  Object.assign(headers, param.header);
  var timeout
  const requestObj = wx.request({
    header: headers,
    method: param.type || 'GET',
    url: param.url || '',
    data: param.data || {},
    success: (res) => {
      clearTimeout(timeout)
      if(res.statusCode === 401) {
        remoData('sessionID');
        // showToast('token失效，重新登录', 'none');
      }
      if(res.data.status !== 'ok') {
         showToast(res.data.message, 'none');
      }
      (typeof param.success == "function") && param.success(res.data, "");
    },
    fail: (err) => {
      clearTimeout(timeout);
      (typeof param.fail == "function") && param.fail(null, err.errMsg);
    }
  });

  timeout = setTimeout(() => {
    requestObj.abort()
    if (param.fail) param.fail(null, 'timeout')
  }, 10 * 1000)
}

const $Request = param => {
  let headers = { "Content-Type": 'application/json', "Authorization": "Bearer " + getData("sessionID")  }
  Object.assign(headers, param.header);
  var timeout
  const requestObj = wx.request({
    header: headers,
    method: param.type || 'GET',
    url: param.url || '',
    data: param.data || {},
    success: (res) => {
      clearTimeout(timeout)
      if(res.data.code === 401) {
        remoData('sessionID');
        // showToast('token失效，重新登录', 'none');
      }
      if(res.data.code !== 200) {
         showToast(res.data.message, 'none');
      }
      (typeof param.success == "function") && param.success(res.data, "");
    },
    fail: (err) => {
      clearTimeout(timeout);
      (typeof param.fail == "function") && param.fail(null, err.errMsg);
    }
  });

  timeout = setTimeout(() => {
    requestObj.abort()
    if (param.fail) param.fail(null, 'timeout')
  }, 10 * 1000)
}

// 请求方法
const method = (type, param) => {
  param.type = type
  param.url = cof.HOST + 'api' + param.url;
  Request(param);
}

// 渔悦请求方法
const $method = (type, param) => {
  param.type = type
  param.url = cof.FISHING_HOST + param.url;
  $Request(param);
}

/**
 * 请求方式的使用拿post举例
 * Post({
 *  url: '/login', （必须参数） 这里千万不需要写完整地址 地址已经在config.js中配置好了 名为 HOST: "https://demo.yubin6.cn" 
 *  data: '请求的数据', （可选参数）
 *  header: 'header头', （可选参数）
 *  success: () => {} 请求成功以后回调（可选）
 *  fail: () => {} 请求失败以后回调（可选）
 * });
 */
const Get = param => method("GET", param) // get请求
const Post = param => method("POST", param) // post请求
const Put = param => method("PUT", param) // Put请求


const $get = param => $method("GET", param) // 渔悦测试接口


/**
 * 上传文件
 * @param url 上传的url地址
 * @param file 上传的文件
 * @param name 上传的文件名
 * @param data 附带的数据
 * @param call 回调
 */
const Upload = (url, file, name, data, call) => {
  let user = getData('user') || {};
  let header = { "Content-Type": 'multipart/form-data' }
  header["Authorization"] = "Bearer " + (user.token || '')
  wx.uploadFile({
    url: cof.HOST + 'api' + url,
    filePath: file,
    name: name,
    formData: data,
    header,
    success: (res) => {
      if (typeof (res.data) == "string") {
        (typeof call == "function") && call(JSON.parse(res.data), "");
      } else {
        (typeof call == "function") && call(res.data, "");
      }
    },
    fail: (err) => {
      // (typeof call == "function") && call(null, err.errMsg);
    }
  });
};
/**
 * 下载文件
 */
const downFile = (url, call) => {
  wx.downloadFile({
    url,
    success: function (res) {
      (typeof call == "function") && call(res.tempFilePath, "");
    }
  })
}

// 导出模块
export {
  Get,
  Post,
  Put,
  Request,
  Upload,
  downFile,
  $get
};