<script setup>
import TotalCard from '@/components/cards/TotalCard.vue'
import BookingTrend from '@/components/graphs/BookingTrend.vue'
import RevenueByProvince from '@/components/graphs/RevenueByProvince.vue'
import TitleContent from '@/components/TitleContent.vue'
import Paragraph from '@/components/Paragraph.vue'
import RecentActivities from '@/components/RecentActivities.vue'

const weeklyData = [
  { label: 'Mon', value: 12 },
  { label: 'Tue', value: 18 },
  { label: 'Wed', value: 10 },
  { label: 'Thu', value: 22 },
  { label: 'Fri', value: 30 },
  { label: 'Sat', value: 28 },
  { label: 'Sun', value: 35 },
]

const monthlyData = Array.from({ length: 30 }, (_, i) => ({
  label: `Day ${i + 1}`,
  value: Math.floor(Math.random() * 40) + 10,
}))

const quarterData = Array.from({ length: 90 }, (_, i) => ({
  label: `Day ${i + 1}`,
  value: Math.floor(Math.random() * 50) + 5,
}))

const provinceRevenue = [
  { province: 'Phnom Penh', revenue: 32000 },
  { province: 'Siem Reap', revenue: 18500 },
  { province: 'Sihanoukville', revenue: 14200 },
  { province: 'Battambang', revenue: 8600 },
  { province: 'Kampot', revenue: 6400 },
  { province: 'Kep', revenue: 4200 },
]

// data recent activities
const recentActivities = [
  {
    type: 'booking',
    message: 'New booking created for Deluxe Room',
    createdAt: '2026-01-15T09:20:00Z',
  },
  {
    type: 'payment',
    message: 'Payment received from Alex ($120)',
    createdAt: '2026-01-15T08:55:00Z',
  },
  {
    type: 'user',
    message: 'New user registered: sara@example.com',
    createdAt: '2026-01-15T08:10:00Z',
  },
  {
    type: 'refund',
    message: 'Refund request submitted for Booking #1024',
    createdAt: '2026-01-15T07:45:00Z',
  },
  {
    type: 'resort',
    message: 'Resort “Blue Ocean” updated room pricing',
    createdAt: '2026-01-15T06:30:00Z',
  },
  {
    type: 'review',
    message: 'New 5★ review added for Sunrise Resort',
    createdAt: '2026-01-15T05:15:00Z',
  },
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div>
      <TitleContent text="Dashboard Overview" :level="4" weight="bold" />
      <Paragraph text="Monitor platform performance and manage all operations" :level="6" :weight="'normal'" />
    </div>

    <!-- Total Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4">
      <TotalCard title="Total Resorts" :current="1248" :previous="1112" icon="hotel" />
      <TotalCard
        title="Total Rooms"
        :current="5200"
        :previous="4800"
        icon="door-open"
        color="success"
      />
      <TotalCard
        title="Total Bookings"
        :current="1248"
        :previous="1112"
        icon="calendar-check"
        color="success"
      />
      <TotalCard title="Total Users" :current="980" :previous="860" icon="users" />
      <TotalCard title="Total Reviews" :current="320" :previous="300" icon="star" color="warning" />
      <TotalCard
        title="Refund Requests"
        :current="18"
        :previous="25"
        icon="user-lock"
        color="danger"
      />
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-fr">
      <div class="h-[420px]">
        <BookingTrend :data7="weeklyData" :data30="monthlyData" :data90="quarterData" />
      </div>

      <div class="h-[420px]">
        <RevenueByProvince :data="provinceRevenue" />
      </div>
    </div>
    <!-- Recent Activities -->
    <div class="">
      <div class="h-[420px]">
        <RecentActivities
          :activities="recentActivities"
        />
      </div>
    </div>
  </div>
</template>
