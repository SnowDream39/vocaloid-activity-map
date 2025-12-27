<template>
  <div class="w-full h-full bg-surface-variant grid grid-cols-3">
    <router-link v-for="nav in navs" :key="nav.path" :to="nav.path" class="block">
      <div class="flex flex-col items-center justify-center h-full hover:bg-surface">
        <Icon :name="nav.icon" />
        <div class="text-on-surface-variant text-sm">{{ nav.title }}</div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
const navs = ref([
  { title: '地图', path: '/map', icon: 'material-symbols:location-on' },
  { title: '活动', path: '/activity', icon: 'material-symbols:calendar-month-outline' },
  { title: '我的', path: '/my', icon: 'mdi:account' },
])
</script>