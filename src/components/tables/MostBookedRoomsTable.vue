<script setup>
defineProps({
  rooms: {
    type: Array,
    required: true
    /*
      format:
      [
        {
          roomName: 'Deluxe King Room',
          resort: 'Angkor Paradise Resort',
          bookings: 420,
          maxBookings: 600 // used for progress calculation
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
        Most Booked Room Varieties
      </h3>
      <p class="text-sm text-gray-400">
        Based on number of bookings
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
            Room Name
          </th>
          <th class="px-5 py-3 text-left text-sm font-semibold text-gray-700">
            Resort
          </th>
          <th class="px-5 py-3 text-right text-sm font-semibold text-gray-700">
            Bookings
          </th>
          <th class="px-5 py-3 text-left text-sm font-semibold text-gray-700">
            Popularity
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(room, index) in rooms"
          :key="index"
          class="border-t border-gray-200 hover:bg-gray-50 transition"
        >
          <!-- Rank -->
          <td class="px-5 py-3 font-medium text-gray-700">
            #{{ index + 1 }}
          </td>

          <!-- Room -->
          <td class="px-5 py-3 text-gray-800">
            {{ room.roomName }}
          </td>

          <!-- Resort -->
          <td class="px-5 py-3 text-gray-600">
            {{ room.resort }}
          </td>

          <!-- Booking Count -->
          <td class="px-5 py-3 text-right font-medium text-gray-800">
            {{ room.bookings.toLocaleString() }}
          </td>

          <!-- Progress -->
          <td class="px-5 py-3">
            <div class="flex items-center gap-3">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="h-2 rounded-full bg-blue-600"
                  :style="{
                    width:
                      Math.min(
                        (room.bookings / room.maxBookings) * 100,
                        100
                      ) + '%'
                  }"
                />
              </div>
              <span class="text-sm text-gray-600">
                {{
                  Math.round(
                    (room.bookings / room.maxBookings) * 100
                  )
                }}%
              </span>
            </div>
          </td>
        </tr>

        <!-- Empty -->
        <tr v-if="rooms.length === 0">
          <td colspan="5" class="px-5 py-8 text-center text-sm text-gray-400">
            No booking data available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
