// 属性相关API
import request from '@/utils/request'
//引入ts类型
import type { CategoryResponseData, AttrResponseData } from './type'
//定义接口地址
export const API = {
  //获取一级分类
  C1_URL: 'admin/product/getCategory1',
  //获取二级分类
  C2_URL: 'admin/product/getCategory2/',
  //获取三级分类
  C3_URL: 'admin/product/getCategory3/',
  //获取商品属性
  ATTR_URL: 'admin/product/attrInfoList/',
} as const
//获取一级分类
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
//获取二级分类
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
//获取三级分类
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
// 获取商品属性
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
  )
