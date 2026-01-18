<script setup>
import { ref, onMounted, watch } from 'vue'
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
)

const props = defineProps({
  data: {
    type: Array,
    required: true
    /*
      format:
      [
        { source: 'Website', value: 40 },
        { source: 'Mobile App', value: 30 }
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
    type: 'doughnut',
    data: {
      labels: props.data.map(d => d.source),
      datasets: [
        {
          data: props.data.map(d => d.value),
          backgroundColor: [
            '#2563eb', // blue
            '#16a34a', // green
            '#f59e0b', // yellow
            '#ef4444', // red
            '#8b5cf6'  // purple
          ],
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            label: (ctx) =>
              `${ctx.label}: ${ctx.parsed}%`
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
        Booking Sources
      </h3>
      <p class="text-sm text-gray-400">
        Distribution by booking channel
      </p>
    </div>

    <!-- Chart -->
    <div class="h-72">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>
