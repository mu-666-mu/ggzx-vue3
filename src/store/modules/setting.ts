// 关于layout组件相关配置的仓库

import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('settingStore', {
  state: () => {
    return {
      fold: false, //控制左侧菜单是否折叠
      refresh: false, //控制这个属性用于控制刷新效果
    }
  },
})
export default useLayoutSettingStore
