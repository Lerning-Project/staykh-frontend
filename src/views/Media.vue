<script setup>
import Paragraph from '@/components/Paragraph.vue'
import Search from '@/components/Search.vue'
import Filter from '@/components/Filter.vue'
import MediaCard from '@/components/cards/MediaCard.vue'
</script>

<template>
  <div>
    <TitleContent text="Media Library" :level="4" :weight="'bold'" />
    <div class="mb-5">
      <Paragraph
        text="Centralized storage for all property images and videos"
        :level="6"
        :weight="'normal'"
      />
    </div>
    <div class="mt-5 flex gap-5 flex-col">
      <div class="w-full border bg-white p-5 rounded-lg border-gray-200 flex gap-5 justify-between">
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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <MediaCard
          image="https://picsum.photos/600/400"
          type="image"
          name="resort-cover.jpg"
          size="2.4 MB"
          updatedAt="2026-01-14"
          usedIn="Angkor Paradise Resort"
          @preview="openPreview"
          @delete="deleteMedia"
        />
        <MediaCard
          image="https://picsum.photos/600/400"
          type="image"
          name="resort-cover.jpg"
          size="2.4 MB"
          updatedAt="2026-01-14"
          usedIn="Angkor Paradise Resort"
          @preview="openPreview"
          @delete="deleteMedia"
        />
        <MediaCard
          image="https://picsum.photos/600/400"
          type="image"
          name="resort-cover.jpg"
          size="2.4 MB"
          updatedAt="2026-01-14"
          usedIn="Angkor Paradise Resort"
          @preview="openPreview"
          @delete="deleteMedia"
        />
        <MediaCard
          image="https://picsum.photos/600/400"
          type="image"
          name="resort-cover.jpg"
          size="2.4 MB"
          updatedAt="2026-01-14"
          usedIn="Angkor Paradise Resort"
          @preview="openPreview"
          @delete="deleteMedia"
        />
        <MediaCard
          image="https://picsum.photos/600/400"
          type="image"
          name="resort-cover.jpg"
          size="2.4 MB"
          updatedAt="2026-01-14"
          usedIn="Angkor Paradise Resort"
          @preview="openPreview"
          @delete="deleteMedia"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
