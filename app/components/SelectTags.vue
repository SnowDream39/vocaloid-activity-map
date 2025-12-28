<template>
  <el-form-item label="活动标签" prop="tags">
    <div class="space-y-4">
      <!-- 分类标签 -->
      <div class="flex flex-wrap gap-2">
        <el-check-tag
          v-for="tag in categoryTags" 
          :key="tag.id" 
          :checked="selectedTagIds.includes(tag.id)"
          @change="(value: boolean) => handleTagChange(value, tag)">
          {{ tag.name }}
        </el-check-tag>
      </div>

      <!-- artist标签 -->
      <AutocompleteTags 
        @change="handleTagChange"
      />
    </div>
  </el-form-item>
</template>
<script setup lang="ts">
import * as tagApi from '@/api/core/tag'

const categoryTags = ref<Tag[]>([])
const selectedTagIds = defineModel<number[]>('selected-tag-ids', {required: true})

const handleTagChange = (value: boolean, tag: Tag) => {
  if (value) {
    selectedTagIds.value.push(tag.id)
  } else {
    selectedTagIds.value.splice(selectedTagIds.value.indexOf(tag.id), 1)
  }
}

onMounted(async () => {
  categoryTags.value = await tagApi.getCategories()
})
</script>