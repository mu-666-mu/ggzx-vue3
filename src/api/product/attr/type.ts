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

//属性、属性值的ts类型

//属性值对象的ts类型
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  showFlag?: boolean
}
//存储每一个属性值的数组类型
export type AttrValueList = AttrValue[]
//属性对象的ts类型
export interface AttrInfo {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}
//存储每一个属性的数组类型
export type AttrList = AttrInfo[]
//获取商品属性接口返回的数据ts类型
export interface AttrResponseData extends ResponseData {
  data: AttrInfo[]
}
