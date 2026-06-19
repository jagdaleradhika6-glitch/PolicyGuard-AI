import { useEffect, useState } from 'react'
import api from '../services/api.js'
export default function Admin(){
  const [users,setUsers]=useState([]); const [docs,setDocs]=useState([]); const [stats,setStats]=useState({})
  useEffect(()=>{
    api.get('/admin/users').then(r=>setUsers(r.data))
    api.get('/admin/documents').then(r=>setDocs(r.data))
    api.get('/admin/stats').then(r=>setStats(r.data))
  },[])
  return (<div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="glass rounded-xl p-6"><div className="text-3xl font-bold">{stats.users||0}</div><div className="text-slate-400 text-sm">Users</div></div>
      <div className="glass rounded-xl p-6"><div className="text-3xl font-bold">{stats.documents||0}</div><div className="text-slate-400 text-sm">Documents</div></div>
    </div>
    <div className="glass rounded-2xl p-6"><h2 className="font-semibold mb-3">Users</h2>
      <table className="w-full text-sm"><thead className="text-left text-slate-400"><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
        <tbody>{users.map(u=><tr key={u.id} className="border-t border-white/10"><td className="py-2">{u.fullName}</td><td>{u.email}</td><td>{u.role}</td></tr>)}</tbody></table>
    </div>
    <div className="glass rounded-2xl p-6"><h2 className="font-semibold mb-3">All Documents</h2>
      <table className="w-full text-sm"><thead className="text-left text-slate-400"><tr><th>Name</th><th>Type</th><th>Status</th><th>User</th></tr></thead>
        <tbody>{docs.map(d=><tr key={d.id} className="border-t border-white/10"><td className="py-2">{d.originalName}</td><td>{d.fileType}</td><td>{d.status}</td><td>{d.userId}</td></tr>)}</tbody></table>
    </div>
  </div>)
}
