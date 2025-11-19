import { useEffect, useState } from 'react'

export default function Tiers(){
  const [tiers, setTiers] = useState([])
  const base = import.meta.env.VITE_BACKEND_URL
  useEffect(()=>{
    (async()=>{
      try{ const r = await fetch(`${base}/api/tiers`); setTiers(await r.json()) }catch(e){ console.error(e) }
    })()
  },[])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {tiers.map((t)=> (
        <div key={t._id} className="rounded-2xl border border-indigo-900/40 bg-indigo-950/30 p-6 text-indigo-100">
          <div className="text-xl font-bold mb-2">{t.name}</div>
          <div className="text-3xl font-extrabold mb-4">{t.price === 0 ? 'Free' : `$${t.price}/mo`}</div>
          <ul className="space-y-2 mb-6">
            {t.perks?.map((p,i)=> (<li key={i} className="flex items-start gap-2"><span>✨</span><span>{p}</span></li>))}
          </ul>
          <button className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium">Choose {t.name}</button>
        </div>
      ))}
    </div>
  )
}
