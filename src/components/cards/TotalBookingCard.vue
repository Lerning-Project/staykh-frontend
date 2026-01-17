<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  current: {
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
  valueColor: {
    type: String,
    default: 'default' // default | primary | success | warning | danger
  }
})
</script>

<template>
  <div
    class="rounded-xl border border-gray-200 bg-white px-5 py-4 transition"
  >
    <div class="flex items-center justify-between gap-5">
      <!-- Left: Value & Title -->
      <div>
        <div
          class="text-2xl font-bold"
          :class="{
            'text-gray-900': valueColor === 'default',
            'text-blue-600': valueColor === 'primary',
            'text-green-600': valueColor === 'success',
            'text-yellow-600': valueColor === 'warning',
            'text-red-600': valueColor === 'danger'
          }"
        >
          {{ current.toLocaleString() }}
        </div>

        <div class="mt-1 text-sm text-gray-500">
          {{ title }}
        </div>
      </div>

      <!-- Right: Icon -->
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
    </div>
  </div>
</template>
