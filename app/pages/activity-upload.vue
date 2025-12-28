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

            <SelectTags
              v-model:selected-tag-ids="form.tags"
            />

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
          <SelectLocation v-model:location="form.location" v-model:position="form.position" />

        </el-form>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-end gap-4 mt-8">
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

// 页面元信息
definePageMeta({
  title: '创建活动',
  requiresAuth: true
})

const mapStore = useMapStore()
// 表单引用
const formRef = ref<FormInstance>()

// 提交状态
const submitting = ref(false)

// 表单数据（内部使用Date对象供el-date-picker使用）
const form = reactive({
  name: '',
  description: '',
  tags: [] as number[],
  start_time: null as Date | null,
  end_time: null as Date | null,
  location: '',
  position: mapStore.home,
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