import { createApi } from '@reduxjs/toolkit/query/react'

import type { MetaType, UsersListType } from './../../../types/userTypes'

import { baseQuery } from '../baseQuery'

export interface UsersResponse {
  data: UsersListType[] | []
  meta: MetaType | {}
}

export const userManagementApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: builder => ({
    getUsers: builder.query({
      query: ({ page, limit, search, subscriptionType, categories, status, favoritesFilter }) => {
        //? Фільтруємо порожні параметри
        const params = {
          page,
          limit,
          search,
          ...(subscriptionType && { subscriptionType }),
          ...(favoritesFilter && { favoritesFilter }),
          ...(categories && categories.length > 0 && { categories }),
          ...(status && { status })
        }

        if (categories && categories.length > 0) {
          categories.forEach((category: string, index: number) => {
            params[`categories[${index}]`] = category
          })
        }

        return {
          url: 'users',
          method: 'GET',
          params
        }
      },
      providesTags: ['User'],
      transformResponse: (response: UsersResponse) => ({
        data: response ? response.data : [],
        meta: response ? response.meta : {}
      })
    }),
    getUsersListCSV: builder.query({
      query: ({ page, limit, search, subscriptionType, categories, status, favoritesFilter }) => {
        //? Фільтруємо порожні параметри
        const params = {
          page,
          limit,
          search,
          ...(subscriptionType && { subscriptionType }),
          ...(favoritesFilter && { favoritesFilter }),
          ...(status && { status }),
          ...(categories && categories.length > 0 && { categories })
        }

        return {
          url: 'users/export',
          method: 'GET',
          responseHandler: 'text',
          params
        }
      },
      transformResponse: (response: string) => response
    }),
    getUserInfoById: builder.query({
      query: (id: string) => ({
        url: `users/${id}`,
        method: 'GET'
      })
    }),
    changeUserStatusById: builder.mutation({
      query: (id: string) => ({
        url: `users/status/${id}`,
        method: 'POST'
      }),
      invalidatesTags: ['User']
    })
  })
})

export const {
  useGetUsersQuery,
  useGetUsersListCSVQuery,
  useLazyGetUsersQuery,
  useLazyGetUserInfoByIdQuery,
  useChangeUserStatusByIdMutation
} = userManagementApi
