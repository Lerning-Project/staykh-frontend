import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Cookies from 'universal-cookie'
import { authAPI } from '@/services/api'

const cookies = new Cookies()

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isAuthenticated = ref(false)
  const token = ref(null)

  // Getters
  const isSuperAdmin = computed(() => {
    return user.value?.role === 'super_admin'
  })

  const isPosStaff = computed(() => {
    return user.value?.role === 'pos_staff'
  })

  // Actions
  
  /**
   * Activate account and request OTP
   * @param {string} telephone - Phone number
   * @param {string} firstName - First name
   * @param {string} lastName - Last name
   * @returns {Promise} API response
   */
  async function activate(telephone, firstName, lastName) {
    try {
      const response = await authAPI.activate(telephone, firstName, lastName)
      // Store telephone for OTP confirmation step
      sessionStorage.setItem('staykh_pending_telephone', telephone)
      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Confirm OTP and authenticate user
   * @param {string} telephone - Phone number
   * @param {string} otp - OTP code
   * @returns {Promise} User data
   */
  async function confirmOTP(telephone, otp) {
    try {
      const response = await authAPI.confirmOTP(telephone, otp)
      
      // Extract tokens from response
      // Response structure: { status, message, data: { accessToken, refreshToken } }
      const { accessToken, refreshToken } = response.data.data
      
      // Create user data object with super_admin role
      const userData = {
        telephone: telephone,
        role: 'super_admin', // Set to super_admin as API doesn't return role
        name: 'Admin User', // You can update this later if needed
      }
      
      // Store access token in cookie
      cookies.set('staykh_token', accessToken, {
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        sameSite: 'lax',
      })
      
      // Store refresh token in cookie
      cookies.set('staykh_refresh_token', refreshToken, {
        path: '/',
        maxAge: 90 * 24 * 60 * 60, // 90 days (longer than access token)
        sameSite: 'lax',
      })
      
      // Store user data in cookie
      cookies.set('staykh_user', JSON.stringify(userData), {
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        sameSite: 'lax',
      })
      
      // Update state
      token.value = accessToken
      user.value = userData
      isAuthenticated.value = true
      
      // Clear pending telephone
      sessionStorage.removeItem('staykh_pending_telephone')
      
      return userData
    } catch (error) {
      throw error
    }
  }

  /**
   * Resend OTP
   * @param {string} telephone - Phone number
   * @returns {Promise} API response
   */
  async function resendOTP(telephone) {
    try {
      const response = await authAPI.resendOTP(telephone)
      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Logout user
   */
  function logout() {
    user.value = null
    token.value = null
    isAuthenticated.value = false
    
    // Clear cookies
    cookies.remove('staykh_token', { path: '/' })
    cookies.remove('staykh_user', { path: '/' })
    
    // Clear session storage
    sessionStorage.removeItem('staykh_pending_telephone')
  }

  /**
   * Check authentication status on app load
   * @returns {boolean} Authentication status
   */
  function checkAuth() {
    const storedToken = cookies.get('staykh_token')
    const storedUser = cookies.get('staykh_user')

    if (storedToken && storedUser) {
      try {
        const userData = typeof storedUser === 'string' 
          ? JSON.parse(storedUser) 
          : storedUser
        
        // Verify the user has a valid role
        if (userData.role === 'super_admin' || userData.role === 'pos_staff') {
          token.value = storedToken
          user.value = userData
          isAuthenticated.value = true
          return true
        } else {
          // Clear invalid auth
          logout()
          return false
        }
      } catch (error) {
        logout()
        return false
      }
    }
    return false
  }

  return {
    user,
    token,
    isAuthenticated,
    isSuperAdmin,
    isPosStaff,
    activate,
    confirmOTP,
    resendOTP,
    logout,
    checkAuth
  }
})
