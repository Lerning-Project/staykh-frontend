<script setup>
import { ref } from 'vue'
import Paragraph from '@/components/Paragraph.vue'
import Search from '@/components/Search.vue'
import Filter from '@/components/Filter.vue'
import RoomVarietyTable from '@/components/tables/RoomVarietyTable.vue'
import AddRoomVariety from '@/components/addnew/AddRoomVariety.vue'

// Dialog
const showAddForm = ref(false)

// Filters
const selectedProvince = ref('all')
const selectedPrice = ref('all')
const selectedStatus = ref('all')

// Rooms array
const rooms = ref([
  {
    id: 1,
    roomName: 'Deluxe Room',
    propertyName: 'Angkor Paradise Resort',
    province: 'Siem Reap',
    price: 120,
    capacity: 3,
    status: 'available',
    bookings: 125,
  },
  {
    id: 2,
    roomName: 'Suite Room',
    propertyName: 'Royal Cambodian Resort',
    province: 'Phnom Penh',
    price: 250,
    capacity: 4,
    status: 'disabled',
    bookings: 250,
  },
  {
    id: 3,
    roomName: 'Family Room',
    propertyName: 'Sunset Beach Resort',
    province: 'Kep',
    price: 150,
    capacity: 2,
    status: 'available',
    bookings: 150,
  },
  {
    id: 4,
    roomName: 'Executive Suite',
    propertyName: 'River View Hotel',
    province: 'Sihanoukville',
    price: 300,
    capacity: 5,
    status: 'disabled',
    bookings: 300,
  },
  {
    id: 5,
    roomName: 'Junior Suite',
    propertyName: 'Mountain Lodge',
    province: 'Battambang',
    price: 200,
    capacity: 3,
    status: 'available',
    bookings: 200,
  },
])

// Handlers
const handleAddRoom = (newRoom) => {
  rooms.value.push({
    id: Date.now(),
    ...newRoom,
  })
}

const viewRoom = (room) => {
  console.log('Viewing room:', room)
}

const editRoom = (room) => {
  console.log('Editing room:', room)
}

const suspendRoom = (room) => {
  console.log('Suspending room:', room)
}
</script>

<template>
  <div>
    <TitleContent text="Rooms Variety Management" :level="4" :weight="'bold'" />
    <div class="flex justify-between items-center">
      <Paragraph
        class="mb-5"
        text="Manage all room varieties across the platform"
        :level="6"
        :weight="'normal'"
      />

      <!-- Add button -->
      <div class="flex justify-end items-center">
        <button
          @click="showAddForm = true"
          class="rounded-lg bg-blue-600 px-4 py-2 text-md font-medium text-white hover:bg-blue-700"
        >
          + Add Room
        </button>
      </div>
    </div>

    <!-- Dialog -->
    <AddRoomVariety v-model="showAddForm" @submit="handleAddRoom" />

    <div class="flex gap-5 flex-col">
      <div class="w-full border bg-white p-5 rounded-lg border-gray-200 flex gap-5 justify-between">
        <Search placeholder="Search resorts, users, bookings..." />
        <div class="flex gap-5">
          <Filter
            label="Province"
            :options="[
              { label: 'Siem Reap', value: 'Siem Reap' },
              { label: 'Phnom Penh', value: 'Phnom Penh' },
              { label: 'Kep', value: 'Kep' },
              { label: 'Sihanoukville', value: 'Sihanoukville' },
              { label: 'Battambang', value: 'Battambang' },
            ]"
            v-model="selected"
          />
          <Filter
            label="Price"
            :options="[
              { label: 'Low to High', value: 'low_to_high' },
              { label: 'High to Low', value: 'high_to_low' },
              { label: 'Under 100', value: 'under_100' },
              { label: 'Under 200', value: 'under_200' },
              { label: 'Under 300', value: 'under_300' },
              { label: 'Under 400', value: 'under_400' },
              { label: 'Under 500', value: 'under_500' },
              { label: 'Under 600', value: 'under_600' },
              { label: 'Under 700', value: 'under_700' },
              { label: 'Under 800', value: 'under_800' },
              { label: 'Under 900', value: 'under_900' },
              { label: 'Under 1000', value: 'under_1000' },
            ]"
            v-model="selected"
          />
          <Filter
            label="Status"
            :options="[
              { label: 'Available', value: 'available' },
              { label: 'Disabled', value: 'disabled' },
            ]"
            v-model="selected"
          />
        </div>
      </div>
      <RoomVarietyTable :rooms="rooms" @view="viewRoom" @edit="editRoom" @suspend="suspendRoom" />
    </div>
  </div>
</template>

<style scoped></style>
