<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  current: {
    type: Number,
    required: true
  },
  previous: {
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
  }
})

const diff = computed(() => props.current - props.previous)

const percent = computed(() => {
  if (props.previous === 0) return 100
  return ((diff.value / props.previous) * 100).toFixed(1)
})

const trend = computed(() => {
  if (diff.value > 0) return 'up'
  if (diff.value < 0) return 'down'
  return 'same'
})
</script>

<template>
  <div
    class="rounded-xl border border-gray-200 bg-white p-5 transition"
  >
    <!-- Top -->
    <div class="flex items-center justify-between">
      <!-- Main Icon -->
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

      <!-- Trend Badge -->
      <div
        v-if="trend !== 'same'"
        :class="[
          'flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold',
          trend === 'up' && 'bg-green-100 text-green-700',
          trend === 'down' && 'bg-red-100 text-red-700'
        ]"
      >
        <font-awesome-icon
          :icon="trend === 'up' ? 'arrow-trend-up' : 'arrow-trend-down'"
        />
        <span>{{ Math.abs(percent) }}%</span>
      </div>

      <!-- Same -->
      <div
        v-else
        class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500"
      >
        <font-awesome-icon icon="minus" />
        <span class="ml-1">0%</span>
      </div>
    </div>

    <!-- Value -->
    <div class="mt-4 text-2xl font-bold text-gray-900">
      {{ current.toLocaleString() }}
    </div>

    <!-- Title -->
    <div class="mt-1 text-sm text-gray-500">
      {{ title }}
    </div>

    <!-- Compare -->
    <div class="mt-2 text-xs text-gray-400">
      Compared to last month
    </div>
  </div>
</template>
