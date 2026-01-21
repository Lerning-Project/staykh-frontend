import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isAuthenticated = ref(false)

  // Fake users database (stored in code, credentials checked against this)
  const fakeUsers = [
    {
      id: 1,
      email: 'admin@staykh.com',
      password: 'admin123',
      role: 'super_admin',
      name: 'Super Admin',
      phone: '012345678'
    },
    {
      id: 2,
      email: 'pos@staykh.com',
      password: 'pos123',
      role: 'pos_staff',
      name: 'POS Staff',
      phone: '012345679'
    }
  ]

  // Getters
  const isSuperAdmin = computed(() => {
    return user.value?.role === 'super_admin'
  })

  const isPosStaff = computed(() => {
    return user.value?.role === 'pos_staff'
  })

  // Actions
  function login(email, password) {
    // Find user in fake database
    const foundUser = fakeUsers.find(
      u => u.email === email && u.password === password
    )

    if (!foundUser) {
      throw new Error('Invalid email or password')
    }

    // Store user data (without password)
    const userData = {
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
      name: foundUser.name,
      phone: foundUser.phone
    }

    user.value = userData
    isAuthenticated.value = true

    // Save to localStorage
    localStorage.setItem('staykh_user', JSON.stringify(userData))
    localStorage.setItem('staykh_auth', 'true')

    return userData
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('staykh_user')
    localStorage.removeItem('staykh_auth')
  }

  function checkAuth() {
    // Check localStorage on app load
    const storedUser = localStorage.getItem('staykh_user')
    const storedAuth = localStorage.getItem('staykh_auth')

    if (storedUser && storedAuth === 'true') {
      try {
        const userData = JSON.parse(storedUser)
        // Verify the user has a valid role
        if (userData.role === 'super_admin' || userData.role === 'pos_staff') {
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
    isAuthenticated,
    isSuperAdmin,
    isPosStaff,
    login,
    logout,
    checkAuth
  }
})
