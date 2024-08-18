import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
})
