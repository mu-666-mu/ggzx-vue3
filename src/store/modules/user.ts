// 用户相关仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin } from '@/api/user'
// 引入类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from '@/store/modules/types/type'
// 引入路由(常量路由)
import { constantRoute } from '@/router/routes'
// 引入本地存储的方法
import { setToken, getToken } from '@/utils/token'

// 创建用户仓库
const useUserStore = defineStore('User', {
  // 仓库存储的数据
  state: (): UserState => {
    return {
      token: getToken(), // 用户的token
      menuRoutes: constantRoute, // 用户的菜单路由
    }
  },
  // 计算属性
  getters: {},
  // 处理异步操作和逻辑
  actions: {
    // 用户登录方法
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data)

      // 登录成功200
      if (result.code === 200) {
        this.token = result.data.token as string
        // 本地持久化存储token
        setToken(result.data.token as string)

        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
})
export default useUserStore
