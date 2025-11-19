import { useEffect, useRef, useState } from 'react'

export default function JournalCanvas({ onSave }) {
  const canvasRef = useRef(null)
  const [drawing, setDrawing] = useState(false)
  const [color, setColor] = useState('#111827')
  const [size, setSize] = useState(3)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = color
    ctx.lineWidth = size
    // subtle paper texture
    ctx.fillStyle = '#faf8f5'
    ctx.fillRect(0, 0, rect.width, rect.height)
  }, [color, size])

  const getPos = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    return { x, y }
  }

  const start = (e) => {
    setDrawing(true)
    const { x, y } = getPos(e)
    const ctx = canvasRef.current.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const move = (e) => {
    if (!drawing) return
    const { x, y } = getPos(e)
    const ctx = canvasRef.current.getContext('2d')
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const end = () => setDrawing(false)

  const clear = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#faf8f5'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const save = async () => {
    const dataUrl = canvasRef.current.toDataURL('image/png')
    onSave?.(dataUrl)
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-3">
        <input type="color" value={color} onChange={(e)=>setColor(e.target.value)} className="h-8 w-10"/>
        <input type="range" min="1" max="12" value={size} onChange={(e)=>setSize(Number(e.target.value))}/>
        <button onClick={clear} className="px-3 py-1 rounded bg-slate-200 text-slate-700">Clear</button>
        <button onClick={save} className="px-3 py-1 rounded bg-indigo-600 text-white">Save to Journal</button>
      </div>
      <div className="rounded-xl overflow-hidden border border-slate-300 shadow-inner" style={{background:'url(https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60) center/cover'}}>
        <canvas
          ref={canvasRef}
          className="w-full h-64 touch-none bg-[#faf8f5]"
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={end}
        />
      </div>
    </div>
  )
}
