import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000
});




api.interceptors.request.use(
  (config) => {
    // 开发环境下，如果有 localStorage token，也带上
    if (import.meta.dev && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('access_token')
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
  getCategories: `/tag/category`,
  getPopular: `/tag/popular`,
  searchArtist: `/tag/search_artist`,
  createArtist: `/tag/create_artist`,
}


// ========== 获取相关接口 ===========

export async function getCategories(): Promise<Tag[]> {
  const response = await api.get(endpoints.getCategories)
  return response.data
}

export async function getArtists(): Promise<Tag[]> {
  const response = await api.get(endpoints.getPopular)
  return response.data
}

export async function searchArtists(keyword: string): Promise<Tag[]> {
  const response = await api.get(endpoints.searchArtist, {
    params: {
      keyword
    }
  })
  return response.data
}

// =========== 编辑相关接口 ===========

export async function createArtist(artist: string): Promise<any> {
  const response = await api.post(endpoints.createArtist, {
    name: artist
  })
  return response.data
}