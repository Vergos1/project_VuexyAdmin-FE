import { AXIOS_INSTANCE } from '../api'

const BASE_URL = 'auth'

const authService = {
  async checkStatus() {
    return await AXIOS_INSTANCE.get(`${BASE_URL}/status`)
  },
  async registration({ username, password, email, rememberMe, refCode }: any) {
    return await AXIOS_INSTANCE.post(`${BASE_URL}/signup?refCode=${refCode}`, {
      username,
      password,
      email,
      rememberMe
    })
  },
  async login({ username, password, rememberMe }: any) {
    return await AXIOS_INSTANCE.post(`${BASE_URL}/login`, {
      username,
      password,
      rememberMe
    })
  },
  async forgotPassword(email: string) {
    return await AXIOS_INSTANCE.post(`${BASE_URL}/forgot-password`, {
      email
    })
  },
  async checkResetCode({ resetCode, email }: any) {
    return await AXIOS_INSTANCE.post(`${BASE_URL}/verify-reset-code`, {
      email,
      resetCode
    })
  },
  async resetPassword({ email, newPassword, resetCode }: any) {
    return await AXIOS_INSTANCE.post(`${BASE_URL}/reset-password`, {
      email,
      newPassword,
      resetCode
    })
  }
}

export default authService
