//品牌管理模块接口
import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'
export const API = {
  //获取已有品牌接口
  TRADEMARK_URL: 'admin/product/baseTrademark/',
  //添加新品牌接口
  ADDTRADEMARK_URL: '/admin/product/baseTrademark/save',
  //修改已有品牌接口
  UPDATETRADEMARK_URL: '/admin/product/baseTrademark/update',
} as const
//获取已有品牌的接口方法
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
//添加、修改品牌信息
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    //存在id，修改已存在品牌
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  }
  //不存在id，添加新品牌
  else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
