<script setup>
import Paragraph from '@/components/Paragraph.vue'
import TotalProvinceCard from '@/components/cards/TotalProvinceCard.vue'
import ProvinceTable from '@/components/tables/ProvinceTable.vue'
const provinces = [
  {
    id: 1,
    name: 'Phnom Penh',
    code: 'PP',
    resorts: 120,
    bookings: 4520,
    revenue: 235000,
    visible: true,
  },
  {
    id: 2,
    name: 'Siem Reap',
    code: 'SR',
    resorts: 85,
    bookings: 3120,
    revenue: 185000,
    visible: false,
  },
]
</script>

<template>
  <div>
    <TitleContent text="Province Management" :level="4" :weight="'bold'" />
    <div class="mb-5">
      <Paragraph
        text="Manage provinces and regional distribution across Cambodia"
        :level="6"
        :weight="'normal'"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <TotalProvinceCard
        title="Total Provinces"
        current="7"
        icon="map-marker-alt"
        color="primary"
      />

      <TotalProvinceCard title="Active Provinces" current="6" icon="eye" color="success" />
      <TotalProvinceCard title="Total Resorts" current="48" icon="home" color="warning" />
      <TotalProvinceCard
        title="Total Revenue"
        current="$120,000"
        icon="money-bill"
        color="success"
      />
    </div>
    <div class="mt-5">
        <ProvinceTable
      :provinces="provinces"
      @view="viewProvince"
      @edit="editProvince"
      @toggle="toggleProvince"
    />
    </div>
  </div>
</template>

<style scoped></style>
