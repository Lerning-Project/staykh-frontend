<script setup>
import { icon } from '@fortawesome/fontawesome-svg-core'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const menuItems = [
  { name: 'Dashboard Overview', path: '/', icon: 'house' },
  { name: 'Resorts / Properties', path: '/resorts', icon: 'hotel' },
  { name: 'Room Varieties', path: '/rooms', icon: 'door-open' },
  { name: 'Province Management', path: '/provinces', icon: 'location-dot' },
  { name: 'Users Management', path: '/users', icon: 'users' },
  { name: 'Bookings Management', path: '/bookings', icon: 'calendar-check' },
  { name: 'Payment & Refund', path: '/payments', icon: 'credit-card' },
  { name: 'Reviews & Ratings', path: '/reviews', icon: 'star' },
  { name: 'Media & Library', path: '/medias', icon: 'images' },
  { name: 'Roles & Permissions', path: '/roles', icon: 'user-lock' },
  { name: 'Analytics', path: '/analytics', icon: 'chart-line' },
  { name: 'Settings', path: '/settings', icon: 'cog' },
]

const isActive = (path) => {
  return route.path === path
}
</script>

<template>
  <aside class="w-68 text-white flex flex-col">
    <!-- Logo Section -->
    <div class="py-3.5 px-3 border-b border-r border-gray-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <font-awesome-icon icon="hotel" class="text-indigo-900 text-xl" />
        </div>
        <div>
          <h1 class="text-xl text-gray-700 font-bold">StayKH</h1>
          <p class="text-xs text-gray-500">Super Admin</p>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 p-4 overflow-y-auto">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.path">
          <RouterLink
            :to="item.path"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
              isActive(item.path)
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-blue-100 hover:text-blue-500 hover:translate-x-1',
            ]"
          >
            <font-awesome-icon :icon="item.icon" class="text-lg w-5" />
            <span>{{ item.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- User Profile Section -->
  </aside>
</template>

<style scoped></style>
