import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import AppLayout from './layouts/AppLayout.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'

import './App.css'
// import { useUserContext } from './hooks/useUserContext.tsx'

function App() {
  // const navigate = useNavigate()
  // const { isAuthenticated } = useUserContext()

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/login')
  //   }
  // })

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />
      <Route
        path="/login"
        element={
          <AppLayout>
            <Login />
          </AppLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AppLayout>
            <Register />
          </AppLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
