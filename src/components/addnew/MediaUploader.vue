<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'submit'])

const files = ref([])

/* scroll lock */
const lockScroll = () => (document.body.style.overflow = 'hidden')
const unlockScroll = () => (document.body.style.overflow = '')

watch(
  () => props.modelValue,
  (open) => {
    open ? lockScroll() : unlockScroll()
    files.value = []
  }
)

onUnmounted(unlockScroll)

const close = () => emit('update:modelValue', false)

const handleFile = (e) => {
  files.value = Array.from(e.target.files)
}

const upload = () => {
  if (!files.value.length) return

  emit(
    'submit',
    files.value.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.type.startsWith('video') ? 'video' : 'image',
      url: URL.createObjectURL(file)
    }))
  )

  close()
}
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
  >
    <div class="w-full max-w-xl rounded-2xl bg-white shadow-xl relative border border-gray-200">
      <!-- Header -->
      <div class="px-6 py-5 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800">
          Upload Media
        </h2>
        <p class="text-sm text-gray-400">
          Images & videos for resorts and rooms
        </p>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-5">
        <!-- Upload box -->
        <label
          class="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center cursor-pointer hover:bg-gray-100 transition"
        >
          <font-awesome-icon
            icon="cloud-arrow-up"
            class="text-4xl text-blue-600 mb-3"
          />

          <p class="text-sm font-medium text-gray-700">
            Click to upload or drag & drop
          </p>
          <p class="text-xs text-gray-400 mt-1">
            PNG, JPG, MP4 up to 20MB
          </p>

          <input
            type="file"
            multiple
            accept="image/*,video/*"
            class="hidden"
            @change="handleFile"
          />
        </label>

        <!-- Selected files -->
        <div v-if="files.length" class="space-y-2">
          <h4 class="text-sm font-semibold text-gray-700">
            Selected files
          </h4>

          <div
            v-for="file in files"
            :key="file.name"
            class="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-2 text-sm"
          >
            <div class="flex items-center gap-3">
              <font-awesome-icon
                :icon="file.type.startsWith('video') ? 'video' : 'image'"
                class="text-blue-500"
              />
              <span class="text-gray-700 truncate max-w-[200px]">
                {{ file.name }}
              </span>
            </div>
            <span class="text-gray-400 text-xs">
              {{ (file.size / 1024 / 1024).toFixed(2) }} MB
            </span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-between items-center border-t border-gray-200 px-6 py-4">
        <button
          @click="close"
          class="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          @click="upload"
          :disabled="!files.length"
          class="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Upload Media
        </button>
      </div>

      <!-- Close -->
      <button
        @click="close"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <font-awesome-icon icon="xmark" />
      </button>
    </div>
  </div>
</template>
