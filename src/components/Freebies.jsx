export default function Freebies() {
  const freebies = [
    {
      title: 'Digital Detox Pack',
      desc: '7-day phone-lite ritual with printable cards',
      link: '#'
    },
    {
      title: 'Manifestation Mini eBook',
      desc: 'Scripting, affirmations, and a 3-step night ritual',
      link: '#'
    },
    {
      title: 'Morning Mantra Audio',
      desc: '5-minute breath + blessing to start radiant',
      link: '#'
    }
  ]

  return (
    <section id="freebies" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Free spiritual goodies</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {freebies.map((f)=> (
          <a key={f.title} href={f.link} className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
            <h3 className="text-white font-semibold">{f.title}</h3>
            <p className="text-white/70 text-sm mt-1">{f.desc}</p>
            <span className="inline-block mt-3 text-xs text-fuchsia-200/90 bg-fuchsia-500/10 px-2 py-1 rounded">Free</span>
          </a>
        ))}
      </div>
    </section>
  )
}
