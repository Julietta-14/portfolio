import { useRef, useState } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { EXPERIENCE_STATS } from '@/config/theme.config'
import { Code, ScanEye } from 'lucide-react'

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

            <div className="max-w-6xl mx-auto px-4 pb-40">
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
                            background: 'linear-gradient(135deg, color- mix(in srgb, var(--color-surface-container) 85%, transparent), color-mix(in srgb, var(--color-surface-high) 65%, transparent))',
                            border: '1px solid var(--color-outline-variant)',
                            boxShadow: '0 24px 64px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(139,92,246,0.08), inset 0 0 40px rgba(6,182,212,0.05)',
                            backdropFilter: 'blur(18px) saturate(140%)',
                            WebkitBackdropFilter: 'blur(18px) saturate(140%)',
                        }}
                        animate={{
                            boxShadow: leftHovered
                                ? '0 0 0 1px var(--color-accent-violet), 0 32px 80px rgba(139,92,246,0.22), 0 0 60px rgba(6,182,212,0.1) inset'
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

                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: `
                                radial-gradient(circle at 20% 30%, rgba(139,92,246,0.18), transparent 40%),
                                radial-gradient(circle at 80% 60%, rgba(6,182,212,0.14), transparent 45%)`,
                                filter: 'blur(50px)',
                                mixBlendMode: 'screen',
                            }}
                            animate={{
                                x: [0, 10, -10, 0],
                                y: [0, -8, 8, 0],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />

                        {/* Speedometer watermark */}
                        <motion.div
                            className="absolute top-6 right-6 md:right-10 select-none pointer-events-none"
                            animate={{ rotate: [0, 4, -4, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Code
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
                            <motion.h3
                                className="font-black leading-tight"
                                style={{
                                    fontFamily: 'Plus Jakarta Sans',
                                    fontSize: 'clamp(1.75rem,4vw,2.75rem)',
                                    color: 'var(--color-text-primary)',
                                }}
                            >
                                I Build <br />

                                <motion.span
                                    key={leftHovered ? "a" : "b"}
                                    initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ duration: 0.6, ease: EASE }}
                                    style={{ color: 'var(--color-accent-cyan)', display: 'inline-block' }}
                                >
                                    {leftHovered
                                        ? "Scalable Digital Systems."
                                        : "Clean & Fluid Interfaces."}
                                </motion.span>
                            </motion.h3>
                            <p className="text-base leading-relaxed"
                                style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                                I'm a frontend-focused developer who builds fast, responsive and production-ready web applications. I focus on clean UI, performance, and scalable architecture that works in real-world systems.
                            </p>
                        </div>

                        {/* Stats row */}
                        <div className="relative z-10 flex gap-8 flex-wrap mt-8">
                            {EXPERIENCE_STATS.map(({ value, label }, i) => (
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

                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background:
                                    'linear-gradient(120deg, transparent 40%, color-mix(in srgb, var(--color-text-primary) 10%, transparent), transparent 60%)',
                            }}
                            animate={{
                                x: ['-120%', '120%'],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />

                        <motion.div
                            className="absolute bottom-6 left-6 w-240px select-none pointer-events-none"
                            animate={{
                                y: [0, -10, 0],
                                x: [0, 4, -4, 0],
                                rotate: [-0.6, 0.6, -0.6],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            style={{
                                opacity: leftHovered ? 0.35 : 0.12,
                                filter: leftHovered
                                    ? "drop-shadow(0 0 20px rgba(6,182,212,0.5))"
                                    : "none",
                            }}
                        >
                            <pre className="text-[10px] leading-snug text-(--color-text-primary) opacity-70">
                                {`
                                <div class="ui-flow">
                                    <motion.div
                                        animate={{ y: [0, -6, 0] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    >
                                        Build → Optimize → Deploy
                                    </motion.div>
                                </div>`}
                            </pre>
                        </motion.div>
                    </motion.div>

                    {/* ── Right: Accessibility card ── */}
                    <motion.div
                        variants={itemV}
                        className="relative rounded-3xl p-10 md:p-12 flex flex-col justify-between overflow-hidden"
                        style={{
                            background: 'var(--color-accent-violet)',
                            boxShadow: '0 24px 64px var(--color-accent-violet)',
                        }}
                        whileHover={{ scale: 1.02, boxShadow: '0 32px 80px rgba(139,92,246,0.5)' }}
                        transition={SPRING}
                    >
                        {/* Shimmer */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: `
                                radial-gradient(circle at 20% 30%, color-mix(in srgb, var(--color-accent-cyan) 25%, transparent), transparent 45%),
                                radial-gradient(circle at 80% 70%, color-mix(in srgb, var(--color-accent-violet) 25%, transparent), transparent 45%)`,
                                filter: 'blur(30px)',
                                mixBlendMode: 'screen',
                            }}
                            animate={{
                                x: [0, 20, -20, 0],
                                y: [0, -15, 15, 0],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
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
        </section >
    )
}

