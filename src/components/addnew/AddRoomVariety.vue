<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue', 'submit'])

const form = ref({
  roomName: '',
  propertyName: '',
  province: '',
  price: 0,
  capacity: 1,
  status: 'available',
  bookings: 0,
})

// Scroll lock when modal opens
const lockScroll = () => (document.body.style.overflow = 'hidden')
const unlockScroll = () => (document.body.style.overflow = '')

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      lockScroll()
      form.value = {
        roomName: '',
        propertyName: '',
        province: '',
        price: 0,
        capacity: 1,
        status: 'available',
        bookings: 0,
      }
    } else {
      unlockScroll()
    }
  },
)

onUnmounted(() => unlockScroll())

const close = () => emit('update:modelValue', false)

const submitForm = () => {
  emit('submit', { ...form.value })
  close()
}

const statusOptions = [
  { label: 'Available', value: 'available' },
  { label: 'Disabled', value: 'disabled' },
]
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50 p-4"
  >
    <div class="bg-white rounded-xl w-full max-w-lg shadow-lg p-6 relative">
      <!-- Header -->
      <h2 class="text-xl font-semibold mb-4">Add Room Variety</h2>

      <!-- Form -->
      <!-- Form -->
      <div class="flex flex-col gap-4">
        <!-- Room Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
          <input
            v-model="form.roomName"
            type="text"
            placeholder="Enter room name"
            class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Property Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
          <input
            v-model="form.propertyName"
            type="text"
            placeholder="Enter property name"
            class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Province -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Province</label>
          <input
            v-model="form.province"
            type="text"
            placeholder="Enter province"
            class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Price & Capacity -->
        <div class="flex gap-3">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Price / Night</label>
            <input
              v-model.number="form.price"
              type="number"
              placeholder="Price"
              class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="w-24">
            <label class="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
            <input
              v-model.number="form.capacity"
              type="number"
              placeholder="Capacity"
              class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="form.status"
            class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option v-for="option in statusOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-6 flex justify-end gap-3">
        <button @click="close" class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
          Cancel
        </button>
        <button
          @click="submitForm"
          class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Add Room
        </button>
      </div>

      <!-- Close icon -->
      <button @click="close" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
        <font-awesome-icon icon="xmark" />
      </button>
    </div>
  </div>
</template>

<style scoped>
/* optional: smooth fade-in */
</style>
