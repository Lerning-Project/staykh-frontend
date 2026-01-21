<script setup>
import { icon } from '@fortawesome/fontawesome-svg-core'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

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

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
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
          <p class="text-xs text-gray-500">
            {{ authStore.user?.role === 'super_admin' ? 'Super Admin' : 'POS Staff' }}
          </p>
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

    <!-- User Profile & Logout Section -->
    <div class="p-4 border-t border-gray-200">
      <!-- <div class="bg-gray-50 rounded-lg p-3 mb-3">
        <div class="flex items-center gap-3 mb-2">
          <div
            class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center shrink-0"
          >
            <font-awesome-icon icon="user" class="text-white" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm text-gray-800 truncate">{{ authStore.user?.name }}</p>
            <p class="text-xs text-gray-500 truncate">{{ authStore.user?.email }}</p>
          </div>
        </div>
      </div> -->
      <button
        @click="handleLogout"
        class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors font-medium"
      >
        <font-awesome-icon icon="right-from-bracket" />
        <span>Logout</span>
      </button>
    </div>
  </aside>
</template>

<style scoped></style>
