<template>
  <div class="bg-background min-h-screen">
    <!-- 页面头部 -->
    <div class="bg-surface shadow-sm">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button 
              class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              @click="handleGoBack"
            >
              <Icon name="material-symbols:arrow-back" class="w-6 h-6" />
            </button>
            <h1 class="text-2xl font-bold text-on-surface">创建活动</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <div class="bg-surface rounded-lg shadow-lg p-6">
        <el-form 
          ref="formRef"
          :model="form" 
          :rules="rules" 
          label-position="top"
          class="space-y-6"
        >
          <!-- 基本信息 -->
          <div class="border-b pb-6">
            <h2 class="text-lg font-semibold mb-4 text-on-surface flex items-center gap-2">
              <Icon name="material-symbols:info" class="w-5 h-5" />
              基本信息
            </h2>
            
            <el-form-item label="活动名称" prop="name">
              <el-input 
                v-model="form.name" 
                placeholder="请输入活动名称"
                maxlength="100"
                show-word-limit
              />
            </el-form-item>

            <!-- 活动描述暂时不支持 -->
            <!--
            <el-form-item label="活动描述" prop="description">
              <el-input 
                v-model="form.description" 
                type="textarea" 
                :rows="4"
                placeholder="请描述活动内容、注意事项等"
                maxlength="500"
                show-word-limit
              />
            </el-form-item>
            -->

            <el-form-item label="活动描述" prop="description">
              <el-input 
                v-model="form.description" 
                type="textarea" 
                :rows="4"
                placeholder="请描述活动内容、注意事项等"
                maxlength="500"
                show-word-limit
              />
            </el-form-item>

            <el-form-item label="活动标签" prop="tags">
              <div class="space-y-4">
                <!-- 按type分类显示标签 -->
                <div 
                  v-for="(tagsList, type) in tagsByType" 
                  :key="type"
                  class="space-y-2"
                >
                  <h4 class="text-sm font-medium text-on-surface flex items-center gap-2">
                    <Icon name="material-symbols:label" class="w-4 h-4" />
                    {{ type }}
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <el-checkbox
                      v-for="tag in tagsList"
                      :key="tag.id"
                      :model-value="form.tags.includes(tag.id)"
                      @change="handleTagChange(tag.id, $event)"
                    >
                      {{ tag.name }}
                    </el-checkbox>
                  </div>
                </div>
                
                <!-- 已选标签显示 -->
                <div v-if="form.tags.length > 0" class="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div class="text-sm font-medium text-gray-700 mb-2">已选择的标签:</div>
                  <div class="flex flex-wrap gap-2">
                    <el-tag
                      v-for="tagId in form.tags"
                      :key="tagId"
                      closable
                      @close="handleRemoveTag(tagId)"
                    >
                      {{ getTagNameById(tagId) }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>

          <!-- 时间设置 -->
          <div class="border-b pb-6">
            <h2 class="text-lg font-semibold mb-4 text-on-surface flex items-center gap-2">
              <Icon name="material-symbols:schedule" class="w-5 h-5" />
              时间设置
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <el-form-item label="开始时间" prop="start_time">
                <el-date-picker
                  v-model="form.start_time"
                  type="datetime"
                  placeholder="选择开始时间"
                  format="YYYY-MM-DD HH:mm"
                  class="w-full"
                />
              </el-form-item>

              <el-form-item label="结束时间" prop="end_time">
                <el-date-picker
                  v-model="form.end_time"
                  type="datetime"
                  placeholder="选择结束时间"
                  format="YYYY-MM-DD HH:mm"
                  class="w-full"
                />
              </el-form-item>
            </div>
          </div>

          <!-- 位置设置 -->
          <div class="border-b pb-6">
            <h2 class="text-lg font-semibold mb-4 text-on-surface flex items-center gap-2">
              <Icon name="material-symbols:location-on" class="w-5 h-5" />
              位置设置
            </h2>

            <el-form-item label="活动地址" prop="location">
              <el-input 
                v-model="form.location" 
                placeholder="请输入详细地址"
              />
            </el-form-item>

            <el-form-item label="坐标选择">
              <div class="space-y-3">
                <div class="flex gap-3">
                  <el-input 
                    v-model="form.position.lon" 
                    placeholder="经度"
                    type="number"
                    step="0.000001"
                  />
                  <el-input 
                    v-model="form.position.lat" 
                    placeholder="纬度"
                    type="number"
                    step="0.000001"
                  />
                  <el-button 
                    type="primary" 
                    @click="handleLocationSelect"
                  >
                    地图选择
                  </el-button>
                </div>
                <div class="text-sm text-on-surface-variant">
                  可手动输入坐标或点击地图选择
                </div>
              </div>
            </el-form-item>
          </div>

          <!-- 人数设置 -->
          <div class="pb-6">
            <h2 class="text-lg font-semibold mb-4 text-on-surface flex items-center gap-2">
              <Icon name="material-symbols:groups" class="w-5 h-5" />
              人数设置
            </h2>

            <el-form-item label="最大人数" prop="max_member">
              <el-input-number 
                v-model="form.max_member" 
                :min="1" 
                :max="10000"
                placeholder="请输入最大参与人数"
                class="w-full"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>

      <!-- 操作按钮 -->
      <div class="flex gap-4 mt-8">
        <el-button 
          size="large" 
          @click="handleCancel"
        >
          取消
        </el-button>
        <el-button 
          type="primary" 
          size="large" 
          :loading="submitting"
          @click="handleSubmit"
        >
          创建活动
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { DateTime } from 'luxon'
import { create } from '~/api/core/activity'
import { getAll as getAllTags } from '~/api/core/tag'

// 页面元信息
definePageMeta({
  title: '创建活动',
  requiresAuth: true
})

// 表单引用
const formRef = ref<FormInstance>()

// 提交状态
const submitting = ref(false)

// 标签数据
const allTags = ref<Tag[]>([])
const tagsByType = ref<Record<string, Tag[]>>({})

// 加载标签数据
const loadTags = async () => {
  try {
    const tags = await getAllTags()
    allTags.value = tags
    // 按type分组
    tagsByType.value = tags.reduce((acc, tag) => {
      if (!acc[tag.type]) {
        acc[tag.type] = []
      }
      acc[tag.type].push(tag)
      return acc
    }, {} as Record<string, Tag[]>)
  } catch (error) {
    console.error('加载标签失败:', error)
    // 提供测试标签数据
    const mockTags: Tag[] = [
      { id: 1, name: '演唱会', type: '活动类型' },
      { id: 2, name: '音乐', type: '音乐风格' },
      { id: 3, name: 'Vocaloid', type: '音乐风格' },
      { id: 4, name: '线下活动', type: '活动类型' },
      { id: 5, name: '同人', type: '活动类型' }
    ]
    allTags.value = mockTags
    tagsByType.value = mockTags.reduce((acc, tag) => {
      if (!acc[tag.type]) {
        acc[tag.type] = []
      }
      acc[tag.type].push(tag)
      return acc
    }, {} as Record<string, Tag[]>)
  }
}

// 表单数据（内部使用Date对象供el-date-picker使用）
const form = reactive({
  name: '',
  description: '',
  tags: [] as number[],
  start_time: null as Date | null,
  end_time: null as Date | null,
  location: '',
  position: {lon: 116.3974, lat: 39.9093}, // 默认北京坐标
  max_member: 50
})

// 表单验证规则
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 2, max: 100, message: '活动名称长度应在2-100个字符之间', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入活动描述', trigger: 'blur' },
    { min: 10, max: 500, message: '活动描述长度应在10-500个字符之间', trigger: 'blur' }
  ],
  tags: [
    { type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change' }
  ],
  start_time: [
    { required: true, message: '请选择开始时间', trigger: 'change' }
  ],
  end_time: [
    { required: true, message: '请选择结束时间', trigger: 'change' }
  ],
  location: [
    { required: true, message: '请输入活动地址', trigger: 'blur' }
  ],
  max_member: [
    { required: true, message: '请设置最大人数', trigger: 'blur' },
    { type: 'number', min: 1, max: 10000, message: '最大人数应在1-10000之间', trigger: 'blur' }
  ]
})

// 标签处理函数
const handleTagChange = (tagId: number, checked: boolean) => {
  if (checked) {
    if (!form.tags.includes(tagId)) {
      form.tags.push(tagId)
    }
  } else {
    const index = form.tags.indexOf(tagId)
    if (index > -1) {
      form.tags.splice(index, 1)
    }
  }
}

const handleRemoveTag = (tagId: number) => {
  const index = form.tags.indexOf(tagId)
  if (index > -1) {
    form.tags.splice(index, 1)
  }
}

const getTagNameById = (tagId: number): string => {
  const tag = allTags.value.find(t => t.id === tagId)
  return tag?.name || `未知标签(${tagId})`
}

// 自定义验证：结束时间必须晚于开始时间
const validateTimeRange = () => {
  if (form.start_time && form.end_time) {
    if (form.end_time <= form.start_time) {
      ElMessage.error('结束时间必须晚于开始时间')
      return false
    }
  }
  return true
}

// 将Date对象转换为DateTime以供API使用
const convertToDateTime = (date: Date): DateTime => {
  return DateTime.fromJSDate(date)
}

// 返回上一页
const handleGoBack = () => {
  navigateTo('/my')
}

// 地图选择位置
const handleLocationSelect = () => {
  // 这里可以集成地图选择功能
  ElMessage.info('地图选择功能开发中，请手动输入坐标')
}

// 取消创建
const handleCancel = async () => {
  try {
    await ElMessageBox.confirm('确定要取消创建活动吗？已填写的内容将不会保存。', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '继续编辑',
      type: 'warning'
    })
    navigateTo('/my')
  } catch {
    // 用户取消操作
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
      console.log('表单数据:', form)

  try {
    // 验证表单
    await formRef.value.validate()
    
    // 验证时间范围
    if (!validateTimeRange()) return

    submitting.value = true


    // 准备提交数据
    const activityData = {
      name: form.name,
      description: form.description,
      tags: form.tags,
      start_time: convertToDateTime(form.start_time!),
      end_time: convertToDateTime(form.end_time!),
      location: form.location,
      position: form.position,
      max_member: form.max_member
    }

    // 调用API创建活动
    await create(activityData)
    
    ElMessage.success('活动创建成功！')
    
    // 跳转到个人中心或活动详情页
    setTimeout(() => {
      navigateTo('/my')
    }, 1500)

  } catch (error) {
    console.error('创建活动失败:', error)
    ElMessage.error('创建活动失败，请检查网络连接后重试')
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  // 加载标签数据
  await loadTags()
  
  // 设置默认时间为当前时间后1小时开始，4小时后结束
  const now = new Date()
  form.start_time = new Date(now.getTime() + 60 * 60 * 1000) // +1小时
  form.end_time = new Date(now.getTime() + 4 * 60 * 60 * 1000) // +4小时
})
</script>

<style scoped>
:deep(.el-form-item__label) {
  font-weight: 500;
  color: var(--el-text-color-primary);
}

:deep(.el-input-number) {
  width: 100%;
}
</style>