<template>
  <div class="bg-surface absolute top-2 right-2 z-1000 rounded-md p-2 shadow-md">
    <div v-if="mapStore.error" class="p-2 py-3 mb-2 rounded-sm bg-error-container text-error border-[color_mix(in_srgb,var(--md-sys-color-error-container),black)] border-1">
      {{ mapStore.error }}
    </div>
    <div v-if="mapStore.map" class="flex flex-col gap-2">
      <button class="control-btn" @click="zoomIn">放大</button>
      <button class="control-btn" @click="zoomOut">缩小</button>
      <button class="control-btn" @click="resetView">重置视图</button>
      <button class="control-btn" @click="addScale">添加比例尺</button>
      <button class="control-btn" @click="jumpToUser">定位到用户</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMapStore } from '~/stores/map.client'

const mapStore = useMapStore()

const zoomIn = () => {
  const map = mapStore.getMap()
  if (map) {
    map.setZoom(map.getZoom() + 1)
  }
}

const zoomOut = () => {
  const map = mapStore.getMap()
  if (map) {
    map.setZoom(map.getZoom() - 1)
  }
}

const resetView = () => {
  const map = mapStore.getMap()
  if (map) {
    map.setCenter([116.397428, 39.90923])
    map.setZoom(10)
  }
}

const addScale = async () => {
  const map = mapStore.getMap()
  if (!map) return
  map.addControl(new AMap.Scale())
}

const jumpToUser = () => {
  mapStore.jumpToHome()
}
</script>

<style scoped>

.control-btn {
  padding: 8px 16px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.control-btn:hover {
  background: #40a9ff;
}

.control-btn:active {
  background: #096dd9;
}
</style>
