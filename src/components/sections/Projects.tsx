import { useRef, useState } from 'react'
import {
    motion,
    useInView,
    useMotionValue,
    useSpring,
    useTransform,
    AnimatePresence,
    type Variants,
} from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { PROJECTS } from '@/config/theme.config'

// ── Easing ─────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const SPRING_CFG = { type: 'spring' as const, stiffness: 160, damping: 24, mass: 0.8 }

// ── Tag chip ───────────────────────────────────────────────
const TAG_COLORS: Record<string, { bg: string; color: string }> = {
    'React': { bg: 'rgba(6,182,212,0.12)', color: 'var(--color-accent-cyan)' },
    'Next.js': { bg: 'rgba(255,255,255,0.08)', color: 'var(--color-text-secondary)' },
    'TypeScript': { bg: 'rgba(139,92,246,0.15)', color: 'var(--color-accent-violet)' },
    'SCSS': { bg: 'rgba(255,184,105,0.12)', color: 'var(--color-tertiary)' },
    'D3.js': { bg: 'rgba(255,184,105,0.12)', color: 'var(--color-tertiary)' },
    'React Native': { bg: 'rgba(6,182,212,0.12)', color: 'var(--color-accent-cyan)' },
    'Firebase': { bg: 'rgba(255,184,105,0.12)', color: 'var(--color-tertiary)' },
    'PHP': { bg: 'rgba(139,92,246,0.12)', color: 'var(--color-accent-violet)' },
    'Tailwind': { bg: 'rgba(6,182,212,0.12)', color: 'var(--color-accent-cyan)' },
}

function Tag({ label }: { label: string }) {
    const s = TAG_COLORS[label] ?? { bg: 'rgba(255,255,255,0.07)', color: 'var(--color-text-muted)' }
    return (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
            style={{ background: s.bg, color: s.color, fontFamily: 'Inter' }}>
            {label}
        </span>
    )
}

// ── Browser-chrome placeholder ─────────────────────────────
const PREVIEW_GRADIENTS = [
    { grad: 'linear-gradient(135deg,#4c1d95 0%,#0e7490 100%)', accent: '#8B5CF6' },
    { grad: 'linear-gradient(135deg,#0c4a6e 0%,#312e81 100%)', accent: '#06B6D4' },
    { grad: 'linear-gradient(135deg,#7c2d12 0%,#4c1d95 100%)', accent: '#F59E0B' },
    { grad: 'linear-gradient(135deg,#064e3b 0%,#1e3a5f 100%)', accent: '#10b981' },
]

function BrowserPlaceholder({ index, tall = false }: { index: number; title: string; tall?: boolean }) {
    const { grad, accent } = PREVIEW_GRADIENTS[index % PREVIEW_GRADIENTS.length]
    const h = tall ? 260 : 200

    return (
        <div className="relative overflow-hidden" style={{ height: h, background: '#0d0d12' }}>
            {/* Browser chrome bar */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-1.5 px-3"
                style={{ height: 28, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
                {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
                    <span key={c} className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c }} />
                ))}
                <div className="flex-1 mx-2 h-4 rounded-sm flex items-center px-2"
                    style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <span className="text-[8px] truncate" style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Inter' }}>
                        https://project-{index + 1}.dev
                    </span>
                </div>
            </div>

            {/* Page content */}
            <div className="absolute inset-0 pt-7" style={{ background: grad }}>
                <div className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
                        backgroundSize: '28px 28px',
                    }} />
                {/* Fake UI skeleton */}
                <div className="absolute top-10 left-5 right-5 space-y-2">
                    <div className="h-2.5 rounded-full w-2/5" style={{ background: accent, opacity: 0.75 }} />
                    <div className="h-1.5 rounded-full w-3/5" style={{ background: 'rgba(255,255,255,0.22)' }} />
                    <div className="h-1.5 rounded-full w-1/2" style={{ background: 'rgba(255,255,255,0.13)' }} />
                </div>
                <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                    {[0.9, 0.6, 0.75].map((o, i) => (
                        <div key={i} className="h-14 rounded-lg"
                            style={{ background: `rgba(255,255,255,${o * 0.09})`, border: `1px solid rgba(255,255,255,${o * 0.12})` }} />
                    ))}
                </div>
                <span className="absolute bottom-1 right-3 font-black select-none pointer-events-none"
                    style={{ fontSize: '5rem', color: 'rgba(255,255,255,0.04)', fontFamily: 'Plus Jakarta Sans', lineHeight: 1 }}>
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>
        </div>
    )
}

// ── 3D Tilt wrapper ────────────────────────────────────────
function TiltCard({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null)
    const mx = useMotionValue(0)
    const my = useMotionValue(0)
    const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 30 })
    const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 })

    const onMove = (e: React.MouseEvent) => {
        const r = ref.current!.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
    }
    const onLeave = () => { mx.set(0); my.set(0) }

    return (
        <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
            className="h-full">
            {children}
        </motion.div>
    )
}

// ── Project card ───────────────────────────────────────────
function ProjectCard({ project, index, large = false }: {
    project: typeof PROJECTS[number]; index: number; large?: boolean
}) {
    const ref = useRef<HTMLDivElement>(null)
    const inV = useInView(ref, { once: true, margin: '-60px' })
    const [hovered, setHovered] = useState(false)
    const hasImage: boolean | null =  project?.image_path?.trim() !== "";
    //project?.image_path && project?.image_path.trim() !== ""
    const cardV: Variants = {
        hidden: { opacity: 0, y: 48, scale: 0.96 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: { duration: 0.7, ease: EASE, delay: index * 0.1 }
        },
    }

    return (
        <motion.div ref={ref} variants={cardV} initial="hidden" animate={inV ? 'visible' : 'hidden'}
            className="h-full" style={{ perspective: 900 }}>
            <TiltCard>
                <motion.div
                    className="relative rounded-2xl overflow-hidden h-full flex flex-col"
                    style={{
                        background: 'var(--color-surface-container)', border: '1px solid var(--color-outline-variant)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.18)', transformStyle: 'preserve-3d'
                    }}
                    animate={{
                        borderColor: hovered ? 'rgba(139,92,246,0.5)' : 'var(--color-outline-variant)',
                        boxShadow: hovered
                            ? '0 32px 80px rgba(139,92,246,0.28), 0 0 0 1px rgba(139,92,246,0.18)'
                            : '0 8px 32px rgba(0,0,0,0.18)',
                    }}
                    transition={SPRING_CFG}
                    onHoverStart={() => setHovered(true)}
                    onHoverEnd={() => setHovered(false)}
                >
                    {/* Preview */}
                    <div className="relative overflow-hidden shrink-0">
                        {hasImage ? (
                            <img
                                src={project?.image_path}
                                alt={project.title}
                                className="w-full max-w-full object-cover"
                            />
                        ) : (
                            <BrowserPlaceholder index={index} title={project.title} tall={large} />
                        )}

                        {/* Hover overlay */}
                        <AnimatePresence>
                            {hovered && (
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center"
                                    style={{ background: 'rgba(8,8,18,0.6)', backdropFilter: 'blur(6px)' }}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    transition={{ duration: 0.22 }}
                                >
                                    <motion.a
                                        href={project.url} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm"
                                        style={{
                                            fontFamily: 'Plus Jakarta Sans', color: '#fff',
                                            background: 'var(--color-accent-violet)',
                                            boxShadow: '0 4px 24px rgba(139,92,246,0.65)'
                                        }}
                                        initial={{ scale: 0.78, y: 10, opacity: 0 }}
                                        animate={{ scale: 1, y: 0, opacity: 1 }}
                                        exit={{ scale: 0.78, y: 10, opacity: 0 }}
                                        transition={SPRING_CFG}
                                        whileHover={{ scale: 1.07 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ExternalLink size={13} strokeWidth={2.5} />
                                        {project.cta}
                                    </motion.a>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Animated top line */}
                        <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                            style={{ background: 'linear-gradient(90deg,var(--color-accent-violet),var(--color-accent-cyan),var(--color-accent-violet))', backgroundSize: '200%' }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ duration: 0.25 }}
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5 gap-3">
                        <div className="flex flex-wrap gap-1.5">
                            {project.tags.map(t => <Tag key={t} label={t} />)}
                        </div>

                        <motion.h3 className="font-bold leading-snug"
                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: large ? '1.3rem' : '1.1rem' }}
                            animate={{ color: hovered ? 'var(--color-accent-violet)' : 'var(--color-text-primary)' }}
                            transition={{ duration: 0.2 }}>
                            {project.title}
                        </motion.h3>

                        <p className="text-sm leading-relaxed flex-1"
                            style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)' }}>
                            {project.description}
                        </p>

                        <motion.a href={project.url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold pt-1 w-fit"
                            style={{ fontFamily: 'Plus Jakarta Sans', color: 'var(--color-accent-cyan)' }}
                            whileHover={{ opacity: 0.85 }}
                            transition={{ duration: 0.2 }}>
                            {project.cta}
                            <ArrowRight size={14} strokeWidth={2.5} />
                        </motion.a>
                    </div>
                </motion.div>
            </TiltCard>
        </motion.div>
    )
}



// ── Main section ───────────────────────────────────────────
export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

    const headerV: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    }
    const itemV: Variants = {
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
    }

    return (
        <section id="projects" ref={sectionRef}
            className="relative py-14 md:py-20 overflow-hidden"
            aria-label="Featured projects">

            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 -z-10 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at top right,rgba(139,92,246,0.12),transparent 70%)', filter: 'blur(60px)' }} />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 -z-10 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at bottom left,rgba(6,182,212,0.09),transparent 70%)', filter: 'blur(80px)' }} />

            <div className="max-w-6xl mx-auto px-4 relative z-10">

                {/* Header */}
                <motion.div
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-16"
                    variants={headerV} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>

                    <div className="space-y-4">
                        <motion.h2 variants={itemV} className="font-black tracking-tight"
                            style={{
                                fontFamily: 'Plus Jakarta Sans', fontSize: 'clamp(2rem,5vw,3.5rem)',
                                color: 'var(--color-text-primary)', lineHeight: 1.06
                            }}>
                            Featured{' '}
                            <motion.span
                                style={{
                                    background: 'linear-gradient(135deg,var(--color-accent-violet),var(--color-accent-cyan))',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text', backgroundSize: '200%'
                                }}
                                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                                Works
                            </motion.span>
                        </motion.h2>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[minmax(200px,auto)]">

                    {PROJECTS.map((project, index) => {
                        let isLarge: boolean = index === 0; // first item large (or use project.size)

                        isLarge = (project?.size == "large");

                        return (
                            <div key={project.id} className={isLarge ? "md:col-span-2" : ""}>
                                <ProjectCard
                                    project={project}
                                    index={index}
                                    large={isLarge}
                                />
                            </div>
                        );
                    })}

                </div>
            </div>

        </section>
    )
}

