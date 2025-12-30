<template>
  <!-- 顶部右侧内容 -->
  <!-- 按钮 -->
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefresh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="FullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <!-- 头像 -->
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50%"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.userName }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()
const layoutSettingStore = useLayoutSettingStore()
//用户相关数据
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
// 刷新按钮回调
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
// 全屏按钮回调
const FullScreen = () => {
  const full = document.fullscreenElement //用于判断当前是否全屏
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
//点击退出登录回调
const logout = () => {
  //向服务器发送请求
  //仓库中关于用户数据清空
  userStore.userLogout()
  //跳转登陆页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
defineOptions({
  name: 'Setting',
})
</script>

<style scoped lang="scss"></style>
