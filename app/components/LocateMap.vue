<template>
  <div id="locate-map" class="w-full h-80">
    加载中
  </div>
</template>

<script setup lang="ts">


const props = defineProps<{
  position: LonLat
  location: string | undefined
}>()

const emit = defineEmits<{
  locate: [LonLat]
}>()

const { $AMap } = useNuxtApp()
const map = shallowRef<AMap.Map | null>(null)
const marker = shallowRef<AMap.Marker | null>(null)

function updateMap(position: LonLat) {
  if (marker.value) {
    map.value?.remove(marker.value)
  }
  marker.value = new $AMap.Marker({
    position: [position.lon, position.lat],
    map: map.value
  })
  map.value?.setCenter([position.lon, position.lat])
}

onMounted(async () => {
  await nextTick()
  map.value = new $AMap.Map('locate-map', {
    zoom: 10,
    center: [props.position.lon, props.position.lat]
  })

  map.value?.on('click', (e:any) => {
    const pos = {lon: e.lnglat.lng, lat:e.lnglat.lat}
    updateMap(pos)
    emit('locate', pos)
  })
})

watch(() => props.position, (position) => {
  updateMap(position)
}, {immediate: true})
</script>