import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { LoginResponse } from '@/types/authTypes'
import { baseQuery } from '../baseQuery'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
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
    getAuthStatus: builder.query<LoginResponse, { token: string }>({
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

export const { useLoginMutation, useGetAuthStatusQuery, endpoints } = authApi
