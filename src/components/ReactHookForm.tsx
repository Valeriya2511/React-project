import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store'
import { setReactHookFormData } from '../redux/reducers'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import style from '../styles/ReactHookForm.module.css'

type FormValues = {
  name: string
  age: number
  email: string
  password: string
  confirmPassword: string
  gender: 'male' | 'female'
  termsAccepted: boolean
  image: FileList
  country: string
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(/^[A-Z]/, 'Name must start with a capital letter'),
  age: yup
    .number()
    .typeError('Enter your age')
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),
  email: yup
    .string()
    .email()
    .required()
    .oneOf([yup.ref('confirmEmail')], 'Email is not valid'),
  password: yup
    .string()
    .required()
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])/,
      'Password must be strong'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
  gender: yup.string().oneOf(['male', 'female']).required(),
  termsAccepted: yup.boolean().oneOf([true], 'You must accept the terms'),
  image: yup
    .mixed()
    .test('fileSize', 'The file is too large', (value) => {
      if (value && value[0]) {
        return value[0].size <= 2 * 1024 * 1024
      }
      return true
    })
    .test('fileType', 'Unsupported File Format', (value) => {
      if (value && value[0]) {
        return ['image/png', 'image/jpeg'].includes(value[0].type)
      }
      return true
    }),
  country: yup.string().required(),
})

function ReactHookForm() {
  const dispatch = useDispatch<AppDispatch>()
  const countries = useSelector((state: RootState) => state.formData.countries)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setReactHookFormData(data))
  }

  const imagePreview = watch('image')?.[0]
    ? URL.createObjectURL(watch('image')[0])
    : ''

  return (
    <form className={style.react_hook_form} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" {...register('name')} />
      {errors.name && (
        <p className={style.message_error}>{errors.name.message}</p>
      )}

      <label htmlFor="age">Age:</label>
      <input type="number" id="age" {...register('age')} />
      {errors.age && (
        <p className={style.message_error}>{errors.age.message}</p>
      )}

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" {...register('email')} />
      {errors.email && (
        <p className={style.message_error}>{errors.email.message}</p>
      )}

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" {...register('password')} />
      {errors.password && (
        <p className={style.message_error}>{errors.password.message}</p>
      )}

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        {...register('confirmPassword')}
      />
      {errors.confirmPassword && (
        <p className={style.message_error}>{errors.confirmPassword.message}</p>
      )}

      <label htmlFor="gender">Gender:</label>
      <select id="gender" {...register('gender')}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && (
        <p className={style.message_error}>{errors.gender.message}</p>
      )}

      <label htmlFor="terms">Accept Terms & Conditions:</label>
      <input type="checkbox" id="terms" {...register('termsAccepted')} />
      {errors.termsAccepted && (
        <p className={style.message_error}>{errors.termsAccepted.message}</p>
      )}

      <label htmlFor="image">Upload Image:</label>
      <input type="file" id="image" {...register('image')} />
      {imagePreview && <img src={imagePreview} alt="Preview" width={100} />}
      {errors.image && (
        <p className={style.message_error}>{errors.image.message}</p>
      )}

      <label htmlFor="country">Country:</label>
      <select id="country" {...register('country')}>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      {errors.country && (
        <p className={style.message_error}>{errors.country.message}</p>
      )}

      <button type="submit">Submit</button>
    </form>
  )
}
export default ReactHookForm
