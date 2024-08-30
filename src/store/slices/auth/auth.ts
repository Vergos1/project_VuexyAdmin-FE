// Third-party Imports
import { createSlice } from '@reduxjs/toolkit'
import { setCookie, deleteCookie } from 'cookies-next'

import { authApi } from './authApi'

const setAuthCookie = (token: string, name: string) => {
  const toBase64 = Buffer.from(token).toString('base64')

  setCookie(name, toBase64, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/'

    //? more security options here
    // sameSite: 'strict',
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  })
}

export type AuthStateTypes = {
  user: null | object
  token: null | string
}

const initialState: AuthStateTypes = {
  user: {},
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      deleteCookie('auth_token')
      localStorage.removeItem('user')

      //? clear the auth slice data
      state.user = null
      state.token = null
    }
  },
  extraReducers: builder => {
    builder

      //FULFILLED MATCHERS
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        //? set the token in the cookies
        //? store the user data in the store
        //? "mutation" also works
        setAuthCookie(payload.token, 'auth_token')
        localStorage.setItem('user', JSON.stringify(payload.user))
        state.user = payload.user
        state.token = payload.token
      })
      .addMatcher(authApi.endpoints.getAuthStatus.matchFulfilled, (state, { payload }) => {
        //? in case we receive a new token when refetching the details
        // setAuthCookie(payload.token, 'auth_token')
        // state.user = payload.user
        // state.token = payload.token
      })

      //REJECTED MATCHERS
      .addMatcher(authApi.endpoints.login.matchRejected, (state, { error }) => {
        console.error('Login failed:', error)
        console.log('error', error)
      })
      .addMatcher(authApi.endpoints.getAuthStatus.matchRejected, (state, { error }) => {
        console.error('Get auth status failed:', error)
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
