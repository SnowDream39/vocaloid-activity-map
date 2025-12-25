<template>
  <div class="w-full h-full">
    <div class="w-full h-full relative">
      <MainMap />
      <div v-if="activityPanelVisible" class="absolute w-full h-full top-0 right-0 flex flex-col justify-end">
        <ActivityPanel 
          v-if="activeActivity" 
          :activity="activeActivity" 
          class="z-200"
          @close="activityPanelVisible = false"
          />
      </div>
    </div>
    <MapControls />
  </div>
</template>

<script setup lang="ts">

const nuxtApp = useNuxtApp()
const activityPanelVisible = ref<boolean>(false)
const activeActivity = ref<Activity>()
 
onMounted(() => {
  nuxtApp.hook('map:marker:click', (activity: Activity) => {
    console.log(activity)
    activityPanelVisible.value = true
    activeActivity.value = activity
  })
})
</script>