import { createRouter, createWebHistory } from 'vue-router'
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/resorts',
      name: 'resorts',
      component: Resorts,
    },
    {
      path: '/rooms',
      name: 'room',
      component: Room,
    },
    {
      path: '/provinces',
      name: 'province',
      component: Province,
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: Bookings,
    },
    {
      path: '/payments',
      name: 'payment',
      component: Payment,
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: Reviews,
    },
    {
      path: '/medias',
      name: 'media',
      component: Media,
    },
    {
      path: '/roles',
      name: 'roles',
      component: Roles,
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: Analytics,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
  ],
})

export default router
