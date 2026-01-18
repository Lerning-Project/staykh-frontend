<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const form = ref({
  name: '',
  code: '',
  visible: true
})

/* Scroll lock */
const lockScroll = () => (document.body.style.overflow = 'hidden')
const unlockScroll = () => (document.body.style.overflow = '')

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      lockScroll()
      form.value = {
        name: '',
        code: '',
        visible: true
      }
    } else {
      unlockScroll()
    }
  }
)

onUnmounted(() => unlockScroll())

const close = () => emit('update:modelValue', false)

const submitForm = () => {
  emit('submit', {
    id: Date.now(),
    name: form.value.name,
    code: form.value.code.toUpperCase(),
    resorts: 0,
    bookings: 0,
    revenue: 0,
    visible: form.value.visible
  })
  close()
}
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
  >
    <div class="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
      <!-- Header -->
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Add New Province
      </h2>

      <!-- Form -->
      <div class="flex flex-col gap-4">
        <!-- Province Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Province Name
          </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="e.g. Phnom Penh"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Province Code -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Province Code
          </label>
          <input
            v-model="form.code"
            type="text"
            placeholder="e.g. PP"
            maxlength="3"
            class="w-full border rounded-lg px-3 py-2 uppercase focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Visibility -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Visibility
          </label>
          <select
            v-model="form.visible"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option :value="true">Visible</option>
            <option :value="false">Hidden</option>
          </select>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-6 flex justify-end gap-3">
        <button
          @click="close"
          class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          @click="submitForm"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Add Province
        </button>
      </div>

      <!-- Close Icon -->
      <button
        @click="close"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        <font-awesome-icon icon="xmark" />
      </button>
    </div>
  </div>
</template>
