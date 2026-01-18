<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'submit'])

const form = ref({
  name: '',
  province: '',
  status: 'active',
  totalRooms: 0
})

const lockScroll = () => {
  document.body.style.overflow = 'hidden'
}

const unlockScroll = () => {
  document.body.style.overflow = ''
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      lockScroll()
      form.value = {
        name: '',
        province: '',
        status: 'active',
        totalRooms: 0
      }
    } else {
      unlockScroll()
    }
  }
)

onUnmounted(() => {
  unlockScroll()
})

const close = () => {
  emit('update:modelValue', false)
}

const submitForm = () => {
  emit('submit', {
    ...form.value,
    totalBookings: 0,
    revenue: 0
  })
  close()
}
</script>


<template>
  <!-- Overlay -->
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
  >
    <!-- Dialog -->
    <div class="w-full max-w-lg rounded-xl bg-white shadow-lg">
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">
            Add New Resort
          </h2>
          <p class="text-sm text-gray-400">
            Create a new resort or property
          </p>
        </div>

        <button
          @click="close"
          class="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <!-- Body -->
      <div class="px-6 py-5 grid grid-cols-1 gap-4">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Resort Name
          </label>
          <input
            v-model="form.name"
            type="text"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Angkor Paradise Resort"
          />
        </div>

        <!-- Province -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Province
          </label>
          <input
            v-model="form.province"
            type="text"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Siem Reap"
          />
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            v-model="form.status"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <!-- Rooms -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Total Rooms
          </label>
          <input
            v-model="form.totalRooms"
            type="number"
            min="0"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
        <button
          @click="close"
          class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          @click="submitForm"
          class="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add Resort
        </button>
      </div>
    </div>
  </div>
</template>
