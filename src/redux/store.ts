import { configureStore } from '@reduxjs/toolkit'
import formReducer from './reducers'

const store = configureStore({
  reducer: {
    formData: formReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store