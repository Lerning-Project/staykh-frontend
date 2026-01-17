<script setup>
const props = defineProps({
  provinces: {
    type: Array,
    required: true,
    /*
      format:
      {
        id: 1,
        name: 'Phnom Penh',
        code: 'PP',
        resorts: 125,
        bookings: 4520,
        revenue: 235000,
        visible: true
      }
    */
  },
})

const emit = defineEmits(['view', 'edit', 'toggle'])
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white">
    <!-- Header -->
    <!-- <div class="border-b border-gray-200 px-6 py-4">
      <h2 class="text-xl font-semibold text-gray-800">
        Province Management
      </h2>
      <p class="text-sm text-gray-400">
        Manage provinces and regional distribution across Cambodia
      </p>
    </div> -->

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
            :key="province.id"
            class="border-t border-gray-200 hover:bg-gray-50 transition"
          >
            <!-- Province Name -->
            <td class="px-6 py-4 text-sm font-semibold text-gray-800">
              <font-awesome-icon icon="location-dot" class=" text-blue-500" />
              {{ province.name }}
            </td>

            <!-- Code -->
            <td class="px-6 py-4">
              <span
                class="inline-flex items-center justify-center rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600"
              >
                {{ province.code }}
              </span>
            </td>

            <!-- Resorts -->
            <td class="px-6 py-4 text-right text-sm text-gray-700">
              <font-awesome-icon icon="landmark" />
              {{ province.resorts.toLocaleString() }}
            </td>

            <!-- Bookings -->
            <td class="px-6 py-4 text-right text-sm text-gray-700">
              <font-awesome-icon icon="calendar-check" />
              {{ province.bookings.toLocaleString() }}
            </td>

            <!-- Revenue -->
            <td class="px-6 py-4 text-right text-sm font-medium text-gray-800">
              ${{ province.revenue.toLocaleString() }}
            </td>

            <!-- Visibility -->
            <td class="px-6 py-4 text-center">
              <span
                v-if="province.visible"
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
            <td class="px-6 py-4 text-center rounded-lg">
              <div class="flex justify-center gap-3">
                <!-- View -->
                <button
                  @click="$emit('view', province)"
                  class="text-blue-600 hover:text-blue-800"
                  title="View Details"
                >
                  <font-awesome-icon icon="eye" />
                </button>

                <!-- Edit -->
                <button
                  @click="$emit('edit', province)"
                  class="text-gray-600 hover:text-gray-800"
                  title="Edit Province"
                >
                  <font-awesome-icon icon="pen" />
                </button>

                <!-- Toggle Visibility -->
                <button
                  @click="$emit('toggle', province)"
                  class="flex items-center justify-center transition hover:scale-110"
                  :title="province.visible ? 'Hide Province' : 'Show Province'"
                >
                  <font-awesome-icon
                    :icon="province.visible ? 'eye' : 'eye-slash'"
                    :class="
                      province.visible
                        ? 'text-green-600 hover:text-green-800'
                        : 'text-gray-400 hover:text-gray-600'
                    "
                    class="text-lg"
                  />
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty -->
          <tr v-if="provinces.length === 0">
            <td colspan="7" class="px-6 py-12 text-center text-sm text-gray-400">
              No provinces found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
