<script setup>
defineProps({
  resorts: {
    type: Array,
    required: true
    /*
      format:
      [
        {
          name: 'Angkor Paradise Resort',
          bookings: 1240,
          revenue: 32000,
          occupancy: 82
        }
      ]
    */
  }
})
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white overflow-hidden">
    <!-- Header -->
    <div class="border-b border-gray-200 px-5 py-4">
      <h3 class="text-lg font-semibold text-gray-800">
        Top Performing Resorts
      </h3>
      <p class="text-sm text-gray-400">
        Ranked by bookings and revenue
      </p>
    </div>

    <!-- Table -->
    <table class="min-w-full border-collapse">
      <thead class="bg-gray-50 border-b border-gray-200">
        <tr>
          <th class="px-5 py-3 text-left text-sm font-semibold text-gray-700">
            Rank
          </th>
          <th class="px-5 py-3 text-left text-sm font-semibold text-gray-700">
            Resort Name
          </th>
          <th class="px-5 py-3 text-right text-sm font-semibold text-gray-700">
            Bookings
          </th>
          <th class="px-5 py-3 text-right text-sm font-semibold text-gray-700">
            Revenue
          </th>
          <th class="px-5 py-3 text-left text-sm font-semibold text-gray-700">
            Occupancy Rate
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(resort, index) in resorts"
          :key="index"
          class="border-t border-gray-200 hover:bg-gray-50 transition"
        >
          <!-- Rank -->
          <td class="px-5 py-3 font-medium text-gray-700">
            #{{ index + 1 }}
          </td>

          <!-- Name -->
          <td class="px-5 py-3 text-gray-800">
            {{ resort.name }}
          </td>

          <!-- Bookings -->
          <td class="px-5 py-3 text-right text-gray-700">
            {{ resort.bookings.toLocaleString() }}
          </td>

          <!-- Revenue -->
          <td class="px-5 py-3 text-right font-medium text-gray-800">
            ${{ resort.revenue.toLocaleString() }}
          </td>

          <!-- Occupancy -->
          <td class="px-5 py-3">
            <div class="flex items-center gap-3">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="h-2 rounded-full"
                  :class="[
                    resort.occupancy >= 80 && 'bg-green-500',
                    resort.occupancy >= 50 && resort.occupancy < 80 && 'bg-yellow-500',
                    resort.occupancy < 50 && 'bg-red-500'
                  ]"
                  :style="{ width: resort.occupancy + '%' }"
                />
              </div>
              <span class="text-sm text-gray-600">
                {{ resort.occupancy }}%
              </span>
            </div>
          </td>
        </tr>

        <!-- Empty -->
        <tr v-if="resorts.length === 0">
          <td colspan="5" class="px-5 py-8 text-center text-sm text-gray-400">
            No performance data available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
