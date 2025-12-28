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