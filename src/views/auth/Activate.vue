<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  telephone: '',
  firstName: '',
  lastName: '',
})

const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  error.value = ''

  if (!form.value.telephone || !form.value.firstName || !form.value.lastName) {
    error.value = 'Please fill in all fields'
    return
  }

  if (!/^[0-9]{9,10}$/.test(form.value.telephone)) {
    error.value = 'Please enter a valid phone number'
    return
  }

  loading.value = true
  try {
    await authStore.activate(
      form.value.telephone,
      form.value.firstName,
      form.value.lastName
    )
    router.push('/confirm-otp')
  } catch (err) {
    error.value = err.message || 'Failed to send OTP. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <!-- Page background -->
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <!-- Auth Container -->
    <div
      class="w-full max-w-5xl h-[640px] bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
    >
      <!-- LEFT : Image -->
      <div class="hidden lg:block relative">
        <img
          src="/hotel.jpg"
          alt="Hotel"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-indigo-900/40"></div>

        
      </div>

      <!-- RIGHT : Content -->
      <div class="flex items-center justify-center p-8">
        <div class="w-full max-w-md">
          <!-- Brand -->
          <div class="text-center mb-6">
            <div
              class="mx-auto mb-3 w-14 h-14 rounded-xl bg-indigo-600 flex items-center justify-center shadow"
            >
              <font-awesome-icon icon="hotel" class="text-white text-2xl" />
            </div>
            <h1 class="text-2xl font-bold text-gray-800">StayKH Admin</h1>
            <p class="text-gray-500 text-sm">
              Activate your account
            </p>
          </div>

          <!-- Card -->
          <div class="bg-white">
            <h2 class="text-lg font-semibold text-gray-800 mb-5">
              Account Activation
            </h2>

            <!-- Error -->
            <div
              v-if="error"
              class="mb-4 flex gap-3 items-start p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <font-awesome-icon icon="circle-exclamation" class="text-red-500 mt-0.5" />
              <p class="text-sm text-red-700">{{ error }}</p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Phone -->
              <div>
                <label class="text-sm font-medium text-gray-700 mb-1 block">
                  Phone Number
                </label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <font-awesome-icon icon="phone" />
                  </span>
                  <input
                    v-model="form.telephone"
                    type="tel"
                    placeholder="0978531358"
                    :disabled="loading"
                    class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg
                           focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <!-- First Name -->
              <div>
                <label class="text-sm font-medium text-gray-700 mb-1 block">
                  First Name
                </label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <font-awesome-icon icon="user" />
                  </span>
                  <input
                    v-model="form.firstName"
                    type="text"
                    placeholder="Sunneng"
                    :disabled="loading"
                    class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg
                           focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <!-- Last Name -->
              <div>
                <label class="text-sm font-medium text-gray-700 mb-1 block">
                  Last Name
                </label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <font-awesome-icon icon="user" />
                  </span>
                  <input
                    v-model="form.lastName"
                    type="text"
                    placeholder="Sen"
                    :disabled="loading"
                    class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg
                           focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full flex items-center justify-center gap-2 py-2.5
                       bg-indigo-600 hover:bg-indigo-700 text-white
                       font-semibold rounded-lg transition
                       disabled:opacity-50"
              >
                <font-awesome-icon v-if="loading" icon="spinner" class="animate-spin" />
                {{ loading ? 'Sending OTP...' : 'Continue' }}
              </button>
            </form>

            <!-- Info -->
            <div class="mt-5 flex gap-3 p-3 bg-indigo-50 rounded-lg">
              <font-awesome-icon icon="info-circle" class="text-indigo-500 mt-0.5" />
              <p class="text-sm text-indigo-700">
                A verification code will be sent to your phone number.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
