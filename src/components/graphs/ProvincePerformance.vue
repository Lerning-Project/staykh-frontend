<script setup>
import { ref, onMounted, watch } from 'vue'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip
} from 'chart.js'

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip
)

const props = defineProps({
  data: {
    type: Array,
    required: true
    /*
      format:
      [
        { province: 'Phnom Penh', bookings: 1240 }
      ]
    */
  }
})

const chartRef = ref(null)
let chartInstance = null

const renderChart = () => {
  if (chartInstance) chartInstance.destroy()

  const ctx = chartRef.value.getContext('2d')

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: props.data.map(d => d.province),
      datasets: [
        {
          label: 'Bookings',
          data: props.data.map(d => d.bookings),
          backgroundColor: '#2563eb', // blue-600
          borderRadius: 8,
          barThickness: 36
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) =>
              `Bookings: ${ctx.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => value.toLocaleString()
          }
        }
      }
    }
  })
}

onMounted(renderChart)
watch(() => props.data, renderChart, { deep: true })
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5">
    <!-- Header -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-800">
        Booking by Province
      </h3>
      <p class="text-sm text-gray-400">
        Total bookings across provinces
      </p>
    </div>

    <!-- Chart -->
    <div class="h-80">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>
