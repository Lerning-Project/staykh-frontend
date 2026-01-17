<script setup>
defineProps({
  image: String,
  type: String, // image | video
  name: String,
  size: String,
  updatedAt: String,
  usedIn: String
})
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white overflow-hidden transition hover:shadow-md">
    <!-- Media Preview -->
    <div class="relative h-40 bg-gray-100">
      <img
        v-if="type === 'image'"
        :src="image"
        class="h-full w-full object-cover"
      />

      <video
        v-else
        :src="image"
        class="h-full w-full object-cover"
        muted
      />

      <!-- Type Badge (Right side) -->
      <span
        class="absolute right-3 top-3 rounded-full px-2 py-0.5 text-xs font-medium"
        :class="type === 'image'
          ? 'bg-blue-100 text-blue-700'
          : 'bg-purple-100 text-purple-700'"
      >
        {{ type }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-4 space-y-2">
      <h4 class="truncate font-semibold text-gray-800">
        {{ name }}
      </h4>

      <div class="text-sm text-gray-500 space-y-1">
        <p>Size: {{ size }}</p>
        <p>Updated: {{ updatedAt }}</p>
        <p class="truncate">
          Used in: <span class="font-medium text-gray-700">{{ usedIn }}</span>
        </p>
      </div>

      <!-- Actions -->
      <div class="flex gap-2 pt-3">
        <!-- Preview (75%) -->
        <button
          class="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          @click="$emit('preview')"
        >
          <font-awesome-icon icon="eye" class="mr-2" />
          Preview
        </button>

        <!-- Delete (25%) -->
        <button
          class="w-12 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition flex items-center justify-center"
          @click="$emit('delete')"
          title="Delete"
        >
          <font-awesome-icon icon="trash" />
        </button>
      </div>
    </div>
  </div>
</template>
