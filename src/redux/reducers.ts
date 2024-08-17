import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface FormData {
  uncontrolledData: {
    name?: string
    age?: number
    email?: string
    password?: string
    confirmPassword?: string
    gender?: 'male' | 'female'
    termsAccepted?: boolean
    image?: string
    country?: string
  }
  reactHookFormData: {
    name?: string
    age?: number
    email?: string
    password?: string
    confirmPassword?: string
    gender?: 'male' | 'female'
    termsAccepted?: boolean
    image?: string
    country?: string
  }
  countries: string[]
}

const initialState: FormData = {
  uncontrolledData: {},
  reactHookFormData: {},
  countries: [],
}

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setUncontrolledData(
      state,
      action: PayloadAction<FormData['uncontrolledData']>
    ) {
      state.uncontrolledData = action.payload
    },
    setReactHookFormData(
      state,
      action: PayloadAction<FormData['reactHookFormData']>
    ) {
      state.reactHookFormData = action.payload
    },
    setCountries(state, action: PayloadAction<string[]>) {
      state.countries = action.payload
    },
  },
})

export const { setUncontrolledData, setReactHookFormData, setCountries } =
  formSlice.actions
export default formSlice.reducer
