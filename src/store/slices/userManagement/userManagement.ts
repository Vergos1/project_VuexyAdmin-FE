import { createSlice } from '@reduxjs/toolkit'

import { userManagementApi } from './userManagementApi'

export type UserManagementTypes = {
  users: any
  user: any
}

const initialState: UserManagementTypes = {
  users: [],
  user: {}
}

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //FULFILLED MATCHERS
    builder.addMatcher(userManagementApi.endpoints.getUsers.matchFulfilled, (state, { payload }) => {
      state.users = payload || []
    })
    builder.addMatcher(userManagementApi.endpoints.getUserInfoById.matchFulfilled, (state, { payload }) => {
      console.log('payload', payload)
      state.user = payload
    })
    builder.addMatcher(userManagementApi.endpoints.changeUserStatusById.matchFulfilled, (state, { payload }) => {
      console.log('payload', payload)
    })

    //REJECTED MATCHERS
    builder.addMatcher(userManagementApi.endpoints.getUsers.matchRejected, (state, { error }) => {
      console.error('Error loading users:', error)
      state.users = []
    })
  }
})

export default userManagementSlice.reducer
