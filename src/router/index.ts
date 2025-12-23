//通过vue-router插件实现模板路由配置
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'
//创建路由器
const router = createRouter({
  //配置路由模式为history模式
  history: createWebHistory(),
  //配置路由规则
  routes: constantRoute,
  //滚动行为,每次切换路由时，滚动到顶部
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    }
  },
})

export default router
