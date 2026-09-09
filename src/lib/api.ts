import axios from 'axios'
import { failed, success, type Result } from '@/types/result'

const publicRoutes = [
  '/auth/login',
  '/auth/register',
]

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  if (publicRoutes.includes(config.url ?? '')) {
    return config
  }

  const token = localStorage.getItem('token')

  if (!token) {
    return Promise.reject({
      code: 'AUTH_TOKEN_MISSING',
      message: 'Token não encontrado',
    })
  }

  config.headers.Authorization = `Bearer ${token}`

  return config
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
