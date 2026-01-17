<script setup>
defineProps({
  refunds: {
    type: Array,
    required: true
    /*
      {
        bookingId: 'BK-1001',
        customer: 'John Doe',
        property: 'Angkor Paradise Resort',
        amount: 420,
        requestDate: '2026-01-16',
        status: 'Pending' | 'Approved' | 'Rejected'
      }
    */
  }
})

const emit = defineEmits(['approve', 'reject'])
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white overflow-hidden">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800">
        Refund Requests
      </h3>
      <p class="text-sm text-gray-400">
        Review and manage refund requests
      </p>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-gray-600">
          <tr>
            <th class="px-6 py-3 text-left font-medium">Booking ID</th>
            <th class="px-6 py-3 text-left font-medium">Customer</th>
            <th class="px-6 py-3 text-left font-medium">Property</th>
            <th class="px-6 py-3 text-right font-medium">Amount</th>
            <th class="px-6 py-3 text-center font-medium">Request Date</th>
            <th class="px-6 py-3 text-center font-medium">Status</th>
            <th class="px-6 py-3 text-center font-medium">Action</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="(refund, index) in refunds"
            :key="index"
            class="hover:bg-gray-50"
          >
            <!-- Booking -->
            <td class="px-6 py-4 font-medium text-blue-600">
              {{ refund.bookingId }}
            </td>

            <!-- Customer -->
            <td class="px-6 py-4 text-gray-900">
              {{ refund.customer }}
            </td>

            <!-- Property -->
            <td class="px-6 py-4 text-gray-600">
              {{ refund.property }}
            </td>

            <!-- Amount -->
            <td class="px-6 py-4 text-right font-semibold text-gray-900">
              ${{ refund.amount.toLocaleString() }}
            </td>

            <!-- Date -->
            <td class="px-6 py-4 text-center text-gray-500">
              {{ refund.requestDate }}
            </td>

            <!-- Status -->
            <td class="px-6 py-4 text-center">
              <span
                class="rounded-full px-3 py-1 text-xs font-medium"
                :class="{
                  'bg-yellow-100 text-yellow-700': refund.status === 'Pending',
                  'bg-green-100 text-green-700': refund.status === 'Approved',
                  'bg-red-100 text-red-700': refund.status === 'Rejected'
                }"
              >
                {{ refund.status }}
              </span>
            </td>

            <!-- Action -->
            <td class="px-6 py-4 text-center">
              <!-- Pending -->
              <div
                v-if="refund.status === 'Pending'"
                class="flex justify-center gap-2"
              >
                <button
                  class="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
                  @click="emit('approve', refund)"
                >
                  Approve
                </button>

                <button
                  class="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                  @click="emit('reject', refund)"
                >
                  Reject
                </button>
              </div>

              <!-- Done -->
              <span
                v-else
                class="text-xs text-gray-400 italic"
              >
                No action needed
              </span>
            </td>
          </tr>

          <!-- Empty -->
          <tr v-if="refunds.length === 0">
            <td
              colspan="7"
              class="px-6 py-10 text-center text-gray-400"
            >
              No refund requests found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
