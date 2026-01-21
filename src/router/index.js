import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Dashboard from '../views/Dashboard.vue'
import Resorts from '../views/Resorts.vue'
import Room from '../views/Room.vue'
import Province from '../views/Province.vue'
import Users from '../views/Users.vue'
import Bookings from '../views/Bookings.vue'
import Payment from '../views/Payment.vue'
import Reviews from '../views/Reviews.vue'
import Media from '../views/Media.vue'
import Roles from '../views/Roles.vue'
import Analytics from '../views/Analytics.vue'
import Settings from '../views/Settings.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import POSView from '../views/pos/POSView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true, requiresRole: 'super_admin' }
    },
    {
      path: '/pos',
      name: 'pos',
      component: POSView,
      meta: { requiresAuth: true, requiresRole: 'pos_staff' }
    },
    {
      path: '/resorts',
      name: 'resorts',
      component: Resorts,
      meta: { requiresAuth: true, requiresRole: 'super_admin' }
    },
    {
      path: '/rooms',
      name: 'room',
      component: Room,
      meta: { requiresAuth: true, requiresRole: 'super_admin' }
    },
    {
      path: '/provinces',
      name: 'province',
      component: Province,
      meta: { requiresAuth: true, requiresRole: 'super_admin' }
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: { requiresAuth: true, requiresRole: 'super_admin' }
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: Bookings,
      meta: { requiresAuth: true, requiresRole: 'super_admin' }
    },
    {
      path: '/payments',
      name: 'payment',
      component: Payment,
      meta: { requiresAuth: true, requiresRole: 'super_admin' }
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: Reviews,
      meta: { requiresAuth: true, requiresRole: 'super_admin' }
    },
    {
      path: '/medias',
      name: 'media',
      component: Media,
      meta: { requiresAuth: true, requiresRole: 'super_admin' }
    },
    {
      path: '/roles',
      name: 'roles',
      component: Roles,
      meta: { requiresAuth: true, requiresRole: 'super_admin' }
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: Analytics,
      meta: { requiresAuth: true, requiresRole: 'super_admin' }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: { requiresAuth: true, requiresRole: 'super_admin' }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresGuest: true }
    }
  ],
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Check authentication status from localStorage
  authStore.checkAuth()

  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.user?.role
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
  const requiresRole = to.meta.requiresRole

  if (requiresAuth && !isAuthenticated) {
    // Redirect to login if trying to access protected route
    next('/login')
  } else if (requiresGuest && isAuthenticated) {
    // Redirect based on user role when already logged in
    if (userRole === 'super_admin') {
      next('/')
    } else if (userRole === 'pos_staff') {
      next('/pos')
    } else {
      next('/')
    }
  } else if (requiresAuth && requiresRole && userRole !== requiresRole) {
    // Redirect to appropriate page if user doesn't have required role
    if (userRole === 'super_admin') {
      next('/')
    } else if (userRole === 'pos_staff') {
      next('/pos')
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
