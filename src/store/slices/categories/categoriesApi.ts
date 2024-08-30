import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from '../baseQuery'

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery,
  endpoints: builder => ({
    getCategories: builder.query<any, void>({
      query: () => ({
        url: 'categories',
        method: 'GET'
      })
    }),
    createCategory: builder.mutation({
      query: (name: string, parentCategoryId?: string) => ({
        url: 'categories',
        method: 'POST',
        body: {
          name: name,
          parentCategoryId: parentCategoryId
        }
      })
    }),
    getCategoryById: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `/categories/${id}`,
        method: 'GET'
      })
    }),
    updateCategory: builder.mutation({
      query: ({ id, name, parentCategoryId }: { id: string; name: string; parentCategoryId?: string }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: {
          name: name,
          parentCategoryId: parentCategoryId
        }
      })
    }),
    deleteCategory: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/categories/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation
} = categoriesApi
