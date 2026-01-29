<template>
  <div>
    <!-- 三级分类模块 -->
    <Category :cardChange="cardChange"></Category>
    <!-- 下方卡片 -->
    <el-card style="margin: 10px 0px">
      <!-- 属性信息展示 -->
      <div v-show="cardChange == 0">
        <!-- 添加属性按钮 -->
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addAttr"
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
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateAttr(row)"
              ></el-button>

              <el-popconfirm
                title="确定删除该属性吗？"
                width="200px"
                confirm-button-text="确定"
                cancel-button-text="取消"
                @confirm="deleteAttr(row.id)"
              >
                <template #reference>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加、修改 属性对话框 -->
      <div v-show="cardChange == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 添加属性值按钮 -->
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="attrParams.attrName ? false : true"
          @click="addAddValue"
        >
          添加属性值
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
        <!-- 表格 -->
        <el-table
          border
          style="margin: 10px 0px"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            width="80px"
            type="index"
            label="序号"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称" align="center">
            <!-- row为当前属性值对象 -->
            <template #default="{ row, $index }">
              <el-input
                v-if="row.showFlag"
                placeholder="请输入属性值名称"
                :ref="(vc: any) => (inputArr[$index] = vc)"
                v-model="row.valueName"
                size="small"
                @blur="toShow(row, $index)"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作" align="center">
            <template #default="{ $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 按钮 -->
        <el-button
          type="primary"
          size="default"
          @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
        >
          保存
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
//--------------------------------------------------------------
//引入分类仓库
import useCategoryStore from '@/store/modules/category'
//引入watch监听,ref
import { nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
//引入获取商品属性API
import {
  reqAttr,
  reqAddOrUpdateAttr,
  reqDeleteAttr,
} from '@/api/product/attr/index.ts'
//引入类型
import type {
  AttrResponseData,
  AttrInfo,
  AttrValue,
} from '@/api/product/attr/type.ts'
import { ElMessage } from 'element-plus'
//--------------------------------------------------------------
//分类仓库实例化
const categoryStore = useCategoryStore()
//--------------------------------------------------------------
//存储商品属性数据
const attrArr = ref<AttrInfo[]>([])
//定义下方卡片切换的变量
const cardChange = ref(0) //0表示属性列表，1表示添加属性
//定义一个数组，存储对应的组件实例el-input
const inputArr = ref<any>([])
//--------------------------------------------------------------
//添加属性按钮点击事件
const addAttr = () => {
  //先清空之前数据，再收集新数据
  //顺便收集三级分类id
  Object.assign(attrParams, {
    attrName: '', //新增属性名称
    attrValueList: [], //新增属性值数组
    categoryId: categoryStore.c3Id, //三级分类ID
    categoryLevel: 3, //代表三级分类
  })
  //切换为添加属性卡片
  cardChange.value = 1
}
//修改属性按钮点击事件
const updateAttr = (row: Attr) => {
  //切换为添加属性卡片
  cardChange.value = 1
  //将已有数据赋值给attrParams
  // Object.assign(attrParams, row) //存在浅拷贝问题
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
//取消按钮点击事件
const cancel = () => {
  //切换为属性列表卡片
  cardChange.value = 0
}
//收集新增属性值数据
const attrParams = reactive<AttrInfo>({
  attrName: '', //新增属性名称
  attrValueList: [], //新增属性值数组
  categoryId: '', //三级分类ID
  categoryLevel: 3, //代表三级分类
})
//添加属性值按钮点击事件
const addAddValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    showFlag: true, //每个属性值编辑与显示模式的切换标识符
  })
  //新添加项聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
//保存按钮点击事件
const save = async () => {
  //发请求
  const result: any = await reqAddOrUpdateAttr(attrParams)
  console.log(result)
  if (result.code === 200) {
    //提示添加成功
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改属性成功' : '添加属性成功',
    })
    //切换为属性列表卡片
    cardChange.value = 0
    //重新请求属性数据
    getAttr()
  } else {
    //提示添加失败
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改属性失败' : '添加属性失败',
    })
  }
}
//属性值名称输入框失去焦点事件
const toShow = (row: AttrValue, $index: number) => {
  //1.数据不为空
  if (row.valueName.trim() === '') {
    //删除空数据
    attrParams.attrValueList.splice($index, 1)
    //提示错误
    ElMessage({
      type: 'warning',
      message: '属性值名称不能为空',
    })
    return
  }
  //2.数据不重复
  const isRepeat = attrParams.attrValueList.find((item) => {
    //当前失去焦点数据对象不参与判断
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (isRepeat) {
    //删除重复数据
    attrParams.attrValueList.splice($index, 1)
    //提示错误
    ElMessage({
      type: 'warning',
      message: '属性值名称重复',
    })
    return
  }
  //切换为显示模式
  row.showFlag = false
}
//属性值名称div点击事件
const toEdit = (row: AttrValue, $index: number) => {
  row.showFlag = true
  nextTick(() => {
    //
    inputArr.value[$index].focus()
  })
}
//删除属性按钮点击事件
const deleteAttr = async (attrId: number) => {
  //发送删除请求
  const result = await reqDeleteAttr(attrId)
  if (result.code === 200) {
    //提示删除成功
    ElMessage({
      type: 'success',
      message: '删除属性成功',
    })
    //重新请求属性数据
    getAttr()
  } else {
    //提示删除失败
    ElMessage({
      type: 'error',
      message: '删除属性失败',
    })
  }
}
//--------------------------------------------------------------
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
//--------------------------------------------------------------
//组件卸载前，重置分类仓库中的分类ID
onBeforeUnmount(() => {
  //重置分类仓库中的分类ID
  categoryStore.$reset()
})
</script>

<style scoped></style>
