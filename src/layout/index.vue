<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          :collapse="layoutSettingStore.fold ? true : false"
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
        >
          <SidebarMenu :menuList="userStore.menuRoutes"></SidebarMenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 主要内容 -->
    <div
      class="layout_main"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
//引入左侧菜单的logo组件
import Logo from '@/layout/logo/index.vue'
//引入菜单组件
import SidebarMenu from '@/layout/sidebar_menu/index.vue'
// 引入main组件
import Main from '@/layout/main/index.vue'
//引入顶部tabbar组件
import Tabbar from '@/layout/tabbar/index.vue'
//引入用户相关仓库
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
//引入layout配置相关仓库
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()
//获取路由对象
const $route = useRoute()
defineOptions({
  name: 'Layout',
})
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    color: white;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - #{$base-menu-logo-height});
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - #{$base-menu-width});
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - #{$base-menu-width});
    height: calc(100vh - #{$base-tabbar-height});
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
