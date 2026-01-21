<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const pageTitle = computed(() => {
  const name = route.name || 'Dashboard'
  return name.charAt(0).toUpperCase() + name.slice(1)
})
</script>

<template>
  <main class="flex-1 flex flex-col overflow-hidden">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="px-8 py-2">
        <div class="flex items-center justify-between">
          <!-- Page Title -->
          <!-- <div class="shrink-0">
            <h2 class="text-2xl font-bold text-gray-800">{{ pageTitle }}</h2>
          </div> -->

          <!-- Right Side: Search, Notifications, User Profile -->
          <div class="flex items-center justify-between gap-4 w-full">
            <!-- Search Bar -->
            <div class="relative">
              <input
                type="text"
                placeholder="Search resorts, users, bookings..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-[60vw]"
              />
              <font-awesome-icon
                icon="magnifying-glass"
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            <div class="flex items-center gap-2">
              <!-- Notifications -->
              <button
                class="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <font-awesome-icon icon="bell" class="text-xl" />
                <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <!-- User Profile -->
              <div
                class="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <div class="text-right">
                  <p class="font-semibold text-sm text-gray-800">
                    {{ authStore.user?.name || 'User' }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ authStore.user?.email || 'user@staykh.com' }}
                  </p>
                </div>
                <div
                  class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center shrink-0"
                >
                  <font-awesome-icon icon="user" class="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <div class="flex-1 overflow-y-auto bg-gray-50 pb-10">
      <div class="p-8">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
