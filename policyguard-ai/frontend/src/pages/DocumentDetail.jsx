import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api.js'
export default function DocumentDetail(){
  const {id}=useParams(); const [data,setData]=useState(null); const [q,setQ]=useState(''); const [busy,setBusy]=useState(false)
  const load=async()=>{ const r=await api.get('/documents/'+id); setData(r.data) }
  useEffect(()=>{load()},[id])
  const ask=async e=>{ e.preventDefault(); if(!q)return; setBusy(true); await api.post(`/documents/${id}/ask`,{question:q}); setQ(''); await load(); setBusy(false) }
  const download=()=>{
    const a=data.analysis; const blob=new Blob([
      `PolicyGuard AI — Analysis Report\n\nDocument: ${data.document.originalName}\nUploaded: ${data.document.uploadedAt}\n\n=== SUMMARY ===\n${a?.summary||'N/A'}\n\n=== KEY CLAUSES ===\n${a?.keyClauses||'N/A'}\n\n=== RISKS ===\n${a?.risks||'N/A'}\n`
    ],{type:'text/plain'})
    const u=URL.createObjectURL(blob); const link=document.createElement('a'); link.href=u; link.download=`report-${id}.txt`; link.click()
  }
  if(!data) return <div className="p-10 text-center">Loading...</div>
  const {document:doc, analysis, questions}=data
  return (<div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
    <div className="flex justify-between items-start flex-wrap gap-3">
      <div>
        <h1 className="text-2xl font-bold">{doc.originalName}</h1>
        <p className="text-slate-400 text-sm">{doc.docCategory} · {doc.status}</p>
      </div>
      <button onClick={download} className="px-4 py-2 rounded-lg glass hover:bg-white/10">⬇ Download Report</button>
    </div>
    <div className="glass rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-3">📋 Summary</h2>
      <pre className="whitespace-pre-wrap text-slate-300 text-sm">{analysis?.summary||'Pending...'}</pre>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-3">🔑 Key Clauses</h2>
        <pre className="whitespace-pre-wrap text-slate-300 text-sm">{analysis?.keyClauses||'Pending...'}</pre>
      </div>
      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-3">⚠️ Risks</h2>
        <pre className="whitespace-pre-wrap text-slate-300 text-sm">{analysis?.risks||'Pending...'}</pre>
      </div>
    </div>
    <div className="glass rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">💬 Ask about this document</h2>
      <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
        {questions?.map(q=> <div key={q.id} className="border-l-2 border-indigo-500 pl-3">
          <div className="font-medium">Q: {q.question}</div>
          <div className="text-slate-300 text-sm mt-1 whitespace-pre-wrap">A: {q.answer}</div>
        </div>)}
      </div>
      <form onSubmit={ask} className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="What does the termination clause say?" className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10"/>
        <button disabled={busy} className="px-5 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 font-semibold disabled:opacity-50">{busy?'...':'Ask'}</button>
      </form>
    </div>
  </div>)
}
