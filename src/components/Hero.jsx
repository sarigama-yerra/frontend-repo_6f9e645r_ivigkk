import { Sparkles, Heart } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(236,72,153,0.15),transparent_50%)]" />
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-fuchsia-200">
          <Sparkles className="w-3.5 h-3.5" />
          Spirit-led journaling that feels like paper
        </div>
        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          Digital Gratitude Journal with your own handwriting
        </h1>
        <p className="mt-4 text-lg md:text-xl text-fuchsia-100/80 max-w-2xl mx-auto">
          Upload your script, pick a sacred template, and let your intentions flow. Gentle canvas-based writing makes it feel like a real journal.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a href="#write" className="px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-semibold shadow-lg shadow-fuchsia-500/20">Start writing</a>
          <a href="#pricing" className="px-5 py-3 rounded-xl border border-white/15 text-white/90 hover:bg-white/5">See tiers</a>
        </div>
        <div className="mt-12 flex items-center justify-center gap-2 text-fuchsia-200">
          <Heart className="w-4 h-4" />
          <span className="text-sm">100% spiritual vibes • daily intentions • mindful prompts</span>
        </div>
      </div>
    </section>
  )
}
