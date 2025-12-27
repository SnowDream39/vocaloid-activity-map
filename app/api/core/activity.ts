import axios from "axios";
import * as luxon from 'luxon';

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

function formatReadActivity(activity: any): Activity {
  return {
    ...activity,
    start_time: luxon.DateTime.fromISO(activity.start_time),
    end_time: luxon.DateTime.fromISO(activity.end_time),
  }
}

function formatCreateActivity(activity: ActivityCreate): any {
  return {
    ...activity,
    start_time: activity.start_time.toISO(),
    end_time: activity.end_time.toISO(),
  }
}

// ==========  API路由 ==============

const endpoints = {
  getAll: `/activity/all`,
  getById: (id: number) => `/activity/id/${id}`,
  search: `/activity/search`,
  create: `/activity/create`,
}


// ========== 获取相关接口 ===========

export async function getAll(): Promise<Activity[]> {
  const response = await api.get(endpoints.getAll)
  return response.data.map(formatReadActivity)

}
export async function getById(id: number): Promise<Activity> {
  const response = await api.get(endpoints.getById(id))
  return response.data
}
export async function search(
  keywords: string,
  tag_ids: number[],
  max_member_gt: number | null,
  max_member_lt: number | null,
  time_begin: luxon.DateTime | null,
  time_end: luxon.DateTime | null,
  page: number,
  page_size: number
): Promise<Activity[]> {
  const response = await api.get(endpoints.search, {
    params: { 
      keywords, 
      tag_ids, 
      max_member_gt, 
      max_member_lt, 
      time_begin: time_begin?.toISO(), 
      time_end: time_end?.toISO(), 
      page, 
      page_size
    }
  })
  return response.data.map(formatReadActivity)
}


// ============= 上传接口 =================

interface ActivityCreate {
  name: string;
  description: string;
  start_time: luxon.DateTime;
  end_time: luxon.DateTime;
  max_member: number;
  position: {lon: number, lat: number};
  location: string;
  tags: number[];
}

export async function create(activity: ActivityCreate): Promise<Activity> {
  const response = await api.post(endpoints.create, formatCreateActivity(activity))
  return formatReadActivity(response.data)
}