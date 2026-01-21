<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  role: 'pos_staff',
  password: '',
  confirmPassword: ''
})

const submitRegister = () => {
  console.log(form.value)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8">
      <!-- Title -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Create Account</h1>
        <p class="text-sm text-gray-500 mt-1">
          Register new admin or POS staff
        </p>
      </div>

      <form @submit.prevent="submitRegister" class="space-y-4">
        <!-- Name -->
        <div>
          <label class="text-sm font-medium text-gray-700">Full Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="John Doe"
            class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg"
          />
        </div>

        <!-- Phone Number -->
        <div>
          <label class="text-sm font-medium text-gray-700">Phone Number</label>
          <input
            v-model="form.phone_number"
            type="text"
            placeholder="08123456789"
            class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg"
          />
        </div>

        <!-- Role -->
        <div>
          <label class="text-sm font-medium text-gray-700">Role</label>
          <select
            v-model="form.role"
            class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="super_admin">Super Admin</option>
            <option value="pos_staff">POS Staff</option>
          </select>
        </div>

        <!-- Password -->
        <div>
          <label class="text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg"
          />
        </div>

        <!-- Confirm -->
        <div>
          <label class="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            v-model="form.confirmPassword"
            type="password"
            class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg"
          />
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="w-full bg-indigo-600 hover:bg-indigo-700
                 text-white py-2 rounded-lg font-medium mt-2"
        >
          Register
        </button>
      </form>

      <!-- Back to login -->
      <p class="text-center text-sm text-gray-500 mt-6">
        Already have an account?
        <a href="/login" class="text-indigo-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  </div>
</template>
