//统一管理项目用户相关接口
//引入封装的请求模块
import request from '@/utils/request'
//引入接口需要的参数和响应数据的ts类型
import type { loginForm, loginResponseData, userResponseData } from './type'

//统一管理接口
export const API = {
  LOGIN_URL: '/user/login',
  USERINFO_URL: '/user/info',
} as const

//登录接口
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

//获取用户信息
export const reqUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL)

//退出登录
// export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
