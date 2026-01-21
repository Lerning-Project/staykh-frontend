<script setup>
const props = defineProps({
  image: String,
  name: String,
  description: String,
  types: {
    type: Array,
    default: () => [],
  },
  price: Number,
  capacity: Number,
  totalRooms: Number,
  province: String,
  property: String,
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition"
  >
    <!-- Image -->
    <div class="relative">
      <img :src="image" alt="Room image" class="h-44 w-full object-cover" />

      <!-- Price badge -->
      <div
        class="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-gray-800"
      >
        ${{ price }}/night
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 flex flex-col gap-3">
      <!-- Name -->
      <h3 class="text-lg font-semibold text-gray-800">
        {{ name }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-gray-500 line-clamp-2">
        {{ description }}
      </p>

      <!-- Room Type / Features -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(type, index) in types"
          :key="index"
          class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
        >
          {{ type }}
        </span>
      </div>

      <!-- Info Grid -->
      <div class="grid grid-cols-2 gap-3 text-sm text-gray-600">
        <div class="flex items-center gap-2">
          <font-awesome-icon icon="users" />
          {{ capacity }} Guests
        </div>

        <div class="flex items-center gap-2">
          <font-awesome-icon icon="door-open" />
          {{ totalRooms }} Rooms
        </div>

        <div class="flex items-center gap-2 col-span-2">
          <font-awesome-icon icon="location-dot" />
          {{ province }}
        </div>

        <div class="flex items-center gap-2 col-span-2">
          <font-awesome-icon icon="hotel" />
          {{ property }}
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-3 flex gap-3">
        <button
          @click="
            $emit('edit', {
              name,
              description,
              images: [image],
              price,
              capacity,
              totalRooms,
              amenities: types,
              province,
              property,
            })
          "
          class="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <font-awesome-icon icon="pen" />
          Edit
        </button>

        <button
          @click="
            $emit('delete', {
              name,
              description,
              images: [image],
              price,
              capacity,
              totalRooms,
              amenities: types,
              province,
              property,
            })
          "
          class="flex-1 flex items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
        >
          <font-awesome-icon icon="trash" />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
