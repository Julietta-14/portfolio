import { useEffect, useRef, useState } from 'react'
import { SITE_CONFIG } from '@/config/theme.config'
import { useTheme } from '@/context/ThemeContext'

// ── Animated counter hook ──────────────────────────────────
function useCounter(target: number, duration = 1500, start = false) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!start) return
        let startTime: number
        const step = (ts: number) => {
            if (!startTime) startTime = ts
            const progress = Math.min((ts - startTime) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [target, duration, start])
    return count
}

// ── Typewriter hook ────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 2000) {
    const [display, setDisplay] = useState('')
    const [wordIdx, setWordIdx] = useState(0)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        const current = words[wordIdx]
        let timeout: ReturnType<typeof setTimeout>

        if (!deleting && display === current) {
            timeout = setTimeout(() => setDeleting(true), pause)
        } else if (deleting && display === '') {
            setDeleting(false)
            setWordIdx(i => (i + 1) % words.length)
        } else {
            timeout = setTimeout(() => {
                setDisplay(prev =>
                    deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
                )
            }, deleting ? speed / 2 : speed)
        }
        return () => clearTimeout(timeout)
    }, [display, deleting, wordIdx, words, speed, pause])

    return display
}

// ── Stat card ─────────────────────────────────────────────
function StatCard({
    value, suffix, label, color, started,
}: {
    value: number; suffix: string; label: string
    color: string; started: boolean
}) {
    const count = useCounter(value, 1400, started)
    return (
        <div
            className="flex flex-col items-center px-6 py-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
            <span className="text-3xl font-black" style={{ fontFamily: 'Plus Jakarta Sans', color }}>
                {count}{suffix}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest mt-1"
                style={{ color: 'var(--color-text-muted)' }}>
                {label}
            </span>
        </div>
    )
}

// ── Main Hero ──────────────────────────────────────────────
export default function Hero() {
    const containerRef = useRef<HTMLElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)
    const [started, setStarted] = useState(false)

    const { isDark } = useTheme()

    const typed = useTypewriter(
        ['Frontend Development', 'Figma to Production', 'Scalable UI Systems', 'WCAG 2.1 Compliance', 'React & Tailwind'],
        75,
        2200
    )

    // Mount animation trigger
    useEffect(() => {
        const t1 = setTimeout(() => setMounted(true), 100)
        const t2 = setTimeout(() => setStarted(true), 800)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [])

    // Mouse parallax on mesh glow
    useEffect(() => {
        const section = containerRef.current
        if (!section) return

        const onMove = (e: MouseEvent) => {
            const { left, top, width, height } = section.getBoundingClientRect()
            const x = ((e.clientX - left) / width - 0.5) * 2   // -1 to 1
            const y = ((e.clientY - top) / height - 0.5) * 2

            if (glowRef.current) {
                glowRef.current.style.transform =
                    `translate(${x * 40}px, ${y * 30}px)`
            }
        }

        section.addEventListener('mousemove', onMove)
        return () => section.removeEventListener('mousemove', onMove)
    }, [])

    // Stagger helper
    const reveal = (delay: number) => ({
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 700ms var(--ease-out-expo) ${delay}ms,
                 transform 700ms var(--ease-out-expo) ${delay}ms`,
    })

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-dvh flex items-center overflow-hidden"
            style={{ paddingTop: 'clamp(100px, 15vh, 140px)' }}
            aria-label="Hero section"
        >

            {/* ── Mesh gradient background ── */}
            <div
                ref={glowRef}
                className="absolute inset-0 pointer-events-none -z-10"
                style={{ transition: 'transform 600ms var(--ease-out-expo)' }}
            >
                {/* Primary violet blob */}
                <div
                    className="absolute rounded-full blur-[120px]"
                    style={{
                        width: '55%', height: '55%',
                        top: '-10%', left: '-5%',
                        background: `radial-gradient(circle, ${isDark
                            ? 'rgba(139,92,246,0.25)'
                            : 'rgba(139,92,246,0.1)'} 0%, transparent 70%)`,
                    }}
                />
                {/* Cyan blob */}
                <div
                    className="absolute rounded-full blur-[100px]"
                    style={{
                        width: '40%', height: '45%',
                        bottom: '5%', right: '0%',
                        background: `radial-gradient(circle, ${isDark
                            ? 'rgba(6,182,212,0.2)'
                            : 'rgba(6,182,212,0.08)'} 0%, transparent 70%)`,
                    }}
                />
                {/* Center sparkle */}
                <div
                    className="absolute rounded-full blur-[80px]"
                    style={{
                        width: '30%', height: '30%',
                        top: '30%', left: '35%',
                        background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
                    }}
                />
            </div>

            {/* ── Grid lines decoration ── */}
            <div
                className="absolute inset-0 pointer-events-none -z-10"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),' +
                        'linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                    opacity: isDark ? 0.03 : 0.06,
                }}
            />

            {/* ── Floating particles ── */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                {[
                    { x: '5%', y: '20%', size: 4, dur: 7, del: 0, c: 'rgba(139,92,246,0.6)' },
                    { x: '90%', y: '15%', size: 3, dur: 9, del: 1.5, c: 'rgba(6,182,212,0.5)' },
                    { x: '80%', y: '70%', size: 5, dur: 8, del: 3, c: 'rgba(139,92,246,0.4)' },
                    { x: '10%', y: '75%', size: 3, dur: 10, del: 0.8, c: 'rgba(6,182,212,0.4)' },
                    { x: '50%', y: '5%', size: 2, dur: 6, del: 2, c: 'rgba(255,184,105,0.5)' },
                    { x: '25%', y: '50%', size: 3, dur: 11, del: 4, c: 'rgba(139,92,246,0.3)' },
                ].map((p, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            left: p.x,
                            top: p.y,
                            width: p.size,
                            height: p.size,
                            background: p.c,
                            filter: 'blur(1px)',
                            animation: `particleFloat ${p.dur}s ${p.del}s infinite ease-in-out`,
                        }}
                    />
                ))}
            </div>

            {/* ── Content ── */}
            <div
                className="w-full max-w-6xl mx-auto px-4"
                style={{
                    paddingLeft: 'max(16px, env(safe-area-inset-left))',
                    paddingRight: 'max(16px, env(safe-area-inset-right))'
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* ── LEFT: Text Content ── */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Availability badge */}
                        <div style={reveal(0)}>
                            <span
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
                                style={{
                                    background: 'rgba(139,92,246,0.12)',
                                    border: '1px solid rgba(139,92,246,0.3)',
                                    color: 'var(--color-accent-violet)',
                                    fontFamily: 'Inter',
                                }}
                            >
                                <span
                                    className="w-2 h-2 rounded-full animate-pulse"
                                    style={{ background: 'var(--color-accent-violet)' }}
                                />
                                {SITE_CONFIG.availability}
                            </span>
                        </div>

                        {/* Main heading */}
                        <div style={reveal(120)}>
                            <h1
                                className="font-black leading-[1.05] tracking-tight"
                                style={{
                                    fontFamily: 'Plus Jakarta Sans',
                                    fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                                    color: 'var(--color-text-primary)',
                                }}
                            >
                                {SITE_CONFIG.role.split(' ').slice(0, 2).join(' ')}{' '}
                                <br className="hidden sm:block" />
                                <span
                                    style={{
                                        background: 'linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-cyan))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    Developer
                                </span>
                            </h1>
                        </div>

                        {/* Typewriter subtitle */}
                        <div style={reveal(220)}>
                            <p
                                className="text-lg font-semibold flex items-center gap-3"
                                style={{ fontFamily: 'Plus Jakarta Sans', color: 'var(--color-text-secondary)' }}
                            >
                                Specializing in{' '}
                                <span style={{ color: 'var(--color-accent-cyan)', minWidth: '14ch', display: 'inline-block' }}>
                                    {typed}
                                    <span
                                        className="inline-block w-2px h-5 ml-2px align-middle animate-pulse"
                                        style={{ background: 'var(--color-accent-cyan)', borderRadius: 2 }}
                                    />
                                </span>
                            </p>
                        </div>

                        {/* Bio */}
                        <div style={reveal(320)}>
                            <p
                                className="text-base leading-relaxed max-w-xl"
                                style={{ color: 'var(--color-text-muted)', fontFamily: 'Inter' }}
                            >
                                {SITE_CONFIG.bio}
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div style={reveal(420)} className="flex flex-wrap gap-4 items-center">
                            {/* Primary */}
                            <button
                                onClick={() => {
                                    document.querySelector("#projects")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }}
                                className="group relative overflow-hidden px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 text-white bg-[linear-gradient(135deg,var(--color-accent-violet),var(--color-accent-cyan))] shadow-[0_4px_24px_rgba(139,92,246,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(139,92,246,0.5)]  active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent-violet)"
                                style={{
                                    fontFamily: "Plus Jakarta Sans",
                                }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Explore Projects
                                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                                        →
                                    </span>
                                </span>

                                {/* Shimmer overlay */}
                                <span
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background:
                                            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                                        transform: "skewX(-20deg)",
                                    }}
                                />
                            </button>

                            {/* Secondary */}
                            <button
                                onClick={() => {
                                    document.querySelector("#contact")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }}
                                className="px-8 py-4 rounded-xl font-bold text-base text-(--color-text-primary) border border-(--color-outline-variant) hover-pill cursor-pointer"
                                style={{ fontFamily: "Plus Jakarta Sans" }}
                            >
                                Start a Conversation
                            </button>
                        </div>

                        {/* Stats row */}
                        <div style={reveal(520)} className="flex flex-wrap gap-3 pt-2">
                            <StatCard value={7} suffix="+" label="Years Exp" color="var(--color-accent-violet)" started={started} />
                            <StatCard value={80} suffix="+" label="Projects" color="var(--color-accent-cyan)" started={started} />
                        </div>
                    </div>

                    {/* ── RIGHT: Visual Card ── */}
                    <div
                        className="lg:col-span-5 flex justify-center lg:justify-end"
                        style={reveal(200)}
                    >
                        <div className="relative w-full max-w-sm">

                            {/* Floating card */}
                            <div
                                className="relative rounded-3xl overflow-hidden"
                                style={{
                                    background: 'var(--color-surface-container)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    boxShadow: '0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.1)',
                                    animation: 'floatY 6s ease-in-out infinite',
                                }}
                            >
                                {/* Top gradient bar */}
                                <div
                                    className="h-1 w-full"
                                    style={{
                                        background: 'linear-gradient(90deg, var(--color-accent-violet), var(--color-accent-cyan))',
                                    }}
                                />

                                <div className="p-6 space-y-5">
                                    {/* Profile row */}
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black"
                                            style={{
                                                background: 'linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-cyan))',
                                                fontFamily: 'Plus Jakarta Sans',
                                                color: '#fff',
                                            }}
                                        >
                                            UI
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm" style={{ fontFamily: 'Plus Jakarta Sans', color: 'var(--color-text-primary)' }}>
                                                {SITE_CONFIG.name}
                                            </p>
                                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                                {SITE_CONFIG.role}
                                            </p>
                                        </div>
                                        <div
                                            className="ml-auto px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                            style={{
                                                background: 'rgba(139,92,246,0.15)',
                                                color: 'var(--color-accent-violet)',
                                                border: '1px solid rgba(139,92,246,0.2)',
                                            }}
                                        >
                                            Open
                                        </div>
                                    </div>

                                    {/* Skill bars */}
                                    {[
                                        { label: 'HTML5 / CSS3 / SCSS', pct: 99, color: 'var(--color-accent-violet)' },
                                        { label: 'JavaScript / jQuery', pct: 97, color: 'var(--color-accent-cyan)' },
                                        { label: 'React / Tailwind CSS', pct: 92, color: 'var(--color-tertiary)' },
                                        { label: 'Figma → Code', pct: 95, color: 'var(--color-accent-violet)' }
                                    ].map(({ label, pct, color }) => (
                                        <div key={label} className="space-y-1">
                                            <div className="flex justify-between text-xs"
                                                style={{ color: 'var(--color-text-muted)', fontFamily: 'Inter' }}>
                                                <span>{label}</span>
                                                <span style={{ color }}>{pct}%</span>
                                            </div>
                                            <div
                                                className="h-1.5 w-full rounded-full overflow-hidden"
                                                style={{ background: 'rgba(255,255,255,0.06)' }}
                                            >
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{
                                                        width: started ? `${pct}%` : '0%',
                                                        background: color,
                                                        transition: 'width 1200ms var(--ease-out-expo)',
                                                        boxShadow: `0 0 8px ${color}60`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    {/* Tag cloud */}
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {['React', 'SCSS', 'Figma', 'Tailwind', 'WordPress', 'WCAG'].map(tag => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 rounded-full text-[11px] font-semibold"
                                                style={{
                                                    background: 'rgba(255,255,255,0.05)',
                                                    color: 'var(--color-text-secondary)',
                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                    fontFamily: 'Inter',
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Decorative glow behind card */}
                            <div
                                className="absolute -inset-4 rounded-3xl -z-10 blur-2xl opacity-30"
                                style={{
                                    background: 'linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-cyan))',
                                }}
                            />
                        </div>
                    </div>
                </div>




                {/* Scroll indicator */}
                <div className='relative mt-20'>
                    <div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 anim-fade-in"
                        style={{ animationDelay: '1520ms' }}
                    >
                        <span
                            className="text-[10px] font-semibold tracking-[0.22em] uppercase"
                            style={{ color: 'var(--color-text-muted)' }}
                        >
                            Scroll
                        </span>
                        <div
                            className="w-5.5 h-9 rounded-full border flex items-start justify-center pt-1.5"
                            style={{ borderColor: 'var(--color-text-muted)' }}
                        >
                            <div
                                className="w-1.25 h-2 rounded-full anim-scroll-bounce"
                                style={{ background: 'var(--color-accent-violet)' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Keyframe styles ── */}
            <style>{`
        @keyframes floatY {
    0%, 100% { transform: translateY(0px);   }
    50%       { transform: translateY(-12px); }
  }
  @keyframes pulseHeight {
    0%, 100% { opacity: 0.4; transform: scaleY(1);    }
    50%       { opacity: 1;   transform: scaleY(1.15); }
  }
  @keyframes particleFloat {
    0%   { transform: translate(0, 0)      scale(0.8); opacity: 0;   }
    20%  { transform: translate(8px, -20px) scale(1.2); opacity: 0.7; }
    50%  { transform: translate(-6px, 10px) scale(0.9); opacity: 0.3; }
    80%  { transform: translate(10px,-15px) scale(1.1); opacity: 0.6; }
    100% { transform: translate(0, 0)      scale(0.8); opacity: 0;   }
  }
  @keyframes anim-scroll-bounce {
    0%, 100% { transform: translateY(0);   }
    50%       { transform: translateY(6px); }
  }
  .anim-scroll-bounce {
    animation: anim-scroll-bounce 1.4s ease-in-out infinite;
  }
  .anim-fade-in {
    animation: fadeIn 600ms ease both;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0);   }
  }
`}</style>
        </section>
    )
}