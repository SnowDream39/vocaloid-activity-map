// 用于保存地图相关的状态和方法
// 至于地图，因为已经KeepAlive了，所以不需要保存

import { defineStore } from 'pinia'



export const useMapStore = defineStore('map', {
  state: () => ({
    home: {lon:120.2, lat:30.2},
    isLoading: false,
    error: null as string | null
  }),
  actions: {
    jumpToHome(map: AMap.Map) {
      map.setCenter([this.home.lon, this.home.lat], true)
    },
  }
})
