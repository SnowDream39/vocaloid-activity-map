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
import type { MapsEvent } from 'amap-jsapi-v2-types/types/common/Event'
import throttle from 'lodash/throttle'

definePageMeta({
  title: '地图'
})


const mapStore = useMapStore()
const nuxtApp = useNuxtApp()
const map = shallowRef<AMap.Map>()
const activities = ref<Activity[]>([])
const position = ref<LonLat>(mapStore.home)
const zoomLevel = ref<number>(10)
const showMarkers = computed<boolean>(() => {
  return zoomLevel.value >= 8
})

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

function makePoints() {
  const points = []
  for (const activity of activities.value) {
    const marker = createPoint(activity)
    points.push(marker)
  }
  map.value?.add(points)
}

const checkUpdatePoints = throttle(async () => {
  if (showMarkers.value) {
    const distance = 200 * 2 ** (18-zoomLevel.value)
    activities.value = await activityApi.getNearby(position.value.lon, position.value.lat, distance)
    map.value?.clearMap()
    makePoints()
  }}, 2000, {
  leading: true,
  trailing: false
})


onMounted(async () => {
  void checkUpdatePoints()
  await nextTick()
  const { $AMap } = useNuxtApp()
  map.value = new $AMap.Map('main-map', {
      zoom: zoomLevel.value, // 初始缩放级别
      center: lonlatToArray(mapStore.home), // 初始中心点（杭州）
      viewMode: '2D', // 地图视图模式
    })


  if (map.value) {
    // 初始化用户位置
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lon } = position.coords
        mapStore.home = {lon, lat}
        mapStore.jumpToHome(map.value!)
      },
      (error) => {
        console.error('获取用户位置失败:', error)
      }
    )

    makePoints()

    // 添加监听事件
    map.value.on('dragend', (e: MapsEvent) => {
      position.value = lnglatToLonlat(e.lnglat!)
      void checkUpdatePoints()
    })

    map.value.on('zoomend', () => {
      const zoom = map.value?.getZoom()
      if (zoom) {
        zoomLevel.value = zoom
      }
      void checkUpdatePoints()
    })

  }

})

onActivated(() => {
  
  map.value?.resize()
})

onUnmounted(() => {
  map.value?.destroy()
})
</script>
