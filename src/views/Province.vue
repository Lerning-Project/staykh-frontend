<script setup>
import { ref, onMounted } from 'vue'
import Paragraph from '@/components/Paragraph.vue'
import TotalProvinceCard from '@/components/cards/TotalProvinceCard.vue'
import ProvinceTable from '@/components/tables/ProvinceTable.vue'
import AddProvince from '@/components/addnew/AddProvince.vue'
import { provinceAPI } from '@/services/api'

const showAddProvince = ref(false)
const provinces = ref([])
const loading = ref(false)
const error = ref('')

const fetchProvinces = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await provinceAPI.getProvinces()
    // Based on the curl response, the data is in response.data.data
    provinces.value = response.data.data || response.data
  } catch (err) {
    console.error('Failed to fetch provinces:', err)
    error.value = err.message || 'Failed to load provinces'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProvinces()
})

const handleAddProvince = async () => {
  // Re-fetch to get up-to-date counts and data from backend
  await fetchProvinces()
}

const viewProvince = (p) => console.log('View', p)
const editProvince = (p) => console.log('Edit', p)
const toggleProvince = (p) => console.log('Toggle', p)
</script>

<template>
  <div>
    <TitleContent text="Province Management" :level="4" :weight="'bold'" />
    <div class="mb-5">
      <div class="flex justify-between items-center">
        <Paragraph
          class="mb-5"
          text="Manage all resorts and properties across the platform"
          :level="6"
          :weight="'normal'"
        />

        <!-- Add button -->
        <div class="flex justify-end items-center">
          <button
            @click="showAddProvince = true"
            class="rounded-lg bg-blue-600 px-4 py-2 text-md font-medium text-white hover:bg-blue-700"
          >
            + Add Province
          </button>
        </div>
      </div>

      <!-- Dialog -->
      <AddProvince v-model="showAddProvince" @submit="handleAddProvince" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <TotalProvinceCard
        title="Total Provinces"
        :current="provinces.length"
        icon="map-marker-alt"
        color="primary"
      />

      <TotalProvinceCard
        title="Active Provinces"
        :current="provinces.filter((p) => p.visible !== false).length"
        icon="eye"
        color="success"
      />
      <TotalProvinceCard
        title="Total Resorts"
        :current="provinces.reduce((sum, p) => sum + (p.resorts || 0), 0)"
        icon="home"
        color="warning"
      />
      <TotalProvinceCard
        title="Total Revenue"
        :current="'$' + provinces.reduce((sum, p) => sum + (p.revenue || 0), 0).toLocaleString()"
        icon="money-bill"
        color="success"
      />
    </div>
    <div class="mt-5 relative min-h-[200px]">
      <!-- Loading State -->
      <div
        v-if="loading"
        class="absolute inset-0 flex items-center justify-center bg-white/50 z-10"
      >
        <font-awesome-icon icon="spinner" class="animate-spin text-4xl text-blue-600" />
      </div>

      <!-- Error State -->
      <div
        v-if="error"
        class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-5 flex items-center gap-3"
      >
        <font-awesome-icon icon="circle-exclamation" />
        <p>{{ error }}</p>
        <button @click="fetchProvinces" class="underline ml-auto font-medium">Try Again</button>
      </div>

      <ProvinceTable
        v-if="!loading || provinces.length > 0"
        :provinces="provinces"
        @view="viewProvince"
        @edit="editProvince"
        @toggle="toggleProvince"
      />

      <!-- Empty State -->
      <div
        v-if="!loading && !error && provinces.length === 0"
        class="text-center py-10 bg-white border border-dashed border-gray-300 rounded-xl text-gray-500"
      >
        <Paragraph text="No provinces found." :level="6" weight="normal" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
