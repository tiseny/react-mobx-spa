import Fly from 'flyio'
import Cookies from 'js-cookie'
import { message, notification } from 'antd'
const config = require('../../config')

// 拦截器. 请求前
Fly.interceptors.request.use(request => {
  request.url = `${config.apiDomain}/${request.url}`
  request.timeout = 10000
  request.headers['api-token-sign'] = Cookies.get('token') || ''
  return request
})

// 拦截器. 响应返回
Fly.interceptors.response.use(
  response => {
    if (response.data.Code == '000001') {
      notification.error({
        message: '温馨提醒',
        description: '登录已经超时，请重新登录',
      })

      setTimeout(() => {
        Cookies.remove('token')
        window.location.replace(`${config.rootAlias}/login`)  
      }, 2000);

    } else {
      return response.data
    }
  },
  err => {
    message.error(`${err.status} ${err.message}`)
  }
)

export default {
  get(url, param) {
    return Fly.get(url, param)
  },

  post(url, param) {
    return Fly.post(url, param)
  }
}