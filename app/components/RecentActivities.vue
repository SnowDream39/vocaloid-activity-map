<template>
  <div class="bg-surface rounded-xl shadow-sm p-6">
    <h3 class="text-lg font-semibold mb-4 flex items-center">
      <Icon name="material-symbols:event" class="mr-2 text-primary" />
      最近参与
    </h3>
    <div class="space-y-4">
      <router-link v-for="activity in activities" :key="activity.id" class="flex items-center p-4 bg-surface-variant rounded-lg hover:bg-surface-container transition-colors cursor-pointer" :to="`/activity/${activity.id}`">
        <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
          <Icon name="material-symbols:music-note" class="text-primary" />
        </div>
        <div class="flex-1">
          <div class="font-medium">{{ activity.name }}</div>
          <div class="text-sm text-on-surface-variant">{{ activity.start_time.toLocaleString() }} {{ activity.location }}</div>
        </div>
        <Icon name="material-symbols:arrow-forward-ios" class="text-on-surface-variant" />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as activityApi from '~/api/core/activity'

const activities =  ref<Activity[]>([])
const userStore = useUserStore()

onMounted(async () => {
  const allActivities = await activityApi.getByParticipant(userStore.user!.id)
  activities.value = allActivities.sort((a, b) => (a.start_time < b.start_time ? 1 : -1)).slice(0, 3)
})

</script>