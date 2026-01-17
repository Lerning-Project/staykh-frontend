<script setup>
const props = defineProps({
  activities: {
    type: Array,
    required: true
  }
})

const categoryConfig = {
  booking: { label: 'Booking', icon: 'calendar-check', color: 'text-blue-600' },
  refund: { label: 'Refund', icon: 'credit-card', color: 'text-red-600' },
  user: { label: 'User', icon: 'user', color: 'text-green-600' },
  resort: { label: 'Resort', icon: 'hotel', color: 'text-purple-600' },
  payment: { label: 'Payment', icon: 'credit-card', color: 'text-emerald-600' },
  review: { label: 'Review', icon: 'star', color: 'text-yellow-500' }
}

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  if (seconds < 60) return `${seconds}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hrs ago`
  return `${Math.floor(seconds / 86400)} days ago`
}
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white">
    <!-- Header -->
    <div class="border-b border-gray-200 px-6 py-4">
      <h2 class="text-xl font-semibold text-gray-800">
        Recent System Activities
      </h2>
      <p class="text-sm text-gray-400">
        Latest updates and events across the platform
      </p>
    </div>

    <!-- Table Header -->
    <div
      class="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold uppercase text-gray-500 border-b border-gray-200"
    >
      <div class="col-span-1">Type</div>
      <div class="col-span-2">Category</div>
      <div class="col-span-7">Description</div>
      <div class="col-span-2 text-right">Time</div>
    </div>

    <!-- Rows -->
    <div v-if="activities.length">
      <div
        v-for="(activity, index) in activities"
        :key="index"
        class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition"
      >
        <!-- Icon -->
        <div class="col-span-1">
          <font-awesome-icon
            :icon="categoryConfig[activity.type].icon"
            :class="categoryConfig[activity.type].color"
          />
        </div>

        <!-- Category -->
        <div class="col-span-2 text-sm font-medium text-gray-700">
          {{ categoryConfig[activity.type].label }}
        </div>

        <!-- Message -->
        <div class="col-span-7 text-sm text-gray-600">
          {{ activity.message }}
        </div>

        <!-- Time -->
        <div class="col-span-2 text-right text-sm text-gray-400">
          {{ timeAgo(activity.createdAt) }}
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="py-12 text-center text-sm text-gray-400"
    >
      No system activities found
    </div>
  </div>
</template>
