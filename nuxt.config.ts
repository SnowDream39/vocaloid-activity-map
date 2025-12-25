// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/index.css'],
  app: {
    head: {
      title: '术力口活动地图',
      htmlAttrs: {
        lang: 'zh-CN'
      },
      meta: [
        { name: 'description', content: '一个虚拟歌手相关活动的可视化地图平台' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      amapKey: process.env.AMAP_KEY,
      amapSecurityCode: process.env.AMAP_SECURITY_CODE,
      apiBaseUrl: process.env.API_BASE_URL,
    }
  },
  modules: [
    '@nuxt/eslint',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
    '@nuxt/icon'
  ],
  elementPlus: { /** Options */ }
})