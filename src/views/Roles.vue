<script setup>
import Paragraph from '@/components/Paragraph.vue'
import PermissionCard from '@/components/cards/PermissionCard.vue'
import PermissionTable from '@/components/tables/PermissionTable.vue'

const permissions = {
  dashboard: {
    superAdmin: { read: true, write: true, approve: true, refund: true },
    resortAdmin: { read: true, write: false, approve: false, refund: false },
    posStaff: { read: true, write: false, approve: false, refund: false },
  },
  resorts: {
    superAdmin: { read: true, write: true, approve: true, refund: false },
    resortAdmin: { read: true, write: true, approve: false, refund: false },
    posStaff: { read: true, write: false, approve: false, refund: false },
  },
  roomVarieties: {
    superAdmin: { read: true, write: true, approve: true, refund: false },
    resortAdmin: { read: true, write: true, approve: false, refund: false },
    posStaff: { read: true, write: false, approve: false, refund: false },
  },
  users: {
    superAdmin: { read: true, write: true, approve: false, refund: false },
    resortAdmin: { read: true, write: true, approve: false, refund: false },
    posStaff: { read: false, write: false, approve: false, refund: false },
  },
  bookings: {
    superAdmin: { read: true, write: true, approve: true, refund: true },
    resortAdmin: { read: true, write: true, approve: false, refund: false },
    posStaff: { read: true, write: true, approve: false, refund: false },
  },
  payments: {
    superAdmin: { read: true, write: true, approve: true, refund: true },
    resortAdmin: { read: true, write: false, approve: false, refund: false },
    posStaff: { read: true, write: false, approve: false, refund: false },
  },
  reviews: {
    superAdmin: { read: true, write: true, approve: true, refund: false },
    resortAdmin: { read: true, write: true, approve: true, refund: false },
    posStaff: { read: true, write: false, approve: false, refund: false },
  },
  medias: {
    superAdmin: { read: true, write: true, approve: false, refund: false },
    resortAdmin: { read: true, write: true, approve: false, refund: false },
    posStaff: { read: true, write: false, approve: false, refund: false },
  },
  settings: {
    superAdmin: { read: true, write: true, approve: false, refund: false },
    resortAdmin: { read: false, write: false, approve: false, refund: false },
    posStaff: { read: false, write: false, approve: false, refund: false },
  },
}
</script>

<template>
  <div>
    <TitleContent text="Roles & Permissions" :level="4" :weight="'bold'" />

    <Paragraph
      class="mt-3"
      text="Define and manage user roles and their access permissions"
      :level="6"
    />

    <div class="mt-5 flex flex-col gap-5">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <PermissionCard role="Super Admin" description="Full access" :totalUsers="3" />
        <PermissionCard role="Resort Admin" description="Resort operations" :totalUsers="12" />
        <PermissionCard role="POS Staff" description="POS usage" :totalUsers="28" />
      </div>

      <div class="">
        <PermissionTable :permissions="permissions" />
      </div>
      <!-- permission type -->
      <div class="bg-blue-50 rounded-xl p-5">
        <TitleContent text="Permission Type" :level="4" :weight="'bold'" />
        <div class="">
          <div class="grid grid-cols-4">
            <div class="flex justify-center items-center gap-2">
              <Paragraph class="text-blue-800" text="Read" :level="6" :weight="'normal'" />
              <span class="text-gray-400"> View and access data </span>
            </div>
            <div class="flex justify-center items-center gap-2">
              <Paragraph class="text-blue-800" text="Write" :level="6" :weight="'normal'" />
              <span class="text-gray-400"> Create and modify data </span>
            </div>
            <div class="flex justify-center items-center gap-2">
              <Paragraph class="text-blue-800" text="Approve" :level="6" :weight="'normal'" />
              <span class="text-gray-400"> Approve and confirm actions </span>
            </div>
            <div class="flex justify-center items-center gap-2">
              <Paragraph class="text-blue-800" text="Refund" :level="6" :weight="'normal'" />
              <span class="text-gray-400"> Refund and cancel transactions </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
