// 二次封装封装axios请求模块
// 引入axios和element-plus消息提示组件
import useUserStore from '@/store/modules/user'
import axios from 'axios'
import { ElMessage } from 'element-plus'

//创建axios实例
const request = axios.create({
  //基础路径，来自环境变量
  baseURL: import.meta.env.VITE_APP_BASE_API,
  //请求超时时间
  timeout: 5000,
})
//请求拦截器
request.interceptors.request.use((config) => {
  const UserStore = useUserStore()
  if (UserStore.token) {
    config.headers.token = UserStore.token
  }
  return config
})
//响应拦截器
request.interceptors.response.use(
  (response) => {
    //处理响应数据,简化返回值
    return response.data
  },
  (error) => {
    //处理网络错误
    let msg = ''
    const status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg,
    })
    return Promise.reject(error)
  },
)
// 导出请求方法
export default request
