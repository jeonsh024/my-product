import axios, { AxiosResponse, CancelTokenSource, InternalAxiosRequestConfig } from 'axios'

// 환경변수 설정
const BASE_URL = import.meta.env.VITE_APP_BASE_URL
export const BASE_API_URL = `${BASE_URL}/api`

// 요청 취소 관리용
const executingRequests: Record<string, CancelTokenSource> = {}

// axios 인스턴스 생성
export const instance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'x-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
})

// ✅ 요청 인터셉터
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      if (typeof config.headers?.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`)
      } else if (config.headers) {
        // fallback for plain object
        config.headers['Authorization'] = `Bearer ${token}`
      } else {
        config.headers = { Authorization: `Bearer ${token}` }
      }
    }

    const url = config.url || ''
    if (executingRequests[url]) {
      executingRequests[url].cancel('중복 요청 취소됨')
      delete executingRequests[url]
    }

    const source = axios.CancelToken.source()
    config.cancelToken = source.token
    executingRequests[url] = source

    return config
  },
  (error) => Promise.reject(error),
)

// ✅ 응답 인터셉터
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const url = response.config.url || ''
    delete executingRequests[url]
    return response
  },
  (error) => {
    const url = error.config?.url || ''
    delete executingRequests[url]

    if (axios.isCancel(error)) {
      console.warn('요청이 취소되었습니다:', error.message)
      return new Promise(() => {}) // 아무것도 하지 않음
    }

    if (error.response) {
      return Promise.reject(error.response)
    } else {
      return Promise.reject(error.message)
    }
  },
)
