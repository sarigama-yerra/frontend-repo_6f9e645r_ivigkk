import { useEffect, useState } from 'react'

const defaultTemplates = [
  { title: 'Lunar Gratitude', description: 'Moon phases • silver ink • soft navy', theme: 'lunar', preview_url: 'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Zen Garden', description: 'Muted sand • raked lines • bamboo accents', theme: 'zen', preview_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Sunrise Bloom', description: 'Rose gold • dawn gradient • floral corners', theme: 'sunrise', preview_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop' },
]

export default function TemplateGallery() {
  const [templates, setTemplates] = useState(defaultTemplates)

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/templates`)
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) setTemplates(data)
        }
      } catch (e) {
        // keep defaults
      }
    }
    fetchTemplates()
  }, [])

  return (
    <section id="templates" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Choose your sacred template</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t, i) => (
          <div key={i} className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition">
            <img src={t.preview_url} alt={t.title} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-white font-semibold">{t.title}</h3>
              <p className="text-white/70 text-sm">{t.description}</p>
              <span className="inline-block mt-2 text-xs text-fuchsia-200/90 bg-fuchsia-500/10 px-2 py-1 rounded">{t.theme}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
