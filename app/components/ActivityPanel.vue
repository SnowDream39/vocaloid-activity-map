<template>
  <div class="bg-white rounded-t-2xl shadow-2xl border-t border-gray-200 transform transition-transform duration-300 relative">
    <!-- 拖拽指示器 -->
    <div class="flex justify-center pt-2 pb-1">
      <div class="w-12 h-1 bg-gray-300 rounded-full"/>
    </div>
    
    <!-- 关闭按钮 -->
    <button 
      class="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
      @click="handleClose"
    >
      <Icon name="material-symbols:close" class="w-5 h-5 text-gray-600" />
    </button>
    
    <!-- 主要内容 -->
    <div class="px-6 pb-6 max-h-96 overflow-y-auto">
      <!-- 活动标题 -->
      <div class="mb-4 pr-8">
        <h2 class="text-xl font-bold text-gray-900 mb-2">{{ activity.name }}</h2>
        <div class="flex flex-wrap gap-2">
          <TagComponent v-for="tag in sortTags(activity.tags)" :key="tag.id" :tag="tag" />
        </div>
      </div>
      
      <!-- 活动描述 -->
      <div class="mb-6">
        <h3 class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Icon name="mdi:information" class="w-4 h-4" />
          活动介绍
        </h3>
        <p class="text-gray-600 leading-relaxed">{{ activity.description }}</p>
      </div>
      
      <!-- 详细信息网格 -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-blue-50 rounded-lg p-3">
          <div class="flex items-center gap-2 text-blue-700 mb-1">
            <Icon name="mdi:calendar-start" class="w-4 h-4" />
            <span class="text-xs font-medium">开始时间</span>
          </div>
          <p class="text-blue-900 font-semibold text-sm">{{ formatDateTime(activity.start_time) }}</p>
        </div>
        
        <div class="bg-red-50 rounded-lg p-3">
          <div class="flex items-center gap-2 text-red-700 mb-1">
            <Icon name="mdi:calendar-end" class="w-4 h-4" />
            <span class="text-xs font-medium">结束时间</span>
          </div>
          <p class="text-red-900 font-semibold text-sm">{{ formatDateTime(activity.end_time) }}</p>
        </div>
        
        <div class="bg-green-50 rounded-lg p-3">
          <div class="flex items-center gap-2 text-green-700 mb-1">
            <Icon name="mdi:account-group" class="w-4 h-4" />
            <span class="text-xs font-medium">人数限制</span>
          </div>
          <p class="text-green-900 font-semibold text-sm">最多 {{ activity.max_member }} 人</p>
        </div>
        
        <div class="bg-purple-50 rounded-lg p-3">
          <div class="flex items-center gap-2 text-purple-700 mb-1">
            <Icon name="mdi:account" class="w-4 h-4" />
            <span class="text-xs font-medium">发起者</span>
          </div>
          <p class="text-purple-900 font-semibold text-sm">{{ activity.owner.nickname }}</p>
        </div>
      </div>
      
      <!-- 位置信息 -->
      <div class="mb-6">
        <h3 class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Icon name="mdi:map-marker" class="w-4 h-4" />
          活动位置
        </h3>
        <div class="bg-gray-50 rounded-lg p-3">
          <p class="text-gray-700 text-sm">{{ activity.location }}</p>
        </div>
      </div>
      
      <!-- 活动状态 -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">活动状态</span>
          <span class="px-3 py-1 text-sm font-medium rounded-full" :class="getStatusClass()">
            {{ getStatusText() }}
          </span>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="flex gap-3">
        <button 
          class="flex-1 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 active:bg-primary-700 transition-colors"
          @click="handleJoin"
        >
          {{ getJoinButtonText() }}
        </button>
        <button 
          class="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors"
          @click="handleShare"
        >
          <Icon name="mdi:share" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'

const props = defineProps<{
  activity: Activity
}>()

const emit = defineEmits<{
  close: []
  join: [activity: Activity]
  share: [activity: Activity]
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

const sortTags = (tags: Tag[]): Tag[] => {
  const typesOrder: Record<string, number> = {
    category: 1,
    artist: 2
  }
  return tags.sort((a: Tag, b: Tag) => typesOrder[a.type]! - typesOrder[b.type]!)
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

const handleClose = (): void => {
  emit('close')
}

const handleJoin = (): void => {
  emit('join', props.activity)
}

const handleShare = (): void => {
  emit('share', props.activity)
}
</script>