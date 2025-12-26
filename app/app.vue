<template>
  <NuxtLayout>
    <NuxtPage keepalive />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: '术力口地图',
  meta: [
    { name: 'viewport', content: 'initial-scale=1.0, user-scalable=no' }
  ],
})
</script>