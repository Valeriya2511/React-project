import { useRef } from 'react'

function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const confirmEmailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const genderRef = useRef<HTMLSelectElement>(null)
  const termsRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const countryRef = useRef<HTMLSelectElement>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const name = nameRef.current?.value || ''
    const age = parseInt(ageRef.current?.value || '0', 10)
    const email = emailRef.current?.value || ''
    const confirmEmail = confirmEmailRef.current?.value || ''
    const password = passwordRef.current?.value || ''
    const confirmPassword = confirmPasswordRef.current?.value || ''
    const gender = genderRef.current?.value || ''
    const terms = termsRef.current?.checked || false
    const image = imageRef.current?.files?.[0] || null
    const country = countryRef.current?.value || ''

    // Простейшие проверки
    if (!name.match(/^[A-Z][a-z]+/)) {
      alert('Name must start with an uppercase letter')
      return
    }

    if (isNaN(age) || age < 0) {
      alert('Age must be a non-negative number')
      return
    }

    if (email !== confirmEmail) {
      alert('Emails must match')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords must match')
      return
    }

    if (
      !password.match(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/
      )
    ) {
      alert(
        'Password must be at least 8 characters long and include at least one number, one uppercase letter, one lowercase letter, and one special character'
      )
      return
    }

    if (!terms) {
      alert('You must accept the terms and conditions')
      return
    }

    if (image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64Image = reader.result as string
        console.log('Image in Base64:', base64Image)
      }
      reader.readAsDataURL(image)
    }

    console.log({ name, age, email, password, gender, terms, country })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" ref={nameRef} />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" ref={ageRef} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="confirmEmail">Confirm Email</label>
        <input id="confirmEmail" type="email" ref={confirmEmailRef} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" ref={passwordRef} />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" ref={confirmPasswordRef} />
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select id="gender" ref={genderRef}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="terms">Accept Terms and Conditions</label>
        <input id="terms" type="checkbox" ref={termsRef} />
      </div>
      <div>
        <label htmlFor="image">Upload Image</label>
        <input id="image" type="file" ref={imageRef} />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <select id="country" ref={countryRef}>
          {/* Заполните список стран из Redux хранилища */}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default UncontrolledForm
