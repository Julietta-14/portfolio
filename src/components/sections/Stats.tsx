import { useRef, useState } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { PERFORMANCE_STATS } from '@/config/theme.config'
import { Gauge, ScanEye } from 'lucide-react'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const SPRING = { type: 'spring' as const, stiffness: 140, damping: 22, mass: 0.8 }

export default function StatsSection() {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const containerV: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
    }
    const itemV: Variants = {
        hidden: { opacity: 0, y: 36 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
    }

    const [leftHovered, setLeftHovered] = useState(false)

    return (
        <section
            id="stats"
            ref={ref}
            className="relative overflow-hidden"
            aria-label="Performance stats"
        >
            {/* Ambient glow */}
            <div className="absolute inset-0 -z-10 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 60%, rgba(139,92,246,0.08), transparent)' }} />

            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    variants={containerV}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {/* ── Left: Performance card (spans 2 cols) ── */}
                    <motion.div
                        variants={itemV}
                        className="md:col-span-2 relative rounded-3xl p-10 md:p-12 flex flex-col justify-between overflow-hidden"
                        style={{
                            background: 'var(--color-surface-container)',
                            border: '1px solid var(--color-outline-variant)',
                            boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
                        }}
                        animate={{
                            boxShadow: leftHovered
                                ? '0 0 0 1px rgba(139,92,246,0.35), 0 32px 80px rgba(139,92,246,0.22), 0 0 60px rgba(6,182,212,0.1) inset'
                                : '0 24px 64px rgba(0,0,0,0.18)',
                        }}
                        transition={SPRING}
                        onHoverStart={() => setLeftHovered(true)}
                        onHoverEnd={() => setLeftHovered(false)}
                    >
                        {/* Animated top accent */}
                        <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                            style={{ background: 'linear-gradient(90deg,var(--color-accent-violet),var(--color-accent-cyan),var(--color-accent-violet))', backgroundSize: '200%' }}
                            animate={{ backgroundPosition: ['0%', '200%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        />

                        {/* Speedometer watermark */}
                        <motion.div
                            className="absolute top-6 right-6 md:right-10 select-none pointer-events-none"
                            animate={{ rotate: [0, 4, -4, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Gauge
                                size={160}
                                style={{
                                    color: leftHovered ? 'var(--color-accent-violet)' : 'var(--color-text-primary)',
                                    opacity: leftHovered ? 0.18 : 0.05,
                                    filter: leftHovered ? 'drop-shadow(0 0 18px rgba(139,92,246,0.6))' : 'none',
                                    transition: 'color 400ms, opacity 400ms, filter 400ms',
                                }}
                            />
                        </motion.div>

                        {/* Text */}
                        <div className="relative z-10 space-y-4">
                            <h3 className="font-black leading-tight"
                                style={{
                                    fontFamily: 'Plus Jakarta Sans', fontSize: 'clamp(1.75rem,4vw,2.75rem)',
                                    color: 'var(--color-text-primary)'
                                }}>
                                Optimized to the <br />
                                <span style={{ color: 'var(--color-accent-cyan)' }}>Last Millisecond.</span>
                            </h3>
                            <p className="text-base max-w-sm leading-relaxed"
                                style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                                My builds consistently score 95+ on Core Web Vitals. Performance isn't an afterthought; it's the foundation.
                            </p>
                        </div>

                        {/* Stats row */}
                        <div className="relative z-10 flex gap-8 flex-wrap mt-10">
                            {PERFORMANCE_STATS.map(({ value, label }, i) => (
                                <motion.div key={label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.1 }}
                                >
                                    <div className="text-4xl font-black"
                                        style={{ fontFamily: 'Plus Jakarta Sans', color: 'var(--color-accent-cyan)' }}>
                                        {value}
                                    </div>
                                    <div className="text-[11px] font-bold uppercase tracking-widest mt-1"
                                        style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)' }}>
                                        {label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Right: Accessibility card ── */}
                    <motion.div
                        variants={itemV}
                        className="relative rounded-3xl p-10 md:p-12 flex flex-col justify-between overflow-hidden"
                        style={{
                            background: 'var(--color-accent-violet)',
                            boxShadow: '0 24px 64px rgba(139,92,246,0.35)',
                        }}
                        whileHover={{ scale: 1.02, boxShadow: '0 32px 80px rgba(139,92,246,0.5)' }}
                        transition={SPRING}
                    >
                        {/* Shimmer */}
                        <motion.div className="absolute inset-0 pointer-events-none"
                            style={{ background: 'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.1) 50%,transparent 65%)' }}
                            animate={{ x: ['-120%', '220%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2.5 }}
                        />
                        {/* Soft top-left glow */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full pointer-events-none"
                            style={{ background: 'rgba(255,255,255,0.12)', filter: 'blur(40px)' }} />

                        {/* Icon */}
                        <motion.div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl relative z-10"
                            style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}
                            whileHover={{ rotate: 8, scale: 1.1 }}
                            transition={SPRING}
                        >
                            <ScanEye />
                        </motion.div>

                        {/* Content */}
                        <div className="relative z-10 mt-8">
                            <h3 className="font-black text-2xl mb-3" style={{ fontFamily: 'Plus Jakarta Sans', color: '#fff' }}>
                                Accessibility First
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7 }}>
                                Inclusive design that ensures every user has a premium experience, regardless of their navigation method.
                            </p>
                        </div>

                        {/* CTA */}
                        <motion.a
                            className="relative z-10 mt-8 inline-flex items-center justify-center py-3.5 px-6 rounded-2xl font-bold text-sm"
                            style={{
                                fontFamily: "Plus Jakarta Sans",
                                border: "1.5px solid rgba(255,255,255,0.3)",
                                background: "transparent",
                                color: "#fff",
                                textDecoration: "none",
                            }}
                            target='_blank'
                            href="https://www.w3.org/WAI/standards-guidelines/act/"
                            whileHover={{
                                scale: 1.03,
                                backgroundColor: "#fff",
                                color: "var(--color-accent-violet)",
                            }}
                            whileTap={{ scale: 0.97 }}
                            transition={SPRING}
                        >
                            Read Methodology
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

