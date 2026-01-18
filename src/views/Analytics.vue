<script setup>
import { ref } from 'vue'
import Paragraph from '@/components/Paragraph.vue'
import TotalPaymentCard from '@/components/cards/TotalPaymentCard.vue'
import ProvincePerformance from '@/components/graphs/ProvincePerformance.vue'
import BookingSources from '@/components/graphs/BookingSources.vue'
import PerformentResortTable from '@/components/tables/PerformentResortTable.vue'
import MostBookedRoomsTable from '@/components/tables/MostBookedRoomsTable.vue'

const activeReport = ref(null)

const reports = [
  { key: 'booking', label: 'Bookings Report', icon: 'calendar-check' },
  { key: 'revenue', label: 'Revenue Report', icon: 'money-bill-wave' },
  { key: 'property', label: 'Property Performance', icon: 'hotel' },
  { key: 'room', label: 'Room Analytics', icon: 'chart-line' },
]

const bookingData = [
  { province: 'Phnom Penh', bookings: 1240 },
  { province: 'Siem Reap', bookings: 980 },
  { province: 'Sihanoukville', bookings: 760 },
  { province: 'Battambang', bookings: 420 },
  { province: 'Kampot', bookings: 310 },
]

const bookingSourcesData = [
  { source: 'Website', value: 40 },
  { source: 'Mobile App', value: 30 },
  { source: 'POS', value: 20 },
  { source: 'Agent', value: 10 },
]

const performanceData = [
  {
    name: 'Angkor Paradise Resort',
    bookings: 1240,
    revenue: 32000,
    occupancy: 82,
  },
  {
    name: 'Siem Reap Grand Hotel',
    bookings: 980,
    revenue: 25000,
    occupancy: 78,
  },
  {
    name: 'Sihanoukville Beach Resort',
    bookings: 760,
    revenue: 18000,
    occupancy: 65,
  },
  {
    name: 'Battambang Riverside Inn',
    bookings: 420,
    revenue: 8500,
    occupancy: 55,
  },
  {
    name: 'Kampot Pepper Farm Stay',
    bookings: 310,
    revenue: 6200,
    occupancy: 48,
  },
]

const mostBookedRoomsData = [
  {
    roomName: 'Deluxe King Room',
    resort: 'Angkor Paradise Resort',
    bookings: 420,
    maxBookings: 600,
  },
  {
    roomName: 'Standard Queen Room',
    resort: 'Siem Reap Grand Hotel',
    bookings: 380,
    maxBookings: 500,
  },
  {
    roomName: 'Family Suite',
    resort: 'Sihanoukville Beach Resort',
    bookings: 310,
    maxBookings: 400,
  },
  {
    roomName: 'Superior Twin Room',
    resort: 'Battambang Riverside Inn',
    bookings: 250,
    maxBookings: 350,
  },
  {
    roomName: 'Executive King Room',
    resort: 'Kampot Pepper Farm Stay',
    bookings: 210,
    maxBookings: 300,
  },
]
</script>
<template>
  <div>
    <TitleContent text="Report & Analytics" :level="4" :weight="'bold'" />

    <Paragraph
      class="mb-5"
      text="Generate reports and analyze platform performance"
      :level="6"
      :weight="'normal'"
    />

    <div class="mt-5 flex flex-col gap-5">
      <div class="w-full border border-gray-200 bg-white p-5 rounded-lg flex gap-4 flex-wrap">
        <div
          v-for="report in reports"
          :key="report.key"
          @click="activeReport = report.key"
          class="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition"
          :class="
            activeReport === report.key
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
        >
          <font-awesome-icon :icon="report.icon" />
          <h3 class="font-semibold text-sm">
            {{ report.label }}
          </h3>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        <TotalPaymentCard
          title="Total Bookings"
          amount="1845"
          icon="fa-solid fa-calendar-check"
          color="success"
          trendText="+12.5% form last month"
          trendColor="primary"
        />

        <TotalPaymentCard
          title="Total Revenue"
          amount="$123,456"
          icon="fa-solid fa-arrow-trend-up"
          color="primary"
          trendText="+12.5% form last month"
          trendColor="success"
        />

        <TotalPaymentCard
          title="Avg Occupancy"
          amount="75%"
          icon="fa-solid fa-chart-line"
          color="warning"
          trendText="+12.5% form last month"
          trendColor="success"
        />
        <TotalPaymentCard
          title="Avg Booking Value"
          amount="$123"
          icon="fa-solid fa-money-bill-wave"
          color="danger"
          trendText="+2.5% form last month"
          trendColor="success"
        />
      </div>
      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        <ProvincePerformance :data="bookingData" />
        <BookingSources :data="bookingSourcesData" />
      </div>
      <div class="w-full">
        <PerformentResortTable :resorts="performanceData" />
      </div>
      <div class="w-full">
        <MostBookedRoomsTable :rooms="mostBookedRoomsData" />
      </div>

    </div>
  </div>
</template>
