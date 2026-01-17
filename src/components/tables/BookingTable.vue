<script setup>
defineProps({
  bookings: {
    type: Array,
    required: true
    /*
      {
        id: 'BK-1001',
        customer: 'John Doe',
        property: 'Angkor Paradise Resort',
        checkIn: '2026-01-20',
        checkOut: '2026-01-23',
        guests: 2,
        amount: 420,
        payment: 'Paid' | 'Pending' | 'Refunded',
        status: 'Confirmed' | 'Pending' | 'Cancelled'
      }
    */
  }
})
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white overflow-hidden">
    <!-- Header -->
    <!-- <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800">
        Bookings
      </h3>
      <p class="text-sm text-gray-400">
        Manage and track all bookings across the platform
      </p>
    </div> -->

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-gray-600">
          <tr>
            <th class="px-6 py-3 text-left font-medium">Booking ID</th>
            <th class="px-6 py-3 text-left font-medium">Customer</th>
            <th class="px-6 py-3 text-left font-medium">Property</th>
            <th class="px-6 py-3 text-center font-medium">Check-in</th>
            <th class="px-6 py-3 text-center font-medium">Check-out</th>
            <th class="px-6 py-3 text-center font-medium">Guests</th>
            <th class="px-6 py-3 text-right font-medium">Amount</th>
            <th class="px-6 py-3 text-center font-medium">Payment</th>
            <th class="px-6 py-3 text-center font-medium">Status</th>
            <th class="px-6 py-3 text-center font-medium">Action</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="(booking, index) in bookings"
            :key="index"
            class="hover:bg-gray-50"
          >
            <!-- Booking ID -->
            <td class="px-6 py-4 font-medium text-blue-600">
              {{ booking.id }}
            </td>

            <!-- Customer -->
            <td class="px-6 py-4 text-gray-900">
              {{ booking.customer }}
            </td>

            <!-- Property -->
            <td class="px-6 py-4 text-gray-600">
              {{ booking.property }}
            </td>

            <!-- Check-in -->
            <td class="px-6 py-4 text-center text-gray-500">
              {{ booking.checkIn }}
            </td>

            <!-- Check-out -->
            <td class="px-6 py-4 text-center text-gray-500">
              {{ booking.checkOut }}
            </td>

            <!-- Guests -->
            <td class="px-6 py-4 text-center">
              {{ booking.guests }}
            </td>

            <!-- Amount -->
            <td class="px-6 py-4 text-right font-semibold text-gray-900">
              ${{ booking.amount.toLocaleString() }}
            </td>

            <!-- Payment -->
            <td class="px-6 py-4 text-center">
              <span
                class="rounded-full px-3 py-1 text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-700': booking.payment === 'Paid',
                  'bg-yellow-100 text-yellow-700': booking.payment === 'Pending',
                  'bg-red-100 text-red-700': booking.payment === 'Refunded'
                }"
              >
                {{ booking.payment }}
              </span>
            </td>

            <!-- Status -->
            <td class="px-6 py-4 text-center">
              <span
                class="rounded-full px-3 py-1 text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-700': booking.status === 'Confirmed',
                  'bg-yellow-100 text-yellow-700': booking.status === 'Pending',
                  'bg-gray-100 text-gray-600': booking.status === 'Cancelled'
                }"
              >
                {{ booking.status }}
              </span>
            </td>

            <!-- Action -->
            <td class="px-6 py-4 text-center">
              <button
                class="text-blue-600 hover:text-blue-800"
                title="View Booking Detail"
                @click="$emit('view', booking)"
              >
                <font-awesome-icon icon="eye" />
              </button>
            </td>
          </tr>

          <!-- Empty -->
          <tr v-if="bookings.length === 0">
            <td
              colspan="10"
              class="px-6 py-10 text-center text-gray-400"
            >
              No bookings found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
