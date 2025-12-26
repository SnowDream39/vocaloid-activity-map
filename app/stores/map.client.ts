import { defineStore } from 'pinia'



export const useMapStore = defineStore('map', {
  state: () => ({
    map: shallowRef<AMap.Map | null>(null),
    home: [120.2, 30.2] as [number, number],
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
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lon, accuracy: acc } = position.coords
          this.home = [lon, lat]
          console.log(`跳转到用户位置: 经度=${lon}, 纬度=${lat}, 准确度=${acc}`)
          this.jumpToHome()
        },
        (error) => {
          console.error('获取用户位置失败:', error)
        }
      )
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

  jumpToHome() {
    if (this.map) {
      this.map.setCenter(this.home, true)
    }
  },

  // 获取当前地图实例
  getMap(){ 
    return this.map
  }

  }
})
