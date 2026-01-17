<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 1,
    validator: (v) => v >= 1 && v <= 6
  },
  center: {
    type: Boolean,
    default: false
  },
  weight: {
    type: String,
    default: 'semibold',
    validator: (v) =>
      ['normal', 'medium', 'semibold', 'bold', 'extrabold'].includes(v)
  }
})
</script>

<template>
  <component
    :is="`h${level}`"
    :class="[
      'text-gray-800',
      center ? 'text-center' : 'text-left',

      /* font weight */
      weight === 'normal' && 'font-normal',
      weight === 'medium' && 'font-medium',
      weight === 'semibold' && 'font-semibold',
      weight === 'bold' && 'font-bold',
      weight === 'extrabold' && 'font-extrabold',

      /* size by level */
      level === 1 && 'text-3xl md:text-4xl',
      level === 2 && 'text-2xl md:text-3xl',
      level === 3 && 'text-xl md:text-2xl',
      level === 4 && 'text-lg md:text-xl',
      level === 5 && 'text-base md:text-lg',
      level === 6 && 'text-sm md:text-base'
    ]"
  >
    {{ text }}
  </component>
</template>
