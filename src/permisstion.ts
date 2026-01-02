//路由鉴权
import router from '@/router'
//进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
//
import setting from './setting'
//获取userStore
import useUserStore from './store/modules/user'
import pinia from './store'
const userStore = useUserStore(pinia)
//全局守卫
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title}-${to.meta.title}`
  NProgress.start()
  //获取token，获取登录状态
  const token = userStore.token
  const userName = userStore.userName
  if (token) {
    //登录状态
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      //登陆成功访问非login
      if (userName) {
        //有用户信息
        next()
      } else {
        //无用户信息，获取后再放行
        try {
          await userStore.userInfo()
          next()
        } catch {
          // token过期，用户手动修改本地存储token
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    //未登录状态
    if (to.path == '/login') {
      next()
    } else {
      next({ path: 'login', query: { redirect: to.path } })
    }
  }
})
//全局后置守卫
router.afterEach((to: any, from: any) => {
  NProgress.done()
})
