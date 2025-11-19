export default function Pricing() {
  const tiers = [
    {
      name: 'Seed',
      price: '$0',
      highlight: false,
      perks: ['3 templates', 'Basic canvas writing', 'Daily intention prompts']
    },
    {
      name: 'Bloom',
      price: '$7/mo',
      highlight: true,
      perks: ['All templates', 'Custom handwriting upload', 'Mood tracking', 'Export as images']
    },
    {
      name: 'Ascend',
      price: '$19/mo',
      highlight: false,
      perks: ['Everything in Bloom', 'Guided rituals', 'Audio meditations', 'Priority blessings (support)']
    }
  ]

  return (
    <section id="pricing" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Three sacred tiers</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((t)=> (
          <div key={t.name} className={`rounded-2xl border bg-white/5 border-white/10 p-6 ${t.highlight ? 'ring-2 ring-fuchsia-400' : ''}`}>
            <div className="flex items-baseline justify-between">
              <h3 className="text-white font-semibold">{t.name}</h3>
              <span className="text-white/80">{t.price}</span>
            </div>
            <ul className="mt-4 space-y-2 text-white/80 text-sm">
              {t.perks.map((p)=> <li key={p}>• {p}</li>)}
            </ul>
            <button className={`mt-6 w-full rounded-xl px-4 py-2 font-semibold ${t.highlight ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white' : 'border border-white/15 text-white/90'}`}>Choose {t.name}</button>
          </div>
        ))}
      </div>
    </section>
  )
}
