import Fly from 'flyio'
import Cookies from 'js-cookie'
import { message } from 'antd'

// 拦截器. 请求前
Fly.interceptors.request.use(request => {
    request.timeout = 10000
    request.headers['api-token-sign'] = Cookies.get('token') || ''
    return request
})

// 拦截器. 响应返回
Fly.interceptors.response.use(
    response => response.data,
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
