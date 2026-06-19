import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
export default function Register(){
  const {register}=useAuth(); const nav=useNavigate()
  const [f,setF]=useState({fullName:'',email:'',password:''}); const [err,setErr]=useState('')
  const submit=async e=>{e.preventDefault();setErr('');try{await register(f.fullName,f.email,f.password);nav('/dashboard')}catch(x){setErr(x.response?.data?.error||'Registration failed')}}
  return (<div className="max-w-md mx-auto px-4 py-16"><div className="glass rounded-2xl p-8">
    <h1 className="text-2xl font-bold mb-6">Create account</h1>
    <form onSubmit={submit} className="space-y-4">
      <input className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10" placeholder="Full name" value={f.fullName} onChange={e=>setF({...f,fullName:e.target.value})} required/>
      <input className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10" placeholder="Email" value={f.email} onChange={e=>setF({...f,email:e.target.value})} required/>
      <input type="password" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10" placeholder="Password (min 6)" value={f.password} onChange={e=>setF({...f,password:e.target.value})} required/>
      {err && <p className="text-red-400 text-sm">{err}</p>}
      <button className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 font-semibold">Sign up</button>
    </form>
    <p className="text-sm text-slate-400 mt-4">Have an account? <Link to="/login" className="text-indigo-400">Login</Link></p>
  </div></div>)
}
