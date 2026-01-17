<script setup>
defineProps({
  transactions: {
    type: Array,
    required: true
    /*
      {
        id: 'TX-10001',
        bookingId: 'BK-1001',
        customer: 'John Doe',
        property: 'Angkor Paradise Resort',
        amount: 420,
        type: 'ABA' | 'Card' | 'Cash' | 'Refund',
        date: '2026-01-15 10:20',
        status: 'Success' | 'Pending' | 'Failed'
      }
    */
  }
})
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white overflow-hidden">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800">
        Transactions
      </h3>
      <p class="text-sm text-gray-400">
        All payment transactions across the platform
      </p>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-gray-600">
          <tr>
            <th class="px-6 py-3 text-left font-medium">Transaction ID</th>
            <th class="px-6 py-3 text-left font-medium">Booking ID</th>
            <th class="px-6 py-3 text-left font-medium">Customer</th>
            <th class="px-6 py-3 text-left font-medium">Property</th>
            <th class="px-6 py-3 text-right font-medium">Amount</th>
            <th class="px-6 py-3 text-center font-medium">Type</th>
            <th class="px-6 py-3 text-center font-medium">Date</th>
            <th class="px-6 py-3 text-center font-medium">Status</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="(tx, index) in transactions"
            :key="index"
            class="hover:bg-gray-50"
          >
            <!-- Transaction ID -->
            <td class="px-6 py-4 font-medium text-blue-600">
              {{ tx.id }}
            </td>

            <!-- Booking ID -->
            <td class="px-6 py-4 text-gray-700">
              {{ tx.bookingId }}
            </td>

            <!-- Customer -->
            <td class="px-6 py-4 text-gray-900">
              {{ tx.customer }}
            </td>

            <!-- Property -->
            <td class="px-6 py-4 text-gray-600">
              {{ tx.property }}
            </td>

            <!-- Amount -->
            <td class="px-6 py-4 text-right font-semibold text-gray-900">
              ${{ tx.amount.toLocaleString() }}
            </td>

            <!-- Type -->
            <td class="px-6 py-4 text-center">
              <span
                class="rounded-full px-3 py-1 text-xs font-medium"
                :class="{
                  'bg-blue-100 text-blue-700': tx.type === 'ABA',
                  'bg-purple-100 text-purple-700': tx.type === 'Card',
                  'bg-gray-100 text-gray-700': tx.type === 'Cash',
                  'bg-red-100 text-red-700': tx.type === 'Refund'
                }"
              >
                {{ tx.type }}
              </span>
            </td>

            <!-- Date -->
            <td class="px-6 py-4 text-center text-gray-500">
              {{ tx.date }}
            </td>

            <!-- Status -->
            <td class="px-6 py-4 text-center">
              <span
                class="rounded-full px-3 py-1 text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-700': tx.status === 'Success',
                  'bg-yellow-100 text-yellow-700': tx.status === 'Pending',
                  'bg-red-100 text-red-700': tx.status === 'Failed'
                }"
              >
                {{ tx.status }}
              </span>
            </td>
          </tr>

          <!-- Empty -->
          <tr v-if="transactions.length === 0">
            <td
              colspan="8"
              class="px-6 py-10 text-center text-gray-400"
            >
              No transactions found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
