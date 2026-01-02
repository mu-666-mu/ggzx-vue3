//品牌管理模块接口
import request from '@/utils/request'
import type { TradeMarkResponseData } from './type'
export const API = {
  //获取已有品牌接口
  TRADEMARK_URL: 'admin/product/baseTrademark/',
} as const
//获取已有品牌的接口方法
//
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
