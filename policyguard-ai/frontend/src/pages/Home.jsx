import { Link } from 'react-router-dom'
const features = [
  {icon:'🤖', title:'AI Summaries', desc:'Long, jargon-heavy documents distilled into clear plain-language bullets.'},
  {icon:'⚠️', title:'Risk Detection', desc:'Spot unfavorable clauses, hidden fees, and red flags instantly.'},
  {icon:'🔍', title:'Key Clause Extraction', desc:'Get the most important terms — termination, liability, data sharing.'},
  {icon:'💬', title:'Ask Anything', desc:'Chat with your document and get cited, document-grounded answers.'},
  {icon:'📊', title:'Risk Score', desc:'Every document gets an at-a-glance risk score from 1-100.'},
  {icon:'📥', title:'Downloadable Reports', desc:'Export a professional analysis report to share or archive.'},
]
const stats = [
  {n:'50K+', l:'Documents Analyzed'},{n:'12K+', l:'Active Users'},
  {n:'98%', l:'Accuracy'},{n:'4.9★', l:'User Rating'}
]
const steps = [
  {n:1,t:'Upload',d:'Drop your PDF or DOCX policy.'},
  {n:2,t:'AI Analyzes',d:'Our AI reads & extracts key terms in seconds.'},
  {n:3,t:'Review',d:'See summary, risks, and key clauses.'},
  {n:4,t:'Ask & Decide',d:'Chat with your document, then make an informed choice.'},
]
const testimonials = [
  {n:'Priya S.', r:'Product Manager', q:'I caught a 30-day auto-renewal clause I would have missed. Saved me $400.'},
  {n:'Arjun M.', r:'Freelancer',     q:'I run every client contract through PolicyGuard now. It is a no-brainer.'},
  {n:'Sara K.',  r:'Small Business', q:'Our insurance policy went from 40 pages of confusion to 10 clear bullets.'}
]
const faqs = [
  {q:'Is my data secure?', a:'All documents are encrypted at rest. We never share or sell your data.'},
  {q:'Which file types are supported?', a:'PDF and DOCX up to 20MB per file.'},
  {q:'How accurate is the AI?', a:'Our models achieve 98%+ accuracy on standard legal documents. Always confirm with a lawyer for critical decisions.'},
  {q:'Do you store my documents?', a:'You can delete any document and its analysis at any time from your dashboard.'},
]
export default function Home(){
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-fuchsia-500 rounded-full blur-3xl animate-float" style={{animationDelay:'2s'}}/>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full glass text-sm mb-6 animate-fade-up">✨ AI-powered legal document analysis</div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight animate-fade-up">
            Understand any policy in <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">plain language</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto animate-fade-up">
            Upload insurance policies, T&Cs, or any legal agreement. Get summaries, risk highlights, and instant answers — powered by AI.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center animate-fade-up">
            <Link to="/register" className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 font-semibold hover:scale-105 transition">Get Started Free</Link>
            <a href="#features" className="px-6 py-3 rounded-xl glass font-semibold hover:bg-white/20 transition">See Features</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s=> <div key={s.l} className="glass rounded-xl p-6 text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">{s.n}</div>
          <div className="text-slate-400 text-sm mt-1">{s.l}</div>
        </div>)}
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Everything you need to read smarter</h2>
        <p className="text-slate-400 text-center mt-3">Powerful tools, beautifully simple.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {features.map(f=> <div key={f.title} className="glass rounded-2xl p-6 hover:scale-105 hover:bg-white/10 transition">
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="text-slate-400 mt-2 text-sm">{f.desc}</p>
          </div>)}
        </div>
      </section>

      {/* How */}
      <section id="how" className="bg-slate-900/50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center">How it works</h2>
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {steps.map(s=> <div key={s.n} className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 grid place-items-center text-xl font-bold">{s.n}</div>
              <h3 className="font-semibold mt-4">{s.t}</h3>
              <p className="text-slate-400 text-sm mt-2">{s.d}</p>
            </div>)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Loved by 12,000+ users</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {testimonials.map(t=> <div key={t.n} className="glass rounded-2xl p-6">
            <p className="text-slate-200">"{t.q}"</p>
            <div className="mt-4 text-sm"><div className="font-semibold">{t.n}</div><div className="text-slate-400">{t.r}</div></div>
          </div>)}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-slate-900/50 py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Questions, answered</h2>
          <div className="mt-12 space-y-3">
            {faqs.map(f=> <details key={f.q} className="glass rounded-xl p-5 group">
              <summary className="cursor-pointer font-semibold flex justify-between">{f.q}<span className="group-open:rotate-45 transition">+</span></summary>
              <p className="text-slate-400 mt-3">{f.a}</p>
            </details>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 py-24">
        <div className="glass rounded-3xl p-12 text-center bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to read smarter?</h2>
          <p className="text-slate-300 mt-3">Free to get started. No credit card required.</p>
          <Link to="/register" className="inline-block mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 font-semibold hover:scale-105 transition">Create free account</Link>
        </div>
      </section>
    </>
  )
}
