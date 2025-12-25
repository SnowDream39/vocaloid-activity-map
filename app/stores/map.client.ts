import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', {
  state: () => ({
    map: shallowRef<AMap.Map | null>(null),
    isLoading: false,
    error: null as string | null
  }),
  actions: {

  async initMap (containerId: string = 'container') {
    if (this.map) {
      console.warn('地图已经初始化')
      return this.map
    }

    try {
      this.isLoading = true
      this.error = null

      // 动态导入AMapLoader
      const { $AMap } = useNuxtApp()

      // 创建地图实例
      this.map = new $AMap.Map(containerId, {
        zoom: 10, // 初始缩放级别
        center: [120.2, 30.2], // 初始中心点（杭州）
        viewMode: '2D', // 地图视图模式
      })

      console.log('地图初始化成功')
      return this.map
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '地图加载失败'
      this.error = errorMessage
      console.error('地图初始化失败:', err)
      throw err
    } finally {
      this.isLoading = false
    }
  },

  // 销毁地图
  destroyMap () {
    if (this.map) {
      this.map.destroy()
      this.map = null
      console.log('地图已销毁')
    }
  },

  // 获取当前地图实例
  getMap(){ 
    return this.map
  }

  }
})
