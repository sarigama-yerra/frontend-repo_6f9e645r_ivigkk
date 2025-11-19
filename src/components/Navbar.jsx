import { Menu, Sparkles } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-indigo-500 grid place-items-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold tracking-tight">SereneScript</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#templates" className="hover:text-white">Templates</a>
          <a href="#write" className="hover:text-white">Write</a>
          <a href="#pricing" className="hover:text-white">Tiers</a>
          <a href="#freebies" className="hover:text-white">Freebies</a>
        </nav>
        <button className="md:hidden p-2 rounded-lg border border-white/10 text-slate-200">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
