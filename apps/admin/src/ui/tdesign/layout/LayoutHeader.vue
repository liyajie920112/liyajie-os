<template>
  <t-header>
    <t-button
      theme="default"
      variant="text"
      shape="square"
      @click="systemConfigStore.toggleMenuCollapsed"
    >
      <template #icon
        ><IndentLeftIcon v-if="!systemConfigStore.menuCollapsed" /><IndentRightIcon v-else
      /></template>
    </t-button>

    <t-space>
      <t-button theme="default" variant="text" shape="square" @click="toggleDark()">
        <template #icon><MoonIcon v-if="isDark" /><SunnyIcon v-else /></template>
      </t-button>
      <t-dropdown :options="options" trigger="hover">
        <t-space>
          <t-button variant="text">
            <template #icon><UserCircleIcon /></template>
            用户
            <template #suffix> <t-icon name="chevron-down" size="16" /></template>
          </t-button>
        </t-space>
      </t-dropdown>
    </t-space>
  </t-header>
</template>

<script lang="tsx" setup>
import {
  UserCircleIcon,
  PoweroffIcon,
  IndentLeftIcon,
  IndentRightIcon,
  MoonIcon,
  SunnyIcon,
} from 'tdesign-icons-vue-next'

import type { DropdownProps } from 'tdesign-vue-next'
import { useDark, useToggle } from '@vueuse/core'
import { useSystemConfigStore } from '@/stores/systemConfig'
const systemConfigStore = useSystemConfigStore()

const isDark = useDark({
  attribute: 'theme-mode',
  selector: 'html',
  valueDark: 'dark',
  valueLight: '',
})
const toggleDark = useToggle(isDark)

const options: DropdownProps['options'] = [
  {
    content: '个人中心',
    value: '1',
    prefixIcon: () => <UserCircleIcon />,
  },
  {
    content: '退出登录',
    value: '2',
    prefixIcon: () => <PoweroffIcon />,
  },
]
</script>
