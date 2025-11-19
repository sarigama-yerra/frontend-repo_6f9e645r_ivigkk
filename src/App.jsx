import { useEffect, useState } from 'react'
import JournalCanvas from './components/JournalCanvas'
import TemplatePicker from './components/TemplatePicker'
import Tiers from './components/Tiers'
import Freebies from './components/Freebies'

function App() {
  const base = import.meta.env.VITE_BACKEND_URL
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [typedText, setTypedText] = useState('')
  const [status, setStatus] = useState('')

  useEffect(()=>{
    // seed data silently
    fetch(`${base}/api/seed`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({force:false})}).catch(()=>{})
  },[])

  const saveEntry = async (imageData) => {
    setStatus('Saving…')
    try{
      const res = await fetch(`${base}/api/entries`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ template_id: selectedTemplate?._id, text: typedText || null, image_data: imageData || null }) })
      const data = await res.json()
      if(res.ok){ setStatus('Saved with love ✨') } else { setStatus('Error: ' + data.detail) }
    }catch(e){ setStatus('Network error') }
    setTimeout(()=> setStatus(''), 2500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-violet-950 to-slate-950 text-white">
      <div className="relative">
        <div className="absolute inset-0 opacity-20" style={{background:'radial-gradient(ellipse at top, rgba(147,197,253,.4), transparent 60%), radial-gradient(ellipse at bottom, rgba(167,139,250,.4), transparent 60%)'}}/>
        <header className="relative z-10 max-w-6xl mx-auto px-6 pt-10 pb-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Gratitude Garden</h1>
          <p className="mt-3 text-violet-200 max-w-2xl mx-auto">A spiritual-first journaling sanctuary. Write with your own hand, choose sacred templates, and plant daily blessings.</p>
        </header>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 space-y-16 pb-20">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Choose your sacred template</h2>
          <TemplatePicker onSelect={setSelectedTemplate}/>
          {selectedTemplate && (
            <div className="text-violet-200">Selected: <span className="font-semibold text-white">{selectedTemplate.title}</span></div>
          )}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-3">Handwrite your gratitude</h2>
            <JournalCanvas onSave={saveEntry}/>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3">Or type and we’ll imprint it</h2>
            <textarea value={typedText} onChange={(e)=>setTypedText(e.target.value)} placeholder="Three blessings I’m grateful for today…" className="w-full h-64 rounded-xl bg-slate-900/50 border border-slate-700 p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"/>
            <div className="mt-3 flex gap-3">
              <button onClick={()=>saveEntry(null)} className="px-4 py-2 rounded bg-violet-600 hover:bg-violet-500">Save Entry</button>
              <span className="text-violet-200">{status}</span>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Membership tiers</h2>
          <Tiers/>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Free spiritual goodies</h2>
          <Freebies/>
        </section>
      </main>

      <footer className="text-center text-violet-300/70 py-10">Made with intention. Breathe in, write out, and bloom. 🌸</footer>
    </div>
  )
}

export default App
