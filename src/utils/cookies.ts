import { getCookie } from 'cookies-next'

//? helpers to get cookies
const getAuthCookie = (name: string) => {
  const cookie = getCookie(name)

  if (!cookie) return undefined

  return Buffer.from(cookie, 'base64').toString('ascii')
}

export const getValidAuthTokens = () => {
  const token = getAuthCookie('auth_token')

  if (!token) return { token: undefined }

  console.log('Auth token:', token)

  return { token }

  //? this will be used to check if the token is valid
  //const now = new Date()
  //const tokenDate = new Date(token || 0)
  //return {
  //token: now < tokenDate ? token : undefined
  //}
}
