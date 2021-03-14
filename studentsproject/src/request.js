import axios from 'axios'
import { Message } from 'element-ui'
// 基本实例
const service = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

service.defaults.transformRequest = function(data, headers) {
  if (
    data &&
    headers['Content-Type'] === 'application/x-www-form-urlencoded' &&
    Object.prototype.toString.call(data) === '[object Object]'
  ) {
    return data
  }
  return JSON.stringify(data)
}

/**
 * @description 接口返回数据说明
 * @version 1.0.0
 * code 状态码 200 => success
 * msg 返回信息
 * data 请求数据
 */
// response 拦截器
service.interceptors.response.use(({ data }) => {
  if (data.code !== '200') {
    Message.warning(data.message)
    return Promise.reject(new Error('code!=200'))
  }
  return data
})
export default service