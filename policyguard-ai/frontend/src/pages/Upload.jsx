import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api.js'
export default function Upload(){
  const [file,setFile]=useState(null); const [category,setCategory]=useState('Insurance'); const [busy,setBusy]=useState(false); const [err,setErr]=useState('')
  const nav=useNavigate()
  const submit=async e=>{
    e.preventDefault(); if(!file)return; setBusy(true); setErr('')
    const fd=new FormData(); fd.append('file',file); fd.append('category',category)
    try{ const {data}=await api.post('/documents/upload',fd,{headers:{'Content-Type':'multipart/form-data'}}); nav('/documents/'+data.id) }
    catch(x){ setErr(x.response?.data?.error||'Upload failed') } finally{ setBusy(false) }
  }
  return (<div className="max-w-2xl mx-auto px-4 py-12"><div className="glass rounded-2xl p-8">
    <h1 className="text-2xl font-bold mb-6">Upload a document</h1>
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label className="block text-sm mb-2">Category</label>
        <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10">
          {['Insurance','Privacy Policy','Terms & Conditions','Agreement','Other'].map(c=><option key={c} className="bg-slate-900">{c}</option>)}
        </select>
      </div>
      <label className="block border-2 border-dashed border-white/20 rounded-xl p-10 text-center cursor-pointer hover:bg-white/5">
        <input type="file" accept=".pdf,.docx" onChange={e=>setFile(e.target.files[0])} className="hidden"/>
        <div className="text-4xl mb-2">📤</div>
        <div className="font-semibold">{file?file.name:'Click to choose PDF or DOCX'}</div>
        <div className="text-xs text-slate-400 mt-1">Max 20MB</div>
      </label>
      {err && <p className="text-red-400 text-sm">{err}</p>}
      <button disabled={busy||!file} className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 font-semibold disabled:opacity-50">
        {busy?'Analyzing with AI...':'Upload & Analyze'}
      </button>
    </form>
  </div></div>)
}
