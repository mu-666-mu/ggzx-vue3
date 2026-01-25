<template>
  <div>
    <!-- 三级分类 -->
    <Category></Category>
    <!-- 下方卡片 -->
    <el-card style="margin: 10px 0px">
      <!-- 添加属性按钮 -->
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="categoryStore.c3Id ? false : true"
      >
        添加属性
      </el-button>
      <!-- 表格 -->
      <el-table border style="margin: 10px 0px" :data="attrArr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          align="center"
          width="120px"
          prop="attrName"
        ></el-table-column>
        <el-table-column label="属性值名称" align="center">
          <template #default="{ row }">
            <el-tag
              style="margin: 5px"
              v-for="item in row.attrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120px">
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="Edit"></el-button>
            <el-button type="primary" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
//引入分类仓库
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()
//引入watch监听,ref
import { ref, watch } from 'vue'
//引入获取商品属性API
import { reqAttr } from '@/api/product/attr/index.ts'
//引入类型
import type { AttrResponseData, Attr } from '@/api/product/attr/type.ts'
//存储商品属性数据
const attrArr = ref<Attr[]>([])
//监听三级分类ID变化，请求商品属性数据
watch(
  () => categoryStore.c3Id,
  () => {
    //清空上一次查询的属性与属性值
    attrArr.value = []
    //保证三级分类得有才能发请求
    if (!categoryStore.c3Id) return
    //获取分类的ID
    getAttr()
  },
)
//获取商品属性数据的方法
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  const result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code === 200) {
    attrArr.value = result.data
  }
}
</script>

<style scoped></style>
