<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <!-- 一级选择 -->
        <el-form-item label="一级">
          <el-select
            placeholder="请选择"
            v-model="categoryStore.c1Id"
            style="width: 180px"
            @change="handler1"
          >
            <!-- value 下拉菜单收集的数据 -->
            <el-option
              v-for="c1 in categoryStore.c1Arr"
              :key="c1.id"
              :label="c1.name"
              :value="c1.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 二级选择 -->
        <el-form-item label="二级">
          <el-select
            placeholder="请选择"
            v-model="categoryStore.c2Id"
            style="width: 180px"
            @change="handler2"
          >
            <el-option
              v-for="c2 in categoryStore.c2Arr"
              :key="c2.id"
              :label="c2.name"
              :value="c2.id"
            />
          </el-select>
        </el-form-item>
        <!-- 三级选择 -->
        <el-form-item label="三级">
          <el-select
            placeholder="请选择"
            v-model="categoryStore.c3Id"
            style="width: 180px"
          >
            <el-option
              v-for="c3 in categoryStore.c3Arr"
              :key="c3.id"
              :label="c3.name"
              :value="c3.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
//引入生命周期钩子
import { onMounted } from 'vue'
//引入分类相关仓库
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()
onMounted(() => {
  getC1()
})
//通知仓库获取一级分类的方法
const getC1 = () => {
  categoryStore.getC1()
}
//一级分类下拉菜单change事件的回调
const handler1 = () => {
  //获取二级分类
  categoryStore.getC2()
  //清空二、三级分类数据
  categoryStore.c2Arr = []
  categoryStore.c3Arr = []
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
}
//二级分类下拉菜单change事件的回调
const handler2 = () => {
  //获取三级分类
  categoryStore.getC3()
  //清空三级分类数据
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
}
</script>

<style scoped></style>
