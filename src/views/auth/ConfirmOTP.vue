<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const otp = ref('')
const telephone = ref('')
const loading = ref(false)
const error = ref('')
const resendLoading = ref(false)
const resendSuccess = ref(false)

onMounted(() => {
  telephone.value = sessionStorage.getItem('staykh_pending_telephone') || ''
  if (!telephone.value) router.push('/activate')
})

const handleSubmit = async () => {
  error.value = ''

  if (!/^[0-9]{4,6}$/.test(otp.value)) {
    error.value = 'Please enter a valid OTP code'
    return
  }

  loading.value = true
  try {
    const user = await authStore.confirmOTP(telephone.value, otp.value)

    if (user.role === 'super_admin') router.push('/')
    else if (user.role === 'pos_staff') router.push('/pos')
    else router.push('/')
  } catch (err) {
    error.value = err.message || 'Invalid OTP. Please try again.'
  } finally {
    loading.value = false
  }
}

const handleResendOTP = async () => {
  resendSuccess.value = false
  resendLoading.value = true
  error.value = ''

  try {
    await authStore.resendOTP(telephone.value)
    resendSuccess.value = true
    setTimeout(() => (resendSuccess.value = false), 3000)
  } catch (err) {
    error.value = err.message || 'Failed to resend OTP.'
  } finally {
    resendLoading.value = false
  }
}

const handleBack = () => router.push('/activate')
</script>

<template>
  <!-- Page Background -->
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
              Verify your phone number
            </p>
          </div>

          <!-- Card -->
          <div>
            <h2 class="text-lg font-semibold text-gray-800 mb-2">
              Enter OTP Code
            </h2>
            <p class="text-sm text-gray-500 mb-5">
              Code sent to <span class="font-semibold text-gray-700">{{ telephone }}</span>
            </p>

            <!-- Error -->
            <div
              v-if="error"
              class="mb-4 flex gap-3 items-start p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <font-awesome-icon icon="circle-exclamation" class="text-red-500 mt-0.5" />
              <p class="text-sm text-red-700">{{ error }}</p>
            </div>

            <!-- Success -->
            <div
              v-if="resendSuccess"
              class="mb-4 flex gap-3 items-start p-3 bg-green-50 border border-green-200 rounded-lg"
            >
              <font-awesome-icon icon="circle-check" class="text-green-500 mt-0.5" />
              <p class="text-sm text-green-700">OTP resent successfully</p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <!-- OTP -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label>
                <input
                  v-model="otp"
                  type="text"
                  maxlength="6"
                  placeholder="000000"
                  class="w-full px-4 py-3 text-center text-2xl tracking-widest font-bold
                         border border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  :disabled="loading"
                />
              </div>

              <!-- Submit -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full py-3 bg-indigo-600 hover:bg-indigo-700
                       text-white font-semibold rounded-lg transition
                       disabled:opacity-50"
              >
                <font-awesome-icon v-if="loading" icon="spinner" class="animate-spin mr-2" />
                {{ loading ? 'Verifying...' : 'Verify & Continue' }}
              </button>
            </form>

            <!-- Resend -->
            <div class="mt-4 text-center">
              <p class="text-sm text-gray-600">
                Didn’t receive the code?
              </p>
              <button
                @click="handleResendOTP"
                :disabled="resendLoading"
                class="text-indigo-600 hover:text-indigo-700 text-sm font-medium mt-1"
              >
                <font-awesome-icon
                  v-if="resendLoading"
                  icon="spinner"
                  class="animate-spin mr-1"
                />
                {{ resendLoading ? 'Sending...' : 'Resend OTP' }}
              </button>
            </div>

            <!-- Back -->
            <button
              @click="handleBack"
              class="mt-4 w-full py-2.5 bg-gray-100 hover:bg-gray-200
                     text-gray-700 rounded-lg font-medium"
            >
              <font-awesome-icon icon="arrow-left" class="mr-2" />
              Back to Activation
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  opacity: 0.35;
}
</style>
