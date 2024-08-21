// Third-party Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import type { PayloadAction } from '@reduxjs/toolkit'

import api from '../../api/api'

export type AuthStateTypes = {
  user: null | object
  token: null | string
  isLoading: false | true
  error: null | string | undefined
}

const initialState: AuthStateTypes = {
  user: null,
  token: Cookies.get('jwt') || null,
  isLoading: false,
  error: null
}

const authSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
      Cookies.set('jwt', action.payload, { expires: 1 }) // записуємо токен JWT в кукі на 1 день
      console.log(Cookies.get('jwt'))
    },
    logout: (state: AuthStateTypes) => {
      Cookies.remove('jwt')
      state.user = null
      state.token = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.isLoading = true
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        Cookies.set('jwt', action.payload.token, { expires: 1 }) // записуємо токен JWT в кукі на 1 день
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await api.auth.login({ email, password })
      const token = response.data.token

      Cookies.set('jwt', token, { expires: 1 })

      return response.data.user
    } catch (error) {
      throw error
    }
  }
)

export const { setToken, logout } = authSlice.actions
export default authSlice.reducer
