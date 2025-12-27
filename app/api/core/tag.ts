import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
});




api.interceptors.request.use(
  (config) => {
    if (import.meta.dev) {
      const  token = localStorage.getItem('access_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



// ==========  API路由 ==============


const endpoints = {
  getAll: `/tag/popular`
}


// ========== 获取相关接口 ===========

export async function getAll(): Promise<Tag[]> {
  const response = await api.get(endpoints.getAll)
  return response.data

}
