import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCountries } from './redux/reducers'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UncontrolledForm from './components/UncontrolledForm'
import ReactHookForm from './components/ReactHookForm'
import Main from './components/Main'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchCountries = async () => {
      const countries = [
        'United States',
        'Canada',
        'Mexico',
        'Germany',
        'France',
      ]
      dispatch(setCountries(countries))
    }

    fetchCountries()
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/uncontrolled-form" element={<UncontrolledForm />}></Route>
        <Route path="/react-hook-form" element={<ReactHookForm />}></Route>
      </Routes>
    </Router>
  )
}

export default App
