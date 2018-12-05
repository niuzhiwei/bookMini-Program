import {config} from '../config.js'

const tips = {
  1:'抱歉，出现了一个错误',
  1000:'输入参数错误',
  1002:'找不到资源',
  1006:'服务器内部错误',
  2000:'您已经点过赞了哦',
  2001:'您还没有点过赞',
  1005:'appkey无效',
  3000:'期刊不存在'
}
class HTTP{
  request(params){
    //参数有url,data,method
      wx.request({
        url: config.api_base_url + params.url,
        method:params.method,
        data:params.data,
        header:{
          'content-type':'application/json',
          'appkey':config.appkey
        },
        success:(res)=>{
            let code = res.statusCode.toString()
            if(code.startsWith('2')){
                   params.success && params.success(res.data)
            }
            else{
               let error_code = res.data.error_code
               this._show_error(error_code)
            }
        },
        fail:(err)=>{
           this._show_error(1)
        }
      })
  }
  _show_error(error_code){
     if(!error_code){
       error_code = 1
     }
      wx.showToast({
        title: tips[error_code],
        icon:'none',
        duration:2000
      })
  }
}
export {HTTP}