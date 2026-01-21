<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const remember = ref(false)
const errorMessage = ref('')
const isLoading = ref(false)

const submitLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const userData = await authStore.login(email.value, password.value)

    // Redirect based on user role
    if (userData.role === 'super_admin') {
      router.push('/')
    } else if (userData.role === 'pos_staff') {
      router.push('/pos')
    } else {
      router.push('/')
    }
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8">
      <!-- Logo / Title -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">StayKH Admin</h1>
        <p class="text-sm text-gray-500 mt-1">Login as Super Admin or POS Staff</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitLogin" class="space-y-5">
        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
        >
          {{ errorMessage }}
        </div>

        <!-- Email -->
        <div>
          <label class="text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="admin@staykh.com"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <!-- Remember -->
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 text-gray-600">
            <input type="checkbox" v-model="remember" />
            Remember me
          </label>
          <a href="#" class="text-indigo-600 hover:underline"> Forgot password? </a>
        </div>

        <!-- Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>

        <!-- Hint -->
        <div class="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-xs">
          <strong>Demo Credentials:</strong><br />
          <div class="mt-2">
            <strong>Super Admin:</strong><br />
            Email: admin@staykh.com | Password: admin123
          </div>
          <div class="mt-2">
            <strong>POS Staff:</strong><br />
            Email: pos@staykh.com | Password: pos123
          </div>
        </div>
      </form>

      <!-- Footer -->
      <p class="text-center text-sm text-gray-500 mt-6">© 2026 StayKH</p>
    </div>
  </div>
</template>
