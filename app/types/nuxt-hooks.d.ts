// types/nuxt-hooks.d.ts
import 'nuxt/app'

declare module 'nuxt/app' {
  interface RuntimeNuxtHooks {
    'map:marker:click': (unknown) => void
  }
}
