<script setup>
defineProps({
  staffs: {
    type: Array,
    required: true
    /*
      {
        name: 'Sok Chan',
        role: 'Manager' | 'Receptionist' | 'Cleaner' | 'Accountant',
        property: 'Angkor Paradise Resort',
        lastActive: '2026-01-15 09:30',
        status: 'active' | 'inactive' | 'suspended'
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
        Resort Staff
      </h3>
      <p class="text-sm text-gray-400">
        Manage staff access and roles for each resort
      </p>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-gray-600">
          <tr>
            <th class="px-6 py-3 text-left font-medium">Name</th>
            <th class="px-6 py-3 text-left font-medium">Role</th>
            <th class="px-6 py-3 text-left font-medium">Property</th>
            <th class="px-6 py-3 text-center font-medium">Last Active</th>
            <th class="px-6 py-3 text-center font-medium">Status</th>
            <th class="px-6 py-3 text-center font-medium">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="(staff, index) in staffs"
            :key="index"
            class="hover:bg-gray-50"
          >
            <!-- Name -->
            <td class="px-6 py-4 font-medium text-gray-900">
              {{ staff.name }}
            </td>

            <!-- Role -->
            <td class="px-6 py-4 text-gray-700">
              {{ staff.role }}
            </td>

            <!-- Property -->
            <td class="px-6 py-4 text-gray-600">
              {{ staff.property }}
            </td>

            <!-- Last Active -->
            <td class="px-6 py-4 text-center text-gray-500">
              {{ staff.lastActive }}
            </td>

            <!-- Status -->
            <td class="px-6 py-4 text-center">
              <span
                class="rounded-full px-3 py-1 text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-700': staff.status === 'active',
                  'bg-gray-100 text-gray-600': staff.status === 'inactive',
                  'bg-red-100 text-red-700': staff.status === 'suspended'
                }"
              >
                {{ staff.status }}
              </span>
            </td>

            <!-- Actions -->
            <td class="px-6 py-4 text-center">
              <div class="flex justify-center gap-3">
                <!-- View -->
                <button
                  class="text-blue-600 hover:text-blue-800"
                  title="View Staff"
                  @click="$emit('view', staff)"
                >
                  <font-awesome-icon icon="eye" />
                </button>

                <!-- Edit -->
                <button
                  class="text-amber-600 hover:text-amber-800"
                  title="Edit Staff"
                  @click="$emit('edit', staff)"
                >
                  <font-awesome-icon icon="pen-to-square" />
                </button>

                <!-- Suspend -->
                <button
                  class="text-red-600 hover:text-red-800"
                  title="Suspend Staff"
                  @click="$emit('suspend', staff)"
                >
                  <font-awesome-icon icon="user-slash" />
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty -->
          <tr v-if="staffs.length === 0">
            <td
              colspan="6"
              class="px-6 py-10 text-center text-gray-400"
            >
              No staff records found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
