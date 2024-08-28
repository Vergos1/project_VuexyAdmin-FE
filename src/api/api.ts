import axios from 'axios'
import Cookies from 'js-cookie'

import authService from './services/auth'
import userManagementService from './services/usersManagement'
import contentManagementService from './services/contentManagement'

// export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const API_URL = 'https://c846-91-196-178-221.ngrok-free.app'

export const TOKEN = Cookies.get('jwt')

export const AXIOS_INSTANCE = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

AXIOS_INSTANCE.interceptors.request.use(config => {
  const token = Cookies.get('jwt') || ''

  config.headers.Authorization = `Bearer ${token}`

  return config
})

const api = {
  auth: authService,
  usersManagement: userManagementService,
  contentManagement: contentManagementService
}

export default api
