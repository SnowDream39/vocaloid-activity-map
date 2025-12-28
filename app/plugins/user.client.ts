import * as api from '~/api/core/user.client'

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()
  
  try {
    // 无论开发还是生产环境，都尝试获取用户信息
    // 生产环境会自动发送 cookie，开发环境如果有 localStorage token 也会发送
    const userInfo = await api.fetchUserInfo()
    userStore.setUser(userInfo)
  } catch (error) {
    console.log('用户未登录或获取用户信息失败:', error)
    // 这里不抛出错误，只是用户未登录状态
  }
  
  return {
    provide: {
      userApi: api
    }
  }
})