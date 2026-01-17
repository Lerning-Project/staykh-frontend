<script setup>
import { ref, watch, onMounted } from 'vue'
import Paragraph from '@/components/Paragraph.vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
} from 'chart.js'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
)

const props = defineProps({
  data7: Array,
  data30: Array,
  data90: Array
})

const period = ref(7)
const chartRef = ref(null)
let chartInstance = null

const getData = () => {
  if (period.value === 30) return props.data30
  if (period.value === 90) return props.data90
  return props.data7
}

const renderChart = () => {
  if (chartInstance) chartInstance.destroy()

  const ctx = chartRef.value.getContext('2d')
  const data = getData()

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.label),
      datasets: [
        {
          data: data.map(d => d.value),
          borderWidth: 2,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37,99,235,0.15)',
          fill: true,
          tension: 0.4,
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  })
}


watch(period, renderChart)
onMounted(renderChart)
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5 h-full flex flex-col">
    <!-- Header -->
    <div>
        <div class=" flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-800">
        Booking Trend
      </h3>
      

      <select
        v-model="period"
        class="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option :value="7">Last 7 days</option>
        <option :value="30">Last 30 days</option>
        <option :value="90">Last 90 days</option>
      </select>
    </div>
    <!-- dynamin perid -->
     <p class="text-sm text-gray-400">
        Last {{ period }} days
      </p>
    </div>

    <!-- Chart -->
    <div class="flex-1">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>
