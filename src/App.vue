<script setup>
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import Sidebar from './layouts/Sidebar.vue'
import Content from './layouts/Content.vue'

const route = useRoute()

// Check if current route is an auth page or POS page
const isFullScreenPage = computed(() => {
  return route.path === '/activate' || route.path === '/confirm-otp' || route.path === '/pos'
})
</script>

<template>
  <!-- Full screen pages (auth/pos) - without admin sidebar -->
  <div v-if="isFullScreenPage" class="h-screen bg-gray-50">
    <RouterView />
  </div>

  <!-- Dashboard pages - with sidebar and content layout -->
  <div v-else class="flex h-screen bg-gray-100 overflow-hidden">
    <Sidebar />
    <Content />
  </div>
</template>

<style scoped></style>
