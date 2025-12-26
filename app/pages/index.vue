<template>
  <div class="max-h-full grid grid-rows-[auto,1fr] overflow-hidden">
    <!-- 主搜索框 -->
    <div class="w-full">
      <SearchBar 
        v-model:is-searching="isSearching"
        v-model:keywords="searchForm.keywords"
        class="py-1"
        @search="handleSearch"  
      /> 
      <!-- 筛选选项按钮 -->
      <div class="flex overflow-x-auto border-b-1 border-outline">
        <SearchFilterButton
          :icon="'mdi:account-group'" 
          :active="expandedFilter === 'people'"
          :selected="hasPeopleFilter"
          title="人数"
          @click="toggleFilter('people')"
          @clear="clearPeopleFilter"
        />
        <SearchFilterButton
          :icon="'mdi:calendar'" 
          :active="expandedFilter === 'time'"
          :selected="hasTimeFilter"
          title="日期"
          @click="toggleFilter('time')"
          @clear="clearTimeFilter"
        />
        <button
          v-if="hasAnyFilter"
          class="flex items-center gap-1 px-3 py-1.5 border border-surface-variant rounded-full text-xs font-medium whitespace-nowrap text-error hover:bg-error/[0.08] transition-colors duration-200"
          @click="handleReset"
        >
          <Icon name="mdi:refresh" class="w-3 h-3" />
          清空
        </button>
      </div>
    </div>


    <!-- 主体 -->
    <div class="relative w-full overflow-hidden">
      
      <!-- 搜索选项 -->
      <div v-if="expandedFilter" class="absolute top-0 h-full w-full bg-black/50 z-10">
        <!-- 人数筛选 -->
        <SearchFilterMember
          v-if="expandedFilter === 'people'"
          v-model:max-member-gt="searchForm.max_member_gt"
          v-model:max-member-lt="searchForm.max_member_lt"
        />

        <!-- 时间筛选 -->
        <SearchFilterTime
          v-if="expandedFilter === 'time'"
          v-model:start-time="searchForm.time_begin"
          v-model:end-time="searchForm.time_end"
        />


      </div>

      <!-- 活动列表 -->
      <div class="w-full h-full space-y-4 overflow-y-auto scrollbar-hide">
        <ActivityCard v-for="activity in activities" :key="activity.id" :activity="activity" />
      </div>
    </div>

    <!-- 无结果提示 -->
    <div v-if="hasSearched && activities.length === 0" class="mt-8 text-center text-gray-500">
      <p class="text-lg">没有找到符合条件的活动</p>
    </div>

  </div>
</template>

<script setup lang="ts">
  import { DateTime } from 'luxon'
import * as activityApi from '~/api/core/activity'


const activities = ref<Activity[]>([])
const hasSearched = ref(false)

const expandedFilter = ref<string | null>(null)

const isSearching = ref(false)

const searchForm = reactive<SearchForm>({
  keywords: '',
  tag_ids: [] as number[],
  max_member_gt: null as number | null,
  max_member_lt: null as number | null,
  time_begin: null as DateTime | null,
  time_end: null as DateTime | null,
  page: 1,
  page_size: 20
})

const startTimeInput = ref('')
const endTimeInput = ref('')

// 计算属性：检查是否有筛选条件
const hasPeopleFilter = computed(() => 
  searchForm.max_member_gt !== null || searchForm.max_member_lt !== null
)

const hasTimeFilter = computed(() => 
  searchForm.time_begin !== null || searchForm.time_end !== null
)

const hasAnyFilter = computed(() => 
  hasPeopleFilter.value || hasTimeFilter.value
)

// 监听时间输入变化
watch(startTimeInput, (newValue) => {
  if (newValue) {
    searchForm.time_begin = DateTime.fromISO(newValue)
  } else {
    searchForm.time_begin = null
  }
})

watch(endTimeInput, (newValue) => {
  if (newValue) {
    searchForm.time_end = DateTime.fromISO(newValue)
  } else {
    searchForm.time_end = null
  }
})

// 切换筛选面板
const toggleFilter = (filter: string) => {
  if (expandedFilter.value === filter) {
    expandedFilter.value = null
  } else {
    expandedFilter.value = filter
  }
}


// 清除人数筛选
const clearPeopleFilter = () => {
  searchForm.max_member_gt = null
  searchForm.max_member_lt = null
  if (searchForm.keywords) {
    handleSearch()
  }
}

// 清除时间筛选
const clearTimeFilter = () => {
  searchForm.time_begin = null
  searchForm.time_end = null
  startTimeInput.value = ''
  endTimeInput.value = ''
  if (searchForm.keywords) {
    handleSearch()
  }
}

const handleSearch = async () => {
  try {
    expandedFilter.value = null
    isSearching.value = true
    
    const result = await activityApi.search(
      searchForm.keywords,
      searchForm.tag_ids,
      searchForm.max_member_gt,
      searchForm.max_member_lt,
      searchForm.time_begin,
      searchForm.time_end,
      searchForm.page,
      searchForm.page_size
    )
    
    activities.value = result
    console.log('搜索结果:', result)
  } catch (error) {
    console.error('搜索失败:', error)
  } finally {
    isSearching.value = false
  }
}

const handleReset = () => {
  searchForm.keywords = ''
  searchForm.tag_ids = []
  searchForm.max_member_gt = null
  searchForm.max_member_lt = null
  searchForm.time_begin = null
  searchForm.time_end = null
  searchForm.page = 1
  searchForm.page_size = 20
  startTimeInput.value = ''
  endTimeInput.value = ''
  expandedFilter.value = null

}


onMounted(async () => {
  activities.value = await activityApi.getAll()
})

</script>