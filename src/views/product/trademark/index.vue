<template>
  <div>
    <el-card class="box-card">
      <!-- 添加品牌按钮 -->
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addTrademark"
      >
        添加品牌
      </el-button>
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
            <img
              :src="row.logoUrl"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark"
            ></el-button>
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
        @current-change="changePageNo"
        @size-change="sizeChange"
      />
    </el-card>
    <!-- 对话框 添加、修改品牌时提交修改内容使用 -->
    <!-- 
    v-model 控制对话框显示与隐藏
    title 对话框左上角标题
    -->
    <el-dialog v-model="dialogTableVisible" title="添加品牌" width="800">
      <!-- 表单内容 -->
      <el-form style="width: 80%">
        <!-- 品牌名称 -->
        <el-form-item label="品牌名称" label-width="80px">
          <el-input placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <!-- 品牌LOGO -->
        <el-form-item label="品牌LOGO" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽footer 右下角按钮 -->
      <template #footer>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
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
//控制对话框显示与隐藏
const dialogTableVisible = ref<boolean>(false)
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
//页码发生变化
const changePageNo = () => {
  //
  getHasTrademark()
}
//每页数量发生变化
const sizeChange = () => {
  pageNo.value = 1
  getHasTrademark()
}
//添加品牌按钮回调
const addTrademark = () => {
  dialogTableVisible.value = true
}
// 修改品牌回调
const updateTrademark = () => {
  dialogTableVisible.value = true
}
// 表单取消
const cancel = () => {
  //
}
// 表单确定
const confirm = () => {
  //
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
