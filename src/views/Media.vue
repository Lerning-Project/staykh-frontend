<script setup>
import { ref } from 'vue'
import Paragraph from '@/components/Paragraph.vue'
import Search from '@/components/Search.vue'
import Filter from '@/components/Filter.vue'
import MediaCard from '@/components/cards/MediaCard.vue'
import MediaUploader from '@/components/addnew/MediaUploader.vue'

const showAddMedia = ref(false)
const mediaFiles = ref([])

const handleAddMedia = (files) => {
  mediaFiles.value.push(...files)
}

/* filters */
const selected = ref('all')

/* uploader callback */
const handleUpdate = (files) => {
  mediaFiles.value = files
  showAddMedia.value = false
}

/* media card actions */
const openPreview = (media) => {
  console.log('Preview:', media)
}

const deleteMedia = (media) => {
  mediaFiles.value = mediaFiles.value.filter(m => m.id !== media.id)
}

const mediaFile = [
  {
    id: 1,
    file: {
      name: 'resort-cover.jpg',
      size: 2400000,
      type: 'image/jpeg'
    },
    url: 'https://picsum.photos/600/400'
  },
  {
    id: 2,
    file: {
      name: 'pool-view.jpg',
      size: 2800000,
      type: 'image/jpeg'
    },
    url: 'https://picsum.photos/600/400'
  },
  {
    id: 3,
    file: {
      name: 'room-interior.jpg',
      size: 2100000,
      type: 'image/jpeg'
    },
    url: 'https://picsum.photos/600/400'
  },
  {
    id: 4,
    file: {
      name: 'lobby.jpg',
      size: 2600000,
      type: 'image/jpeg'
    },
    url: 'https://picsum.photos/600/400'
  },
  {
    id: 5,
    file: {
      name: 'restaurant.jpg',
      size: 2300000,
      type: 'image/jpeg'
    },
    url: 'https://picsum.photos/600/400'
  }
]
</script>
<template>
  <div>
    <TitleContent text="Media Library" :level="4" :weight="'bold'" />

    <div class="mb-5">
      <div class="flex justify-between items-center">
        <Paragraph
          class="mb-5"
          text="Centralized storage for all property images and videos"
          :level="6"
          :weight="'normal'"
        />

        <button
          @click="showAddMedia = true"
          class="rounded-lg bg-blue-600 px-4 py-2 text-md font-medium text-white hover:bg-blue-700"
        >
          + Add Media
        </button>
      </div>

      <!-- Upload Dialog -->
      <MediaUploader
        v-model="showAddMedia"
        @submit="handleAddMedia"
      />
    </div>

    <!-- Filters -->
    <div class="w-full border bg-white p-5 rounded-lg border-gray-200 flex justify-between mb-5">
      <Search placeholder="Search media..." />
      <Filter
        label="Media Type"
        :options="[
          { label: 'All', value: 'all' },
          { label: 'Image', value: 'image' },
          { label: 'Video', value: 'video' },
        ]"
        v-model="selected"
      />
    </div>

    <!-- Media Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <MediaCard
        v-for="media in mediaFile"
        :key="media.id"
        :image="media.url"
        type="image"
        :name="media.file.name"
        :size="(media.file.size / 1024 / 1024).toFixed(2) + ' MB'"
        updatedAt="Today"
        usedIn="Not assigned"
        @preview="openPreview(media)"
        @delete="deleteMedia(media)"
      />
    </div>
  </div>
</template>
