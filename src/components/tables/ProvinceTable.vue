<script setup>
const props = defineProps({
  provinces: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const emit = defineEmits(['view', 'edit', 'toggle'])

const safeNumber = (value) => {
  return typeof value === 'number' ? value : 0
}

const safeText = (value) => {
  return value ? value : '-'
}

const isVisible = (value) => {
  return value === true
}
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white">
    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <!-- Head -->
        <thead class="bg-gray-50">
          <tr class="text-left text-xs font-semibold uppercase text-gray-500">
            <th class="px-6 py-3">Province</th>
            <th class="px-6 py-3">Code</th>
            <th class="px-6 py-3 text-right">Resorts</th>
            <th class="px-6 py-3 text-right">Bookings</th>
            <th class="px-6 py-3 text-right">Revenue</th>
            <th class="px-6 py-3 text-center">Visibility</th>
            <th class="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody>
          <tr
            v-for="province in provinces"
            :key="province?.id ?? Math.random()"
            class="border-t border-gray-200 hover:bg-gray-50 transition"
          >
            <!-- Province Name -->
            <td class="px-6 py-4 text-sm font-semibold text-gray-800 flex items-center gap-2">
              <font-awesome-icon icon="location-dot" class="text-blue-500" />
              {{ safeText(province?.name) }}
            </td>

            <!-- Code -->
            <td class="px-6 py-4">
              <span
                class="inline-flex items-center justify-center rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600"
              >
                {{ safeText(province?.code) }}
              </span>
            </td>

            <!-- Resorts -->
            <td class="px-6 py-4 text-right text-sm text-gray-700">
              <font-awesome-icon icon="landmark" class="mr-1" />
              {{ safeNumber(province?.resorts).toLocaleString() }}
            </td>

            <!-- Bookings -->
            <td class="px-6 py-4 text-right text-sm text-gray-700">
              <font-awesome-icon icon="calendar-check" class="mr-1" />
              {{ safeNumber(province?.bookings).toLocaleString() }}
            </td>

            <!-- Revenue -->
            <td class="px-6 py-4 text-right text-sm font-medium text-gray-800">
              $
              {{ safeNumber(province?.revenue).toLocaleString() }}
            </td>

            <!-- Visibility -->
            <td class="px-6 py-4 text-center">
              <span
                v-if="isVisible(province?.visible)"
                class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
              >
                Visible
              </span>

              <span
                v-else
                class="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-600"
              >
                Hidden
              </span>
            </td>

            <!-- Actions -->
            <td class="px-6 py-4 text-center">
              <div class="flex justify-center gap-3">
                <!-- View -->
                <button
                  @click="emit('view', province)"
                  class="text-blue-600 hover:text-blue-800"
                  title="View Details"
                >
                  <font-awesome-icon icon="eye" />
                </button>

                <!-- Edit -->
                <button
                  @click="emit('edit', province)"
                  class="text-gray-600 hover:text-gray-800"
                  title="Edit Province"
                >
                  <font-awesome-icon icon="pen" />
                </button>

                <!-- Toggle -->
                <button
                  @click="emit('toggle', province)"
                  :title="isVisible(province?.visible) ? 'Hide Province' : 'Show Province'"
                >
                  <font-awesome-icon
                    :icon="isVisible(province?.visible) ? 'eye' : 'eye-slash'"
                    :class="
                      isVisible(province?.visible)
                        ? 'text-green-600 hover:text-green-800'
                        : 'text-gray-400 hover:text-gray-600'
                    "
                  />
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty -->
          <tr v-if="!provinces || provinces.length === 0">
            <td colspan="7" class="px-6 py-12 text-center text-sm text-gray-400">
              No provinces found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
