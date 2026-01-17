<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  icon: {
    type: [String, Array],
    required: true
  },
  color: {
    type: String,
    default: 'primary' // primary | success | warning | danger
  },
  trendText: {
    type: String,
    default: ''
  },
  trendColor: {
    type: String,
    default: 'default' // default | success | danger | warning
  }
})
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-sm">
    <div class="flex items-center gap-4">
      <!-- Icon -->
      <div
        :class="[
          'flex h-12 w-12 items-center justify-center rounded-lg',
          color === 'primary' && 'bg-blue-100 text-blue-600',
          color === 'success' && 'bg-green-100 text-green-600',
          color === 'warning' && 'bg-yellow-100 text-yellow-600',
          color === 'danger' && 'bg-red-100 text-red-600'
        ]"
      >
        <font-awesome-icon :icon="icon" class="text-xl" />
      </div>

      <!-- Content -->
      <div class="flex-1">
        <div class="text-sm text-gray-500">
          {{ title }}
        </div>

        <div class="text-2xl font-bold text-gray-900">
          ${{ amount.toLocaleString() }}
        </div>

        <div
          v-if="trendText"
          class="mt-1 text-xs"
          :class="{
            'text-gray-400': trendColor === 'default',
            'text-green-600': trendColor === 'success',
            'text-red-600': trendColor === 'danger',
            'text-yellow-600': trendColor === 'warning'
          }"
        >
          {{ trendText }}
        </div>
      </div>
    </div>
  </div>
</template>
