import { defineStore } from 'pinia'

export interface UserInfo {
  id: number
  email: string
  avatar?: string
  nickname: string
  signup_time: string
}

export const useUserStore = defineStore('user', () => {

  const user = ref<UserInfo | null>(null)
  const isAuthenticated = computed(() => !!user.value)
  
  // 设置用户信息
  const setUser = (userInfo: UserInfo) => {
    user.value = userInfo
  }

  // 更新用户信息（部分更新）
  const updateUser = (updates: Partial<UserInfo>) => {
    if (user.value) {
      user.value = { ...user.value, ...updates }
    }
  }

  // 清除用户信息
  const clearUser = () => {
    user.value = null
  }

  // ------------------
  // 返回值
  // ------------------
  return {
    // 状态
    user,
    
    // 计算属性
    isAuthenticated,

    // 状态管理方法
    setUser,
    updateUser,
    clearUser,

    // 额外提供 $state 给 Devtools
    $state: { user }
  }
})
