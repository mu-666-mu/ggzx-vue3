// 全局组件的统一出口
import type { App } from 'vue'

import SvgIcon from './SvgIcon'
import Category from './Category/index'
const components = [SvgIcon, Category]

export default {
  install(app: App) {
    components.forEach((c) => {
      app.use(c)
    })
  },
}
