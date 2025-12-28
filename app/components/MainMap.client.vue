<template>
  <div id="main-map" class="w-full h-full">
    <div class="h-full flex justify-center items-center">
      <div>加载中...</div>
    </div>
    <MapControls v-if="map" :map="map" />
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
const map = shallowRef<AMap.Map>()
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
    const { $AMap } = useNuxtApp()
    map.value = new $AMap.Map('main-map', {
        zoom: 10, // 初始缩放级别
        center: [120.2, 30.2], // 初始中心点（杭州）
        viewMode: '2D', // 地图视图模式
      })


    if (map.value) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lon, accuracy: acc } = position.coords
          mapStore.home = {lon, lat}
          console.log(`跳转到用户位置: 经度=${lon}, 纬度=${lat}, 准确度=${acc}`)
          map.value?.setCenter(lonlatToArray(mapStore.home), true)
        },
        (error) => {
          console.error('获取用户位置失败:', error)
        }
      )
      console.log("有地图，开始读取事件")
      const points = []
      for (const activity of activities.value) {
        const marker = createPoint(activity)
        points.push(marker)
        console.log("已读取活动")
      }
      map.value.add(points)
    }
  } catch (error) {
    console.error('地图初始化失败:', error)
  }
})

onActivated(() => {
  
  map.value?.resize()
})

onUnmounted(() => {
  map.value?.destroy()
})
</script>
