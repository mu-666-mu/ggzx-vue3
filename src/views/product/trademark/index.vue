<template>
  <el-card class="box-card">
    <!-- 添加品牌按钮 -->
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <!-- 表格区域，展示已有品牌数据 -->
    <el-table style="margin: 10px 0px" border :data="trademarkArr">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名称" align="center">
        <template v-slot="{ row }">
          <pre>{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO" align="center">
        <template v-slot="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="{ row }">
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器
    el-pagination：
    v-model:current-page 分页器当前页码
    v-model:page-size 每页展示数据条数
    page-sizes 设置下拉菜单数据
      -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
import type {
  Records,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
// 当前页码
const pageNo = ref<number>(1)
// 每页展示数据数量
const limit = ref<number>(3)
// 存在品牌总数
const total = ref<number>(0)
// 存储已有品牌数据
const trademarkArr = ref<Records>([])

//获取已有品牌的接口封装为函数
const getHasTrademark = async () => {
  const result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
onMounted(() => {
  getHasTrademark()
})
</script>

<style scoped></style>
