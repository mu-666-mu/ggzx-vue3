import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//引入mock插件
import {viteMockServe} from 'vite-plugin-mock'
//引入path模块
import path from 'path'
//引入element-plus按需加载插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//引入svg图标插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //配置element-plus按需加载
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    //配置svg图标插件
    createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
    }),
    //配置mock插件
    viteMockServe({
      //mock文件夹路径
      mockPath: 'mock',
      //是否在开发环境启用
      enable: true,
    }),
  ],
  resolve: {
        alias: {
            "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
        }
    },
  css: {
      preprocessorOptions: {
        scss: {
          additionalData: 
            '@use "@/styles/var.scss" as *;'
        },
      },
    },
})
