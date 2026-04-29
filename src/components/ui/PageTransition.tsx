import { useEffect, useRef } from 'react'

export default function PageTransition() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        // Slide up on mount
        el.style.transform = 'scaleY(1)'
        const t = setTimeout(() => {
            el.style.transform = 'scaleY(0)'
        }, 50)
        return () => clearTimeout(t)
    }, [])

    return (
        <div
            ref={ref}
            className="fixed inset-0 z-9990 origin-top pointer-events-none"
            style={{
                background: 'var(--color-bg-base)',
                transition: 'transform 700ms var(--ease-out-expo)',
                transform: 'scaleY(1)',
            }}
        />
    )
}