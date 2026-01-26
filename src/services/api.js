import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
})

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = cookies.get('staykh_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      
      if (status === 401) {
        // Unauthorized - clear auth and redirect to login
        cookies.remove('staykh_token')
        cookies.remove('staykh_user')
        window.location.href = '/activate'
      }
      
      // Return error message from server or default message
      const errorMessage = data?.message || data?.error || 'An error occurred'
      return Promise.reject(new Error(errorMessage))
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject(new Error('Network error. Please check your connection.'))
    } else {
      // Something else happened
      return Promise.reject(error)
    }
  }
)

// Authentication API calls
export const authAPI = {
  /**
   * Activate account and request OTP
   * @param {string} telephone - Phone number
   * @param {string} firstName - First name
   * @param {string} lastName - Last name
   * @returns {Promise} API response
   */
  activate(telephone, firstName, lastName) {
    return api.post('/auth/activate', {
      telephone,
      firstName,
      lastName,
    })
  },

  /**
   * Confirm OTP and get authentication token
   * @param {string} telephone - Phone number
   * @param {string} otp - OTP code
   * @returns {Promise} API response with accessToken and refreshToken
   */
  confirmOTP(telephone, otp) {
    return api.post('/auth/otp/verify', {
      telephone,
      otp,
    })
  },

  /**
   * Resend OTP
   * @param {string} telephone - Phone number
   * @returns {Promise} API response
   */
  resendOTP(telephone) {
    return api.post('/resend-otp', {
      telephone,
    })
  },
}

// Province API calls
export const provinceAPI = {
  /**
   * Fetch all provinces
   * @returns {Promise} API response
   */
  getProvinces() {
    return api.get('/province')
  },

  /**
   * Create a new province
   * @param {Object} data - Province data (e.g., { name: 'Pursat' })
   * @returns {Promise} API response
   */
  createProvince(data) {
    return api.post('/province', data)
  },
}

// Property/Resort API calls
export const propertyAPI = {
  /**
   * Fetch all properties (resorts)
   * @returns {Promise} API response
   */
  getProperties() {
    return api.get('/property')
  },
}

export default api
