<template>
  <div id="main-map" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useMapStore } from '~/stores/map.client'

const mapStore = useMapStore()
const nuxtApp = useNuxtApp()

onMounted(async () => {
  try {
    await nextTick()
    await mapStore.initMap('main-map')
    const map = mapStore.getMap()

    if (map) {
      // 添加标记点
      const infoWindow = new AMap.InfoWindow({
        isCustom: true,
        content: '<div>HELLO,AMAP!</div>',
        offset: new AMap.Pixel(16, -45),
      })

      const onMarkerClick = (e: { target: { getPosition: () => [number, number] }}) => {
        infoWindow.open(map, e.target.getPosition())
        void nuxtApp.callHook('map:marker:click', e)

      }

      const marker = new AMap.Marker({
        position: [116.481181, 39.989792],
      })

      map.add(marker)
      marker.on('click', onMarkerClick)

      // 添加折线
      const lineArr: [number, number][] = [
        [116.368904, 39.913423],
        [116.382122, 39.901176],
        [116.387271, 39.912501],
        [116.398258, 39.9046],
      ]

      const polyline = new AMap.Polyline({
        path: lineArr,
        strokeColor: '#3366FF',
        strokeWeight: 5,
        strokeStyle: 'solid',
      })

      map.add(polyline)
    }
  } catch (error) {
    console.error('地图初始化失败:', error)
  }
})

onUnmounted(() => {
  mapStore.destroyMap()
})
</script>
