import axios from 'axios'

interface UserLogin {
  email: string
  password: string
}

interface UserRegister {
  email: string
  password: string
  nickname: string
}

interface UpdateProfileData {
  nickname?: string
  avatar?: string
}

interface ChangePasswordData {
  current_password: string
  new_password: string
}

function getApi() {
  const api = axios.create({
    baseURL: useRuntimeConfig().public.apiBaseUrl,
    withCredentials: true
  })
  return api
}

export const login = async (form: UserLogin) => {
  const api = getApi()

  if (import.meta.dev) {
    const response = await api.post('/auth/jwt/login', {
      grant_type: 'password',
      username: form.email,
      password: form.password,
      scope: '',
      client_id: 'string',
      client_secret: '********'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    })
    const access_token = response.data.access_token
    localStorage.setItem('access_token', access_token)
    return access_token
  } else {
    const response = await api.post('/auth/jwt-cookie/login',  {
      grant_type: 'password',
      username: form.email,
      password: form.password,
      scope: '',
      client_id: 'string',
      client_secret: '********'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      withCredentials: true, // ✅ 让浏览器带上/保存 Cookie
    })
    return response.data.access_token
  }
}

// 注册：同样启用 withCredentials，注册成功后后端可自动设置 Cookie
export const register = async (form: UserRegister) => {
  const api = getApi()
  const response = await api.post(
    '/auth/register',
    {
      email: form.email,
      password: form.password,
      nickname: form.nickname,
    },
    { withCredentials: true }, // ✅ 让浏览器保存 Cookie
  )

  return response.data
}

// 获取当前用户信息
export const fetchUserInfo = async () => {
  try {
    const config: any = { headers: {} }
    if (import.meta.dev) {
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token')
      config.withCredentials = false
    } else {
      config.withCredentials = true
    }
    const api = getApi()
    const response = await api.get('/users/me', config)
    const userStore = useUserStore()
    userStore.setUser(response.data)
    return response.data
  } catch (error) {
    console.error('获取用户信息失败:', error)
    throw error
  }
}

// 更新用户资料
export const updateProfile = async (updates: UpdateProfileData) => {
  const api = getApi()
  try {
    const response = await api.put('/user/profile', updates)
    const userStore = useUserStore()
    userStore.updateUser(response.data)
    return response.data
  } catch (error) {
    console.error('更新用户资料失败:', error)
    throw error
  }
}

// 修改密码
export const changePassword = async (passwordData: ChangePasswordData) => {
  const api = getApi()
  try {
    await api.post('/user/password', passwordData)
  } catch (error) {
    console.error('修改密码失败:', error)
    throw error
  }
}

// 登出
export const logout = async () => {
  const api = getApi()
  try {
    await api.post('/auth/logout')
    const userStore = useUserStore()
    userStore.clearUser()
  } catch (error) {
    console.error('登出失败:', error)
    // 即使API调用失败，也要清除本地状态
    const userStore = useUserStore()
    userStore.clearUser()

  }
}
