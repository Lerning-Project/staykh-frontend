<script setup>
const props = defineProps({
  resorts: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const emit = defineEmits(['view', 'edit', 'suspend'])

const statusConfig = {
  active: {
    label: 'Active',
    color: 'bg-green-100 text-green-700',
  },
  suspended: {
    label: 'Suspended',
    color: 'bg-red-100 text-red-700',
  },
}

/* ---------- helpers ---------- */
const safeText = (value) => {
  return value ? value : '-'
}

const safeNumber = (value) => {
  return typeof value === 'number' ? value : 0
}

const safeStatus = (status) => {
  return statusConfig[status] ? status : 'suspended'
}
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white">
    <!-- Table -->
    <div class="overflow-x-auto rounded-xl">
      <table class="w-full border-collapse">
        <!-- Head -->
        <thead class="bg-gray-50">
          <tr class="text-left text-xs font-semibold uppercase text-gray-500">
            <th class="px-6 py-3">Property Name</th>
            <th class="px-6 py-3">Province</th>
            <th class="px-6 py-3">Status</th>
            <th class="px-6 py-3 text-right">Total Rooms</th>
            <th class="px-6 py-3 text-right">Bookings</th>
            <th class="px-6 py-3 text-right">Revenue</th>
            <th class="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody>
          <tr
            v-for="resort in resorts"
            :key="resort?.id ?? Math.random()"
            class="border-t border-gray-200 hover:bg-gray-50 transition"
          >
            <!-- Name -->
            <td class="px-6 py-4 text-sm font-medium text-gray-800">
              {{ safeText(resort?.name) }}
            </td>

            <!-- Province -->
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ safeText(resort?.province) }}
            </td>

            <!-- Status -->
            <td class="px-6 py-4">
              <span
                class="rounded-full px-2 py-1 text-xs font-medium"
                :class="statusConfig[safeStatus(resort?.status)].color"
              >
                {{ statusConfig[safeStatus(resort?.status)].label }}
              </span>
            </td>

            <!-- Rooms -->
            <td class="px-6 py-4 text-right text-sm text-gray-700">
              {{ safeNumber(resort?.totalRooms).toLocaleString() }}
            </td>

            <!-- Bookings -->
            <td class="px-6 py-4 text-right text-sm text-gray-700">
              <font-awesome-icon icon="calendar-check" class="mr-1" />
              {{ safeNumber(resort?.totalBookings).toLocaleString() }}
            </td>

            <!-- Revenue -->
            <td class="px-6 py-4 text-right text-sm font-medium text-gray-800">
              $
              {{ safeNumber(resort?.revenue).toLocaleString() }}
            </td>

            <!-- Actions -->
            <td class="px-6 py-4 text-center">
              <div class="flex justify-center gap-3">
                <!-- View -->
                <button
                  @click="emit('view', resort)"
                  class="text-blue-600 hover:text-blue-800"
                  title="View Details"
                >
                  <font-awesome-icon icon="eye" />
                </button>

                <!-- Edit -->
                <button
                  @click="emit('edit', resort)"
                  class="text-gray-600 hover:text-gray-800"
                  title="Edit Resort"
                >
                  <font-awesome-icon icon="pen" />
                </button>

                <!-- Suspend -->
                <button
                  @click="emit('suspend', resort)"
                  class="text-red-600 hover:text-red-800"
                  title="Suspend Resort"
                >
                  <font-awesome-icon icon="ban" />
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty -->
          <tr v-if="!resorts || resorts.length === 0">
            <td
              colspan="7"
              class="px-6 py-12 text-center text-sm text-gray-400"
            >
              No resorts found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
