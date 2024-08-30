// Third-party Imports
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// Middleware Imports
import authMiddleware from './middleware/authMiddleware'

// API Imports
import { authApi } from './slices/auth/authApi'
import { userManagementApi } from './slices/userManagement/userManagementApi'
import { moderationApi } from './slices/moderation/moderationApi'

// Slice Imports
import authSlice from './slices/auth/auth'
import userManagementSlice from './slices/userManagement/userManagement'
import moderationSlice from './slices/moderation/moderation'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userManagementApi.reducerPath]: userManagementApi.reducer,
    [moderationApi.reducerPath]: moderationApi.reducer,
    auth: authSlice,
    user: userManagementSlice,
    moderation: moderationSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      userManagementApi.middleware,
      moderationApi.middleware
    ),
  devTools: true
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
