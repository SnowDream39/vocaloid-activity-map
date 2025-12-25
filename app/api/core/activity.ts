import axios from "axios";
import * as luxon from 'luxon';

const api = axios.create({
  baseURL: import.meta.dev ? 'http://localhost:8000' : useRuntimeConfig().public.apiBaseUrl,
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
const endpoints = {
  getAll: `/activity/all`,
  getById: (id: number) => `/activity/id/${id}`
}


function formatActivity(activity: any): Activity {
  return {
    ...activity,
    start_time: luxon.DateTime.fromISO(activity.start_time),
    end_time: luxon.DateTime.fromISO(activity.end_time),
  }
}

export async function getAll(): Promise<Activity[]> {
  const response = await api.get(endpoints.getAll)
  return response.data.map(formatActivity)

}
export async function getById(id: number): Promise<Activity> {
  const response = await api.get(endpoints.getById(id))
  return response.data
}