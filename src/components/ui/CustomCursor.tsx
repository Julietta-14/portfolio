import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })

  // Single rAF loop — starts once, never restarts
  useEffect(() => {
    let raf: number
    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, []) // ← empty: never re-runs, loop lives for the component lifetime

  // Mousemove — update dot instantly via DOM, store position for ring lerp
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Hover / click — event delegation, works for lazily-rendered elements too
  useEffect(() => {
    const SELECTORS = 'a, button, [data-cursor="hover"], input, textarea, select, label'

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(SELECTORS)) {
        ringRef.current?.classList.add('cursor-hovered')
      }
    }
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(SELECTORS)) {
        ringRef.current?.classList.remove('cursor-hovered')
      }
    }
    const onDown = () => {
      dotRef.current?.classList.add('cursor-clicked')
      ringRef.current?.classList.add('cursor-clicked')
    }
    const onUp = () => {
      dotRef.current?.classList.remove('cursor-clicked')
      ringRef.current?.classList.remove('cursor-clicked')
    }

    document.addEventListener('mouseover',  onOver,  { passive: true })
    document.addEventListener('mouseout',   onOut,   { passive: true })
    window.addEventListener  ('mousedown',  onDown)
    window.addEventListener  ('mouseup',    onUp)

    return () => {
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseout',   onOut)
      window.removeEventListener  ('mousedown',  onDown)
      window.removeEventListener  ('mouseup',    onUp)
    }
  }, [])

  // Skip on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)
    return null

  return (
    <>
      {/* Dot — tracks mouse instantly, no delay */}
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9999,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#fff',
          mixBlendMode: 'difference',
          transform: 'translate(-100px, -100px)',
        }}
      />

      {/* Ring — lerps behind dot */}
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9998,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.45)',
          willChange: 'transform',
          transform: 'translate(-100px, -100px)',
        }}
      />
    </>
  )
}
