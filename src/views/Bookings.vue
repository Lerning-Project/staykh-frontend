<script setup>
import Paragraph from '@/components/Paragraph.vue'
import TotalBookingCard from '@/components/cards/TotalBookingCard.vue'
import Search from '@/components/Search.vue'
import Filter from '@/components/Filter.vue'
import BookingTable from '@/components/tables/BookingTable.vue'

const bookings = [
  {
    id: 'BK-1001',
    customer: 'John Doe',
    property: 'Angkor Paradise Resort',
    checkIn: '2026-01-20',
    checkOut: '2026-01-23',
    guests: 2,
    amount: 420,
    payment: 'Paid',
    status: 'Confirmed',
  },
  {
    id: 'BK-1002',
    customer: 'Jane Smith',
    property: 'Kampot Riverside Hotel',
    checkIn: '2026-01-18',
    checkOut: '2026-01-20',
    guests: 4,
    amount: 680,
    payment: 'Pending',
    status: 'Pending',
  },
  {
    id: 'BK-1003',
    customer: 'Jane Smith',
    property: 'Kampot Riverside Hotel',
    checkIn: '2026-01-18',
    checkOut: '2026-01-20',
    guests: 4,
    amount: 680,
    payment: 'Pending',
    status: 'Pending',
  },
]
</script>

<template>
  <div>
    <TitleContent text="Bookings Management" :level="4" :weight="'bold'" />

    <div class="mb-5">
      <Paragraph
        text="Monitor and manage all bookings across the properties"
        :level="6"
        :weight="'normal'"
      />
    </div>

    <div class="flex flex-col gap-5">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <TotalBookingCard
        title="Total Bookings"
        :current="125"
        icon="calendar-check"
        color="primary"
        valueColor="primary"
      />

      <TotalBookingCard
        title="Confirmed"
        :current="10"
        icon="calendar-check"
        color="success"
        valueColor="success"
      />

      <TotalBookingCard
        title="Pending"
        :current="125"
        icon="clock"
        color="warning"
        valueColor="warning"
      />

      <TotalBookingCard
        title="Cancelled"
        :current="125"
        icon="calendar-xmark"
        color="danger"
        valueColor="danger"
      />
    </div>
    <div>
      <div
        class="w-full border bg-white p-5 rounded-lg border-gray-200 flex gap-5 justify-between"
      >
        <Search placeholder="Search resorts, users, bookings..." />
        <div class="flex gap-5 mt-">
          <Filter
            label="Date"
            :options="[
              { label: 'Today', value: 'today' },
              { label: 'Yesterday', value: 'yesterday' },
              { label: 'This Week', value: 'this_week' },
              { label: 'This Month', value: 'this_month' },
              { label: 'This Year', value: 'this_year' },
            ]"
            v-model="selected"
          />
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
    </div>
    <div>
      <BookingTable :bookings="bookings" @view="viewBooking" />
    </div>
    </div>
  </div>
</template>
