<template>
  <div>
    <h1>一级路由Home</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
//获取user仓库
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
//首页挂载完毕请求用户信息
onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped></style>
