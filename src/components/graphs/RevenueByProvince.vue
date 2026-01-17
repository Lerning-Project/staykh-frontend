<script setup>
import { ref, onMounted } from 'vue'
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
  }
})

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  const ctx = chartRef.value.getContext('2d')

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: props.data.map(d => d.province),
      datasets: [
        {
          data: props.data.map(d => d.revenue),
          backgroundColor: '#2563eb',
          borderRadius: 8,
          barThickness: 28
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
            label: ctx => `$${ctx.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          beginAtZero: true,
          ticks: {
            callback: v => `$${v / 1000}k`
          }
        }
      }
    }
  })
})
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5 h-full flex flex-col">
    <!-- Header -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-800">
        Revenue by Province
      </h3>
      <p class="text-sm text-gray-400">
        Distribution across Cambodia
      </p>
    </div>

    <!-- Chart -->
    <div class="flex-1">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>
