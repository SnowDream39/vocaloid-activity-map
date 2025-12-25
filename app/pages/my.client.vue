<template>
  <div class="bg-background">
    <!-- 用户信息头部 -->
    <UserProfileHeader 
      :user-store="userStore"
      @navigate-to="handleNavigate"
      @edit-profile="showEditDialog = true"
    />

    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-8">
      <div v-if="userStore.isAuthenticated && userStore.user" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧：用户信息卡片 -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 统计信息 -->
          <ActivityStats :stats="activityStats" />

          <!-- 最近活动 -->
          <RecentActivities 
            :activities="recentActivities"
            @activity-click="handleActivityClick"
          />
        </div>

        <!-- 右侧：设置菜单 -->
        <div class="space-y-6">
          <AccountSettings 
            @change-password="showPasswordDialog = true"
            @privacy-settings="showPrivacySettings = true"
            @notification-settings="showNotificationSettings = true"
            @help-center="handleHelpCenter"
            @logout="handleLogout"
          />
        </div>
      </div>

      <!-- 未登录时的提示 -->
      <div v-else class="text-center py-16">
        <div class="inline-flex items-center justify-center w-24 h-24 bg-surface-variant rounded-full mb-6">
          <Icon name="material-symbols:lock" class="text-4xl text-on-surface-variant" />
        </div>
        <h3 class="text-xl font-semibold text-on-surface mb-2">请先登录</h3>
        <p class="text-on-surface-variant mb-6">登录后即可查看个人中心和设置</p>
        <el-button 
          type="primary" 
          size="large"
          @click="navigateTo('/login')"
        >
          立即登录
        </el-button>
      </div>
    </div>

    <!-- 编辑资料对话框 -->
    <EditProfileDialog
      v-model:visible="showEditDialog"
      :user="userStore.user"
      :loading="saving"
      @save="handleSaveProfile"
      @cancel="handleCancelEdit"
    />

    <!-- 修改密码对话框 -->
    <ChangePasswordDialog
      v-model:visible="showPasswordDialog"
      :loading="saving"
      @save="handleUpdatePassword"
      @cancel="handleCancelPassword"
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { updateProfile, changePassword, logout } from '~/api/core/user.client'

// 页面元信息
definePageMeta({
  title: '个人中心'
})

// 用户 store
const userStore = useUserStore()

// 对话框状态
const showEditDialog = ref(false)
const showPasswordDialog = ref(false)
const showPrivacySettings = ref(false)
const showNotificationSettings = ref(false)

// 加载状态
const saving = ref(false)

// 活动统计数据
const activityStats = reactive({
  participated: 12,
  favorited: 5,
  created: 3,
  likes: 8
})

// 最近活动数据
const recentActivities = ref([
  {
    id: 1,
    title: '术力口演唱会 #1',
    date: '2024-01-15',
    location: '北京'
  },
  {
    id: 2,
    title: '术力口演唱会 #2',
    date: '2024-02-15',
    location: '上海'
  },
  {
    id: 3,
    title: '术力口演唱会 #3',
    date: '2024-03-15',
    location: '广州'
  }
])


// 处理导航
const handleNavigate = (path: string) => {
  navigateTo(path)
}

// 处理活动点击
const handleActivityClick = (activity: any) => {
  console.log('活动点击:', activity)
  // 这里可以跳转到活动详情页
}

// 处理帮助中心
const handleHelpCenter = () => {
  console.log('打开帮助中心')
  // 这里可以跳转到帮助中心页面
}

// 保存个人资料
const handleSaveProfile = async (userData: any) => {
  if (!userData.nickname.trim()) {
    ElMessage.error('昵称不能为空')
    return
  }

  saving.value = true
  
  try {
    await updateProfile({
      nickname: userData.nickname,
      avatar: userData.avatar
    })
    
    ElMessage.success('个人资料更新成功')
    showEditDialog.value = false
  } catch (error) {
    ElMessage.error('更新失败，请重试')
  } finally {
    saving.value = false
  }
}

// 取消编辑资料
const handleCancelEdit = () => {
  showEditDialog.value = false
}

// 修改密码
const handleUpdatePassword = async (passwordData: any) => {
  saving.value = true
  
  try {
    await changePassword({
      current_password: passwordData.currentPassword,
      new_password: passwordData.newPassword
    })
    
    ElMessage.success('密码修改成功')
    showPasswordDialog.value = false
  } catch (error) {
    ElMessage.error('密码修改失败，请检查当前密码')
  } finally {
    saving.value = false
  }
}

// 取消修改密码
const handleCancelPassword = () => {
  showPasswordDialog.value = false
}

// 退出登录
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    await logout()
    ElMessage.success('已退出登录')
  } catch {
    // 用户取消操作
  }
}
</script>

