import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
//引入mock插件
import { viteMockServe } from 'vite-plugin-mock'
//引入path模块
import path from 'path'
//引入element-plus按需加载插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//引入svg图标插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     //配置element-plus按需加载
//     AutoImport({
//       resolvers: [ElementPlusResolver()],
//     }),
//     Components({
//       resolvers: [ElementPlusResolver()],
//     }),
//     //配置svg图标插件
//     createSvgIconsPlugin({
//       // Specify the icon folder to be cached
//       iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
//       // Specify symbolId format
//       symbolId: 'icon-[dir]-[name]',
//     }),
//     //配置mock插件
//     viteMockServe({
//       //mock文件夹路径
//       mockPath: 'mock',
//       //是否在开发环境启用
//       enable: true,
//     }),
//   ],
//   resolve: {
//     alias: {
//       '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
//     },
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: '@use "@/styles/var.scss" as *;',
//       },
//     },
//   },
// })
export default defineConfig(({ mode }) => {
  //获取各种环境下的对应的变量
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',
        enable: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/var.scss" as *;',
        },
      },
    },
    //代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
})
