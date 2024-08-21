// Third-party Imports
import { configureStore } from '@reduxjs/toolkit'

// Slice Imports
import authSlice from './slices/auth'

// import calendarReducer from '@/redux-store/slices/calendar'
// import kanbanReducer from '@/redux-store/slices/kanban'
// import emailReducer from '@/redux-store/slices/email'

export const store = configureStore({
  reducer: {
    authSlice

    // chatReducer,
    // calendarReducer,
    // kanbanReducer,
    // emailReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
