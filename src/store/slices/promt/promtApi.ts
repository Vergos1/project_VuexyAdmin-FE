import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from '../baseQuery'
import type { AiPrompt, CreateAiPromptRequest, UpdateAiPromptRequest } from '@/types/promtTypes'

export const promptApi = createApi({
  reducerPath: 'promptApi',
  baseQuery,
  tagTypes: ['Promts'],
  endpoints: builder => ({
    getAiPromts: builder.query<AiPrompt[], void>({
      query: () => ({
        url: 'aiprompts',
        method: 'GET'
      }),
      providesTags: ['Promts']
    }),
    getAiPromtsByType: builder.query<AiPrompt, string>({
      query: type => ({
        url: `aiprompts/${type}`,
        method: 'GET'
      }),
      providesTags: ['Promts']
    }),
    createAiPromts: builder.mutation<AiPrompt, CreateAiPromptRequest>({
      query: body => ({
        url: 'aiprompts',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Promts']
    }),
    updateAiPromts: builder.mutation<AiPrompt, UpdateAiPromptRequest & { type: string }>({
      query: ({ type, ...body }) => ({
        url: `aiprompts/${type}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['Promts']
    }),
    deleteAiPromts: builder.mutation<void, string>({
      query: type => ({
        url: `aiprompts/${type}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Promts']
    })
  })
})

export const {
  useGetAiPromtsQuery,
  useGetAiPromtsByTypeQuery,
  useCreateAiPromtsMutation,
  useUpdateAiPromtsMutation,
  useDeleteAiPromtsMutation
} = promptApi
