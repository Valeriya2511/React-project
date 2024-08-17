import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store'
import { setUncontrolledData } from '../redux/reducers'
import style from '../styles/UncontrolledForm.module.css'

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
  }

  return (
    <form className={style.form_uncontrolled_form} onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" ref={nameRef} />

      <label htmlFor="age">Age:</label>
      <input type="number" id="age" ref={ageRef} />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" ref={emailRef} />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" ref={passwordRef} />

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" ref={confirmPasswordRef} />

      <label htmlFor="gender">Gender:</label>
      <select id="gender" ref={genderRef}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label htmlFor="terms">Accept Terms & Conditions:</label>
      <input type="checkbox" id="terms" ref={termsRef} />

      <label htmlFor="image">Upload Image:</label>
      <input
        type="file"
        id="image"
        accept=".png, .jpeg"
        onChange={handleImageChange}
        ref={imageRef}
      />
      {imagePreview && <img src={imagePreview} alt="Preview" width={100} />}

      <label htmlFor="country">Country:</label>
      <select id="country" ref={countryRef}>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      <br />

      <button type="submit">Submit</button>
    </form>
  )
}

export default UncontrolledForm
