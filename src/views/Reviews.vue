<script setup>
import Paragraph from '@/components/Paragraph.vue'
import TotalReviewCard from '@/components/cards/TotalReviewCard.vue'
import Search from '@/components/Search.vue'
import Filter from '@/components/Filter.vue'
import ReviewCard from '@/components/cards/ReviewCard.vue'
</script>

<template>
  <div>
    <TitleContent text="Reviews Management" :level="4" :weight="'bold'" />
    <div class="mb-5">
      <Paragraph
        text="Monitor and manage customer reviews across all properties"
        :level="6"
        :weight="'normal'"
      />
    </div>
    <div class="mt-5 flex gap-5 flex-col">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <TotalReviewCard
          title="Total Reviews"
          :current="100"
          :icon="'star'"
          :color="'primary'"
          :valueColor="'default'"
          :trendText="'+10% from last month'"
          :trendColor="'success'"
        />
        <TotalReviewCard
          title="Total Reviews"
          :current="100"
          :icon="'star'"
          :color="'primary'"
          :valueColor="'default'"
          :trendText="'+10% from last month'"
          :trendColor="'success'"
        />
        <TotalReviewCard
          title="Total Reviews"
          :current="100"
          :icon="'star'"
          :color="'primary'"
          :valueColor="'default'"
          :trendText="'+10% from last month'"
          :trendColor="'success'"
        />
        <TotalReviewCard
          title="Total Reviews"
          :current="100"
          :icon="'star'"
          :color="'primary'"
          :valueColor="'default'"
          :trendText="'+10% from last month'"
          :trendColor="'success'"
        />
        <TotalReviewCard
          title="Total Reviews"
          :current="100"
          :icon="'star'"
          :color="'primary'"
          :valueColor="'default'"
          :trendText="'+10% from last month'"
          :trendColor="'success'"
        />
      </div>
      <div class="flex gap-5 flex-col">
        <div
          class="w-full border bg-white p-5 rounded-lg border-gray-200 flex gap-5 justify-between"
        >
          <Search placeholder="Search reviews..." />
          <div class="flex gap-5">
            <Filter
              label="Star"
              :options="[
                { label: 'All', value: 'all' },
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
              ]"
              v-model="selected"
            />
            <Filter
              label="Status"
              :options="[
                { label: 'All', value: 'all' },
                { label: 'Visible', value: 'visible' },
                { label: 'Hidden', value: 'hidden' },
              ]"
              v-model="selected"
            />
          </div>
        </div>
      </div>
      <div>
        <ReviewCard
          name="John Doe"
          resort="Angkor Paradise Resort"
          :rating="4"
          date="2026-01-15"
          status="visible"
          comment="Great resort, very clean and friendly staff. Will visit again!"
          avatar="https://i.pravatar.cc/150?img=12"
          @hide="hideReview"
          @flag="flagReview"
        />
        <ReviewCard
          name="John Doe"
          resort="Angkor Paradise Resort"
          :rating="5"
          date="2026-01-15"
          status="visible"
          comment="Great resort, very clean and friendly staff. Will visit again!"
          avatar="https://i.pravatar.cc/150?img=12"
          @hide="hideReview"
          @flag="flagReview"
        />
        <ReviewCard
          name="John Doe"
          resort="Angkor Paradise Resort"
          :rating="5"
          date="2026-01-15"
          status="visible"
          comment="Great resort, very clean and friendly staff. Will visit again!"
          avatar="https://i.pravatar.cc/150?img=12"
          @hide="hideReview"
          @flag="flagReview"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
