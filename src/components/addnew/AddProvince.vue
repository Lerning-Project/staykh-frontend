<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { provinceAPI } from '@/services/api'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'submit'])

const form = ref({
  name: '',
  code: '',
  visible: true,
})

const loading = ref(false)
const error = ref('')

/* Scroll lock */
const lockScroll = () => (document.body.style.overflow = 'hidden')
const unlockScroll = () => (document.body.style.overflow = '')

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      lockScroll()
      error.value = ''
      form.value = {
        name: '',
        code: '',
        visible: true,
      }
    } else {
      unlockScroll()
    }
  },
)

onUnmounted(() => unlockScroll())

const close = () => {
  if (loading.value) return
  emit('update:modelValue', false)
}

const submitForm = async () => {
  if (!form.value.name.trim()) {
    error.value = 'Province name is required'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await provinceAPI.createProvince({
      name: form.value.name.trim(),
    })

    // Emit success with the response data
    emit('submit', response.data.data || response.data)
    close()
  } catch (err) {
    console.error('Failed to add province:', err)
    error.value = err.message || 'Failed to add province'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
  >
    <div class="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
      <!-- Header -->
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Add New Province</h2>

      <!-- Error Alert -->
      <div
        v-if="error"
        class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-700 text-sm"
      >
        <font-awesome-icon icon="circle-exclamation" class="mt-0.5" />
        <p>{{ error }}</p>
      </div>

      <!-- Form -->
      <div class="flex flex-col gap-4">
        <!-- Province Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Province Name </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="e.g. Phnom Penh"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            :disabled="loading"
          />
        </div>

        <!-- Province Code -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Province Code </label>
          <input
            v-model="form.code"
            type="text"
            placeholder="e.g. PP"
            maxlength="3"
            class="w-full border rounded-lg px-3 py-2 uppercase focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            :disabled="loading"
          />
        </div>

        <!-- Visibility -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Visibility </label>
          <select
            v-model="form.visible"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            :disabled="loading"
          >
            <option :value="true">Visible</option>
            <option :value="false">Hidden</option>
          </select>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-6 flex justify-end gap-3">
        <button @click="close" class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
          Cancel
        </button>
        <button
          @click="submitForm"
          :disabled="loading"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <font-awesome-icon v-if="loading" icon="spinner" class="animate-spin" />
          <span>{{ loading ? 'Adding...' : 'Add Province' }}</span>
        </button>
      </div>

      <!-- Close Icon -->
      <button @click="close" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
        <font-awesome-icon icon="xmark" />
      </button>
    </div>
  </div>
</template>
