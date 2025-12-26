<template>
  <div class="bg-surface space-y-3">
    <div class="grid grid-cols-1 gap-2">
      <div>
        <label class="text-xs text-on-surface-variant mb-1 block">开始时间</label>
        <input
          v-model="startTimeInput"
          type="datetime-local"
          class="w-full px-2 py-1.5 text-sm border border-surface-variant rounded focus:outline-none focus:ring-1 focus:ring-primary"
        >
      </div>
      <div>
        <label class="text-xs text-on-surface-variant mb-1 block">结束时间</label>
        <input
          v-model="endTimeInput"
          type="datetime-local"
          class="w-full px-2 py-1.5 text-sm border border-surface-variant rounded focus:outline-none focus:ring-1 focus:ring-primary"
        >
      </div>
    </div>
  </div>
</template>

<script  setup lang="ts">
const startTimeInput = defineModel<string>('startTimeInput')
const endTimeInput = defineModel<string>('endTimeInput')
</script>