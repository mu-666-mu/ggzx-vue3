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
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <!-- 品牌LOGO -->
        <el-form-item label="品牌LOGO" label-width="80px">
          <!-- upload组件：
          action 图片上传路径书写/api，代理服务器不发送这次post请求
          before-upload 上传文件之前的钩子，可用于限制上传文件格式、大小
          on-success 上传成功钩子
          -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="{ token: userStore.token }"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
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
import { onMounted, reactive, ref } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
} from '@/api/product/trademark'
import type {
  Records,
  TradeMark,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
//
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
//
import useUserStore from '@/store/modules/user'
import { f } from 'vue-router/dist/router-CWoNjPRp.mjs'
const userStore = useUserStore()
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
// 收集新增品牌数据
const trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
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
  //清空收集到的数据
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
}
// 修改品牌回调
const updateTrademark = () => {
  dialogTableVisible.value = true
}
// 表单取消
const cancel = () => {
  //关闭对话框
  dialogTableVisible.value = false
}
// 表单确定
const confirm = async () => {
  const result = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    //添加成功
    //关闭对话框
    dialogTableVisible.value = false
    //弹出提示信息
    ElMessage({
      type: 'success',
      message: '添加品牌成功',
    })
    //发请求，重新获取全部品牌数据
    getHasTrademark()
  } else {
    //添加失败
    //弹出提示信息
    ElMessage({
      type: 'error',
      message: '添加品牌失败',
    })
    //关闭对话框
    dialogTableVisible.value = false
  }
  //
}
// 图片上传之前钩子函数beforeAvatarUpload
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  //上传成功前触发
  //console.log(rawFile)

  //要求格式png|jpg|gif <4M
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpg' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    //要求符合大小
    if (rawFile.size / 1024 / 1024 < 10) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '文件大小应小于10M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '文件上传格式应为PNG|JPG|GIF',
    })
    return false
  }
}
// 图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  //response 当次上传图片post请求服务器返回的数据
  //uploadFile
  trademarkParams.logoUrl = response.data
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
