<template>
  <div class="w-full h-full bg-surface-variant grid grid-cols-3">
    <router-link v-for="nav in navs" :key="nav.path" :to="nav.path" class="block">
      <div class="flex flex-col items-center justify-center h-full hover:bg-surface">
        <Icon name="material-symbols:house" />
        <div class="text-on-surface-variant text-sm">{{ nav.title }}</div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const navs = ref([
  { title: '首页', path: '/' },
  { title: '活动', path: '/activity' },
  { title: '我的', path: '/my' },
])
</script>