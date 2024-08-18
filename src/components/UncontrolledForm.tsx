import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store'
import { setUncontrolledData } from '../redux/reducers'
import style from '../styles/UncontrolledForm.module.css'

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const countries = useSelector((state: RootState) => state.formData.countries)

  const nameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const genderRef = useRef<HTMLSelectElement>(null)
  const termsRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const countryRef = useRef<HTMLSelectElement>(null)

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        alert('Invalid file type')
        return
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2 MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreview(reader.result as string)
          dispatch(setUncontrolledData({ image: reader.result as string }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (nameRef.current) {
      const name = nameRef.current.value
      if (!/^[A-Z][a-z]*$/.test(name)) {
        errors.name = 'Name must start with an uppercase letter'
      }
    }

    if (ageRef.current) {
      const age = parseInt(ageRef.current.value, 10)
      if (isNaN(age) || age <= 0) {
        errors.age = 'Age must be a positive number'
      }
    }

    if (emailRef.current) {
      const email = emailRef.current.value
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Invalid email address'
      }
    }

    if (passwordRef.current && confirmPasswordRef.current) {
      const password = passwordRef.current.value
      const confirmPassword = confirmPasswordRef.current.value
      if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{6,}/.test(password)) {
        errors.password =
          'Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character'
      }
      if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match'
      }
    }

    if (genderRef.current) {
      const gender = genderRef.current.value
      if (!['male', 'female'].includes(gender)) {
        errors.gender = 'Gender is required'
      }
    }

    // Проверка согласия с условиями
    if (termsRef.current) {
      const termsAccepted = termsRef.current.checked
      if (!termsAccepted) {
        errors.termsAccepted = 'You must accept the terms and conditions'
      }
    }

    // Проверка изображения
    if (imageRef.current && imageRef.current.files) {
      const file = imageRef.current.files[0]
      if (file) {
        if (!['image/png', 'image/jpeg'].includes(file.type)) {
          errors.image = 'Unsupported file format'
        } else if (file.size > 2 * 1024 * 1024) {
          errors.image = 'File size exceeds 2 MB'
        }
      } else {
        errors.image = 'Image is required'
      }
    }

    // Проверка выбора страны
    if (countryRef.current) {
      const country = countryRef.current.value
      if (!country) {
        errors.country = 'Country is required'
      }
    }

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    if (
      nameRef.current &&
      ageRef.current &&
      emailRef.current &&
      passwordRef.current &&
      confirmPasswordRef.current &&
      genderRef.current &&
      termsRef.current &&
      countryRef.current
    ) {
      dispatch(
        setUncontrolledData({
          name: nameRef.current.value,
          age: parseInt(ageRef.current.value, 10),
          email: emailRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: confirmPasswordRef.current.value,
          gender: genderRef.current.value as 'male' | 'female',
          termsAccepted: termsRef.current.checked,
          image: imagePreview || '',
          country: countryRef.current.value,
        })
      )
    }
    navigate('/')
  }

  return (
    <div>
      <Link to={'/'}>Go back</Link>
      <h2>Uncontrolled Form</h2>
      <form className={style.uncontrolled_form} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={nameRef} />
        {errors.name && (
          <div className={style.message_error}>{errors.name}</div>
        )}

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" ref={ageRef} />
        {errors.age && <div className={style.message_error}>{errors.age}</div>}

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" ref={emailRef} />
        {errors.email && (
          <div className={style.message_error}>{errors.email}</div>
        )}

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordRef} />
        {errors.password && (
          <div className={style.message_error}>{errors.password}</div>
        )}

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" ref={confirmPasswordRef} />
        {errors.confirmPassword && (
          <div className={style.message_error}>{errors.confirmPassword}</div>
        )}

        <label htmlFor="gender">Gender:</label>
        <select id="gender" ref={genderRef}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="terms">Accept Terms & Conditions:</label>
        <input type="checkbox" id="terms" ref={termsRef} />
        {errors.termsAccepted && (
          <div className={style.message_error}>{errors.termsAccepted}</div>
        )}

        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          accept=".png, .jpeg"
          onChange={handleImageChange}
          ref={imageRef}
        />
        {imagePreview && <img src={imagePreview} alt="Preview" width={100} />}
        {errors.image && (
          <div className={style.message_error}>{errors.image}</div>
        )}

        <label htmlFor="country">Country:</label>
        <select id="country" ref={countryRef}>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <div className={style.message_error}>{errors.country}</div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default UncontrolledForm
