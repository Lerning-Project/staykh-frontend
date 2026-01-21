<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import Paragraph from '@/components/Paragraph.vue'
import RoomVarietyCard from '@/components/cards/RoomVarietiesCard.vue'
import AddRoomPOS from '@/components/addnew/AddRoomPOS.vue'
import TotalBookingCard from '@/components/cards/TotalBookingCard.vue'
import Search from '@/components/Search.vue'
import Filter from '@/components/Filter.vue'
import BookingTable from '@/components/tables/BookingTable.vue'
import TotalReviewCard from '@/components/cards/TotalReviewCard.vue'

const authStore = useAuthStore()
const router = useRouter()

const activeTab = ref('rooms') // rooms | bookings | reviews
const showAddRoom = ref(false)
const editingRoom = ref(null) // Track room being edited

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const handleCreateRoom = (room) => {
  console.log('Room submitted:', room)
  showAddRoom.value = false // close dialog after submit
  editingRoom.value = null // clear editing state
}

const handleEditRoom = (room) => {
  console.log('Room updated:', room)
  showAddRoom.value = false // close dialog after submit
  editingRoom.value = null // clear editing state
}

const editRoom = (room) => {
  editingRoom.value = room
  showAddRoom.value = true
}

const deleteRoom = (room) => {
  console.log('Delete room', room)
}

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue', 'submit'])

const close = () => emit('update:modelValue', false)
const submitForm = () => {
  emit('submit', { ...form.value })
  close()
}
const bookings = [
  {
    id: 'BK-1001',
    customer: 'John Doe',
    property: 'Angkor Paradise Resort',
    checkIn: '2026-01-20',
    checkOut: '2026-01-23',
    guests: 2,
    amount: 420,
    payment: 'Paid',
    status: 'Confirmed',
  },
  {
    id: 'BK-1002',
    customer: 'Jane Smith',
    property: 'Kampot Riverside Hotel',
    checkIn: '2026-01-18',
    checkOut: '2026-01-20',
    guests: 4,
    amount: 680,
    payment: 'Pending',
    status: 'Pending',
  },
  {
    id: 'BK-1003',
    customer: 'Jane Smith',
    property: 'Kampot Riverside Hotel',
    checkIn: '2026-01-18',
    checkOut: '2026-01-20',
    guests: 4,
    amount: 680,
    payment: 'Pending',
    status: 'Pending',
  },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- POS Header -->
    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="hotel" class="text-white text-xl" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-800">StayKH POS</h1>
            <p class="text-xs text-gray-500">Point of Sale System</p>
          </div>
        </div>

        <!-- User + Logout -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
            <div class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
              <font-awesome-icon icon="user" class="text-white" />
            </div>
            <div>
              <p class="font-semibold text-sm text-gray-800">
                {{ authStore.user?.name || 'POS Staff' }}
              </p>
              <p class="text-xs text-gray-500">{{ authStore.user?.email || 'staff@staykh.com' }}</p>
            </div>
          </div>

          <button
            @click="handleLogout"
            class="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition font-medium"
          >
            <font-awesome-icon icon="right-from-bracket" />
            Logout
          </button>
        </div>
      </div>
    </header>

    <div class="p-10 flex flex-col gap-4">
      <div class="flex flex-col">
        <TitleContent text="Paradise Resort POS" :level="4" weight="bold" />
        <Paragraph
          text="Point of Sale interface for StayKH staff members"
          :level="6"
          :weight="'normal'"
        />
      </div>

      <!-- POS Tabs -->
      <div class="bg-gray-200 border-b rounded-full border-gray-200 mt-5">
        <div class="px-1 flex gap-10">
          <button
            @click="activeTab = 'rooms'"
            class="py-2 flex items-center gap-2 font-medium"
            :class="activeTab === 'rooms' ? ' rounded-full px-5 m-2 bg-white' : ' px-5 m-2 '"
          >
            <font-awesome-icon icon="bed" /> Room Management
          </button>

          <button
            @click="activeTab = 'bookings'"
            class="py-2 flex items-center gap-2 font-medium"
            :class="activeTab === 'bookings' ? 'rounded-full px-5 m-2 bg-white' : 'px-5 m-2 '"
          >
            <font-awesome-icon icon="calendar-check" /> Bookings
          </button>

          <button
            @click="activeTab = 'reviews'"
            class="py-2 flex items-center gap-2 font-medium"
            :class="activeTab === 'reviews' ? 'rounded-full px-5 m-2 bg-white' : 'px-5 m-2 '"
          >
            <font-awesome-icon icon="star" /> Reviews
          </button>
        </div>
      </div>

      <!-- POS Content -->
      <main class="py-5">
        <!-- Room Management -->
        <div v-if="activeTab === 'rooms'" class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div>
              <TitleContent text="Room Varieties" :level="4" weight="bold" />
              <Paragraph
                text="Manage your resort room types and pricing"
                :level="6"
                weight="normal"
              />
            </div>

            <!-- Add Room Button -->
            <button
              @click="showAddRoom = true"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
            >
              + Add Room
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RoomVarietyCard
              image="https://picsum.photos/600/400"
              name="Ocean View King Room"
              description="Spacious room with ocean view, king bed, and private balcony."
              :types="['Ocean View', 'King Bed', 'Private Balcony', 'Mini Bar', 'WiFi']"
              :price="180"
              :capacity="2"
              :totalRooms="10"
              province="Preah Sihanouk"
              property="Seaside Paradise Resort"
              @edit="editRoom"
              @delete="deleteRoom"
            />
          </div>
        </div>

        <!-- Bookings -->
        <div v-if="activeTab === 'bookings'">
          <TitleContent text="Bookings" :level="4" weight="bold" />
          <Paragraph text="View, confirm, and manage bookings" :level="6" weight="normal" />
          <div class="mt-5 flex flex-col gap-5">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TotalBookingCard
                title="Total Bookings"
                :current="125"
                icon="calendar-check"
                color="primary"
                valueColor="primary"
              />
              <!-- active booking -->
              <TotalBookingCard
                title="Active Bookings"
                :current="125"
                icon="calendar-check"
                color="success"
                valueColor="success"
              />
              <!-- pending booking -->
              <TotalBookingCard
                title="Total Revenue"
                :current="125"
                icon="dollar"
                color="warning"
                valueColor="warning"
              />
            </div>
            <div class="flex items-center bg-gray-200 p-2 rounded-xl justify-between gap-2 w-full">
              <Search placeholder="Search bookings..." />
              <Filter
                label="All bookings"
                :options="[
                  { label: 'All Bookings', value: 'all bookings' },
                  { label: 'Confirmed', value: 'confirmed' },
                  { label: 'Cancelled', value: 'cancelled' },
                ]"
                v-model="selected"
              />
            </div>
            <BookingTable :bookings="bookings" @view="viewBooking" />
          </div>
        </div>

        <!-- Reviews -->
        <div v-if="activeTab === 'reviews'">
          <TitleContent text="Reviews" :level="4" weight="bold" />
          <Paragraph text="View feedback and ratings from your guests" :level="6" weight="normal" />
          <div class="flex flex-col gap-6 mt-5">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TotalReviewCard
                title="Overall Rating"
                :current="0"
                :icon="'star'"
                :color="'warning'"
                :valueColor="'default'"
                :trendText="'Based on 0 reviews'"
                :trendColor="'warning'"
              />
              <TotalReviewCard
                title="Total Reviews"
                :current="0"
                :icon="'comment'"
                :color="'warning'"
                :valueColor="'default'"
                :trendText="'Based on 0 reviews'"
                :trendColor="'warning'"
              />
              <TotalReviewCard
                title="5 Star Reviews"
                :current="0"
                :icon="'star'"
                :color="'warning'"
                :valueColor="'default'"
                :trendText="'Based on 0 reviews'"
                :trendColor="'warning'"
              />
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Add/Edit Room Dialog -->
    <AddRoomPOS
      v-model="showAddRoom"
      :roomData="editingRoom"
      @submit="editingRoom ? handleEditRoom : handleCreateRoom"
    />
  </div>
</template>

<style scoped></style>
