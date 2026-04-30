import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  type Variants,
} from 'framer-motion'
import { TIMELINE } from '@/config/theme.config'

// ─── Easing curves ────────────────────────────────────────
const EASE_ANIMATE: [number, number, number, number] = [0.16, 1, 0.3, 1]   // expo out — silky
const EASE_SPRING = { type: 'spring' as const, stiffness: 120, damping: 24, mass: 0.8 }

// ─── Floating particle ────────────────────────────────────
function Particle({ x, y, size, duration, delay, color }: {
  x: number; y: number; size: number
  duration: number; delay: number; color: string
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      animate={{
        y:       [0, -30, 0, 20, 0],
        x:       [0, 15, -10, 5, 0],
        opacity: [0, 0.6, 0.3, 0.7, 0],
        scale:   [0.8, 1.2, 0.9, 1.1, 0.8],
      }}
      transition={{
        duration,
        delay,
        repeat:    Infinity,
        ease:      'easeInOut',
      }}
    />
  )
}

// ─── Animated line that draws itself ──────────────────────
function AnimatedLine({ inView }: { inView: boolean }) {
  return (
    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 overflow-hidden">
      {/* Base line */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      />
      {/* Animated gradient line */}
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{
          background: 'linear-gradient(to bottom, var(--color-accent-violet), var(--color-accent-cyan), var(--color-tertiary))',
          boxShadow:  '0 0 12px rgba(139,92,246,0.6)',
        }}
        initial={{ height: '0%' }}
        animate={inView ? { height: '100%' } : { height: '0%' }}
        transition={{ duration: 2.5, ease: EASE_ANIMATE, delay: 0.3 }}
      />
      {/* Traveling light orb */}
      {inView && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{
            background: '#fff',
            boxShadow:  '0 0 16px 4px rgba(139,92,246,0.8), 0 0 32px 8px rgba(6,182,212,0.4)',
          }}
          initial={{ top: '-5%', opacity: 0 }}
          animate={{ top: '105%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, ease: EASE_ANIMATE, delay: 0.5 }}
        />
      )}
    </div>
  )
}

// ─── Mobile animated line ─────────────────────────────────
function MobileAnimatedLine({ inView }: { inView: boolean }) {
  return (
    <div className="md:hidden absolute left-4.75 top-0 bottom-0 w-0.5 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.04)' }} />
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{
          background: 'linear-gradient(to bottom, var(--color-accent-violet), var(--color-accent-cyan))',
        }}
        initial={{ height: '0%' }}
        animate={inView ? { height: '100%' } : { height: '0%' }}
        transition={{ duration: 2, ease: EASE_ANIMATE, delay: 0.2 }}
      />
    </div>
  )
}

// ─── Dot on the timeline ──────────────────────────────────
function TimelineDot({ current, index }: { current: boolean; index: number }) {
  return (
    <motion.div
      className="hidden md:flex items-center justify-center z-20"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...EASE_SPRING, delay: index * 0.18 + 0.4 }}
    >
      <div className="relative flex items-center justify-center" style={{ width: 52, height: 52 }}>
        {current && (
          <>
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="absolute inset-0 rounded-full"
                style={{ border: '1.5px solid rgba(139,92,246,0.5)' }}
                animate={{ scale: [1, 2.2 + i * 0.4], opacity: [0.7, 0] }}
                transition={{ duration: 2.5, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
        <motion.div
          className="relative z-10 rounded-full flex items-center justify-center font-black"
          style={{
            width:      current ? 42 : 34,
            height:     current ? 42 : 34,
            background: current
              ? 'linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-cyan))'
              : 'var(--color-surface-high)',
            border:     current ? 'none' : '2px solid rgba(255,255,255,0.12)',
            boxShadow:  current ? '0 0 32px rgba(139,92,246,0.7)' : 'none',
            color:      current ? '#fff' : 'var(--color-text-muted)',
            fontFamily: 'Plus Jakarta Sans',
            fontSize:   current ? '1.1rem' : '0.8rem',
          }}
          whileHover={{ scale: 1.15 }}
          transition={EASE_SPRING}
        >
          {current ? '✦' : String(TIMELINE.length - index)}
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─── Mobile dot ───────────────────────────────────────────
function MobileDot({ current, index }: { current: boolean; index: number }) {
  return (
    <motion.div
      className="md:hidden absolute left-0 top-7 flex items-center justify-center z-20"
      style={{ width: 40 }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...EASE_SPRING, delay: index * 0.15 + 0.3 }}
    >
      {current && (
        <motion.span
          className="absolute rounded-full"
          style={{
            inset:      -4,
            border:     '1.5px solid rgba(139,92,246,0.5)',
          }}
          animate={{ scale: [1, 2], opacity: [0.7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <div
        className="relative z-10 rounded-full"
        style={{
          width:      current ? 28 : 22,
          height:     current ? 28 : 22,
          background: current
            ? 'linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-cyan))'
            : 'var(--color-surface-high)',
          border:     current ? 'none' : '2px solid rgba(255,255,255,0.1)',
          boxShadow:  current ? '0 0 16px rgba(139,92,246,0.6)' : 'none',
        }}
      />
    </motion.div>
  )
}

// ─── Parallax scroll card ─────────────────────────────────
function TimelineCard({
  item, index,
}: {
  item: typeof TIMELINE[number]
  index: number
}) {
  const cardRef  = useRef<HTMLDivElement>(null)
  const isLeft   = index % 2 === 0
  const isInView = useInView(cardRef, { once: true, margin: '-60px' })

  const { scrollYProgress } = useScroll({
    target:  cardRef,
    offset:  ['start end', 'end start'],
  })

  // Parallax — tighter range, higher stiffness = no lag
  const rawY = useTransform(scrollYProgress, [0, 1], [isLeft ? 24 : 32, isLeft ? -16 : -24])
  const y = useSpring(rawY, { stiffness: 120, damping: 28 })

  const rawRot = useTransform(scrollYProgress, [0, 1], [isLeft ? 0.6 : -0.6, isLeft ? -0.4 : 0.4])
  const rotate = useSpring(rawRot, { stiffness: 100, damping: 26 })

  // No blur — transform-only for GPU compositing
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      x:       isLeft ? -56 : 56,
      scale:   0.95,
    },
    visible: {
      opacity: 1,
      x:       0,
      scale:   1,
      transition: {
        duration:        0.65,
        ease:            EASE_ANIMATE,
        delay:           index * 0.1,
        when:            'beforeChildren',
        staggerChildren: 0.07,
      },
    },
  }

  const childVariants: Variants = {
    hidden:  { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_ANIMATE } },
  }

  return (
    <div ref={cardRef} className="relative">
      {/* ── Desktop: 3-col grid  [left | dot | right] ── */}
      <div className="hidden md:grid md:grid-cols-[1fr_56px_1fr] md:items-center">

        {/* Left slot — even indexes */}
        <div className="flex justify-end pr-10">
          {isLeft && (
            <motion.div style={{ y, rotate }} className="w-full max-w-105">
              <CardInner item={item} index={index} isLeft={true}
                cardVariants={cardVariants} childVariants={childVariants} isInView={isInView} />
            </motion.div>
          )}
        </div>

        {/* Center dot */}
        <TimelineDot current={item.current} index={index} />

        {/* Right slot — odd indexes */}
        <div className="flex justify-start pl-10">
          {!isLeft && (
            <motion.div style={{ y, rotate }} className="w-full max-w-105">
              <CardInner item={item} index={index} isLeft={false}
                cardVariants={cardVariants} childVariants={childVariants} isInView={isInView} />
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="md:hidden relative pl-14">
        <MobileDot current={item.current} index={index} />
        <CardInner item={item} index={index} isLeft={false}
          cardVariants={cardVariants} childVariants={childVariants} isInView={isInView} />
      </div>
    </div>
  )
}

// ─── Card inner ───────────────────────────────────────────
function CardInner({ item, isLeft, cardVariants, childVariants, isInView }: {
  item: typeof TIMELINE[number]
  index: number
  isLeft: boolean
  cardVariants: Variants
  childVariants: Variants
  isInView: boolean
}) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={{
        scale:     1.025,
        boxShadow: item.current
          ? '0 32px 80px rgba(139,92,246,0.35), 0 0 0 1px rgba(139,92,246,0.4)'
          : '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
        transition: { duration: 0.4, ease: EASE_ANIMATE },
      }}
      className="relative rounded-2xl p-7 overflow-hidden cursor-default"
      style={{
        background:  item.current
          ? 'linear-gradient(135deg, rgba(139,92,246,0.14), rgba(6,182,212,0.07))'
          : 'var(--color-surface-container)',
        border:      item.current
          ? '1px solid rgba(139,92,246,0.35)'
          : '1px solid rgba(255,255,255,0.07)',
        boxShadow:   item.current
          ? '0 12px 40px rgba(139,92,246,0.2)'
          : '0 4px 20px rgba(0,0,0,0.25)',
        textAlign:   isLeft ? 'right' : 'left',
      }}
    >
      {/* Top shimmer bar */}
      {item.current && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background: 'linear-gradient(90deg, var(--color-accent-violet), var(--color-accent-cyan), var(--color-accent-violet))',
            backgroundSize: '200%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Glow orb inside card */}
      <div
        className="absolute pointer-events-none rounded-full blur-3xl"
        style={{
          width:      200,
          height:     200,
          background: item.current
            ? 'rgba(139,92,246,0.12)'
            : 'rgba(255,255,255,0.02)',
          top:    -60,
          right:  isLeft ? -60 : 'auto',
          left:   isLeft ? 'auto' : -60,
        }}
      />

      {/* Period */}
      <motion.div
        variants={childVariants}
        className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest"
        style={{
          fontFamily:     'Inter',
          color:          item.current ? 'var(--color-accent-violet)' : 'var(--color-text-muted)',
          justifyContent: isLeft ? 'flex-end' : 'flex-start',
        }}
      >
        {!isLeft && item.current && (
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ background: 'var(--color-accent-violet)' }}
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        {item.period}
        {isLeft && item.current && (
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ background: 'var(--color-accent-violet)' }}
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Role */}
      <motion.h3
        variants={childVariants}
        className="font-black text-xl mb-1 leading-tight"
        style={{ fontFamily: 'Plus Jakarta Sans', color: 'var(--color-text-primary)' }}
      >
        {item.role}
      </motion.h3>

      {/* Company */}
      <motion.p
        variants={childVariants}
        className="text-sm font-bold mb-4"
        style={{
          fontFamily: 'Plus Jakarta Sans',
          color:      item.current ? 'var(--color-accent-cyan)' : 'var(--color-accent-violet)',
          letterSpacing: '0.02em',
        }}
      >
        {item.company}
      </motion.p>

      {/* Description */}
      <motion.p
        variants={childVariants}
        className="text-sm leading-relaxed"
        style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)' }}
      >
        {item.description}
      </motion.p>
    </motion.div>
  )
}

// ─── Section header with scroll-driven reveal ─────────────
function SectionHeader({ inView }: { inView: boolean }) {
  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1 } },
  }
  const itemVariants = {
    hidden:  { opacity: 0, y: 32, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
      transition: { duration: 0.8, ease: EASE_ANIMATE } },
  }

  return (
    <motion.div
      className="text-center mb-24 space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <motion.div variants={itemVariants}>
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
          style={{
            background: 'rgba(255,184,105,0.1)',
            border:     '1px solid rgba(255,184,105,0.25)',
            color:      'var(--color-tertiary)',
            fontFamily: 'Inter',
          }}
        >
          Experience
        </span>
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="font-black tracking-tight"
        style={{
          fontFamily: 'Plus Jakarta Sans',
          fontSize:   'clamp(2.2rem, 6vw, 4rem)',
          color:      'var(--color-text-primary)',
          lineHeight: 1.05,
        }}
      >
        The{' '}
        <motion.span
          style={{
            background:           'linear-gradient(135deg, var(--color-tertiary), var(--color-accent-violet), var(--color-accent-cyan))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            backgroundClip:       'text',
            backgroundSize:       '200%',
          }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          Journey
        </motion.span>
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-base max-w-md mx-auto"
        style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)' }}
      >
        A decade of turning complex problems into elegant, high-performance interfaces.
      </motion.p>
    </motion.div>
  )
}

// ─── Bottom CTA ───────────────────────────────────────────
function BottomCTA() {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="mt-28 text-center"
      initial={{ opacity: 0, y: 48, scale: 0.94 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: EASE_ANIMATE }}
    >
      <motion.div
        className="inline-flex flex-col items-center gap-5 px-12 py-10 rounded-3xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(6,182,212,0.07))',
          border:     '1px solid rgba(139,92,246,0.2)',
        }}
        whileHover={{ scale: 1.02 }}
        transition={EASE_SPRING}
      >
        {/* Animated background shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
        />

        <motion.span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ fontFamily: 'Inter', color: 'var(--color-accent-cyan)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          What's Next
        </motion.span>

        <p
          className="text-2xl font-black"
          style={{ fontFamily: 'Plus Jakarta Sans', color: 'var(--color-text-primary)' }}
        >
          Ready to build something{' '}
          <span style={{ color: 'var(--color-accent-violet)' }}>extraordinary?</span>
        </p>

        <motion.button
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-10 py-3.5 rounded-xl font-bold text-sm relative overflow-hidden"
          style={{
            fontFamily: 'Plus Jakarta Sans',
            background: 'linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-cyan))',
            color:      '#fff',
            boxShadow:  '0 4px 24px rgba(139,92,246,0.4)',
          }}
          whileHover={{ scale: 1.06, boxShadow: '0 8px 40px rgba(139,92,246,0.6)' }}
          whileTap={{   scale: 0.97 }}
          transition={EASE_SPRING}
        >
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
          />
          <span className="relative z-10">Let's Connect →</span>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────
export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px' })

  // Section-level scroll progress for parallax bg
  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start end', 'end start'],
  })
  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', '30%']),
    { stiffness: 30, damping: 20 }
  )
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])

  // Particles config
  const particles = [
    { x: 8,  y: 15, size: 3, duration: 8,  delay: 0,   color: 'rgba(139,92,246,0.5)'  },
    { x: 88, y: 25, size: 4, duration: 10, delay: 1.5, color: 'rgba(6,182,212,0.4)'   },
    { x: 15, y: 65, size: 2, duration: 7,  delay: 3,   color: 'rgba(255,184,105,0.4)' },
    { x: 92, y: 70, size: 3, duration: 9,  delay: 0.8, color: 'rgba(139,92,246,0.35)' },
    { x: 50, y: 10, size: 2, duration: 11, delay: 2,   color: 'rgba(6,182,212,0.3)'   },
    { x: 30, y: 85, size: 4, duration: 8,  delay: 4,   color: 'rgba(139,92,246,0.3)'  },
    { x: 70, y: 45, size: 2, duration: 12, delay: 1,   color: 'rgba(255,184,105,0.3)' },
    { x: 5,  y: 50, size: 3, duration: 9,  delay: 5,   color: 'rgba(6,182,212,0.35)'  },
  ]

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-14 md:py-20 overflow-hidden"
      aria-label="Career timeline"
    >
      {/* ── Parallax background ── */}
      <motion.div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ y: bgY, scale: bgScale }}
      >
        {/* Deep violet glow */}
        <motion.div
          className="absolute rounded-full blur-[160px]"
          style={{
            width: '70%', height: '70%',
            top: '10%', left: '-10%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale:   [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Cyan glow */}
        <motion.div
          className="absolute rounded-full blur-[140px]"
          style={{
            width: '60%', height: '60%',
            bottom: '0%', right: '-5%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
          }}
          animate={{
            scale:   [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        {/* Amber glow */}
        <motion.div
          className="absolute rounded-full blur-[120px]"
          style={{
            width: '40%', height: '40%',
            top: '40%', left: '30%',
            background: 'radial-gradient(circle, rgba(255,184,105,0.08) 0%, transparent 70%)',
          }}
          animate={{
            scale:   [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
      </motion.div>

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {particles.map((p, i) => <Particle key={i} {...p} />)}
      </div>

      <div
        className="max-w-6xl mx-auto px-4 relative"
        style={{
          paddingLeft:  'max(16px, env(safe-area-inset-left))',
          paddingRight: 'max(16px, env(safe-area-inset-right))',
        }}
      >
        {/* Header */}
        <SectionHeader inView={isInView} />

        {/* Timeline */}
        <div className="relative">
          <AnimatedLine inView={isInView} />
          <MobileAnimatedLine inView={isInView} />

          <div className="space-y-16 md:space-y-24">
            {TIMELINE.map((item, i) => (
              <TimelineCard key={item.company} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <BottomCTA />
      </div>
    </section>
  )
}