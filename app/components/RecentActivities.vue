<template>
  <div class="bg-surface rounded-xl shadow-sm p-6">
    <h3 class="text-lg font-semibold mb-4 flex items-center">
      <Icon name="material-symbols:event" class="mr-2 text-primary" />
      最近参与
    </h3>
    <div class="space-y-4">
      <div v-for="activity in activities" :key="activity.id" class="flex items-center p-4 bg-surface-variant rounded-lg hover:bg-surface-container transition-colors cursor-pointer" @click="handleActivityClick(activity)">
        <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
          <Icon name="material-symbols:music-note" class="text-primary" />
        </div>
        <div class="flex-1">
          <div class="font-medium">{{ activity.title }}</div>
          <div class="text-sm text-on-surface-variant">{{ formatActivityDate(activity.date) }} {{ activity.location }}</div>
        </div>
        <Icon name="material-symbols:arrow-forward-ios" class="text-on-surface-variant" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Activity {
  id: number
  title: string
  date: string
  location: string
}

defineProps<{
  activities: Activity[]
}>()

const emit = defineEmits<{
  activityClick: [activity: Activity]
}>()

const handleActivityClick = (activity: Activity) => {
  emit('activityClick', activity)
}

const formatActivityDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>