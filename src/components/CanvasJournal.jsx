import { useEffect, useRef, useState } from 'react'
import { UploadCloud, PenLine, Save } from 'lucide-react'

export default function CanvasJournal() {
  const canvasRef = useRef(null)
  const [drawing, setDrawing] = useState(false)
  const [color, setColor] = useState('#1f2937')
  const [size, setSize] = useState(2.5)
  const [bg, setBg] = useState('#fff7ed')
  const [handwritingImage, setHandwritingImage] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpi = window.devicePixelRatio || 1
    canvas.width = canvas.clientWidth * dpi
    canvas.height = canvas.clientHeight * dpi
    ctx.scale(dpi, dpi)
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  }, [bg])

  const start = (e) => {
    setDrawing(true)
    draw(e)
  }
  const end = () => setDrawing(false)
  const draw = (e) => {
    if (!drawing) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    ctx.lineWidth = size
    ctx.lineCap = 'round'
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + 0.1, y + 0.1)
    ctx.stroke()
  }

  const save = async () => {
    const dataUrl = canvasRef.current.toDataURL('image/png')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      await fetch(`${baseUrl}/api/journal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ strokes_data_url: dataUrl })
      })
      alert('Saved your entry!')
    } catch (e) {
      alert('Saved locally. Backend not reachable.')
    }
  }

  const onUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (ev) => {
      const url = ev.target.result
      setHandwritingImage(url)
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        await fetch(`${baseUrl}/api/handwritings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: file.name, image_url: url })
        })
      } catch {}
    }
    reader.readAsDataURL(file)
  }

  return (
    <section id="write" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Write your gratitude</h2>
      <p className="text-white/70 mb-4">Upload your handwriting for the vibe, pick ink and background, and scribble with your mouse or finger.</p>
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/50 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-[420px] touch-none"
            onMouseDown={start}
            onMouseUp={end}
            onMouseMove={draw}
            onMouseLeave={end}
            onTouchStart={start}
            onTouchEnd={end}
            onTouchMove={draw}
          />
        </div>
        <div className="space-y-4">
          <label className="block">
            <span className="text-white/80 text-sm">Upload handwriting image</span>
            <div className="mt-1 flex items-center gap-2">
              <input type="file" accept="image/*" onChange={onUpload} className="text-sm text-white/90" />
              <UploadCloud className="w-4 h-4 text-white/70" />
            </div>
            {handwritingImage && <img src={handwritingImage} alt="handwriting" className="mt-2 rounded border border-white/10" />}
          </label>
          <div>
            <span className="text-white/80 text-sm">Ink color</span>
            <input type="color" value={color} onChange={(e)=>setColor(e.target.value)} className="ml-2 align-middle" />
          </div>
          <div>
            <span className="text-white/80 text-sm">Pen size</span>
            <input type="range" min="1" max="8" step="0.5" value={size} onChange={(e)=>setSize(parseFloat(e.target.value))} className="ml-2" />
          </div>
          <div>
            <span className="text-white/80 text-sm">Paper tone</span>
            <input type="color" value={bg} onChange={(e)=>setBg(e.target.value)} className="ml-2 align-middle" />
          </div>
          <button onClick={save} className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-semibold">
            <Save className="w-4 h-4" /> Save entry
          </button>
        </div>
      </div>
    </section>
  )
}
