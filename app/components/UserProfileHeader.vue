<template>
  <div class="bg-gradient-to-r from-primary to-secondary text-on-primary">
    <div class="container mx-auto px-4 py-8">
      <!-- 未登录状态 -->
      <div v-if="!userStore.isAuthenticated" class="text-center">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
          <Icon name="material-symbols:person" class="text-4xl" />
        </div>
        <h2 class="text-2xl font-bold mb-2">尚未登录</h2>
        <p class="text-white/80 mb-6">登录后查看个人信息和设置</p>
        <div class="flex gap-4 justify-center">
          <el-button 
            type="primary" 
            size="large" 
            class="bg-surface text-primary hover:bg-surface/90"
            @click="$emit('navigateTo', '/login')"
          >
            立即登录
          </el-button>
          <el-button 
            size="large" 
            class="border-on-primary text-on-primary hover:bg-white/10"
            @click="$emit('navigateTo', '/signup')"
          >
            注册账号
          </el-button>
        </div>
      </div>

      <!-- 已登录状态 -->
      <div v-else-if="userStore.user" class="flex items-center">
        <div class="flex items-center flex-1">
          <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mr-6">
            <Icon v-if="!userStore.user.avatar" name="material-symbols:person" class="text-4xl" />
            <img 
              v-else 
              :src="userStore.user.avatar" 
              :alt="userStore.user.nickname"
              class="w-full h-full rounded-full object-cover"
            />
          </div>
          <div class="flex-1">
            <h2 class="text-2xl font-bold mb-1">{{ userStore.user.nickname }}</h2>
            <p class="text-white/80 text-sm">{{ userStore.user.email }}</p>
            <p class="text-white/60 text-xs mt-1">
              加入时间：{{ formatDate(userStore.user.signup_time) }}
            </p>
          </div>
          <el-button 
            type="primary" 
            size="default"
            class="bg-white/20 hover:bg-white/30 border-on-primary"
            @click="$emit('editProfile')"
          >
            编辑资料
          </el-button>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-else class="text-center">
        <el-skeleton animated>
          <template #template>
            <div class="flex items-center">
              <el-skeleton-item variant="circle" class="w-20 h-20 mr-6" />
              <div class="flex-1">
                <el-skeleton-item variant="text" class="w-48 h-8 mb-2" />
                <el-skeleton-item variant="text" class="w-32 h-4 mb-1" />
                <el-skeleton-item variant="text" class="w-24 h-3" />
              </div>
            </div>
          </template>
        </el-skeleton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()

defineEmits<{
  navigateTo: [path: string]
  editProfile: []
}>()

// 格式化日期
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN')
}
</script>