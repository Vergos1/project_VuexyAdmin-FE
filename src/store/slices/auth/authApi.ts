import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { LoginResponse } from '@/types/authTypes'
import { BASE_API_URL } from '@/utils/constants'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL
  }),
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: {
          email,
          password
        }
      })
    }),
    getAuthStatus: builder.query<LoginResponse, { token: string; user: object | string }>({
      query: ({ token }) => ({
        url: 'auth/status',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    })
  })
})

export const { useLoginMutation, useGetAuthStatusQuery } = authApi
