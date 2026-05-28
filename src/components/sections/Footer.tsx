import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Mail, ArrowUp } from 'lucide-react'

const GithubIcon = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
)

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)
import { SITE_CONFIG, NAV_LINKS } from '@/config/theme.config'

const EASE_CINEMA = [0.16, 1, 0.3, 1] as const
const EASE_SPRING_F = { type: 'spring' as const, stiffness: 120, damping: 24, mass: 0.8 }

// ── Social link ────────────────────────────────────────────
function SocialLink({
    href, label, icon, color, delay,
}: {
    href: string; label: string; icon: React.ReactNode; color: string; delay: number
}) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
            style={{
                background: hovered ? `${color}20` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${hovered ? `${color}50` : 'rgba(255,255,255,0.08)'}`,
                boxShadow: hovered ? `0 4px 20px ${color}30` : 'none',
                transition: 'background 250ms, border-color 250ms, box-shadow 250ms',
            }}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_CINEMA, delay }}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {hovered && (
                <motion.span
                    className="absolute inset-0 rounded-xl"
                    style={{ background: `${color}15` }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            )}
            <span
                className="relative z-10"
                style={{ color: hovered ? color : 'var(--color-text-muted)', transition: 'color 250ms' }}
            >
                {icon}
            </span>
        </motion.a>
    )
}

// ── Nav link ───────────────────────────────────────────────
function FooterNavLink({
    label, href, delay,
}: {
    label: string; href: string; delay: number
}) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.button
            onClick={() => {
                const el = document.querySelector(href)
                el?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="relative text-sm font-medium w-fit"
            style={{
                fontFamily: 'Inter',
                color: hovered ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 200ms',
            }}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_CINEMA, delay }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {label}
            <motion.span
                className="absolute -bottom-0.5 left-0 h-px rounded-full"
                style={{
                    background: 'linear-gradient(90deg, var(--color-accent-violet), var(--color-accent-cyan))',
                }}
                initial={{ width: '0%' }}
                animate={{ width: hovered ? '100%' : '0%' }}
                transition={{ duration: 0.25, ease: EASE_CINEMA }}
            />
        </motion.button>
    )
}

// ── Scroll to top button ───────────────────────────────────
function ScrollToTop() {
    const [visible, setVisible] = useState(false)
    const [hovered, setHovered] = useState(false)

    // Show after scrolling down
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            setVisible(window.scrollY > 400)
        }, { passive: true })
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer"
                    style={{
                        background: hovered
                            ? 'linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-cyan))'
                            : 'var(--color-surface-high)',
                        border: `1px solid ${hovered ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                        boxShadow: hovered
                            ? '0 8px 32px rgba(139,92,246,0.5)'
                            : '0 4px 16px rgba(0,0,0,0.3)',
                        color: hovered ? '#fff' : 'var(--color-text-muted)',
                        transition: 'background 300ms, border-color 300ms, box-shadow 300ms, color 300ms',
                    }}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={EASE_SPRING_F}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={16} />
                </motion.button>
            )}
        </AnimatePresence>
    )
}

// ── Animated logo / name ───────────────────────────────────
function AnimatedLogo() {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            className="inline-flex items-center gap-2.5"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileHover={{ scale: 1.03 }}
            transition={EASE_SPRING_F}
        >
            <motion.div
                className="w-12 h-12 rounded-md p-2 flex items-center justify-center text-2xl font-black"
                style={{
                    background: 'var(--color-on-primary)',
                    border: '1px solid rgba(139,92,246,0.3)',
                    transition: 'background 300ms',
                }}
            >

                {/* <img src={jsLogo} alt=" Julietta Stanislaus" style={{ color: hovered ? '#fff' : 'var(--color-accent-violet)', transition: 'color 300ms' }} /> */}
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M65.357 23.8689C72.3991 23.4189 79.3449 25.736 84.437 30.6659C84.9392 31.152 85.6313 31.7165 85.9273 32.3519C85.9264 32.8461 82.452 36.1907 81.8531 36.8798C81.6391 36.6652 81.4229 36.4528 81.2046 36.2427C76.9841 32.1866 72.4938 30.0679 66.5576 30.1998C62.893 30.2811 59.1508 31.3915 56.5686 34.11C54.7756 36.0223 53.8214 38.5718 53.9183 41.1913C54.0675 46.7115 58.4914 48.9635 62.9505 50.8241C69.2179 53.4392 76.5563 54.9168 81.7086 59.5316C84.57 62.0946 86.0047 66.0373 86.0451 69.8047C86.0807 71.6492 85.6419 76.1375 84.4135 77.6858C83.9732 78.2407 82.8432 78.6851 82.1336 79.8643C81.3127 81.2285 81.3938 82.6318 80.3768 83.5734C75.8006 87.8098 69.5365 89.3955 63.5544 89.5006C55.063 89.3832 48.8386 86.9656 42.6562 81.0847C44.1653 79.4954 45.5333 78.0919 46.816 76.3077C47.0232 76.5358 47.2418 76.7532 47.4711 76.9591C52.2491 81.3047 58.4009 83.3352 64.7801 82.9899C69.2362 82.8276 73.6622 81.4248 76.7097 78.0224C79.9291 74.4707 80.6135 68.6729 77.3434 64.9175C75.3388 62.6154 72.3531 61.2588 69.5571 60.147C60.2019 56.4271 48.1603 54.4416 47.4702 42.0374C47.2135 37.6442 48.7081 33.3284 51.6269 30.0349C55.059 26.1995 60.2876 24.1528 65.357 23.8689Z" fill="var(--color-accent-violet)" />
                    <path d="M38.6077 9.08929C40.478 8.98547 43.3823 9.07333 45.3276 9.0726L45.256 46.3399L45.3378 58.0041C45.3414 64.3927 45.4009 70.2965 41.1629 75.6152C38.3201 79.1538 34.1794 81.4075 29.6643 81.8738C24.3769 82.4518 19.3937 81.5198 15.1828 78.1429C14.2802 77.4208 10.7636 73.8322 10.9191 72.6665C11.3134 71.9796 15.1937 69.4827 16.0695 68.9489C18.8892 73.0485 21.5073 75.2949 26.7037 75.4681C33.2303 75.6854 37.4724 71.3173 38.3395 65.048C38.7008 62.4354 38.6164 59.9797 38.6091 57.3452L38.6062 47.7613L38.6102 19.4917C38.6176 16.0349 38.5589 12.5379 38.6077 9.08929Z" fill="var(--color-accent-violet)" />
                    <path d="M86.1674 81.3328C87.7648 80.9689 89.3533 81.9736 89.7092 83.5728C90.0652 85.1719 89.0526 86.7555 87.4517 87.1036C85.8619 87.4491 84.2918 86.4452 83.9384 84.8571C83.585 83.2691 84.5811 81.694 86.1674 81.3328Z" fill="var(--color-primary-container)" />
                </svg>


            </motion.div>
            <span
                className="font-black tracking-tight text-xl select-none"
                style={{
                    fontFamily: 'Plus Jakarta Sans',
                    background: hovered
                        ? 'linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-cyan))'
                        : 'none',
                    WebkitBackgroundClip: hovered ? 'text' : 'unset',
                    WebkitTextFillColor: hovered ? 'transparent' : 'var(--color-text-primary)',
                    backgroundClip: hovered ? 'text' : 'unset',
                    transition: 'all 300ms',
                }}
            >
                {SITE_CONFIG.name}
            </span>
        </motion.div>
    )
}

const SOCIAL_LINKS = [
    { href: SITE_CONFIG.github, label: 'GitHub', icon: <GithubIcon size={16} />, color: '#e5e7eb' },
    { href: SITE_CONFIG.linkedin, label: 'LinkedIn', icon: <LinkedinIcon size={16} />, color: '#0ea5e9' },
    { href: `mailto:${SITE_CONFIG.email}`, label: 'Email', icon: <Mail size={16} />, color: '#8b5cf6' },
]

// ── Decorative grid background ─────────────────────────────
function FooterGrid() {
    return (
        <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
        >
            {/* Fading grid lines */}
            <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),' +
                        'linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    maskImage: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                }}
            />

            {/* Top gradient fade */}
            <div
                className="absolute top-0 left-0 right-0 h-24"
                style={{
                    background: 'linear-gradient(to bottom, var(--color-bg-base), transparent)',
                }}
            />

            {/* Violet glow bottom left */}
            <motion.div
                className="absolute bottom-0 left-0 w-96 h-64 rounded-full blur-[100px]"
                style={{ background: 'rgba(139,92,246,0.08)' }}
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Cyan glow bottom right */}
            <motion.div
                className="absolute bottom-0 right-0 w-80 h-56 rounded-full blur-[100px]"
                style={{ background: 'rgba(6,182,212,0.07)' }}
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
        </div>
    )
}

// ── Main Footer ────────────────────────────────────────────
export default function Footer() {
    const footerRef = useRef<HTMLElement>(null)
    const isInView = useInView(footerRef, { once: true, margin: '-60px' })

    return (
        <>
            {/* <ScrollToTop /> */}

            <footer
                ref={footerRef}
                className="relative border-t overflow-hidden"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                aria-label="Footer"
            >
                <FooterGrid />

                <div
                    className="relative max-w-6xl mx-auto px-4 pt-16 pb-10"
                    style={{
                        paddingLeft: 'max(16px, env(safe-area-inset-left))',
                        paddingRight: 'max(16px, env(safe-area-inset-right))',
                    }}
                >
                    {/* ── Top section: Identity + Nav + Contact ── */}
                    <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b"
                        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                    >
                        {/* Identity column */}
                        <motion.div
                            className="flex flex-col gap-4"
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, ease: EASE_CINEMA }}
                        >
                            <AnimatedLogo />
                            <p
                                className="text-[11px] font-bold uppercase tracking-[0.15em]"
                                style={{ color: 'var(--color-accent-violet)', fontFamily: 'Inter' }}
                            >
                                {SITE_CONFIG.role}
                            </p>
                            <p
                                className="text-sm leading-relaxed max-w-xs"
                                style={{ color: 'var(--color-text-muted)', fontFamily: 'Inter' }}
                            >
                                {SITE_CONFIG.tagline}
                            </p>
                            <div className="flex gap-2.5 mt-1">
                                {SOCIAL_LINKS.map((s, i) => (
                                    <SocialLink key={s.label} {...s} delay={0.08 + i * 0.07} />
                                ))}
                            </div>
                        </motion.div>

                        {/* Navigation column */}
                        <motion.div
                            className="flex flex-col gap-4 md:items-center"
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, ease: EASE_CINEMA, delay: 0.1 }}
                        >
                            <p
                                className="text-[11px] font-bold uppercase tracking-[0.15em]"
                                style={{ color: 'var(--color-text-muted)', fontFamily: 'Inter' }}
                            >
                                Navigation
                            </p>
                            <div className="flex flex-col gap-3">
                                {NAV_LINKS.map((link, i) => (
                                    <FooterNavLink
                                        key={link.label}
                                        label={link.label}
                                        href={link.href}
                                        delay={0.12 + i * 0.06}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Contact column */}
                        <motion.div
                            className="flex flex-col gap-4 md:items-end"
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, ease: EASE_CINEMA, delay: 0.2 }}
                        >
                            <p
                                className="text-[11px] font-bold uppercase tracking-[0.15em]"
                                style={{ color: 'var(--color-text-muted)', fontFamily: 'Inter' }}
                            >
                                Get in Touch
                            </p>
                            <a
                                href={`mailto:${SITE_CONFIG.email}`}
                                className="text-sm font-medium"
                                style={{
                                    color: 'var(--color-text-muted)',
                                    fontFamily: 'Inter',
                                    textDecoration: 'none',
                                    transition: 'color 200ms',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                            >
                                {SITE_CONFIG.email}
                            </a>
                            <div
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                                style={{
                                    background: 'rgba(16,185,129,0.1)',
                                    border: '1px solid rgba(16,185,129,0.2)',
                                }}
                            >
                                <motion.span
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ background: '#10b981' }}
                                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <span
                                    className="text-xs font-semibold whitespace-nowrap"
                                    style={{ fontFamily: 'Inter', color: '#10b981' }}
                                >
                                    {SITE_CONFIG.availability}
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Bottom bar ── */}
                    <motion.div
                        className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, ease: EASE_CINEMA, delay: 0.45 }}
                    >
                        <p
                            className="text-xs uppercase tracking-widest text-center sm:text-left"
                            style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)' }}
                        >
                            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
                        </p>

                        <div className="flex items-center gap-2">
                            {['React', 'TypeScript', 'Tailwind'].map((tech, i) => (
                                <motion.span
                                    key={tech}
                                    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                    style={{
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.07)',
                                        color: 'var(--color-text-muted)',
                                        fontFamily: 'Inter',
                                    }}
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.5, ease: EASE_CINEMA, delay: 0.55 + i * 0.08 }}
                                    whileHover={{
                                        background: 'rgba(139,92,246,0.12)',
                                        color: 'var(--color-accent-violet)',
                                        borderColor: 'rgba(139,92,246,0.3)',
                                        scale: 1.08,
                                    }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </footer>
        </>
    )
}