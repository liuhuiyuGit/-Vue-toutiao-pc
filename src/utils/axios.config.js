import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截器
axios.interceptors.request.use(function (config) {
  let user = window.localStorage.getItem('user-info')
  let token = user ? JSON.parse(user).token : null
  //   console.log(token)
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 获取数据返回数据
//   console.log(response)
  return response.data ? response.data : {}
}, function (error) {
  return new Promise()
})
export default axios
