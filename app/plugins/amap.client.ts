// plugins/amap.client.ts
// 引入 AMapLoader 依赖包
import AMapLoader from '@amap/amap-jsapi-loader';
export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    const config = useRuntimeConfig()
    // 安全密钥
    window._AMapSecurityConfig = {
      securityJsCode: config.public.amapSecurityCode
    }
    console.log('mounted.window', window._AMapSecurityConfig)
    return {
      provide: {
        AMap: await AMapLoader.load({
          key: config.public.amapKey,
          version: '2.0',
          plugins: [],
        })
      }
    }
  } catch (error) {
    console.error('AMapLoader 加载失败:', error)
    return {
      provide: {
        AMap: null
      }
    }
  }
  
})
