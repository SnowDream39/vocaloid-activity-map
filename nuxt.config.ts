// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/index.css'],
  ssr: false,
  nitro: {
    preset: 'static'
  },
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
  routeRules: {
    '/': { redirect: '/map' },
  },
  runtimeConfig: {
    // 服务端私有变量
    apiBaseUrl: process.env.API_BASE_URL,
    
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
    '@nuxt/icon',
    '@nuxtjs/color-mode',
  ],
  elementPlus: { defaultLocale: 'zh-cn' },
  colorMode: {
    classSuffix: '', // 让 class 变成 `dark` 而不是 `dark-mode`
  },
})