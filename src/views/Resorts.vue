<script setup>
import { ref, onMounted } from 'vue'
import Paragraph from '@/components/Paragraph.vue'
import Search from '@/components/Search.vue'
import Filter from '@/components/Filter.vue'
import ResortsAndPropertiesTable from '@/components/tables/ResortsAndPropertiesTable.vue'
import Newresort from '@/components/addnew/Newresort.vue'
import { propertyAPI } from '@/services/api'

const showAddForm = ref(false)
const resorts = ref([])
const loading = ref(false)
const error = ref('')
const selected = ref('all')

const fetchProperties = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await propertyAPI.getProperties()
    // According to curl output structure: { status, message, data: [...] }
    resorts.value = response.data.data || response.data
  } catch (err) {
    console.error('Failed to fetch properties:', err)
    error.value = err.message || 'Failed to load resorts'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProperties()
})

const handleAddResort = async () => {
  await fetchProperties()
}

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
          @click="showAddForm = true"
          class="rounded-lg bg-blue-600 px-4 py-2 text-md font-medium text-white hover:bg-blue-700"
        >
          + Add Resort
        </button>
      </div>
    </div>

    <!-- Dialog -->
    <Newresort v-model="showAddForm" @submit="handleAddResort" />

    <!-- Filters -->
    <div class="flex gap-5 flex-col mt-5">
      <div class="w-full border bg-white p-5 rounded-lg border-gray-200 flex justify-between">
        <Search placeholder="Search resorts..." />
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

      <!-- Table Section -->
      <div class="relative min-h-[300px]">
        <!-- Loading -->
        <div
          v-if="loading"
          class="absolute inset-0 flex items-center justify-center bg-white/50 z-10 rounded-xl"
        >
          <font-awesome-icon icon="spinner" class="animate-spin text-4xl text-blue-600" />
        </div>

        <!-- Error -->
        <div
          v-if="error"
          class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-5 flex items-center gap-3"
        >
          <font-awesome-icon icon="circle-exclamation" />
          <p>{{ error }}</p>
          <button @click="fetchProperties" class="underline ml-auto font-medium">Try Again</button>
        </div>

        <!-- Table -->
        <ResortsAndPropertiesTable
          v-if="!loading || resorts.length > 0"
          :resorts="resorts"
          @view="viewResort"
          @edit="editResort"
          @suspend="suspendResort"
        />

        <!-- Empty State -->
        <div
          v-if="!loading && !error && resorts.length === 0"
          class="text-center py-20 bg-white border border-dashed border-gray-300 rounded-xl text-gray-500"
        >
          <font-awesome-icon icon="hotel" class="text-4xl mb-3 text-gray-300" />
          <p class="text-lg font-medium">No resorts found</p>
          <p class="text-sm">Add your first resort to get started</p>
        </div>
      </div>
    </div>
  </div>
</template>
