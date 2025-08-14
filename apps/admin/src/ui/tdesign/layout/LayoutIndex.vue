<template>
  <t-layout class="app-container">
    <LayoutSide />
    <t-layout>
      <LayoutHeader />
      <t-content>
        <RouterView />
      </t-content>
    </t-layout>
  </t-layout>
</template>

<script lang="tsx" setup>
import LayoutHeader from './LayoutHeader.vue'
import LayoutSide from './LayoutSide.vue'
</script>
