<template>
  <span 
    :key="tag.id" 
    class="px-3 py-1 text-sm rounded-full font-medium"
    :class="getTagClass(tag.type)"
  >
    {{ tag.name }}
  </span>
</template>

<script setup lang="ts">

defineProps<{
  tag: Tag
}>()

const getTagClass = (tagType: string): string => {
  const tagClasses: Record<string, string> = {
    category: 'bg-yellow-100 text-yellow-700',
    artist: 'bg-blue-100 text-blue-700',
  }
  return tagClasses[tagType] || tagClasses.secondary as string
}
</script>