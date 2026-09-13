import { configureStore } from '@reduxjs/toolkit'
import UsersSlice from './UsersSlice'
import type { RootState } from '../types'

const store = configureStore({
  reducer: {
    Users:UsersSlice
  }
})

export type AppDispatch = typeof store.dispatch
export type { RootState }

export default store
