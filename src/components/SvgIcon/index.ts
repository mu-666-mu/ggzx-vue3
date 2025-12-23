// 封装SvgIcon组件

import SvgIcon from '@/components/SvgIcon/index.vue'
import type { App } from 'vue'
export default {
  install(app: App) {
    app.component('SvgIcon', SvgIcon)
  },
}
