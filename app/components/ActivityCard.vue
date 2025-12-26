<template>
  <div class="w-full bg-surface text-on-surface transition-shadow duration-300 border border-outline overflow-hidden">
    <div class="p-4 pb-2 border-b border-gray-100">
      <h3 class="text-lg font-semibold text-on-surface mb-2 line-clamp-1">{{ activity.name }}</h3>
      <div class="flex flex-wrap gap-1">
        <TagComponent v-for="tag in sortTags(activity.tags)" :key="tag.id" :tag="tag" />
      </div>
    </div>
    
    <div class="p-4 pb-3">
      <p class="text text-sm mb-3 line-clamp-2">{{ activity.description }}</p>
      
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm ">
          <Icon name="mdi:calendar" class="w-4 h-4  flex-shrink-0" />
          <span class="truncate">
            {{ formatDateTime(activity.start_time) }} - {{ formatDateTime(activity.end_time) }}
          </span>
        </div>
        
        <div class="flex items-center gap-2 text-sm">
          <Icon name="mdi:account-group" class="w-4 h-4  flex-shrink-0" />
          <span class="truncate">最多 {{ activity.max_member }} 人</span>
        </div>
        
        <div class="flex items-center gap-2 text-sm ">
          <Icon name="mdi:map-marker" class="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span class="truncate">{{ activity.location }}</span>
        </div>
        
        <div class="flex items-center gap-2 text-sm ">
          <Icon name="mdi:account" class="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span class="truncate">发起者: {{ activity.owner.nickname }}</span>
        </div>
      </div>
    </div>
    
    <div class="p-4 pt-3 flex items-center justify-between">
      <div class="px-3 py-1 text-xs font-medium rounded-full" :class="getStatusClass()">
        {{ getStatusText() }}
      </div>
      <button 
        class="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-fixed transition-colors duration-200" 
        @click="handleJoin"
      >
        {{ getJoinButtonText() }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'


const props = defineProps<{
  activity: Activity
}>()

const formatDateTime = (dateTime: DateTime): string => {
  return dateTime.toFormat('MM月dd日 HH:mm')
}

const getStatusText = (): string => {
  const now = DateTime.now()
  const { start_time, end_time } = props.activity
  
  if (now < start_time) return '即将开始'
  if (now > end_time) return '已结束'
  return '进行中'
}



const getStatusClass = (): string => {
  const now = DateTime.now()
  const { start_time, end_time } = props.activity
  
  if (now < start_time) return 'bg-blue-100 text-blue-700'
  if (now > end_time) return 'bg-gray-100 text-gray-600'
  return 'bg-green-100 text-green-700'
}

const getJoinButtonText = (): string => {
  const now = DateTime.now()
  const { start_time, end_time } = props.activity
  
  if (now < start_time) return '报名参加'
  if (now > end_time) return '查看详情'
  return '查看详情'
}

const handleJoin = (): void => {
  console.log('Join activity:', props.activity.id)
}
</script>