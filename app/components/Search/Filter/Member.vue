<template>
  <div class="bg-surface space-y-3">
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="text-xs text-on-surface-variant mb-1 block">最少人数</label>
        <input
          v-model.number="max_member_gt"
          type="number"
          placeholder="不限制"
          min="0"
          class="w-full px-2 py-1.5 text-sm border border-surface-variant rounded focus:outline-none focus:ring-1 focus:ring-primary"
        >
      </div>
      <div>
        <label class="text-xs text-on-surface-variant mb-1 block">最多人数</label>
        <input
          v-model.number="max_member_lt"
          type="number"
          placeholder="不限制"
          min="0"
          class="w-full px-2 py-1.5 text-sm border border-surface-variant rounded focus:outline-none focus:ring-1 focus:ring-primary"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const max_member_gt = defineModel<number>('max_member_gt')
const max_member_lt = defineModel<number>('max_member_lt')
</script>