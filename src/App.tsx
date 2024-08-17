import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UncontrolledForm from './components/UncontrolledForm'
import ReactHookForm from './components/ReactHookForm'
import Main from './components/Main'

function App() {
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
