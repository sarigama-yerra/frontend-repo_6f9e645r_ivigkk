import { useEffect, useState } from 'react'

export default function Freebies() {
  const defaultFreebies = [
    {
      title: 'Digital Detox Pack',
      description: '7-day phone-lite ritual with printable cards',
      download_url: '#',
      kind: 'guide',
      free: true,
    },
    {
      title: 'Manifestation Mini eBook',
      description: 'Scripting, affirmations, and a 3-step night ritual',
      download_url: '#',
      kind: 'ebook',
      free: true,
    },
    {
      title: 'Morning Mantra Audio',
      description: '5-minute breath + blessing to start radiant',
      download_url: '#',
      kind: 'audio',
      free: true,
    },
  ]

  const [freebies, setFreebies] = useState(defaultFreebies)

  useEffect(() => {
    const fetchFreebies = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/products`)
        if (res.ok) {
          const data = await res.json()
          const onlyFree = (data || []).filter((p) => p.free)
          if (onlyFree.length > 0) setFreebies(onlyFree)
        }
      } catch (e) {
        // fallback to defaults
      }
    }
    fetchFreebies()
  }, [])

  return (
    <section id="freebies" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Free spiritual goodies</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {freebies.map((f, i) => (
          <a key={i} href={f.download_url || '#'} className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">{f.title}</h3>
              <span className="text-xs text-fuchsia-200/90 bg-fuchsia-500/10 px-2 py-1 rounded">{f.kind || 'free'}</span>
            </div>
            <p className="text-white/70 text-sm mt-1">{f.description}</p>
            <span className="inline-block mt-3 text-xs text-emerald-200/90 bg-emerald-500/10 px-2 py-1 rounded">Free</span>
          </a>
        ))}
      </div>
    </section>
  )
}
