//商品分类全局组件的仓库
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import { defineStore } from 'pinia'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/type'
const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      //存储一级分类数据
      c1Arr: [],
      //存储一级分类ID
      c1Id: '',
      //存储二级分类数据
      c2Arr: [],
      //存储二级分类ID
      c2Id: '',
      //存储三级分类数据
      c3Arr: [],
      //存储三级分类ID
      c3Id: '',
    }
  },
  actions: {
    //获取一级分类方法
    async getC1() {
      //发请求获取一级分类
      const result: CategoryResponseData = await reqC1()
      //console.log(result)
      if (result.code == 200) {
        this.c1Arr = result.data
      }
    },
    //获取二级分类的方法
    async getC2() {
      //发请求获取二级分类
      const result: CategoryResponseData = await reqC2(this.c1Id)
      if (result.code == 200) {
        this.c2Arr = result.data
      }
    },
    //获取三级分类的方法
    async getC3() {
      //发请求获取二级分类
      const result: CategoryResponseData = await reqC3(this.c2Id)
      // console.log(result)

      if (result.code == 200) {
        this.c3Arr = result.data
      }
    },
  },

  getters: {
    //
  },
})
export default useCategoryStore
