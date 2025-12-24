<template>
  <div class="map-controls">
    <div v-if="mapStore.isLoading" class="loading-status">地图加载中...</div>

    <div v-if="mapStore.error" class="error-message">
      {{ mapStore.error }}
    </div>

    <div v-if="mapStore.map" class="controls">
      <button class="control-btn" @click="zoomIn">放大</button>
      <button class="control-btn" @click="zoomOut">缩小</button>
      <button class="control-btn" @click="resetView">重置视图</button>
      <button class="control-btn" @click="addScale">添加比例尺</button>
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
</script>

<style scoped>
.map-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 12px;
}

.loading-status,
.error-message {
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  font-size: 14px;
}

.loading-status {
  background: #e6f7ff;
  color: #1890ff;
  border: 1px solid #91d5ff;
}

.error-message {
  background: #fff2f0;
  color: #ff4d4f;
  border: 1px solid #ffccc7;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

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
