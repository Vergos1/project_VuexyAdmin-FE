import { createSlice } from '@reduxjs/toolkit'

import { userManagementApi } from './userManagementApi'

export type UserStateTypes = {
  users: any
}

const initialState: UserStateTypes = {
  users: []
}

const userManagementSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(userManagementApi.endpoints.getUsers.matchFulfilled, (state, { payload }) => {
      state.users = payload || []
    })

    builder.addMatcher(userManagementApi.endpoints.getUsers.matchRejected, (state, { error }) => {
      console.error('Error loading users:', error)
      state.users = []
    })
  }
})

export default userManagementSlice.reducer
