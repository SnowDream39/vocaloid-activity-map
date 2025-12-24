# 地图 Store 使用指南

## 概述

`useMapStore` 是一个基于 Pinia 的状态管理 store，用于管理高德地图的实例和操作。

## 功能特性

- 🗺️ 地图实例管理
- 🔄 异步地图加载
- 📍 地图操作（缩放、移动等）
- ⚠️ 错误处理和加载状态
- 🔧 类型安全

## 基本使用

### 1. 初始化地图

```vue
<template>
  <div id="container" class="map-container"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMapStore } from '@/stores/map'

const mapStore = useMapStore()

onMounted(async () => {
  try {
    await mapStore.initMap('container')
    console.log('地图初始化成功')
  } catch (error) {
    console.error('地图初始化失败:', error)
  }
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 400px;
}
</style>
```

### 2. 地图操作

```typescript
// 获取地图实例
const map = mapStore.getMap()

// 设置地图中心点
mapStore.setCenter(116.397428, 39.90923) // 北京天安门

// 设置缩放级别
mapStore.setZoom(12)

// 销毁地图
mapStore.destroyMap()
```

### 3. 监听状态

```vue
<template>
  <div>
    <div v-if="mapStore.isLoading">地图加载中...</div>
    <div v-if="mapStore.error" class="error">{{ mapStore.error }}</div>
    <div v-if="mapStore.map">地图已就绪</div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map'

const mapStore = useMapStore()
const { map, isLoading, error } = storeToRefs(mapStore)
</script>
```

## Store API

### 状态 (State)

| 属性 | 类型 | 描述 |
|------|------|------|
| `map` | `AMap.Map \| null` | 高德地图实例 |
| `isLoading` | `boolean` | 地图加载状态 |
| `error` | `string \| null` | 错误信息 |

### 方法 (Methods)

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `initMap` | `containerId?: string` | `Promise<AMap.Map>` | 初始化地图 |
| `destroyMap` | - | `void` | 销毁地图实例 |
| `setCenter` | `lng: number, lat: number` | `void` | 设置地图中心点 |
| `setZoom` | `zoom: number` | `void` | 设置地图缩放级别 |
| `getMap` | - | `AMap.Map \| null` | 获取当前地图实例 |

## 高级用法

### 添加地图控件

```typescript
const map = mapStore.getMap()

// 添加比例尺控件
map.addControl(new AMap.Scale())

// 添加工具条控件
map.addControl(new AMap.ToolBar())
```

### 添加标记和覆盖物

```typescript
const map = mapStore.getMap()

// 添加标记
const marker = new AMap.Marker({
  position: [116.481181, 39.989792],
  title: '标记点'
})
map.add(marker)

// 添加信息窗口
const infoWindow = new AMap.InfoWindow({
  content: '<div>信息内容</div>',
  offset: new AMap.Pixel(0, -30)
})

marker.on('click', () => {
  infoWindow.open(map, marker.getPosition())
})
```

### 地图事件监听

```typescript
const map = mapStore.getMap()

// 监听地图点击事件
map.on('click', (e) => {
  console.log('点击位置:', e.lnglat)
})

// 监听地图缩放事件
map.on('zoomend', () => {
  console.log('当前缩放级别:', map.getZoom())
})
```

## 注意事项

1. **生命周期管理**: 记得在组件卸载时调用 `destroyMap()` 来清理地图实例
2. **异步加载**: `initMap()` 是异步方法，需要使用 `await` 或 `.then()` 处理
3. **错误处理**: 始终检查 `error` 状态来处理可能的加载失败
4. **类型安全**: 使用 TypeScript 可以获得更好的类型提示和错误检查

## 示例组件

参考 `MapControls.vue` 组件，了解如何在实际项目中使用地图 store。