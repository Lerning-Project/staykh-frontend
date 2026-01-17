<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  current: {
    type: Number,
    required: true,
  },
  icon: {
    type: [String, Array],
    required: true,
  },
  color: {
    type: String,
    default: 'primary',
  },
})
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white px-5 py-4">
    <div class="flex items-center gap-4">
      <!-- Icon -->
      <div
        :class="[
          'flex h-12 w-12 items-center justify-center rounded-lg',
          color === 'primary' && 'bg-blue-100 text-blue-600',
          color === 'success' && 'bg-green-100 text-green-600',
          color === 'warning' && 'bg-yellow-100 text-yellow-600',
          color === 'danger' && 'bg-red-100 text-red-600',
        ]"
      >
        <font-awesome-icon :icon="icon" class="text-xl" />
      </div>

      <!-- Value + Title -->
      <div>
        <div class="text-2xl font-bold text-gray-900">
          {{ current.toLocaleString() }}
        </div>
        <div class="text-sm text-gray-500">
          {{ title }}
        </div>
      </div>
    </div>
  </div>
</template>
