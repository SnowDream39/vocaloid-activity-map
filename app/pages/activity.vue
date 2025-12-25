<template>
  <div class="flex flex-col items-center">
    <h1 class="big-title">活动</h1>
    

  </div>

</template>

<script setup lang="ts">

const activities = ref<Activity[]>([])

onMounted(() => {
  // 输入一批模拟的活动数据
  activities.value = [
    { id: 1, name: '活动1', organizer: '组织者A', description: '活动描述1', tags: [] },
    { id: 2, name: '活动2', organizer: '组织者B', description: '活动描述2', tags: [] },
    { id: 3, name: '活动3', organizer: '组织者C', description: '活动描述3', tags: [] }
  ]
})
</script>