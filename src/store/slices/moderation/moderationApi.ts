import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from '../baseQuery'

export const moderationApi = createApi({
  reducerPath: 'moderationApi',
  baseQuery,
  tagTypes: ['Post'],
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => ({
        url: 'posts',
        method: 'GET'
      }),
      providesTags: ['Post']
    }),
    getPostInfoById: builder.query({
      query: (id: string) => ({
        url: `post/${id}`,
        method: 'GET'
      })
    }),
    changePostStatusById: builder.mutation({
      query: (id: string) => ({
        url: `post/status/${id}`,
        method: 'POST'
      }),
      invalidatesTags: ['Post']
    })
  })
})

export const { useGetPostsQuery, useLazyGetPostInfoByIdQuery, useChangePostStatusByIdMutation } = moderationApi
