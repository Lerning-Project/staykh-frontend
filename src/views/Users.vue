<script setup>
import { ref } from 'vue'
import Paragraph from '@/components/Paragraph.vue'
import CustomerTable from '@/components/tables/CustomerTable.vue'
import ResortStaffTable from '@/components/tables/ResortStaffTable.vue'
import Search from '@/components/Search.vue'
import Filter from '@/components/Filter.vue'

const activeTab = ref('customers')

const customers = [
  {
    name: 'John Doe',
    phone: '+855 12 345 678',
    bookings: 12,
    totalSpent: 1250,
    lastBooking: '2026-01-14',
    status: 'active'
  },
  {
    name: 'Jane Smith',
    phone: '+855 98 765 432',
    bookings: 5,
    totalSpent: 750,
    lastBooking: '2026-01-13',
    status: 'banned'
  }
]

const staffs = [
  {
    name: 'Sok Chan',
    role: 'Manager',
    property: 'Angkor Paradise Resort',
    lastActive: '2026-01-15 09:30',
    status: 'active'
  },
  {
    name: 'Ly Dara',
    role: 'Receptionist',
    property: 'Kampot Riverside Hotel',
    lastActive: '2026-01-14 18:10',
    status: 'inactive'
  },
  {
    name: 'Chantha Pov',
    role: 'Cleaner',
    property: 'Sihanouk Beach Resort',
    lastActive: '2026-01-10 08:20',
    status: 'suspended'
  }
]

// optional handlers
const viewStaff = (staff) => console.log('View', staff)
const editStaff = (staff) => console.log('Edit', staff)
const suspendStaff = (staff) => console.log('Suspend', staff)
</script>

<template>
  <div>
    <!-- Page Header -->
    <TitleContent text="Users Management" :level="4" :weight="'bold'" />
    <Paragraph
      text="Manage customers and resort staff across the platform"
      :level="6"
      :weight="'normal'"
    />

    
    

    <!-- Tabs -->
    <div class="mt-6 border-b border-gray-200 flex gap-6">
      <button
        class="pb-3 text-sm font-medium"
        :class="
          activeTab === 'customers'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        "
        @click="activeTab = 'customers'"
      >
        Customers
      </button>

      <button
        class="pb-3 text-sm font-medium"
        :class="
          activeTab === 'staffs'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        "
        @click="activeTab = 'staffs'"
      >
        Resort Staff
      </button>
    </div>
    <div class="flex gap-5 mt-5 flex-col">
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
    </div>

    <!-- Tab Content -->
    <div class="mt-6">
      <!-- Customers -->
      <CustomerTable
        v-if="activeTab === 'customers'"
        :customers="customers"
      />

      <!-- Staff -->
      <ResortStaffTable
        v-if="activeTab === 'staffs'"
        :staffs="staffs"
        @view="viewStaff"
        @edit="editStaff"
        @suspend="suspendStaff"
      />
    </div>
  </div>
</template>
