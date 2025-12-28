<template>
  <div class="border-b pb-6">
    <h2 class="text-lg font-semibold mb-4 text-on-surface flex items-center gap-2">
      <Icon name="material-symbols:location-on" class="w-5 h-5" />
      位置设置
    </h2>


    <el-form-item label="活动地址" prop="location">

      <el-autocomplete
        v-model.lazy="location" 
        placeholder="请输入详细地址"
        :fetch-suggestions="handleSearch"
        @select="handleSelect"
      />

    </el-form-item>
    <el-form-item label="坐标选择">
      <LocateMap :position="position" :location="location" @locate="handleLocate" />
      <div class="space-y-3">
        <div class="flex gap-3">
          <el-input 
            v-model="position.lon" 
            placeholder="经度"
            type="number"
            step="0.0001"
          />
          <el-input 
            v-model="position.lat" 
            placeholder="纬度"
            type="number"
            step="0.0001"
          />
        </div>

      </div>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
const location = defineModel<string>('location')
const position = defineModel<LonLat>('position', { required: true })
const { loadGeocoder } = useGeocoder()

const handleLocate = (newPosition: LonLat) => {
  position.value = newPosition
}

const handleSearch = async (query: string, cb: (arg: any) => void) => {
  const geocoder = await loadGeocoder()
  geocoder.getLocation(query, (status: any, result: any) => {
      if (status ==="complete" && result.info === "OK") {
        const res =  result.geocodes.map((item: any) => ({
          value: item.formattedAddress,
          position: {
            lon: item.location.lng,
            lat: item.location.lat
          }
        }))
        cb(res)
    }
  })
}

const handleSelect = (item: any) => {
  location.value = item.value
  position.value = item.position
}

</script>