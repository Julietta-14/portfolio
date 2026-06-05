import Tag from './Tag'
import { useRef, useState } from 'react'
import StatusBadge from './StatusBadge';
import {
    motion,
    useInView,
    useMotionValue,
    useSpring,
    useTransform,
    AnimatePresence,
    type Variants,
} from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import rightArrow from '../../assets/images/right-arrow.svg'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const SPRING_CFG = { type: 'spring' as const, stiffness: 160, damping: 24, mass: 0.8 }

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

export default function FeatureCard({ project }: any) {
    const { number, category, title, subtitle, description, image, location, year, tags, stats, link } = project;
    const index = number;
    const ref = useRef<HTMLDivElement>(null)
    const inV = useInView(ref, { once: true, margin: '-60px' })
    const [hovered, setHovered] = useState(false)
    const hasImage: boolean | null = project?.image_path?.trim() !== "";
    //project?.image_path && project?.image_path.trim() !== ""
    const cardV: Variants = {
        hidden: { opacity: 0, y: 48, scale: 0.96 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: { duration: 0.7, ease: EASE, delay: 1 * 0.1 }
        },
    }

    return (
        <motion.div ref={ref} variants={cardV} initial="hidden" animate={inV ? 'visible' : 'hidden'}
            className="h-full  mb-4" style={{ perspective: 900 }}>
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
                    <div className="card-hover grid grid-cols-1 md:grid-cols-2  rounded-2xl overflow-hidden  cursor-pointer group">
                        {/* Image side */}
                        <div className="img-zoom relative overflow-hidden min-h-300px">
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/28" />
                            <span className="absolute top-4 left-4 text-[10px] font-medium px-3 py-1.5 rounded-full bg-white/20 text-white tracking-widest uppercase" style={{
                                borderTop: '1.5px solid rgba(139,92,246,0.35)'
                            }}>
                                Featured
                            </span>
                            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/80 text-[11px]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                                <span>{location} &nbsp;·&nbsp; {year}</span>
                            </div>
                        </div>

                        {/* Body side */}
                        <div className="flex flex-col justify-between p-7 ">
                            <div>
                                <p className="text-[11px] font-medium text-stone-400 tracking-[0.06em] mb-2">
                                    {number} / {category}
                                </p>

                                <motion.h3 className="font-bold leading-snug"
                                    style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '1.1rem' }}
                                    animate={{ color: hovered ? 'var(--color-accent-violet)' : 'var(--color-text-primary)' }}
                                    transition={{ duration: 0.2 }}>
                                    {title} <br />
                                    <span className="text-stone-400">-{subtitle}</span>
                                </motion.h3>
                                <div className='mt-3 mb-3'>
                                    <p className="text-sm leading-relaxed flex-1"
                                        style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)' }}>
                                        {description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {tags.map((t: any) => (
                                        <Tag key={t.label} {...t} />
                                    ))}
                                </div>
                            </div>

                            <div>
                                {/* Stats */}
                                <div className="flex gap-6 py-4  mb-5" style={{
                                    borderTop: '1.5px solid rgba(139,92,246,0.35)', borderBottom: '1.5px solid rgba(139,92,246,0.35)'
                                }}>
                                    {stats.map((s: any) => (
                                        <div key={s.label}>
                                            <div className="text-[18px] font-medium text-stone-900" style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)' }} >{s.value}</div>
                                            <div className="text-[10px] text-stone-400 tracking-widest mt-0.5">{s.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between" >
                                    <motion.a href={link} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm font-semibold pt-1 w-fit"
                                        style={{ fontFamily: 'Plus Jakarta Sans', color: 'var(--color-accent-cyan)' }}
                                        whileHover={{ opacity: 0.85 }}
                                        transition={{ duration: 0.2 }}>
                                        {status !== "NDA" && (
                                            <>
                                                <span>View Project</span>
                                                <span>
                                                    <img
                                                        src={rightArrow}
                                                        alt="rightArrow"
                                                        style={{
                                                            filter:
                                                                "brightness(0) saturate(100%) invert(42%) sepia(92%) saturate(746%) hue-rotate(160deg) brightness(94%) contrast(92%)",
                                                        }}
                                                    />
                                                </span>
                                            </>
                                        )}

                                    </motion.a>
                                    <StatusBadge status='Live' />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </TiltCard>
        </motion.div>
    );
}
