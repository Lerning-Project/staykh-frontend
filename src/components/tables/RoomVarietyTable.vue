<script setup>
const props = defineProps({
  rooms: {
    type: Array,
    required: true
    /*
      format:
      {
        id: 1,
        roomName: 'Deluxe Room',
        propertyName: 'Angkor Paradise Resort',
        province: 'Siem Reap',
        price: 120,
        capacity: 3,
        status: 'active' | 'inactive',
        bookings: 125
      }
    */
  }
})

const statusConfig = {
  available: { label: 'Available', color: 'bg-green-100 text-green-700' },
  disabled: { label: 'Disabled', color: 'bg-gray-100 text-gray-500' }
}

const emit = defineEmits(['view', 'edit', 'suspend'])
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white">
    <!-- Header -->
    <!-- <div class="border-b border-gray-200 px-6 py-4">
      <h2 class="text-xl font-semibold text-gray-800">
        Room Variety Management
      </h2>
      <p class="text-sm text-gray-400">
        Manage all room types across properties
      </p>
    </div> -->

    <!-- Table -->
    <div class="overflow-x-auto rounded-xl">
      <table class="w-full border-collapse">
        <!-- Head -->
        <thead class="bg-gray-50">
          <tr class="text-left text-xs font-semibold uppercase text-gray-500 ">
            <th class="px-6 py-3">Room Name</th>
            <th class="px-6 py-3">Property</th>
            <th class="px-6 py-3">Province</th>
            <th class="px-6 py-3 text-right">Price / Night</th>
            <th class="px-6 py-3 text-right">Capacity</th>
            <th class="px-6 py-3">Status</th>
            <th class="px-6 py-3 text-right">Bookings</th>
            <th class="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody>
          <tr
            v-for="room in rooms"
            :key="room.id"
            class="border-t border-gray-200 hover:bg-gray-50 transition"
          >
            <!-- Room Name -->
            <td class="px-6 py-4 text-sm font-medium text-gray-800">
              {{ room.roomName }}
            </td>

            <!-- Property -->
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ room.propertyName }}
            </td>

            <!-- Province -->
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ room.province }}
            </td>

            <!-- Price -->
            <td class="px-6 py-4 text-right text-sm font-medium text-gray-800">
              ${{ room.price.toLocaleString() }}
            </td>

            <!-- Capacity -->
            <td class="px-6 py-4 text-right text-sm text-gray-700">
                <!-- icon -->
                <font-awesome-icon icon="users" />
              {{ room.capacity }}
            </td>

            <!-- Status -->
            <td class="px-6 py-4">
              <span
                class="rounded-full px-2 py-1 text-xs font-medium"
                :class="statusConfig[room.status].color"
              >
                {{ statusConfig[room.status].label }}
              </span>
            </td>

            <!-- Bookings -->
            <td class="px-6 py-4 text-right text-sm text-gray-700">
                <!-- icon -->
                <font-awesome-icon icon="calendar-check" />
              {{ room.bookings.toLocaleString() }}
            </td>

            <!-- Actions -->
            <td class="px-6 py-4 text-center">
              <div class="flex justify-center gap-3">
                <!-- View -->
                <button
                  @click="$emit('view', room)"
                  class="text-blue-600 hover:text-blue-800"
                  title="View Room"
                >
                  <font-awesome-icon icon="eye" />
                </button>

                <!-- Edit -->
                <button
                  @click="$emit('edit', room)"
                  class="text-gray-600 hover:text-gray-800"
                  title="Edit Room"
                >
                  <font-awesome-icon icon="pen" />
                </button>

                <!-- Suspend -->
                <button
                  @click="$emit('suspend', room)"
                  class="text-red-600 hover:text-red-800"
                  title="Suspend Room"
                >
                  <font-awesome-icon icon="ban" />
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty -->
          <tr v-if="rooms.length === 0">
            <td
              colspan="8"
              class="px-6 py-12 text-center text-sm text-gray-400"
            >
              No rooms found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
