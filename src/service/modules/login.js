import http from '../http'
import param from '../param'

export default {
  login(params) {
    return http.post(`Passport?${param(params)}`)
  }
}