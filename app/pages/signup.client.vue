<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
    <div class="max-w-md mx-auto">
      <!-- Logo和标题 -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
          <Icon name="material-symbols:music-note" class="text-white text-2xl" />
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">用户注册</h1>
        <p class="text-gray-600 text-sm">加入术力口活动地图，发现精彩活动</p>
      </div>

      <!-- 注册表单 -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <el-form 
          ref="formRef" 
          :model="form" 
          :rules="rules" 
          label-position="top"
          size="large"
          @submit.prevent="handleSubmit"
        >
          <!-- 邮箱 -->
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="form.email"
              placeholder="请输入邮箱地址"
              prefix-icon="Message"
              clearable
            />
          </el-form-item>

          <!-- 昵称 -->
          <el-form-item label="昵称" prop="nickname">
            <el-input
              v-model="form.nickname"
              placeholder="请输入昵称"
              prefix-icon="User"
              clearable
            />
          </el-form-item>

          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请设置密码（8-20位）"
              prefix-icon="Lock"
              show-password
              clearable
            />
          </el-form-item>

          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="form.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              prefix-icon="Lock"
              show-password
              clearable
            />
          </el-form-item>

          <!-- 用户协议 -->
          <el-form-item prop="agreement">
            <el-checkbox v-model="form.agreement">
              <span class="text-sm text-gray-600">
                我已阅读并同意
                <el-button type="primary" link>《用户协议》</el-button>
                和
                <el-button type="primary" link>《隐私政策》</el-button>
              </span>
            </el-checkbox>
          </el-form-item>

          <!-- 注册按钮 -->
          <el-form-item class="mb-0">
            <el-button
              type="primary"
              size="large"
              :loading="submitting"
              class="w-full h-12 text-base font-medium"
              @click="handleSubmit"
            >
              {{ submitting ? '注册中...' : '立即注册' }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 登录链接 -->
      <div class="text-center">
        <p class="text-gray-600 text-sm">
          已有账号？
          <NuxtLink to="/login" class="text-blue-600 hover:text-blue-700 font-medium">
            立即登录
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { register } from '~/api/core/user.client'

// 页面元信息
definePageMeta({
  layout: false,
  title: '用户注册'
})

// 表单数据
const form = reactive({
  email: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  agreement: false
})

// 表单引用
const formRef = ref<FormInstance>()

// 验证规则
const rules = reactive<FormRules>({
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称长度为 2 到 20 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, message: '昵称只能包含字母、数字、下划线和中文', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请设置密码', trigger: 'blur' },
    { min: 8, max: 20, message: '密码长度为 8 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value !== form.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  agreement: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (!value) {
          callback(new Error('请阅读并同意用户协议和隐私政策'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
})


// 提交表单
const submitting = ref(false)

const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    
    submitting.value = true
    
    // 调用注册API
    await register({
      email: form.email,
      nickname: form.nickname,
      password: form.password
    })
    
    ElMessage.success('注册成功！即将跳转到登录页...')
    
    // 注册成功后跳转到登录页
    setTimeout(() => {
      navigateTo('/login')
    }, 1500)
  } catch (error: any) {
    console.error('注册失败:', error)
    ElMessage.error(error.response?.data?.detail || '注册失败，请重试')
  } finally {
    submitting.value = false
  }
}
</script>