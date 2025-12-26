<template>
  <div id="main-map" class="w-full h-full">
    <div class="h-full flex justify-center items-center">
      <div>加载中...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useMapStore } from '~/stores/map.client'
import * as activityApi from '~/api/core/activity'

definePageMeta({
  title: '地图'
})


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
    console.log(activities.value)
    await nextTick()
    let map = mapStore.getMap()

    if (! map) {
      map = await mapStore.initMap('main-map')
    }


    if (map) {
      console.log("有地图，开始读取事件")
      const points = []
      for (const activity of activities.value) {
        const marker = createPoint(activity)
        points.push(marker)
        console.log("已读取活动")
      }
      map.add(points)
    }
  } catch (error) {
    console.error('地图初始化失败:', error)
  }
})

onActivated(() => {
  const map = mapStore.getMap()
  if (map) {
    map.resize()
  }
})

onUnmounted(() => {
  mapStore.destroyMap()
})
</script>
