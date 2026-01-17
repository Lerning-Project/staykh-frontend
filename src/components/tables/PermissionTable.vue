<script setup>
defineProps({
  permissions: Object
})

const roles = [
  { key: 'superAdmin', label: 'Super Admin' },
  { key: 'resortAdmin', label: 'Resort Admin' },
  { key: 'posStaff', label: 'POS Staff' }
]

const modules = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'resorts', label: 'Resorts' },
  { key: 'roomVarieties', label: 'Room Varieties' },
  { key: 'users', label: 'Users' },
  { key: 'bookings', label: 'Bookings' },
  { key: 'payments', label: 'Payments' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'medias', label: 'Medias' },
  { key: 'settings', label: 'Settings' }
]

const perms = ['Read', 'Write', 'Approve', 'Refund']
const permKeys = ['read', 'write', 'approve', 'refund']
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white overflow-x-auto">
    <table class="min-w-full border-collapse">
      <!-- Header -->
      <thead class="bg-gray-50 border-b border-gray-200">
        <!-- Role Names -->
        <tr>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">
            Module
          </th>
          <th
            v-for="role in roles"
            :key="role.key"
            class="px-4 py-3 text-center text-sm font-semibold text-gray-700"
          >
            {{ role.label }}
          </th>
        </tr>
        <!-- Permission Labels -->
        <tr class="bg-gray-100">
          <th></th>
          <th
            v-for="role in roles"
            :key="role.key"
            class="px-4 py-2 text-center text-xs font-medium text-gray-500"
          >
            <div class="grid grid-cols-4 gap-2">
              <span v-for="perm in perms" :key="perm">{{ perm }}</span>
            </div>
          </th>
        </tr>
      </thead>

      <!-- Body -->
      <tbody>
        <tr
          v-for="module in modules"
          :key="module.key"
          class="border-t border-gray-200 hover:bg-gray-50"
        >
          <!-- Module Name -->
          <td class="px-4 py-3 font-medium text-gray-700">
            {{ module.label }}
          </td>

          <!-- Role Permissions -->
          <td
            v-for="role in roles"
            :key="role.key"
            class="px-4 py-3"
          >
            <div class="grid grid-cols-4 gap-2 text-center">
              <font-awesome-icon
                v-for="(permKey, index) in permKeys"
                :key="permKey"
                :icon="permissions[module.key][role.key][permKey]
                  ? ['fas', 'circle-check']
                  : ['fas', 'circle-xmark']"
                :class="permissions[module.key][role.key][permKey]
                  ? 'text-green-600'
                  : 'text-red-400'"
                class="mx-auto"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
