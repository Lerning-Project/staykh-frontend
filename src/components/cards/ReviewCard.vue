<script setup>
defineProps({
  avatar: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  resort: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true // 1 – 5
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'visible' // visible | hidden | flagged
  },
  comment: {
    type: String,
    required: true
  }
})

const statusStyle = {
  visible: 'bg-green-100 text-green-700',
  hidden: 'bg-gray-100 text-gray-600',
  flagged: 'bg-red-100 text-red-600'
}
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5 space-y-4">
    <!-- Header -->
    <div class="flex items-start justify-between gap-4">
      <div class="flex gap-4">
        <!-- Avatar -->
        <img
          v-if="avatar"
          :src="avatar"
          class="h-12 w-12 rounded-full object-cover"
        />
        <div
          v-else
          class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500"
        >
          <font-awesome-icon icon="user" />
        </div>

        <!-- Info -->
        <div>
          <div class="flex items-center gap-2">
            <h4 class="font-semibold text-gray-800">
              {{ name }}
            </h4>

            <span
              class="rounded-full px-2 py-0.5 text-xs font-medium"
              :class="statusStyle[status]"
            >
              {{ status }}
            </span>
          </div>

          <p class="text-sm text-gray-500">
            {{ resort }}
          </p>
        </div>
      </div>

      <!-- Date -->
      <span class="text-xs text-gray-400">
        {{ date }}
      </span>
    </div>

    <!-- Rating -->
    <div class="flex items-center gap-1">
      <font-awesome-icon
        v-for="i in 5"
        :key="i"
        icon="star"
        class="text-sm"
        :class="i <= rating ? 'text-yellow-400' : 'text-gray-300'"
      />
      <span class="ml-2 text-sm text-gray-500">
        {{ rating }}/5
      </span>
    </div>

    <!-- Comment -->
    <p class="text-sm text-gray-700 leading-relaxed">
      {{ comment }}
    </p>

    <!-- Actions -->
    <div class="flex gap-3 pt-3 border-t border-gray-200">
      <button
        class="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        @click="$emit('hide')"
      >
        <font-awesome-icon icon="eye-slash" class="mr-2" />
        Hide Review
      </button>

      <button
        class="flex-1 rounded-lg border border-red-200 bg-red-50 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition"
        @click="$emit('flag')"
      >
        <font-awesome-icon icon="flag" class="mr-2" />
        Flag as Inappropriate
      </button>
    </div>
  </div>
</template>
