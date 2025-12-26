<template>
  <div class="flex items-center gap-2">
    <div class="flex-1 relative">
      <input
        v-model="keywords"
        type="text"
        placeholder="搜索活动名称或描述..."
        class="w-full px-10 py-2 border border-surface-variant rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        @keyup.enter="handleSearch"
      >
      <Icon name="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
    </div>
    <button
      class="px-4 py-2 bg-primary text-on-primary rounded-full hover:bg-[color-mix(in_srgb,_var(--md-sys-color-primary)_90%,_white)] disabled:bg-surface-variant disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium min-w-[60px]"
      :disabled="isSearching"
      @click="handleSearch"
    >
      <span v-if="isSearching">...</span>
      <span v-else>搜索</span>
    </button>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits<{
  search: []
}>()

const keywords = defineModel<string>('keywords')
const isSearching = defineModel<boolean>('isSearching')
  
const handleSearch = () => {
  emit('search')
}
</script>