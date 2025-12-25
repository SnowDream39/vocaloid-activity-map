import * as api from '~/api/core/user.client'

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()
  const access_token = localStorage.getItem('access_token')
  if (access_token) {
    try {
      userStore.setUser(await api.fetchUserInfo())
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }
  }
  return {
    provide: {
      userApi: api
    }

  }
})