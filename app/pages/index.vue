<template>
  <div class="flex flex-col items-center">
    <h1 class="big-title">活动</h1>
    <div class="flex flex-col gap-4">
      <ActivityCard v-for="activity in activities" :key="activity.id" :activity="activity" />
    </div>

  </div>

</template>

<script setup lang="ts">
import * as activityApi from '~/api/core/activity'

const activities = ref<Activity[]>([])

onMounted(async () => {
  activities.value = await activityApi.getAll()
})
</script>