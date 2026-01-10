//分类相关数据的ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//分类相关ts类型
export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}
//分类接口返回的数据ts类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}
