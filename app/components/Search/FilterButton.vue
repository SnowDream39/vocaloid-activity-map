<template>
  <button
    class="flex items-center gap-1 px-3 py-1.5 text-xs whitespace-nowrap transition-colors duration-200"
    :class="active ? 'bg-primary/[0.12] border-primary text-primary font-bold' : 'bg-surface hover:bg-surface-variant'"
    @click="$emit('click')"
  >
    <Icon :name="icon" class="w-3 h-3" />
    <span>{{ title }}</span>
    <Icon v-if="selected" name="mdi:close-circle" class="w-3 h-3 text-error" @click.stop="$emit('clear')" />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
  active: boolean;
  selected: boolean;
}>()

defineEmits<{
  click: []
  clear: []
}>()

</script>