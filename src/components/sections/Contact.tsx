import { useRef, useState, useCallback } from 'react'
import {
    motion,
    useInView,
    useScroll,
    useTransform,
    useSpring,
    AnimatePresence,
    type Variants,
} from 'framer-motion'
import { Mail, ShieldCheck, Send, RotateCcw, Check } from 'lucide-react'
import { SITE_CONFIG } from '@/config/theme.config'

// ── Easing ─────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const SPRING = { type: 'spring' as const, stiffness: 140, damping: 22, mass: 0.7 }

// ── Types ──────────────────────────────────────────────────
type FormState = 'idle' | 'sending' | 'success' | 'error'
interface FormData { name: string; email: string; message: string }
interface FormErrors { name?: string; email?: string; message?: string }

// ── CSS-var surfaces ───────────────────────────────────────
const S = {
    surface: 'var(--color-surface-container)',
    surfaceLow: 'var(--color-surface-low)',
    border: '1px solid var(--color-outline-variant)',
    borderFocus: '1px solid var(--color-accent-violet)',
    borderError: '1px solid rgba(239,68,68,0.65)',
    borderHasVal: '1px solid var(--color-outline)',
} as const

// ── Validation ─────────────────────────────────────────────
function validate(form: FormData): FormErrors {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = 'Name is required'
    else if (form.name.trim().length < 2) e.name = 'Name is too short'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
        e.email = 'Enter a valid email address'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 20) e.message = 'Minimum 20 characters'
    return e
}

// ── Brand icon — LinkedIn ──────────────────────────────────
function LinkedInIcon({ size = 18 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <rect width="24" height="24" rx="4" fill="#0A66C2" />
            <path fill="#fff" d="M7.75 10.5H5.25v8h2.5v-8zm-1.25-4a1.44 1.44 0 1 0 0 2.88A1.44 1.44 0 0 0 6.5 6.5zm11 4c-1.38 0-2.24.76-2.5 1.5v-1.5H12.5v8h2.5v-4.25c0-1.14.46-2 1.5-2 .96 0 1.5.7 1.5 2V18.5h2.5v-4.5c0-2.35-1.26-3.5-3-3.5z" />
        </svg>
    )
}

// ── Brand icon — GitHub ────────────────────────────────────
function GitHubIcon({ size = 18 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <rect width="24" height="24" rx="4" fill="#24292F" />
            <path fill="#fff" d="M12 2.247c-5.523 0-10 4.477-10 10a10 10 0 0 0 6.84 9.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.247c0-5.523-4.477-10-10-10z" />
        </svg>
    )
}

// ── Floating orb ───────────────────────────────────────────
function FloatingOrb({ size, x, y, color, duration, delay }: {
    size: number; x: string; y: string; color: string; duration: number; delay: number
}) {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ width: size, height: size, left: x, top: y, background: color, filter: 'blur(70px)' }}
            animate={{ y: [0, -35, 15, -15, 0], x: [0, 18, -12, 8, 0], opacity: [0.35, 0.6, 0.25, 0.55, 0.35] }}
            transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
        />
    )
}

// ── Form field with validation ─────────────────────────────
function FormField({ label, type = 'text', value, onChange, placeholder, multiline = false, delay = 0, error }: {
    label: string; type?: string; value: string
    onChange: (v: string) => void; placeholder: string
    multiline?: boolean; delay?: number; error?: string
}) {
    const [focused, setFocused] = useState(false)
    const hasValue = value.length > 0
    const hasError = !!error

    const fieldStyle: React.CSSProperties = {
        width: '100%',
        background: focused ? 'rgba(139,92,246,0.05)' : S.surfaceLow,
        border: hasError ? S.borderError : focused ? S.borderFocus : hasValue ? S.borderHasVal : S.border,
        borderRadius: '0.75rem',
        padding: '0.875rem 1rem',
        color: 'var(--color-text-primary)',
        fontFamily: 'Inter',
        fontSize: '0.9rem',
        outline: 'none',
        transition: 'border-color 250ms, background 250ms, box-shadow 250ms',
        boxShadow: hasError
            ? '0 0 0 3px rgba(239,68,68,0.1)'
            : focused
                ? '0 0 0 3px rgba(139,92,246,0.14), 0 2px 12px rgba(139,92,246,0.08)'
                : 'none',
        resize: 'none' as const,
        lineHeight: 1.65,
    }

    return (
        <motion.div
            className="flex flex-col gap-1.5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE, delay }}
        >
            <label
                className="text-[11px] font-bold uppercase tracking-[0.12em] px-0.5"
                style={{
                    fontFamily: 'Inter',
                    color: hasError ? 'rgba(239,68,68,0.9)' : focused ? 'var(--color-accent-violet)' : 'var(--color-text-muted)',
                    transition: 'color 250ms',
                }}
            >
                {label}
            </label>

            {multiline ? (
                <textarea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={placeholder}
                    rows={5}
                    style={{ ...fieldStyle, minHeight: 128 }}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={placeholder}
                    style={fieldStyle}
                />
            )}

            {/* Inline error */}
            <AnimatePresence>
                {hasError && (
                    <motion.span
                        className="text-[11px] px-1"
                        style={{ fontFamily: 'Inter', color: 'rgba(239,68,68,0.9)' }}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                    >
                        {error}
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Focus underline */}
            <motion.div
                className="h-px rounded-full mx-1 pointer-events-none -mt-1"
                style={{ background: 'linear-gradient(90deg, var(--color-accent-violet), var(--color-accent-cyan))' }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: focused && !hasError ? 1 : 0, opacity: focused && !hasError ? 1 : 0 }}
                transition={{ duration: 0.25, ease: EASE }}
            />
        </motion.div>
    )
}

// ── Connect link ───────────────────────────────────────────
function ConnectLink({ iconEl, label, value, href, delay }: {
    iconEl: React.ReactNode; label: string; value: string; href: string; delay: number
}) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl"
            style={{ background: S.surface, border: S.border }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE, delay }}
            whileHover={{ x: 4, boxShadow: '0 6px 28px rgba(139,92,246,0.18)' }}
        >
            <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
                style={{ background: 'rgba(139,92,246,0.08)' }}
            >
                {iconEl}
            </div>
            <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold uppercase tracking-widest mb-0.5"
                    style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)' }}>
                    {label}
                </span>
                <span className="block text-sm font-semibold truncate"
                    style={{ fontFamily: 'Plus Jakarta Sans', color: 'var(--color-text-primary)' }}>
                    {value}
                </span>
            </div>
            <span className="text-sm opacity-40 group-hover:opacity-100"
                style={{ color: 'var(--color-accent-violet)' }}>
                →
            </span>
        </motion.a>
    )
}

// ── Send button ────────────────────────────────────────────
function SendButton({ state, onClick }: { state: FormState; onClick: () => void }) {
    const MAP: Record<FormState, { label: string; bg: string; shadow: string }> = {
        idle: { label: 'Send Message', bg: 'linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-cyan))', shadow: '0 4px 24px rgba(139,92,246,0.4)' },
        sending: { label: 'Sending…', bg: 'linear-gradient(135deg, rgba(139,92,246,0.65), rgba(6,182,212,0.65))', shadow: 'none' },
        success: { label: 'Sent!', bg: 'linear-gradient(135deg, #10b981, #059669)', shadow: '0 4px 20px rgba(16,185,129,0.4)' },
        error: { label: 'Try Again', bg: 'linear-gradient(135deg, #ef4444, #dc2626)', shadow: '0 4px 20px rgba(239,68,68,0.3)' },
    }
    const { label, bg, shadow } = MAP[state]
    const disabled = state === 'sending' || state === 'success'

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className="relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm overflow-hidden"
            style={{
                fontFamily: 'Plus Jakarta Sans', background: bg, color: '#fff', boxShadow: shadow,
                cursor: disabled ? 'not-allowed' : 'pointer'
            }}
            whileHover={!disabled ? { scale: 1.04, boxShadow: '0 8px 40px rgba(139,92,246,0.55)' } : {}}
            whileTap={!disabled ? { scale: 0.97 } : {}}
            transition={SPRING}
        >
            {/* Shimmer sweep on idle */}
            {state === 'idle' && (
                <motion.span className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)' }}
                    animate={{ x: ['-120%', '220%'] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', repeatDelay: 1.8 }}
                />
            )}

            <AnimatePresence mode="wait">
                <motion.span key={state} className="relative z-10 flex items-center gap-2"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                    {state === 'sending' && (
                        <motion.span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full shrink-0"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                        />
                    )}
                    {state === 'idle' && <Send size={14} strokeWidth={2.5} className="shrink-0" />}
                    {state === 'success' && <Check size={14} strokeWidth={3} className="shrink-0" />}
                    {label}
                </motion.span>
            </AnimatePresence>
        </motion.button>
    )
}

// ── Success overlay ────────────────────────────────────────
function SuccessOverlay({ onReset }: { onReset: () => void }) {
    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl z-20"
            style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
        >
            {/* Ripple rings */}
            {[0, 1, 2].map(i => (
                <motion.div key={i} className="absolute rounded-full pointer-events-none"
                    style={{ border: '1.5px solid rgba(16,185,129,0.4)' }}
                    initial={{ width: 64, height: 64, opacity: 1 }}
                    animate={{ width: 200 + i * 80, height: 200 + i * 80, opacity: 0 }}
                    transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: 'easeOut' }}
                />
            ))}

            {/* Check circle */}
            <motion.div
                className="relative z-10 flex items-center justify-center mb-5 rounded-full"
                style={{
                    width: 72, height: 72,
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    boxShadow: '0 0 56px rgba(16,185,129,0.55)'
                }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ ...SPRING, delay: 0.12 }}
            >
                <Check size={32} strokeWidth={3} color="#fff" />
            </motion.div>

            <motion.h3 className="text-2xl font-black mb-2"
                style={{ fontFamily: 'Plus Jakarta Sans', color: '#F8F9FA' }}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.28 }}>
                Message Sent!
            </motion.h3>

            <motion.p className="text-sm mb-8 text-center px-8"
                style={{ fontFamily: 'Inter', color: 'rgba(248,249,250,0.6)', lineHeight: 1.65 }}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.38 }}>
                Thanks for reaching out. I'll get back to you within 24 hours.
            </motion.p>

            <motion.button
                onClick={onReset}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm"
                style={{
                    fontFamily: 'Plus Jakarta Sans', background: 'rgba(255,255,255,0.1)',
                    color: '#F8F9FA', border: '1px solid rgba(255,255,255,0.18)'
                }}
                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.18)' }}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <RotateCcw size={13} strokeWidth={2.5} />
                Send Another
            </motion.button>
        </motion.div>
    )
}

// ── Main section ───────────────────────────────────────────
export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

    const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' })
    const [errors, setErrors] = useState<FormErrors>({})
    const [state, setState] = useState<FormState>('idle')

    // Anti-spam: honeypot field value
    const [_trap, setTrap] = useState('')
    // Anti-spam: time-gate (filled in < 1.5 s = bot) + 30 s cooldown
    const formStartRef = useRef(Date.now())
    const lastSubmitRef = useRef(0)

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
    const bgY = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '18%']), { stiffness: 60, damping: 24 })

    const updateForm = useCallback((key: keyof FormData) => (val: string) => {
        setForm(prev => ({ ...prev, [key]: val }))
        setErrors(prev => ({ ...prev, [key]: undefined }))
    }, [])

    /* const handleSend = () => {
        // 1. Honeypot - silent fake success to fool bots
        if (_trap) { setState('success'); return }

        // 2. Time gate - form submitted in under 1.5 s is almost certainly a bot
        if (Date.now() - formStartRef.current < 1500) { setState('success'); return }

        // 3. Rate limit - prevent hammering (30s cooldown)
        if (lastSubmitRef.current && Date.now() - lastSubmitRef.current < 30_000) return

        const errs = validate(form)
        setErrors(errs)
        if (Object.keys(errs).length > 0) return

        setState('sending')
        lastSubmitRef.current = Date.now()
        setTimeout(() => setState('success'), 2000)
    } */

    /* Web 3 Form Integrated */
    const handleSend = async () => {
        // 1. Honeypot
        if (_trap) { setState('success'); return }

        // 2. Time gate
        if (Date.now() - formStartRef.current < 1500) { setState('success'); return }

        // 3. Rate limit
        if (lastSubmitRef.current && Date.now() - lastSubmitRef.current < 30_000) return

        // 4. Validate
        const errs = validate(form)
        setErrors(errs)
        if (Object.keys(errs).length > 0) return

        setState('sending')
        lastSubmitRef.current = Date.now()

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_KEY,
                    name: form.name.trim(),
                    email: form.email.trim(),
                    message: form.message.trim(),
                    subject: `Portfolio Contact from ${form.name.trim()}`,
                    from_name: 'Julietta Portfolio',
                    botcheck: '',   // Web3Forms honeypot field
                }),
            })

            const data = await res.json()

            if (data.success) {
                setState('success')
            } else {
                console.error('Web3Forms error:', data)
                setState('error')
            }
        } catch (err) {
            console.error('Network error:', err)
            setState('error')
        }
    }

    const handleReset = () => {
        setForm({ name: '', email: '', message: '' })
        setErrors({})
        setState('idle')
        formStartRef.current = Date.now()
        lastSubmitRef.current = 0
    }

    const CONNECT_LINKS = [
        { iconEl: <Mail size={18} color="var(--color-accent-violet)" />, label: 'Email', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}`, delay: 0.35 },
        { iconEl: <LinkedInIcon size={18} />, label: 'LinkedIn', value: SITE_CONFIG.linkedin, href: SITE_CONFIG.linkedin, delay: 0.43 },
        { iconEl: <GitHubIcon size={18} />, label: 'GitHub', value: SITE_CONFIG.github, href: SITE_CONFIG.github, delay: 0.51 },
    ]

    const headerV: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    }
    const itemV: Variants = {
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
    }

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative py-14 md:py-26 overflow-hidden"
            aria-label="Contact"
        >
            {/* Parallax bg orbs */}
            <motion.div className="absolute inset-0 -z-10 pointer-events-none" style={{ y: bgY }}>
                <FloatingOrb size={500} x="-6%" y="6%" color="rgba(139,92,246,0.12)" duration={13} delay={0} />
                <FloatingOrb size={400} x="60%" y="-5%" color="rgba(6,182,212,0.09)" duration={15} delay={2} />
                <FloatingOrb size={300} x="78%" y="60%" color="rgba(255,184,105,0.07)" duration={11} delay={4} />
                <FloatingOrb size={340} x="20%" y="70%" color="rgba(139,92,246,0.08)" duration={17} delay={1} />
            </motion.div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">

                {/* ── Header ─────────────────────────────── */}
                <motion.div
                    className="text-center mb-14 md:mb-20 space-y-5"
                    variants={headerV}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <motion.div variants={itemV}>
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                            style={{
                                background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)',
                                color: 'var(--color-accent-cyan)', fontFamily: 'Inter'
                            }}>
                            Let's Connect
                        </span>
                    </motion.div>

                    <motion.h2 variants={itemV}
                        className="font-black tracking-tight"
                        style={{
                            fontFamily: 'Plus Jakarta Sans', fontSize: 'clamp(2rem, 5.5vw, 3.75rem)',
                            color: 'var(--color-text-primary)', lineHeight: 1.08
                        }}>
                        Available for{' '}
                        <motion.span
                            style={{
                                background: 'linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-cyan))',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text', backgroundSize: '200%'
                            }}
                            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                            select projects.
                        </motion.span>
                    </motion.h2>

                    <motion.p variants={itemV}
                        className="text-base max-w-md mx-auto"
                        style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                        Open to senior-level UI engineering roles and high-impact design collaborations.
                    </motion.p>
                </motion.div>

                {/* ── Two-column body ─────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-stretch">

                    {/* LEFT sidebar */}
                    <motion.aside
                        className="flex flex-col gap-3 order-2 lg:order-1"
                        initial={{ opacity: 0, x: -28 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
                    >
                        <p className="text-xs font-bold uppercase tracking-[0.15em] mb-0.5 px-0.5"
                            style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)' }}>
                            Reach out
                        </p>

                        {CONNECT_LINKS.map(l => <ConnectLink key={l.label} {...l} />)}

                        {/* Collab card — grows to fill remaining height */}
                        <motion.div
                            className="flex-1 mt-1 p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between"
                            style={{ background: S.surface, border: S.border, minHeight: 160 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.65, ease: EASE, delay: 0.65 }}
                            whileHover={{ scale: 1.012, boxShadow: '0 12px 36px rgba(139,92,246,0.15)' }}
                            whileTap={{ scale: 0.99 }}
                        >
                            {/* Animated top gradient line */}
                            <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                                style={{ background: 'linear-gradient(90deg, var(--color-accent-violet), var(--color-accent-cyan), var(--color-accent-violet))', backgroundSize: '200%' }}
                                animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            />
                            {/* Shimmer sweep */}
                            <motion.div className="absolute inset-0 pointer-events-none"
                                style={{ background: 'linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.04) 50%, transparent 62%)' }}
                                animate={{ x: ['-110%', '210%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3.5 }}
                            />

                            <div>
                                <h4 className="font-black text-base mb-2"
                                    style={{ fontFamily: 'Plus Jakarta Sans', color: 'var(--color-text-primary)' }}>
                                    Resume
                                </h4>
                                <p className="text-sm"
                                    style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                                    Senior UI Developer with expertise in design systems, React architecture, and immersive web experiences.
                                </p>
                            </div>
                            <a
                                href="/portfolio/Resume-JuliettaStanislaus.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-bold mt-3 inline-flex items-center gap-1.5 hover:underline"
                                style={{ fontFamily: 'Plus Jakarta Sans', color: 'var(--color-accent-cyan)' }}
                            >
                                View Resume →
                            </a>
                        </motion.div>
                    </motion.aside>

                    {/* RIGHT form card */}
                    <motion.div
                        className="order-1 lg:order-2"
                        initial={{ opacity: 0, x: 28 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
                    >
                        <div className="relative h-full rounded-2xl p-7 md:p-10 overflow-hidden"
                            style={{
                                background: S.surface, border: S.border,
                                boxShadow: '0 24px 64px rgba(0,0,0,0.1)'
                            }}>

                            {/* Animated gradient top bar */}
                            <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                                style={{ background: 'linear-gradient(90deg, var(--color-accent-violet), var(--color-accent-cyan), var(--color-accent-violet))', backgroundSize: '200%' }}
                                animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            />

                            {/* Corner ambient glow */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }}
                            />

                            {/* ── Honeypot (anti-spam) — visually hidden, bots fill it ── */}
                            <input
                                type="text"
                                name="website"
                                value={_trap}
                                onChange={e => setTrap(e.target.value)}
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                style={{ position: 'absolute', left: '-9999px', top: 0, opacity: 0, pointerEvents: 'none' }}
                            />

                            {/* Name + Email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                                <FormField label="Name" value={form.name} onChange={updateForm('name')}
                                    placeholder="John Doe" delay={0.4} error={errors.name} />
                                <FormField label="Email" type="email" value={form.email} onChange={updateForm('email')}
                                    placeholder="john@example.com" delay={0.48} error={errors.email} />
                            </div>

                            {/* Message */}
                            <div className="mb-7">
                                <FormField label="Message" value={form.message} onChange={updateForm('message')}
                                    placeholder="Tell me about your project or opportunity…"
                                    multiline delay={0.56} error={errors.message} />
                            </div>

                            {/* Footer row */}
                            <motion.div
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, ease: EASE, delay: 0.64 }}
                            >
                                <div className="flex items-center gap-1">
                                    <ShieldCheck size={15} strokeWidth={2}
                                        style={{ color: 'var(--color-accent-violet)', flexShrink: 0 }} />
                                    <span className="text-xs" style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)' }}>
                                        Spam protected.
                                    </span>
                                </div>
                                <SendButton state={state} onClick={handleSend} />
                                
                            </motion.div>

                            {/* Success overlay */}
                            <AnimatePresence>
                                {state === 'success' && <SuccessOverlay onReset={handleReset} />}
                            </AnimatePresence>
                            <AnimatePresence>
                                    {state === 'error' && (
                                        <motion.p
                                            className="text-xs mt-2 text-center sm:text-right w-full"
                                            style={{ fontFamily: 'Inter', color: 'rgba(239,68,68,0.9)' }}
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            Something went wrong. Please try again or email directly.
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
