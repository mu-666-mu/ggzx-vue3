import { createApp } from 'vue'
import App from '@/App.vue'

//引入模板的全局样式
import '@/styles/index.scss'
//引入element-plus样式
import 'element-plus/dist/index.css'
//引入自定义全局组件
import Components from '@/components/index'
//svg插件需要适配代码
import 'virtual:svg-icons-register'
//引入路由器
import router from '@/router/index'
//引入仓库
import pinia from '@/store/index'

const app = createApp(App)

//全局注册自定义组件
app.use(Components)
//注册模板路由
app.use(router)
//注册pinia仓库
app.use(pinia)

//将App组件挂载到id为app的元素上
app.mount('#app')
