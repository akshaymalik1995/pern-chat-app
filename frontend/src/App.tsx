
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import './App.css'
import "react-toastify/dist/ReactToastify.css";
import useLogout from './hooks/useLogout'
import { ToastContainer } from 'react-toastify'

function App() {
  const { authUser, isLoading } = useAuthContext()
  console.log(authUser)

  const { loading : logoutLoading, logout } = useLogout()

  if (isLoading) {
    return null
  }

  async function handleLogout() {
    await logout()
  }

  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center ">
        <ToastContainer />
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"} />} />
          <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to={"/"} />} />
        </Routes>
      </div>
    </>
  )
}

export default App
