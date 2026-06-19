import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useState } from 'react'
export default function Navbar(){
  const {user, logout} = useAuth(); const nav = useNavigate(); const [open,setOpen] = useState(false)
  const link = "text-slate-300 hover:text-white transition"
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 grid place-items-center">🛡️</span>
          PolicyGuard <span className="text-indigo-400">AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <a href="/#features" className={link}>Features</a>
          <a href="/#how" className={link}>How it works</a>
          <a href="/#faq" className={link}>FAQ</a>
          <a href="/#contact" className={link}>Contact</a>
          {user ? (
            <>
              <NavLink to="/dashboard" className={link}>Dashboard</NavLink>
              {user.role==='ADMIN' && <NavLink to="/admin" className={link}>Admin</NavLink>}
              <button onClick={()=>{logout();nav('/')}} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className={link}>Login</Link>
              <Link to="/register" className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 font-medium">Get Started</Link>
            </>
          )}
        </nav>
        <button className="md:hidden text-2xl" onClick={()=>setOpen(!open)}>☰</button>
      </div>
      {open && <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
        <a href="/#features">Features</a><a href="/#how">How it works</a><a href="/#faq">FAQ</a>
        {user ? <Link to="/dashboard">Dashboard</Link> : <><Link to="/login">Login</Link><Link to="/register">Register</Link></>}
      </div>}
    </header>
  )
}
