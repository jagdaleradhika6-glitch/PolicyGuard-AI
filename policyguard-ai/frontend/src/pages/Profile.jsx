import { useEffect, useState } from 'react'
import api from '../services/api.js'
export default function Profile(){
  const [u,setU]=useState(null); const [msg,setMsg]=useState('')
  useEffect(()=>{ api.get('/users/me').then(r=>setU(r.data)) },[])
  const save=async e=>{ e.preventDefault(); await api.put('/users/me',{fullName:u.fullName,avatarUrl:u.avatarUrl||''}); setMsg('Saved ✓') }
  if(!u) return <div className="p-10">Loading...</div>
  return (<div className="max-w-xl mx-auto px-4 py-12"><div className="glass rounded-2xl p-8">
    <h1 className="text-2xl font-bold mb-6">My Profile</h1>
    <form onSubmit={save} className="space-y-4">
      <input className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10" value={u.fullName} onChange={e=>setU({...u,fullName:e.target.value})}/>
      <input disabled className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 opacity-60" value={u.email}/>
      <input placeholder="Avatar URL" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10" value={u.avatarUrl||''} onChange={e=>setU({...u,avatarUrl:e.target.value})}/>
      <p className="text-sm text-slate-400">Role: {u.role}</p>
      {msg && <p className="text-emerald-400 text-sm">{msg}</p>}
      <button className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 font-semibold">Save</button>
    </form>
  </div></div>)
}
