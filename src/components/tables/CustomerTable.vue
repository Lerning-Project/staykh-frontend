<script setup>
defineProps({
  customers: {
    type: Array,
    required: true
    /*
      {
        name: 'John Doe',
        phone: '+855 12 345 678',
        bookings: 12,
        totalSpent: 1250,
        lastBooking: '2026-01-14',
        status: 'active' | 'banned'
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
        Customers
      </h3>
      <p class="text-sm text-gray-400">
        Manage all registered customers across the platform
      </p>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-gray-600">
          <tr>
            <th class="px-6 py-3 text-left font-medium">Name</th>
            <th class="px-6 py-3 text-left font-medium">Phone</th>
            <th class="px-6 py-3 text-center font-medium">Bookings</th>
            <th class="px-6 py-3 text-right font-medium">Total Spent</th>
            <th class="px-6 py-3 text-center font-medium">Last Booking</th>
            <th class="px-6 py-3 text-center font-medium">Status</th>
            <th class="px-6 py-3 text-center font-medium">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="(customer, index) in customers"
            :key="index"
            class="hover:bg-gray-50"
          >
            <!-- Name -->
            <td class="px-6 py-4 font-medium text-gray-900">
              {{ customer.name }}
            </td>

            <!-- Phone -->
            <td class="px-6 py-4 text-gray-600">
              {{ customer.phone }}
            </td>

            <!-- Bookings -->
            <td class="px-6 py-4 text-center">
              {{ customer.bookings }}
            </td>

            <!-- Total Spent -->
            <td class="px-6 py-4 text-right font-semibold text-gray-900">
              ${{ customer.totalSpent.toLocaleString() }}
            </td>

            <!-- Last Booking -->
            <td class="px-6 py-4 text-center text-gray-500">
              {{ customer.lastBooking }}
            </td>

            <!-- Status -->
            <td class="px-6 py-4 text-center">
              <span
                class="rounded-full px-3 py-1 text-xs font-medium"
                :class="customer.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'"
              >
                {{ customer.status === 'active' ? 'Active' : 'Banned' }}
              </span>
            </td>

            <!-- Actions -->
            <td class="px-6 py-4 text-center">
              <div class="flex justify-center gap-3">
                <!-- View -->
                <button
                  class="text-blue-600 hover:text-blue-800"
                  title="View Customer"
                  @click="$emit('view', customer)"
                >
                  <font-awesome-icon icon="eye" />
                </button>

                <!-- Ban / Unban -->
                <button
                  :class="customer.status === 'active'
                    ? 'text-red-600 hover:text-red-800'
                    : 'text-gray-400 hover:text-gray-600'"
                  :title="customer.status === 'active' ? 'Ban Customer' : 'Customer Banned'"
                  @click="$emit('ban', customer)"
                >
                  <font-awesome-icon icon="ban" />
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="customers.length === 0">
            <td
              colspan="7"
              class="px-6 py-10 text-center text-gray-400"
            >
              No customers found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
