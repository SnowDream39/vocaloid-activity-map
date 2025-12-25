<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
    <div class="max-w-md mx-auto">
      <!-- Logo和标题 -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
          <Icon name="material-symbols:music-note" class="text-white text-2xl" />
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">用户登录</h1>
        <p class="text-gray-600 text-sm">欢迎回到术力口活动地图</p>
      </div>

      <!-- 登录表单 -->
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

          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              show-password
              clearable
              @keyup.enter="handleSubmit"
            />
          </el-form-item>

          <!-- 记住我和忘记密码 -->
          <div class="flex items-center justify-between mb-4">
            <el-checkbox v-model="form.rememberMe">
              <span class="text-sm text-gray-600">记住我</span>
            </el-checkbox>
            <el-button type="primary" link class="text-sm">
              忘记密码？
            </el-button>
          </div>

          <!-- 登录按钮 -->
          <el-form-item class="mb-0">
            <el-button
              type="primary"
              size="large"
              :loading="submitting"
              class="w-full h-12 text-base font-medium"
              @click="handleSubmit"
            >
              {{ submitting ? '登录中...' : '立即登录' }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 注册链接 -->
      <div class="text-center">
        <p class="text-gray-600 text-sm">
          还没有账号？
          <NuxtLink to="/signup" class="text-blue-600 hover:text-blue-700 font-medium">
            立即注册
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import * as api from '~/api/core/user.client'

// 页面元信息
definePageMeta({
  layout: false,
  title: '用户登录'
})

// 表单数据
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

// 表单引用
const formRef = ref<FormInstance>()

// 验证规则
const rules = reactive<FormRules>({
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, message: '密码不能少于8位', trigger: 'blur' }
  ]
})

// 提交表单
const submitting = ref(false)

const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    
    submitting.value = true
    
    // 调用登录API
    await api.login({
      email: form.email,
      password: form.password
    })

    await api.fetchUserInfo()
    
    ElMessage.success('登录成功！')
    
    
    // 登录成功后跳转到首页或用户中心
    setTimeout(() => {
      navigateTo('/my')
    }, 1000)
  } catch (error: any) {
    console.error('登录失败:', error)
    ElMessage.error(error.response?.data?.detail || '登录失败，请检查账号密码')
  } finally {
    submitting.value = false
  }
}
</script>