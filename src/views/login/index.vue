<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">占位的格子</el-col>
      <el-col :span="12" :xs="24">
        <!-- 登录表单 -->
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// 引入图标
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
// 引入用户相关的store
import useUserStore from '@/store/modules/user'
// 引入路由实例
import { useRouter } from 'vue-router'
// 引入ele-plus消息通知组件
import { ElNotification } from 'element-plus'
//引入获取当前小时的方法
import { getTimeHour } from '@/utils/time'
// 获取用户相关的store实例
const userStore = useUserStore()
// 获取路由实例
const $router = useRouter()
// 获得el-form组件
const loginForms = ref()
// 定义变量控制按钮的加载效果
let loading = ref(false)
// 收集账号密码数据
let loginForm = reactive({
  username: '',
  password: '',
})
// 登录按钮点击事件
const login = async () => {
  try {
    try {
      await loginForms.value.validate()
    } catch {
      // ❗只拦截“表单校验失败”
      return
    }
    loading.value = true // 开启加载效果
    await userStore.userLogin(loginForm)
    // 登录成功后跳转到首页
    $router.push('/')
    // 提示登录成功
    ElNotification({
      type: 'success',
      message: 'success',
      title: `Hi,${getTimeHour()}`,
    })
  } catch (error) {
    // 登录失败，提示错误信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  } finally {
    loading.value = false // 无论成功失败都关闭加载效果
  }
}
// 定义表单校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 3,
      max: 10,
      message: '长度在3到10个字符',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 6,
      max: 15,
      message: '长度在6到15个字符',
      trigger: 'blur',
    },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat center;
  background-size: cover;
}
.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat center;
  background-size: cover;
  padding: 40px;
  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0px;
  }
  .login_btn {
    width: 100%;
  }
}
</style>
