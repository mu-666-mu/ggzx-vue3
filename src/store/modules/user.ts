// 用户相关仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import type { UserState } from '@/store/modules/types/type'
// 引入路由(常量路由)
import { constantRoute } from '@/router/routes'
// 引入本地存储的方法
import { setToken, getToken, REMOVE_TOKEN } from '@/utils/token'

// 创建用户仓库
const useUserStore = defineStore('User', {
  // 仓库存储的数据
  state: (): UserState => {
    return {
      token: getToken(), // 用户的token
      menuRoutes: constantRoute, // 用户的菜单路由
      userName: '', // 用户名
      avatar: '', //用户头像
    }
  },
  // 计算属性
  getters: {},
  // 处理异步操作和逻辑
  actions: {
    // 用户登录方法
    async userLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data)
      console.log(result)

      // 登录成功200
      if (result.code === 200) {
        this.token = result.data as string
        // 本地持久化存储token
        setToken(result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 获取用户信息
    async userInfo() {
      const result: userInfoResponseData = await reqUserInfo()
      //console.log(result)

      if (result.code == 200) {
        this.userName = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败')
      }
    },
    // 退出登录
    async userLogout() {
      const result: any = await reqLogout()
      if (result.code == 200) {
        this.token = ''
        this.userName = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
})
export default useUserStore
