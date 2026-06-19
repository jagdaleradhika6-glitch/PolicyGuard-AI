import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Upload from './pages/Upload.jsx'
import DocumentDetail from './pages/DocumentDetail.jsx'
import Profile from './pages/Profile.jsx'
import Admin from './pages/Admin.jsx'
import { useAuth } from './context/AuthContext.jsx'

function Private({children, admin}){
  const {user} = useAuth()
  if (!user) return <Navigate to="/login" />
  if (admin && user.role !== 'ADMIN') return <Navigate to="/dashboard" />
  return children
}

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
          <Route path="/upload" element={<Private><Upload /></Private>} />
          <Route path="/documents/:id" element={<Private><DocumentDetail /></Private>} />
          <Route path="/profile" element={<Private><Profile /></Private>} />
          <Route path="/admin" element={<Private admin><Admin /></Private>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
