// 封装分类组件

import Category from '@/components/Category/index.vue'
import type { App } from 'vue'
export default {
  install(app: App) {
    app.component('Category', Category)
  },
}
