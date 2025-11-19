import { useEffect, useState } from 'react'

export default function Freebies(){
  const [items, setItems] = useState([])
  const base = import.meta.env.VITE_BACKEND_URL
  useEffect(()=>{
    (async()=>{
      try{ const r = await fetch(`${base}/api/freebies`); setItems(await r.json()) }catch(e){ console.error(e) }
    })()
  },[])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((f)=> (
        <a href={f.url} key={f._id} className="rounded-xl border border-emerald-900/40 bg-emerald-950/30 p-4 text-emerald-100 hover:border-emerald-400 transition" target="_blank">
          <div className="text-lg font-semibold mb-1">{f.title}</div>
          <div className="text-emerald-300/80 text-sm capitalize">{f.kind}</div>
        </a>
      ))}
    </div>
  )
}
