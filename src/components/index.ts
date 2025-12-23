// 全局组件的统一出口
import type { App } from 'vue'

import SvgIcon from './SvgIcon'

const components = [SvgIcon]

export default {
  install(app: App) {
    components.forEach((c) => {
      app.use(c)
    })
  },
}
