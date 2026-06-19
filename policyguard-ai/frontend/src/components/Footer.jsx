export default function Footer(){
  return (
    <footer id="contact" className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="font-bold text-xl mb-2">🛡️ PolicyGuard AI</div>
          <p className="text-slate-400 text-sm">Understand any policy in plain language. Built for everyone.</p>
        </div>
        <div><h4 className="font-semibold mb-3">Product</h4><ul className="space-y-2 text-slate-400 text-sm">
          <li><a href="/#features">Features</a></li><li><a href="/#how">How it works</a></li><li><a href="/#faq">FAQ</a></li></ul></div>
        <div><h4 className="font-semibold mb-3">Company</h4><ul className="space-y-2 text-slate-400 text-sm">
          <li>About</li><li>Privacy</li><li>Terms</li></ul></div>
        <div><h4 className="font-semibold mb-3">Connect</h4><div className="flex gap-3 text-xl">
          <a href="#">🐦</a><a href="#">💼</a><a href="#">🐙</a><a href="#">📧</a></div></div>
      </div>
      <div className="text-center text-slate-500 text-sm py-6 border-t border-white/10">© {new Date().getFullYear()} PolicyGuard AI</div>
    </footer>
  )
}
