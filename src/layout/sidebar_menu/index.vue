<template>
  <!-- <h1>{{ menuList }}</h1> -->
  <template v-for="item in visibleMenus" :key="item.path">
    <!-- 没有子路由 -->
    <el-menu-item v-if="!item.children" :index="item.path" @click="goRouter">
      <el-icon>
        <component :is="item.meta?.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 一个子路由 -->
    <el-menu-item
      v-if="item.children && item.children.length == 1"
      :index="item.children[0].path"
      @click="goRouter"
    >
      <el-icon>
        <component :is="item.children[0].meta?.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 多个子路由 -->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1"
      @click="goRouter"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta?.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <SidebarMenu :menuList="item.children"></SidebarMenu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
//获取父组件传来的路由数组
const props = defineProps(['menuList'])
//筛选menuList需要展示的路由
const visibleMenus = computed(() => {
  return props.menuList.filter((item: any) => !item.meta?.hidden)
})
defineOptions({
  name: 'SidebarMenu',
})
//点击菜单的回调
const goRouter = (vc: any) => {
  $router.push(vc.index)
}
</script>

<style scoped></style>
