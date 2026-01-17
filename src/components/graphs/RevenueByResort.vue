<script setup>
defineProps({
  resorts: {
    type: Array,
    required: true
    /*
      [
        {
          name: 'Angkor Paradise Resort',
          province: 'Siem Reap',
          amount: 18500,
          percent: 72
        }
      ]
    */
  }
})
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5">
    <h3 class="mb-4 text-lg font-semibold text-gray-800">
      Revenue by Resort
    </h3>

    <div class="space-y-5">
      <div
        v-for="(resort, index) in resorts"
        :key="index"
        class="flex items-center gap-4"
      >
        <!-- Left: Resort Info -->
        <div class="w-1/3">
          <p class="text-sm font-medium text-gray-900">
            {{ resort.name }}
          </p>
          <p class="text-xs text-gray-500">
            {{ resort.province }}
          </p>
        </div>

        <!-- Middle: Progress -->
        <div class="flex-1">
          <div class="h-2 w-full rounded-full bg-gray-200">
            <div
              class="h-2 rounded-full transition-all duration-700 ease-out"
              :class="{
                'bg-blue-500': resort.percent < 40,
                'bg-yellow-500': resort.percent >= 40 && resort.percent < 70,
                'bg-green-500': resort.percent >= 70
              }"
              :style="{ width: resort.percent + '%' }"
            ></div>
          </div>
        </div>

        <!-- Right: Amount -->
        <div class="w-24 text-right">
          <p class="text-sm font-semibold text-gray-900">
            ${{ resort.amount.toLocaleString() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
