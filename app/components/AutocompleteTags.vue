<!-- eslint-disable vue/attributes-order -->
<template>
  <div>
    <!-- 已选择的标签 -->
    <div class="mb-2">
      <el-tag
        v-for="(tag, index) in tags"
        :key="tag.id"
        closable
        class="mr-2"
        @close="removeTag(index)"
      >
        {{ tag.name }}
      </el-tag>
    </div>

    <!-- 输入框 + 搜索 -->
    <div class="flex gap-2">
      <el-autocomplete
        v-model.trim="input"
        :fetch-suggestions="querySearch"
        placeholder="输入标签..."
        @select="handleSelect"
        class="flex-1"
        @keyup.enter.prevent="handleAddTag"
      >
        <template #default="{ item }">
          <div class="value">{{ item.name }}</div>
        </template>
      </el-autocomplete>
      <el-button
        type="primary"
        :disabled="!input.trim()"
        class="flex-shrink-0 text-sm px-3 py-2 md:text-base md:px-4 md:py-2"
        @click="handleAddTag"
      >
        添加
      </el-button>
    </div>

  </div>


</template>

<script lang="ts" setup>
import * as tagApi from "@/api/core/tag"

// 标签列表
const tags = ref<Tag[]>([])
// 输入框
const input = ref<string>("")
const currentSearchResults = ref<Tag[]>([])
const emit = defineEmits<{
  'change': [boolean, Tag]
}>()
// ============ 交互操作逻辑 ==========


async function querySearch(query: string, cb: any) {
  if (query) {
    const results = await tagApi.searchArtists(query)
    currentSearchResults.value = results
    const res = results
    cb(res)
    return res
  } else {
    return []
  }
}

function handleSelect(newTag: Tag) {
  if (tags.value.includes(newTag)) {
    ElMessage.error('标签已存在')
  } else {
    tags.value.push(newTag)
    input.value = ""
    emit('change', true, newTag)
  }
}

function removeTag(index: number) {
  const removedTag = tags.value.splice(index, 1)[0]
  emit('change', false, removedTag!)
}

async function handleAddTag() {
  console.log(input.value)
  const newTagName = input.value.trim()
  if (newTagName) {
    if (currentSearchResults.value.some(tag => tag.name === newTagName)) {
      handleSelect(currentSearchResults.value.find(tag => tag.name === newTagName)!)
    } else {
      const data = await tagApi.createArtist(newTagName)
      const newTag = {
        id: data.tag_id,
        name: newTagName,
        type: 'artist'
      }
      handleSelect(newTag)
    }
  }
}

</script>
