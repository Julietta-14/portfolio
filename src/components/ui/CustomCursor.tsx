import { useEffect, useRef, useState } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'

export default function CustomCursor() {
    const { x, y } = useMousePosition()
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)

    // Smooth ring with lerp via rAF
    useEffect(() => {
        let rx = x, ry = y
        let raf: number

        const loop = () => {
            rx += (x - rx) * 0.12
            ry += (y - ry) * 0.12
            if (ringRef.current) {
                ringRef.current.style.transform =
                    `translate(${rx - 20}px, ${ry - 20}px)`
            }
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(raf)
    }, [x, y])

    // Detect hoverable elements
    useEffect(() => {
        const enter = () => setHovered(true)
        const leave = () => setHovered(false)
        const down = () => setClicked(true)
        const up = () => setClicked(false)

        const targets = document.querySelectorAll(
            'a, button, [data-cursor="hover"], input, textarea'
        )
        targets.forEach(el => {
            el.addEventListener('mouseenter', enter)
            el.addEventListener('mouseleave', leave)
        })
        window.addEventListener('mousedown', down)
        window.addEventListener('mouseup', up)

        return () => {
            targets.forEach(el => {
                el.removeEventListener('mouseenter', enter)
                el.removeEventListener('mouseleave', leave)
            })
            window.removeEventListener('mousedown', down)
            window.removeEventListener('mouseup', up)
        }
    }, [])

    // Hide on mobile
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)
        return null

    return (
        <>
            {/* Dot — snaps instantly */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-9999 mix-blend-difference"
                style={{
                    transform: `translate(${x - 4}px, ${y - 4}px)`,
                    width: clicked ? 6 : 8,
                    height: clicked ? 6 : 8,
                    borderRadius: '50%',
                    background: '#fff',
                    transition: 'width 150ms, height 150ms',
                }}
            />

            {/* Ring — lags behind with lerp */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 pointer-events-none z-9998"
                style={{
                    width: hovered ? 48 : 40,
                    height: hovered ? 48 : 40,
                    borderRadius: '50%',
                    border: `1.5px solid ${hovered ? 'var(--color-accent-violet)' : 'rgba(255,255,255,0.5)'}`,
                    transition: 'width 200ms var(--ease-spring), height 200ms var(--ease-spring), border-color 200ms',
                    willChange: 'transform',
                }}
            />
        </>
    )
}