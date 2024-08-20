import axios from 'axios'

import authService from './services/auth'
import userManagementService from './services/usersManagement'

export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const TOKEN = localStorage.getItem('TOKEN') || sessionStorage.getItem('TOKEN')

console.log('AUTHORIZE TOKEN:', TOKEN ? TOKEN : 'NO TOKEN')

export const AXIOS_INSTANCE = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

AXIOS_INSTANCE.interceptors.request.use(config => {
  const token = localStorage.getItem('TOKEN') || sessionStorage.getItem('TOKEN')

  config.headers.Authorization = token ? `Bearer ${token}` : ''

  return config
})

const api = {
  auth: authService,
  usersManagement: userManagementService
}

export default api
