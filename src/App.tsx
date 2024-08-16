import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import UncontrolledForm from './components/UncontrolledForm'
import ReactHookForm from './components/ReactHookForm'
import Main from './components/Main'

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Main</Link>
        <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        <Link to="/react-hook-form">React Hook Form</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/uncontrolled-form" element={<UncontrolledForm />}></Route>
        <Route path="/react-hook-form" element={<ReactHookForm />}></Route>
      </Routes>
    </Router>
  )
}

export default App
