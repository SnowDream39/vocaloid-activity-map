import axios from "axios";
import * as luxon from 'luxon';

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
  get: (id: number) => `/activity/id/${id}`,
  getByOwner: `/activity/by_owner`,
  getByParticipant: `/activity/by_participant`,
  getNearby: `/activity/nearby`,
  search: `/activity/search`,
  create: `/activity/create`,
  join: (activity_id: number) => `/activity/join/${activity_id}`,
  leave: (activity_id: number) => `/activity/leave/${activity_id}`,
}


// ========== 获取相关接口 ===========

export async function getAll(): Promise<Activity[]> {
  const response = await api.get(endpoints.getAll)
  return response.data.map(formatReadActivity)

}
export async function getById(id: number): Promise<Activity> {
  const response = await api.get(endpoints.get(id))
  return response.data
}

export async function getByOwner(user_id: number): Promise<Activity[]> {
  const response = await api.get(endpoints.getByOwner, {
    params: { user_id }
  })
  return response.data.map(formatReadActivity)
}

export async function getByParticipant(user_id: number): Promise<Activity[]> {
  const response = await api.get(endpoints.getByParticipant, {
    params: { user_id }
  })
  return response.data.map(formatReadActivity)
}

export async function getNearby(lon: number, lat: number, distance: number, page: number = 1, page_size: number = 20): Promise<Activity[]> {
  const response = await api.get(endpoints.getNearby, {
    params: { lon, lat, distance, page, page_size }
  })
  return response.data.map(formatReadActivity)
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

export async function join(activity_id: number): Promise<void> {
  await api.post(endpoints.join(activity_id))
}

export async function leave(activity_id: number): Promise<void> {
  await api.post(endpoints.leave(activity_id))
}
