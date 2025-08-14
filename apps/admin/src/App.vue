<template>
  <template v-if="isRouterReady">
    <router-view v-if="noUseLayout" />
    <LayoutIndex v-else />
  </template>
  <div v-else>loading</div>
</template>

<script lang="ts" setup>
import TdesignLayout from '@/ui/tdesign/layout/LayoutIndex.vue'

const LayoutIndex = TdesignLayout

const route = useRoute()
const router = useRouter()

// 路由是否准备完毕
const isRouterReady = ref(false)

router.isReady().then(() => {
  isRouterReady.value = true
})

const noUseLayout = computed(() => route.meta.noUseLayout)
</script>
