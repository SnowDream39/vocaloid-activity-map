<template>
  <el-dialog v-model="visible" title="编辑个人资料" width="90%" max-width="500px">
    <el-form :model="form" label-position="top">
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" disabled />
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleAvatarChange"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <div v-else class="avatar-uploader-icon">
            <Icon name="material-symbols:add-photo-alternate" class="text-2xl" />
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSave" :loading="loading">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
interface User {
  nickname: string
  email: string
  avatar?: string
}

interface Props {
  user: User | null
  loading: boolean
}

const props = defineProps<Props>()

const visible = defineModel<boolean>('visible')

const emit = defineEmits<{
  save: [user: User]
  cancel: []
}>()

const form = reactive({
  nickname: '',
  email: '',
  avatar: ''
})

// 监听props变化，更新表单数据
watch(visible, (newVal: boolean | undefined) => {
  if (newVal && props.user) {
    form.nickname = props.user.nickname
    form.email = props.user.email
    form.avatar = props.user.avatar || ''
  }
})

const handleAvatarChange = (file: any) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    form.avatar = e.target?.result as string
  }
  reader.readAsDataURL(file.raw)
}

const handleSave = () => {
  emit('save', { ...form })
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.avatar-uploader :deep(.el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
}

.avatar-uploader :deep(.el-upload:hover) {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}

.avatar {
  width: 80px;
  height: 80px;
  display: block;
  object-fit: cover;
  border-radius: 6px;
}
</style>