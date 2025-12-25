<template>
  <div id="main-map" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useMapStore } from '~/stores/map.client'
import * as activityApi from '~/api/core/activity'

const mapStore = useMapStore()
const nuxtApp = useNuxtApp()

const activities = ref<Activity[]>([])

function createPoint(activity: Activity) {
  const marker = new AMap.Marker({
    position: activity.position.coordinates as [number, number]
  })

  const onMarkerClick = () => {
    void nuxtApp.callHook('map:marker:click', activity)
  }

  marker.on('click', onMarkerClick)
  
  return marker
}


onMounted(async () => {
  try {
    activities.value = await activityApi.getAll()
    await nextTick()
    await mapStore.initMap('main-map')
    const map = mapStore.getMap()


    if (map) {
      const points = []
      for (const activity of activities.value) {
        const marker = createPoint(activity)
        points.push(marker)
        console.log("已添加：", activity.name)
      }
      map.add(points)

    }
  } catch (error) {
    console.error('地图初始化失败:', error)
  }
})

onUnmounted(() => {
  mapStore.destroyMap()
})
</script>
