import { useEffect, useState } from 'react'

export default function TemplatePicker({ onSelect }){
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const base = import.meta.env.VITE_BACKEND_URL

  useEffect(()=>{
    const run = async () => {
      try{
        const res = await fetch(`${base}/api/templates`)
        const data = await res.json()
        setTemplates(data)
      }catch(e){
        console.error(e)
      }finally{
        setLoading(false)
      }
    }
    run()
  },[])

  if(loading) return <div className="text-slate-300">Loading templates…</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {templates.map((t)=> (
        <button key={t._id} onClick={()=>onSelect?.(t)} className="group relative rounded-xl overflow-hidden border border-slate-700 hover:border-indigo-400 transition">
          <div className="aspect-video bg-slate-800" style={{backgroundImage:`url(${t.preview})`, backgroundSize:'cover'}}></div>
          <div className="p-3 text-left">
            <div className="text-white font-medium">{t.title}</div>
            <div className="text-slate-300 text-sm">{t.description}</div>
          </div>
        </button>
      ))}
    </div>
  )
}
