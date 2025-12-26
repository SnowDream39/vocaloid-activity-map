<template>
  <div class="bg-surface rounded-xl shadow-sm p-6">
    <h3 class="text-lg font-semibold mb-4 flex items-center">
      <Icon name="material-symbols:analytics" class="mr-2 text-primary" />
      活动统计
    </h3>
    <div class="grid grid-cols-2 gap-4">
      <div class="text-center p-4 bg-primary/10 rounded-lg">
        <div class="text-2xl font-bold text-primary">{{ stats.participated }}</div>
        <div class="text-sm text-on-surface-variant">参与活动</div>
      </div>
      <div class="text-center p-4 bg-secondary/10 rounded-lg">
        <div class="text-2xl font-bold text-secondary">{{ stats.favorited }}</div>
        <div class="text-sm text-on-surface-variant">收藏活动</div>
      </div>
      <div class="text-center p-4 bg-tertiary/10 rounded-lg">
        <div class="text-2xl font-bold text-tertiary">{{ stats.created }}</div>
        <div class="text-sm text-on-surface-variant">创建活动</div>
      </div>
      <div class="text-center p-4 bg-error/10 rounded-lg">
        <div class="text-2xl font-bold text-error">{{ stats.likes }}</div>
        <div class="text-sm text-on-surface-variant">获得点赞</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ActivityStats {
  participated: number
  favorited: number
  created: number
  likes: number
}

const props = defineProps<{
  stats: ActivityStats
}>()
</script>