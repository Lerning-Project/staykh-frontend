<script setup>
defineProps({
  role: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  totalUsers: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md">
    <!-- Top -->
    <div class="mb-4 flex items-center justify-between">
      <!-- Protect Icon (Left) -->
      <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
        <font-awesome-icon icon="shield-halved" class="text-lg" />
      </div>

      <!-- Edit Icon (Right) -->
      <button
        class="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-500 hover:bg-gray-200 transition"
        title="Edit Role"
        @click="$emit('edit')"
      >
        <font-awesome-icon icon="pen-to-square" class="text-sm" />
      </button>
    </div>

    <!-- Role -->
    <h3 class="text-lg font-semibold text-gray-800">
      {{ role }}
    </h3>

    <!-- Description -->
    <p class="mt-1 text-sm text-gray-500">
      {{ description }}
    </p>

    <!-- Divider -->
    <div class="my-4 border-t border-gray-200"></div>

    <!-- Footer -->
    <div class="flex items-center justify-between">
      <div class="text-sm text-gray-500">
        Total users:
        <span class="font-semibold text-gray-800">
          {{ totalUsers }}
        </span>
      </div>

      <button
        class="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition"
        @click="$emit('view')"
      >
        View Detail
      </button>
    </div>
  </div>
</template>
