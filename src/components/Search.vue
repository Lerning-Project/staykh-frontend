<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search...'
  }
})

const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue)

watch(value, (val) => {
  emit('update:modelValue', val)
})

const clear = () => {
  value.value = ''
}
</script>

<template>
  <div class="relative w-full max-w-md">
    <!-- Search Icon -->
    <div class="pointer-events-none absolute inset-y-0 left-3 flex items-center">
      <font-awesome-icon
        icon="search"
        class="text-gray-400 text-sm"
      />
    </div>

    <!-- Input -->
    <input
      v-model="value"
      type="text"
      :placeholder="placeholder"
      class="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-9 text-sm text-gray-700
             focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
    />

    <!-- Clear Button -->
    <button
      v-if="value"
      @click="clear"
      class="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600"
    >
      <font-awesome-icon icon="xmark" />
    </button>
  </div>
</template>
