<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: 'Filter'
  },
  options: {
    type: Array,
    required: true
    /*
      format:
      [{ label: 'Booking', value: 'booking' }]
    */
  },
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const selected = ref([...props.modelValue])
const dropdownRef = ref(null)

const toggle = () => {
  open.value = !open.value
}

const update = () => {
  emit('update:modelValue', selected.value)
}

const clear = () => {
  selected.value = []
  update()
}

const count = computed(() => selected.value.length)

const clickOutside = (e) => {
  if (!dropdownRef.value?.contains(e.target)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', clickOutside))
onBeforeUnmount(() => document.removeEventListener('click', clickOutside))
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <!-- Trigger -->
    <button
      @click="toggle"
      class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700
             hover:bg-gray-50"
    >
      <font-awesome-icon icon="filter" />
      <span>{{ label }}</span>

      <span
        v-if="count"
        class="rounded-full bg-blue-600 px-2 text-xs text-white"
      >
        {{ count }}
      </span>

      <font-awesome-icon
        icon="chevron-down"
        class="text-xs text-gray-400"
      />
    </button>

    <!-- Dropdown -->
    <div
      v-if="open"
      class="absolute right-0 z-20 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg"
    >
      <!-- Options -->
      <div class="max-h-60 overflow-y-auto p-2">
        <label
          v-for="opt in options"
          :key="opt.value"
          class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm
                 hover:bg-gray-100"
        >
          <input
            type="checkbox"
            v-model="selected"
            :value="opt.value"
            @change="update"
            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>{{ opt.label }}</span>
        </label>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between border-t border-gray-200 px-3 py-2">
        <button
          @click="clear"
          class="text-xs text-gray-500 hover:text-gray-700"
        >
          Clear
        </button>
        <button
          @click="open = false"
          class="text-xs font-medium text-blue-600"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>
