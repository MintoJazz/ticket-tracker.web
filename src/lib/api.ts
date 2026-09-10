import axios from 'axios'
import { failed, success, type Result } from '@/types/result'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true
})

api.interceptors.response.use(
  (response) => response,

  (error) => {
    return Promise.reject({
      status: error.response?.status,
      data: error.response?.data,
      code: error.code,
      message: error.message,
    })
  },
)

export async function request<T>(
  request: Promise<{ data: T }>,
): Promise<Result<T>> {
  try {
    const response = await request

    return success(response.data)
  } catch (error) {
    return failed(error)
  }
}
