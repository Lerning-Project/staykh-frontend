<script setup>
import { ref } from 'vue'
import Paragraph from '@/components/Paragraph.vue'
import Search from '@/components/Search.vue'
import Filter from '@/components/Filter.vue'
import PaymentTransactionTable from '@/components/tables/TransactionsTable.vue'
import RefundRequestTable from '@/components/tables/RefundTable.vue'
import TotalPaymentCard from '@/components/cards/TotalPaymentCard.vue'
import RevenueByResort from '@/components/graphs/RevenueByResort.vue'

// future components
// import PaymentTransactionTable from '@/components/PaymentTransactionTable.vue'
// import RefundRequestTable from '@/components/RefundRequestTable.vue'
// import RevenueSummary from '@/components/RevenueSummary.vue'

const transactions = [
  {
    id: 'TX-10001',
    bookingId: 'BK-1001',
    customer: 'John Doe',
    property: 'Angkor Paradise Resort',
    amount: 420,
    type: 'ABA',
    date: '2026-01-15 10:20',
    status: 'Success',
  },
  {
    id: 'TX-10002',
    bookingId: 'BK-1002',
    customer: 'Jane Smith',
    property: 'Kampot Riverside Hotel',
    amount: 680,
    type: 'Card',
    date: '2026-01-15 11:05',
    status: 'Pending',
  },
  {
    id: 'TX-10003',
    bookingId: 'BK-1003',
    customer: 'Jane Smith',
    property: 'Kampot Riverside Hotel',
    amount: 680,
    type: 'Card',
    date: '2026-01-15 11:05',
    status: 'Pending',
  },
  {
    id: 'TX-10004',
    bookingId: 'BK-1004',
    customer: 'Jane Smith',
    property: 'Kampot Riverside Hotel',
    amount: 680,
    type: 'Card',
    date: '2026-01-15 11:05',
    status: 'Pending',
  },
  {
    id: 'TX-10005',
    bookingId: 'BK-1005',
    customer: 'Jane Smith',
    property: 'Kampot Riverside Hotel',
    amount: 680,
    type: 'Card',
    date: '2026-01-15 11:05',
    status: 'Pending',
  },
]

const refunds = [
  {
    bookingId: 'BK-1001',
    customer: 'John Doe',
    property: 'Angkor Paradise Resort',
    amount: 420,
    requestDate: '2026-01-16',
    status: 'Pending',
  },
  {
    bookingId: 'BK-1002',
    customer: 'Jane Smith',
    property: 'Kampot Riverside Hotel',
    amount: 680,
    requestDate: '2026-01-15',
    status: 'Approved',
  },
  {
    bookingId: 'BK-1003',
    customer: 'Jane Smith',
    property: 'Kampot Riverside Hotel',
    amount: 680,
    requestDate: '2026-01-15',
    status: 'Rejected',
  },
  {
    bookingId: 'BK-1004',
    customer: 'Jane Smith',
    property: 'Kampot Riverside Hotel',
    amount: 680,
    requestDate: '2026-01-15',
    status: 'Pending',
  },
]

const revenueByResort = [
  {
    name: 'Angkor Paradise Resort',
    province: 'Siem Reap',
    amount: 18500,
    percent: 72
  },
  {
    name: 'Kampot Riverside Hotel',
    province: 'Kampot',
    amount: 12400,
    percent: 58
  },
  {
    name: 'Sihanouk Beach Resort',
    province: 'Sihanoukville',
    amount: 8900,
    percent: 35
  }
]

const handleApprove = (refund) => {
  console.log('Approved:', refund)
}

const handleReject = (refund) => {
  console.log('Rejected:', refund)
}

const activeTab = ref('transactions')
</script>

<template>
  <div>
    <!-- Page Header -->
    <TitleContent text="Payment & Refund" :level="4" :weight="'bold'" />
    <div class="mb-5">
      <Paragraph
        text="Monitor and manage all payments and refunds across the properties"
        :level="6"
        :weight="'normal'"
      />
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200 flex gap-8">
      <button
        class="pb-3 text-sm font-medium transition"
        :class="
          activeTab === 'transactions'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        "
        @click="activeTab = 'transactions'"
      >
        Transactions
      </button>

      <button
        class="pb-3 text-sm font-medium transition"
        :class="
          activeTab === 'refunds'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        "
        @click="activeTab = 'refunds'"
      >
        Refund Requests
      </button>

      <button
        class="pb-3 text-sm font-medium transition"
        :class="
          activeTab === 'revenue'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        "
        @click="activeTab = 'revenue'"
      >
        Revenue Summary
      </button>
    </div>

    <!-- Tab Content -->
    <div class="mt-6 flex flex-col gap-5">
      <!-- Transactions -->
      <div v-if="activeTab === 'transactions'">
        <!-- <PaymentTransactionTable /> -->
        <div class="flex flex-col gap-5">
          <div class="flex gap-5 flex-col">
            <div
              class="w-full border bg-white p-5 rounded-lg border-gray-200 flex gap-5 justify-between"
            >
              <Search placeholder="Search resorts, users, bookings..." />
              <Filter
                label="Status"
                :options="[
                  { label: 'All', value: 'all' },
                  { label: 'Payment', value: 'payment' },
                  { label: 'Refund', value: 'refund' },
                ]"
                v-model="selected"
              />
            </div>
          </div>
          <PaymentTransactionTable :transactions="transactions" />
        </div>
      </div>

      <!-- Refund Requests -->
      <div v-if="activeTab === 'refunds'">
        <!-- <RefundRequestTable /> -->
        <div class="flex flex-col gap-5">
          <div class="flex gap-5 flex-col">
            <div
              class="w-full border bg-white p-5 rounded-lg border-gray-200 flex gap-5 justify-between"
            >
              <Search placeholder="Search resorts, users, bookings..." />
              <Filter
                label="Status"
                :options="[
                  { label: 'All', value: 'all' },
                  { label: 'Pending', value: 'pending' },
                  { label: 'Approved', value: 'approved' },
                  { label: 'Rejected', value: 'rejected' },
                ]"
                v-model="selected"
              />
            </div>
            <RefundRequestTable
              :refunds="refunds"
              @approve="handleApprove"
              @reject="handleReject"
            />
          </div>
        </div>
      </div>

      <!-- Revenue Summary -->
      <div v-if="activeTab === 'revenue'">
        <!-- <RevenueSummary /> -->
        <div class="flex flex-col gap-5">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <TotalPaymentCard
              title="Total Revenue"
              amount="1,234,567"
              icon="fa-solid fa-money-bill-wave"
              color="success"
              trendText="+12.5% form last month"
              trendColor="success"
            />

            <TotalPaymentCard
              title="Pending Payment"
              amount="1,234,567"
              icon="fa-solid fa-money-bill-wave"
              color="primary"
              trendText="3 pending transactions"
              trendColor="default"
            />

            <TotalPaymentCard
              title="Refunds Issued"
              amount="1,234,567"
              icon="fa-solid fa-money-bill-wave"
              color="warning"
              trendText="12 refund transactions this month"
              trendColor="warning"
            />
          </div>
          <RevenueByResort :resorts="revenueByResort" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
