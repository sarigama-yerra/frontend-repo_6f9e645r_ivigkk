import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TemplateGallery from './components/TemplateGallery'
import CanvasJournal from './components/CanvasJournal'
import Pricing from './components/Pricing'
import Freebies from './components/Freebies'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar />
      <Hero />
      <TemplateGallery />
      <CanvasJournal />
      <Pricing />
      <Freebies />
      <footer className="border-t border-white/10 py-8 text-center text-slate-400 text-sm">
        Crafted with care • Set your intention and write your blessings
      </footer>
    </div>
  )
}

export default App
