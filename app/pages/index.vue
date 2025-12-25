<template>
  <div class="w-full h-full relative">
    <MainMap />
    <div v-if="activityPanelVisible" class="absolute w-full h-full top-0 right-0 flex flex-col justify-end">
      <ActivityPanel />
    </div>
  </div>
  <MapControls />
</template>

<script setup lang="ts">
const router = useRouter()
const nuxtApp = useNuxtApp()
const activityPanelVisible = ref<boolean>(false)
 
onMounted(() => {
  nuxtApp.hook('map:marker:click', (e: { target: { getPosition: () => [number, number] }}) => {
    activityPanelVisible.value = true
    console.log(e)
  })
})
</script>