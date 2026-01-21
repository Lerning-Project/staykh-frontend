<script setup>
import { ref, watch, onUnmounted, computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  roomData: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'submit'])

const form = ref({
  roomName: '',
  description: '',
  images: [''],
  price: 0,
  capacity: 1,
  totalRooms: 1,
  amenities: [''],
  province: '',
  propertyName: '',
})

const provinces = ['Phnom Penh', 'Siem Reap', 'Preah Sihanouk', 'Kep', 'Battambang']

const isEditMode = computed(() => props.roomData !== null)

const addImage = () => form.value.images.push('')
const removeImage = (i) => form.value.images.splice(i, 1)

const addAmenity = () => form.value.amenities.push('')
const removeAmenity = (i) => form.value.amenities.splice(i, 1)

const close = () => {
  emit('update:modelValue', false)
  // Reset form when closing
  setTimeout(() => {
    form.value = {
      roomName: '',
      description: '',
      images: [''],
      price: 0,
      capacity: 1,
      totalRooms: 1,
      amenities: [''],
      province: '',
      propertyName: '',
    }
  }, 300)
}

const submitForm = () => {
  emit('submit', { ...form.value })
  close()
}

// Watch for dialog opening and populate form if editing
watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      document.body.style.overflow = 'hidden'

      // Populate form if editing
      if (props.roomData) {
        form.value = {
          roomName: props.roomData.name || '',
          description: props.roomData.description || '',
          images: props.roomData.images?.length ? [...props.roomData.images] : [''],
          price: props.roomData.price || 0,
          capacity: props.roomData.capacity || 1,
          totalRooms: props.roomData.totalRooms || 1,
          amenities: props.roomData.amenities?.length ? [...props.roomData.amenities] : [''],
          province: props.roomData.province || '',
          propertyName: props.roomData.property || '',
        }
      }
    } else {
      document.body.style.overflow = ''
    }
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <!-- Dialog -->
  <div
    v-if="modelValue"
    @click.self="close"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-hidden"
  >
    <div
      class="bg-white w-full max-w-3xl rounded-xl border border-gray-200 shadow-lg overflow-y-auto max-h-[90vh]"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">
          {{ isEditMode ? 'Edit Room' : 'Add New Room' }}
        </h2>
        <button @click="close" class="text-gray-400 hover:text-gray-600 text-xl">✕</button>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Room Name -->
          <div>
            <label class="text-sm font-medium text-gray-700">Room Name</label>
            <input
              v-model="form.roomName"
              type="text"
              class="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Deluxe Ocean View"
            />
          </div>

          <!-- Price -->
          <div>
            <label class="text-sm font-medium text-gray-700">Price / Night ($)</label>
            <input
              v-model.number="form.price"
              type="number"
              class="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Description -->
          <div class="md:col-span-2">
            <label class="text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Capacity -->
          <div>
            <label class="text-sm font-medium text-gray-700">Guest Capacity</label>
            <input
              v-model.number="form.capacity"
              type="number"
              min="1"
              class="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2"
            />
          </div>

          <!-- Total Rooms -->
          <div>
            <label class="text-sm font-medium text-gray-700">Total Rooms</label>
            <input
              v-model.number="form.totalRooms"
              type="number"
              min="1"
              class="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2"
            />
          </div>

          <!-- Province -->
          <div>
            <label class="text-sm font-medium text-gray-700">Province</label>
            <select
              v-model="form.province"
              class="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2"
            >
              <option value="">Select Province</option>
              <option v-for="p in provinces" :key="p" :value="p">
                {{ p }}
              </option>
            </select>
          </div>

          <!-- Property -->
          <div>
            <label class="text-sm font-medium text-gray-700">Property Name</label>
            <input
              v-model="form.propertyName"
              type="text"
              class="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <!-- Images -->
        <div>
          <label class="text-sm font-medium text-gray-700">Images (URL)</label>
          <div class="space-y-2 mt-2">
            <div v-for="(img, i) in form.images" :key="i" class="flex gap-2">
              <input
                v-model="form.images[i]"
                class="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                placeholder="https://image.jpg"
              />
              <button v-if="form.images.length > 1" @click="removeImage(i)" class="text-red-500">
                ✕
              </button>
            </div>
          </div>

          <button @click="addImage" class="mt-2 text-sm text-blue-600 hover:underline">
            + Add more image
          </button>
        </div>

        <!-- Amenities -->
        <div>
          <label class="text-sm font-medium text-gray-700">Amenities</label>
          <div class="space-y-2 mt-2">
            <div v-for="(a, i) in form.amenities" :key="i" class="flex gap-2">
              <input
                v-model="form.amenities[i]"
                class="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                placeholder="WiFi, Mini Bar"
              />
              <button
                v-if="form.amenities.length > 1"
                @click="removeAmenity(i)"
                class="text-red-500"
              >
                ✕
              </button>
            </div>
          </div>

          <button @click="addAmenity" class="mt-2 text-sm text-blue-600 hover:underline">
            + Add more amenity
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
        <button
          @click="close"
          class="px-5 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          @click="submitForm"
          class="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {{ isEditMode ? 'Update Room' : 'Create Room' }}
        </button>
      </div>
    </div>
  </div>
</template>
