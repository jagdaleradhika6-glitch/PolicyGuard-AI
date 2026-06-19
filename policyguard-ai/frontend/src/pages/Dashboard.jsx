import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api.js'
export default function Dashboard(){
  const [docs,setDocs]=useState([]); const [q,setQ]=useState('')
  const load=async()=>{ const {data}=await api.get('/documents',{params:q?{q}:{}}); setDocs(data) }
  useEffect(()=>{load()},[q])
  const del=async(id)=>{ if(!confirm('Delete?'))return; await api.delete('/documents/'+id); load() }
  return (<div className="max-w-7xl mx-auto px-4 py-10">
    <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
      <h1 className="text-3xl font-bold">Your Documents</h1>
      <Link to="/upload" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 font-semibold">+ Upload</Link>
    </div>
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name..." className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 mb-6"/>
    {docs.length===0 ? <div className="glass rounded-2xl p-12 text-center text-slate-400">No documents yet. Upload your first policy →</div> :
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {docs.map(d=> <Link key={d.id} to={`/documents/${d.id}`} className="glass rounded-xl p-5 hover:bg-white/10 transition block">
        <div className="flex justify-between items-start">
          <div className="text-2xl">{d.fileType==='pdf'?'📄':'📝'}</div>
          <span className={`text-xs px-2 py-1 rounded-full ${d.status==='ANALYZED'?'bg-emerald-500/20 text-emerald-300':d.status==='FAILED'?'bg-red-500/20 text-red-300':'bg-amber-500/20 text-amber-300'}`}>{d.status}</span>
        </div>
        <h3 className="font-semibold mt-3 truncate">{d.originalName}</h3>
        <p className="text-xs text-slate-400 mt-1">{new Date(d.uploadedAt).toLocaleDateString()} · {(d.fileSize/1024).toFixed(0)} KB</p>
        <button onClick={e=>{e.preventDefault();del(d.id)}} className="text-red-400 text-xs mt-3 hover:underline">Delete</button>
      </Link>)}
    </div>}
  </div>)
}
