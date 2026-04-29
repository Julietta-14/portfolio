import { useEffect, useRef, useState } from 'react'
import { SKILLS, PHILOSOPHY, EXTRA_SKILLS } from '@/config/theme.config'

// ── Intersection observer hook ─────────────────────────────
function useInView(threshold = 0.2) {
    const ref = useRef<HTMLElement>(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true) },
            { threshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])

    return { ref, inView }
}

// ── Level badge ────────────────────────────────────────────
function LevelBadge({ level }: { level: string }) {
    const colors: Record<string, { bg: string; color: string }> = {
        'Expert': { bg: 'rgba(139,92,246,0.15)', color: 'var(--color-accent-violet)' },
        'Power User': { bg: 'rgba(139,92,246,0.15)', color: 'var(--color-accent-violet)' },
        'Advanced': { bg: 'rgba(6,182,212,0.12)', color: 'var(--color-accent-cyan)' },
    }
    const style = colors[level] ?? colors['Advanced']
    return (
        <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ background: style.bg, color: style.color, fontFamily: 'Inter' }}
        >
            {level}
        </span>
    )
}

// ── Skill category card ────────────────────────────────────
function SkillCard({
    category, icon, items, index, inView,
}: {
    category: string; icon: string
    items: readonly { name: string; level: string }[]
    index: number; inView: boolean
}) {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            className="relative rounded-2xl p-6 transition-all duration-500 overflow-hidden"
            style={{
                background: hovered
                    ? 'var(--color-surface-high)'
                    : 'var(--color-surface-container)',
                border: `1px solid ${hovered
                    ? 'rgba(139,92,246,0.3)'
                    : 'rgba(255,255,255,0.06)'}`,
                boxShadow: hovered
                    ? '0 16px 48px rgba(139,92,246,0.15)'
                    : '0 4px 16px rgba(0,0,0,0.2)',
                transform: inView
                    ? 'translateY(0) scale(1)'
                    : 'translateY(40px) scale(0.97)',
                opacity: inView ? 1 : 0,
                transition: `transform 600ms var(--ease-out-expo) ${index * 100}ms,
                       opacity   600ms var(--ease-out-expo) ${index * 100}ms,
                       background 300ms, border-color 300ms, box-shadow 300ms`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Hover glow */}
            {hovered && (
                <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none"
                    style={{ background: 'rgba(139,92,246,0.12)' }}
                />
            )}

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                    style={{
                        background: hovered
                            ? 'linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-cyan))'
                            : 'rgba(139,92,246,0.12)',
                        color: hovered ? '#fff' : 'var(--color-accent-violet)',
                        transition: 'background 300ms, color 300ms',
                        fontFamily: 'Plus Jakarta Sans',
                    }}
                >
                    {icon}
                </div>
                <h3
                    className="font-bold text-base tracking-tight"
                    style={{ fontFamily: 'Plus Jakarta Sans', color: 'var(--color-text-primary)' }}
                >
                    {category}
                </h3>
            </div>

            {/* Items */}
            <ul className="space-y-3">
                {items.map(({ name, level }) => (
                    <li key={name} className="flex items-center justify-between gap-2">
                        <span
                            className="text-sm"
                            style={{ fontFamily: 'Inter', color: 'var(--color-text-secondary)' }}
                        >
                            {name}
                        </span>
                        <LevelBadge level={level} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

// ── Philosophy card ────────────────────────────────────────
function PhilosophyCard({
    icon, title, description, index, inView,
}: {
    icon: string; title: string; description: string
    index: number; inView: boolean
}) {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            className="relative rounded-2xl p-8 overflow-hidden transition-all duration-500"
            style={{
                background: hovered
                    ? 'var(--color-surface-high)'
                    : 'var(--color-surface-container)',
                border: `1px solid ${hovered
                    ? 'rgba(6,182,212,0.3)'
                    : 'rgba(255,255,255,0.06)'}`,
                boxShadow: hovered
                    ? '0 16px 48px rgba(6,182,212,0.1)'
                    : '0 4px 16px rgba(0,0,0,0.15)',
                transform: inView
                    ? 'translateY(0)'
                    : 'translateY(50px)',
                opacity: inView ? 1 : 0,
                transition: `transform 700ms var(--ease-out-expo) ${600 + index * 120}ms,
                    opacity   700ms var(--ease-out-expo) ${600 + index * 120}ms,
                    background 300ms, border-color 300ms, box-shadow 300ms`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Background number watermark */}
            <span
                className="absolute -top-4 -right-2 text-8xl font-black select-none pointer-events-none"
                style={{
                    fontFamily: 'Plus Jakarta Sans',
                    color: 'var(--color-surface-low)',
                }}
            >
                {String(index + 1).padStart(2, '0')}
            </span>

            {/* Icon */}
            <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
                style={{
                    background: hovered
                        ? 'linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-cyan))'
                        : 'rgba(139,92,246,0.1)',
                    transition: 'background 300ms',
                }}
            >
                {icon}
            </div>

            <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Plus Jakarta Sans', color: 'var(--color-text-primary)' }}
            >
                {title}
            </h3>
            <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)' }}
            >
                {description}
            </p>
        </div>
    )
}



// ── Main Section ───────────────────────────────────────────
export default function Skills() {
    const { ref: sectionRef, inView } = useInView(0.1)

    const headerReveal = (delay: number) => ({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 600ms var(--ease-out-expo) ${delay}ms,
                 transform 600ms var(--ease-out-expo) ${delay}ms`,
    })

    return (
        <section
            id="skills"
            ref={sectionRef as React.RefObject<HTMLElement>}
            className="relative py-14 md:py-20 overflow-hidden"
            aria-label="Skills and philosophy"
        >
            {/* Section ambient glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full blur-[140px] pointer-events-none -z-10 opacity-10"
                style={{ background: 'var(--color-accent-cyan)' }}
            />

            <div
                className="max-w-6xl mx-auto px-4"
                style={{
                    paddingLeft: 'max(16px, env(safe-area-inset-left))',
                    paddingRight: 'max(16px, env(safe-area-inset-right))',
                }}
            >

                {/* ── Section header ── */}
                <div className="text-center mb-16 space-y-4">
                    <div style={headerReveal(0)}>
                        <span
                            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                            style={{
                                background: 'rgba(6,182,212,0.1)',
                                border: '1px solid rgba(6,182,212,0.2)',
                                color: 'var(--color-accent-cyan)',
                                fontFamily: 'Inter',
                            }}
                        >
                            Expertise
                        </span>
                    </div>

                    <h2
                        className="font-black tracking-tight"
                        style={{
                            ...headerReveal(100),
                            fontFamily: 'Plus Jakarta Sans',
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            color: 'var(--color-text-primary)',
                        }}
                    >
                        Skill{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-cyan))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Orbit
                        </span>
                    </h2>

                    <p
                        className="text-base max-w-xl mx-auto"
                        style={{
                            ...headerReveal(200),
                            fontFamily: 'Inter',
                            color: 'var(--color-text-muted)',
                        }}
                    >
                        Built with modern tools to ensure efficiency, scalability, and long-term maintainability.
                    </p>
                </div>

                {/* ── Skill cards grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                    {SKILLS.map((skill, i) => (
                        <SkillCard
                            key={skill.category}
                            category={skill.category}
                            icon={skill.icon}
                            items={skill.items}
                            index={i}
                            inView={inView}
                        />
                    ))}
                </div>

                {/* ── Divider ── */}
                <div
                    className="w-full h-px mb-16"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)',
                        ...headerReveal(400),
                    }}
                />

                {/* ── Core Philosophy ── */}
                <div className="text-center mb-12">
                    <h2
                        className="font-black tracking-tight"
                        style={{
                            ...headerReveal(300),
                            fontFamily: 'Plus Jakarta Sans',
                            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                            color: 'var(--color-text-primary)',
                        }}
                    >
                        Core{' '}
                        <span style={{ color: 'var(--color-accent-cyan)' }}>Philosophy</span>
                    </h2>
                    <p
                        className="text-sm mt-3 max-w-md mx-auto"
                        style={{
                            ...headerReveal(400),
                            fontFamily: 'Inter',
                            color: 'var(--color-text-muted)',
                        }}
                    >
                        Principles that drive every line of code and every pixel.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {PHILOSOPHY.map((p, i) => (
                        <PhilosophyCard
                            key={p.title}
                            icon={p.icon}
                            title={p.title}
                            description={p.description}
                            index={i}
                            inView={inView}
                        />
                    ))}
                </div>

                {/* ── Extra skill pills ── */}
                <div
                    className="flex flex-wrap justify-center gap-3"
                    style={headerReveal(800)}
                >
                    {EXTRA_SKILLS.map((skill: string, i: number) => (
                        <span
                            key={skill}
                            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                            style={{
                                fontFamily: 'Inter',
                                background: 'var(--color-surface-container)',
                                color: 'var(--color-text-secondary)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                animationDelay: `${i * 50}ms`,
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLElement
                                el.style.background = 'rgba(139,92,246,0.12)'
                                el.style.color = 'var(--color-accent-violet)'
                                el.style.borderColor = 'rgba(139,92,246,0.3)'
                                el.style.transform = 'translateY(-2px)'
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLElement
                                el.style.background = 'var(--color-surface-container)'
                                el.style.color = 'var(--color-text-secondary)'
                                el.style.borderColor = 'rgba(255,255,255,0.07)'
                                el.style.transform = 'translateY(0)'
                            }}
                        >
                            {skill}
                        </span>
                    ))}
                </div>

            </div>
        </section>
    )
}