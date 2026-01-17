<script setup>
import Paragraph from '@/components/Paragraph.vue'
import Search from '@/components/Search.vue'
import Filter from '@/components/Filter.vue'
import ResortsAndPropertiesTable from '@/components/tables/ResortsAndPropertiesTable.vue'

const resorts = [
  {
    id: 1,
    name: 'Angkor Paradise Resort',
    province: 'Siem Reap',
    status: 'active',
    totalRooms: 120,
    totalBookings: 3560,
    revenue: 125000,
  },
  {
    id: 2,
    name: 'Royal Cambodian Resort',
    province: 'Phnom Penh',
    status: 'suspended',
    totalRooms: 80,
    totalBookings: 2000,
    revenue: 80000,
  },
  {
    id: 3,
    name: 'Sunset Beach Resort',
    province: 'Kep',
    status: 'active',
    totalRooms: 150,
    totalBookings: 4000,
    revenue: 150000,
  },
  {
    id: 4,
    name: 'River View Hotel',
    province: 'Sihanoukville',
    status: 'active',
    totalRooms: 100,
    totalBookings: 2500,
    revenue: 100000,
  },
  {
    id: 5,
    name: 'Mountain Lodge',
    province: 'Battambang',
    status: 'suspended',
    totalRooms: 60,
    totalBookings: 1200,
    revenue: 60000,
  },
]

const viewResort = (resort) => {
  console.log('Viewing resort:', resort)
}

const editResort = (resort) => {
  console.log('Editing resort:', resort)
}

const suspendResort = (resort) => {
  console.log('Suspending resort:', resort)
}
</script>

<template>
  <div>
    <TitleContent text="Resort Management" :level="4" :weight="'bold'" />
    <div class="mb-5">
      <Paragraph
        text="Manage all resorts and properties across the platform"
        :level="6"
        :weight="'normal'"
      />
    </div>
    <div class="flex gap-5 flex-col">
        <div class="w-full border bg-white p-5 rounded-lg border-gray-200 flex gap-5 justify-between">
      <Search placeholder="Search resorts, users, bookings..." />
      <Filter
        label="Filter"
        :options="[
          { label: 'All', value: 'all' },
          { label: 'Active', value: 'active' },
          { label: 'Suspended', value: 'suspended' },
          
        ]"
        v-model="selected"
      />
    </div>
    <ResortsAndPropertiesTable
      :resorts="resorts"
      @view="viewResort"
      @edit="editResort"
      @suspend="suspendResort"
    />
    </div>
  </div>
</template>
