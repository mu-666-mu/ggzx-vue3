import { createApp } from 'vue'
import App from '@/App.vue'

//引入模板的全局样式
import '@/styles/index.scss'
//引入自定义全局组件
import Components from '@/components/index'
//svg插件需要适配代码
import 'virtual:svg-icons-register'
//引入路由器
import router from '@/router/index'

const app = createApp(App)

//全局注册自定义组件
app.use(Components)
//注册模板路由

app.use(router)
//将App组件挂载到id为app的元素上
app.mount('#app')
