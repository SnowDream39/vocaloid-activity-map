<template>
  <el-dialog v-moel="visible" title="修改密码" width="90%" max-width="400px">
    <el-form :model="form" label-position="top">
      <el-form-item label="当前密码">
        <el-input v-model="form.currentPassword" type="password" placeholder="请输入当前密码" />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入新密码" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSave">修改密码</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

interface PasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface Props {
  loading: boolean
}

defineProps<Props>()
const visible = defineModel<boolean>('visible')
const emit = defineEmits<{
  save: [form: PasswordForm]
  cancel: []
}>()

const form = reactive<PasswordForm>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 监听对话框显示状态，重置表单
watch(visible, (newVal: boolean | undefined) => {
  if (!newVal) {
    Object.assign(form, {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }
})

const validateForm = (): boolean => {
  if (!form.currentPassword) {
    ElMessage.error('请输入当前密码')
    return false
  }
  
  if (!form.newPassword || form.newPassword.length < 6) {
    ElMessage.error('新密码至少6位')
    return false
  }
  
  if (form.newPassword !== form.confirmPassword) {
    ElMessage.error('两次输入的密码不一致')
    return false
  }
  
  return true
}

const handleSave = () => {
  if (validateForm()) {
    emit('save', { ...form })
  }
}

const handleCancel = () => {
  emit('cancel')
}
</script>