import { useState, useEffect, useRef, type RefObject } from "react";
import FeatureCard from './FeatureCard';
import ProjectCard from './ProjectCard';
import { filters, featured, projects } from '../../config/theme.config';
import { motion} from 'framer-motion'

function useInView(
    sectionRefOrThreshold?: RefObject<HTMLElement | null> | number,
    p0?: { once: boolean; margin: string; },
    threshold = 0.2
) {
    const ref = useRef<HTMLElement>(null)
    const [inView, setInView] = useState(false)
    const resolvedThreshold = typeof sectionRefOrThreshold === 'number' ? sectionRefOrThreshold : threshold

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true) },
            { threshold: resolvedThreshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [resolvedThreshold])

    return { ref, inView }
}

export default function ProjectsSection() {
    const [active, setActive] = useState('All');

    const { ref: sectionRef, inView } = useInView(0.1)

    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

    const visibleProjects =
        active === 'All'
            ? projects
            : projects.filter((p) => p.filters.includes(active));

    const showFeatured =
        active === 'All' || featured.filters.includes(active);

    const headerReveal = (delay: number) => ({
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 600ms var(--ease-out-expo) ${delay}ms,
                 transform 600ms var(--ease-out-expo) ${delay}ms`,
    })

    return (
        <section id="projects" ref={sectionRef}
            className="relative py-14 md:py-20 overflow-hidden"
            aria-label="Featured projects">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 -z-10 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at top right,rgba(139,92,246,0.12),transparent 70%)', filter: 'blur(60px)' }} />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 -z-10 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at bottom left,rgba(6,182,212,0.09),transparent 70%)', filter: 'blur(80px)' }} />

            <div className="max-w-6xl mx-auto px-4 relative z-10">

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
                            Projects
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
                        Featured {' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-cyan))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Works
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
                        Explore some of the web experiences and interfaces I've designed and developed.
                    </p>
                </div>
                {/* Header */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-10">
                    <div>
                        {/* <h1 className="font-display text-[32px] font-medium text-stone-900 leading-none mb-1">
                        Projects
                    </h1> */}
                        <p className="text-lg font-semibold flex items-center gap-3"
                            style={{ fontFamily: 'Plus Jakarta Sans', color: 'var(--color-text-secondary)' }}>Selected work — 2018 to present</p>
                    </div>

                    {/* Filter pills */}
                    <div className="flex flex-wrap justify-end gap-2 w-full lg:w-auto">
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActive(f)}
                                className={`pill-btn text-sm font-medium px-4 py-2 rounded-xl  transition-all
                            ${active === f
                                        ? ' text-white '
                                        : 'bg-transparent text-stone-500  hover:text-stone-800'
                                    }`}

                                style={{
                                    background: active === f ? "var(--color-accent-violet)" : "", fontFamily: "Plus Jakarta Sans", color: active === f ? "#fff" : "var(--color-text-secondary)",
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured hero */}
                {showFeatured && <FeatureCard project={featured} />}

                {/* Empty state */}
                {!showFeatured && visibleProjects.length === 0 && (
                    <div className="text-center py-20 text-stone-400 text-sm">
                        No projects in this category yet.
                    </div>
                )}

                {/* Mini grid */}
                {visibleProjects.length > 0 && (
                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {visibleProjects.map((p) => (
                            <ProjectCard key={p.id} project={p} />
                        ))}
                    </motion.div>
                )}
            </div>

        </section>
    );
}
