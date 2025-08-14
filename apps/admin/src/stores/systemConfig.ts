import { defineStore } from 'pinia'

// 系统配置
export const useSystemConfigStore = defineStore('systemConfig', () => {
  // 主题
  const theme = ref('')
  // 菜单收起、展开
  const menuCollapsed = ref(false)

  function toggleMenuCollapsed() {
    menuCollapsed.value = !menuCollapsed.value
  }

  return { theme, menuCollapsed, toggleMenuCollapsed }
})
