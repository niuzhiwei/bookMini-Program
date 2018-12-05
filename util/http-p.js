import { config } from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1000: '输入参数错误',
  1002: '找不到资源',
  1006: '服务器内部错误',
  2000: '您已经点过赞了哦',
  2001: '您还没有点过赞',
  1005: 'appkey无效',
  3000: '期刊不存在'
}
class HTTP {
  request({url,data={},method="GET"}){
     return new Promise((resolve,reject)=>{
         this._request(url,resolve,reject,data,method)
      })
  }
  _request(url,resolve,reject,data={},method="GET") {
    //参数有url,data,method
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
           resolve(res.data)
        }
        else {
          reject()
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}
export { HTTP }