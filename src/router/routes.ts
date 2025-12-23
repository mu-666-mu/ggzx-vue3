//对外暴露配置路由
export const constantRoute = [
  {
    //登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login', //路由名称
  },
  {
    //登陆成功主页
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'Layout', //路由名称
  },
  {
    //404页面
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404', //路由名称
  },
  {
    //任意路由跳转到404页面
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any', //路由名称
  },
]
