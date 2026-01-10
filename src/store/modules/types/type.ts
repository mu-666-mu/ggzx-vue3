import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'
// 定义仓库数据state类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[] // 菜单路由
  userName: string
  avatar: string
}
//定义分类仓库state对象的 ts类型
export interface CategoryState {
  //存储一级分类数据
  c1Arr: CategoryObj[]
  //存储一级分类ID
  c1Id: string | number
  //存储二级分类数据
  c2Arr: CategoryObj[]
  //存储二级分类ID
  c2Id: string | number
  //存储三级分类数据
  c3Arr: CategoryObj[]
  //存储三级分类ID
  c3Id: string | number
}
