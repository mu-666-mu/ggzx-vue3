import type { RouteRecordRaw } from 'vue-router'

// 定义仓库数据state类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[] // 菜单路由
  userName: string
  avatar: string
}
