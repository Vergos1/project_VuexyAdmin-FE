import { createSlice } from '@reduxjs/toolkit'

import { categoriesApi } from './categoriesApi'

export type UserStateTypes = {
  categories: any
  category: any
}

const initialState: UserStateTypes = {
  categories: [],
  category: {}
}

const categoriesSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.category = action.payload
    },

    setSelectedSubcategory: (state, action) => {
      state.category = { ...state.category, selectedSubcategory: action.payload }
    }
  },
  extraReducers: builder => {
    //FULFILLED MATCHERS
    builder.addMatcher(categoriesApi.endpoints.getCategories.matchFulfilled, (state, { payload }) => {
      state.categories = payload || []
    })
    builder.addMatcher(categoriesApi.endpoints.getCategoryById.matchFulfilled, (state, { payload }) => {
      console.log('payload', payload)
      state.category = payload
    })
    builder.addMatcher(categoriesApi.endpoints.updateCategory.matchFulfilled, (state, { payload }) => {
      console.log('payload', payload)
    })
    builder.addMatcher(categoriesApi.endpoints.deleteCategory.matchFulfilled, (state, { payload }) => {
      console.log('payload', payload)
    })
    builder.addMatcher(categoriesApi.endpoints.createCategory.matchFulfilled, (state, { payload }) => {
      console.log('payload', payload)
    })

    //REJECTED MATCHERS
    builder.addMatcher(categoriesApi.endpoints.getCategories.matchRejected, (state, { payload }) => {
      console.error('Error loading users:', payload)
    })
    builder.addMatcher(categoriesApi.endpoints.getCategoryById.matchRejected, (state, { payload }) => {
      console.error('Error loading user:', payload)
    })
    builder.addMatcher(categoriesApi.endpoints.updateCategory.matchRejected, (state, { payload }) => {
      console.error('Error updating user:', payload)
    })
    builder.addMatcher(categoriesApi.endpoints.deleteCategory.matchRejected, (state, { payload }) => {
      console.error('Error deleting user:', payload)
    })
    builder.addMatcher(categoriesApi.endpoints.createCategory.matchRejected, (state, { payload }) => {
      console.error('Error creating user:', payload)
    })
  }
})

// Actions
export const { setSelectedCategory, setSelectedSubcategory } = categoriesSlice.actions

// Selectors
export const selectCategoryById = (state: { categories: UserStateTypes }, id: string) =>
  state.categories.categories.find((category: any) => category.id === id)

export default categoriesSlice.reducer
