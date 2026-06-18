import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const modules = import.meta.glob<{ default: string }>(
  '../../assets/images/appreaciation-*.{png,jpg,jpeg,webp}',
  { eager: true }
)

const IMAGES = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, mod], i) => ({
    src: mod.default,
    label: `0${i + 1}`,
  }))

// ─── Lightbox with prev / next ────────────────────────────
function Lightbox({
  images,
  activeIndex,
  onClose,
  onChange,
}: {
  images: typeof IMAGES
  activeIndex: number
  onClose: () => void
  onChange: (i: number) => void
}) {
  const prev = () => onChange((activeIndex - 1 + images.length) % images.length)
  const next = () => onChange((activeIndex + 1) % images.length)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(10,10,11,0.95)', backdropFilter: 'blur(20px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.22, ease: EASE_OUT }}
        onClick={e => e.stopPropagation()}
      >
        {/* Chrome bar */}
        <div
          className="flex items-center justify-between px-5 py-3 rounded-t-2xl"
          style={{
            background: 'var(--color-surface-highest)',
            border: '1px solid var(--color-outline-variant)',
            borderBottom: 'none',
          }}
        >
          <div
            className="text-xs font-bold uppercase tracking-widest"
            style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)' }}
          >
            Appreciation · {images[activeIndex].label}
          </div>
          <div className="flex items-center gap-4">
            <div
              className="text-xs tabular-nums"
              style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)' }}
            >
              {activeIndex + 1} / {images.length}
            </div>
            <div className="flex items-center gap-1.5">
              {['#FF5F57', '#FFBD2E', '#28C840'].map(c => (
                <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          style={{
            background: 'var(--color-surface-low)',
            border: '1px solid var(--color-outline-variant)',
            borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={images[activeIndex].src}
              alt={`Appreciation ${images[activeIndex].label}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.18, ease: EASE_OUT }}
              style={{
                display: 'block',
                width: '100%',
                maxHeight: '72vh',
                objectFit: 'contain',
              }}
            />
          </AnimatePresence>
        </div>

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={e => { e.stopPropagation(); prev() }}
              className="absolute top-1/2 -translate-y-1/2 -left-14 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover-ring"
              style={{
                background: 'var(--color-surface-highest)',
                border: '1px solid var(--color-outline-variant)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={e => { e.stopPropagation(); next() }}
              className="absolute top-1/2 -translate-y-1/2 -right-14 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover-ring"
              style={{
                background: 'var(--color-surface-highest)',
                border: '1px solid var(--color-outline-variant)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); onChange(i) }}
                className="rounded-full cursor-pointer"
                style={{
                  width: i === activeIndex ? 20 : 6,
                  height: 6,
                  background: i === activeIndex
                    ? 'var(--color-accent-violet)'
                    : 'var(--color-surface-highest)',
                  border: '1px solid var(--color-outline-variant)',
                  padding: 0,
                  transition: 'width 0.22s ease, background 0.22s ease',
                }}
              />
            ))}
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer hover-ring"
          style={{
            background: 'var(--color-surface-highest)',
            border: '1px solid var(--color-outline-variant)',
            color: 'var(--color-text-secondary)',
          }}
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  )
}

// ─── Card ─────────────────────────────────────────────────
function AppreciationCard({
  src,
  label,
  index,
  onClick,
}: {
  src: string
  label: string
  index: number
  onClick: () => void
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay: index * 0.08 }}
      onClick={onClick}
      className="appr-card group cursor-pointer rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'var(--color-surface-container)',
        border: '1px solid var(--color-outline-variant)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.28)',
        willChange: 'transform',
        transition: 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease',
      }}
    >
      {/* Gradient top accent */}
      <div
        className="h-0.5 w-full shrink-0"
        style={{
          background: 'linear-gradient(90deg, var(--color-accent-violet), var(--color-accent-cyan))',
        }}
      />

      {/* Image area — tall enough to read */}
      <div
        className="relative overflow-hidden"
        style={{
          height: '280px',
          background: 'var(--color-surface-dim)',
        }}
      >
        <img
          src={src}
          alt={`Appreciation ${label}`}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '10px',
          }}
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
          style={{
            background: 'rgba(139,92,246,0.14)',
            backdropFilter: 'blur(1px)',
            transition: 'opacity 0.22s ease',
          }}
        >
          <div
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              background: 'var(--color-surface-highest)',
              border: '1px solid var(--color-accent-violet)',
              color: 'var(--color-accent-violet)',
              fontFamily: 'Inter',
              boxShadow: '0 4px 20px rgba(139,92,246,0.35)',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            View Full
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{ borderTop: '1px solid var(--color-outline-variant)' }}
      >
        <div className="flex items-center gap-2.5">
          {/* Icon badge */}
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(6,182,212,0.1))',
              border: '1px solid rgba(139,92,246,0.25)',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" fill="rgba(139,92,246,0.3)" stroke="var(--color-accent-violet)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p
              className="text-xs font-semibold leading-tight"
              style={{ fontFamily: 'Plus Jakarta Sans', color: 'var(--color-text-primary)' }}
            >
              Appreciation
            </p>
            <p
              className="text-xs leading-tight"
              style={{ fontFamily: 'Inter', color: 'var(--color-accent-violet)', opacity: 0.75 }}
            >
              {label}
            </p>
          </div>
        </div>

        {/* Expand icon */}
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 opacity-40 group-hover:opacity-100"
          style={{
            border: '1px solid var(--color-outline-variant)',
            color: 'var(--color-text-muted)',
            transition: 'opacity 0.2s ease',
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Main section ─────────────────────────────────────────
export default function Appreciation() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (IMAGES.length === 0) return null

  return (
    <section
      id="appreciation"
      className="relative py-16 md:py-24 overflow-hidden"
      aria-label="Appreciation from managers and leads"
    >
      {/* Static ambient glows — no animation, zero GPU cost */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: '50%', height: '50%',
            top: '5%', left: '25%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full blur-2xl"
          style={{
            width: '30%', height: '40%',
            bottom: '5%', right: '8%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
          }}
        />
      </div>

      <div
        className="max-w-6xl mx-auto px-4 relative"
        style={{
          paddingLeft: 'max(16px, env(safe-area-inset-left))',
          paddingRight: 'max(16px, env(safe-area-inset-right))',
        }}
      >
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
          >
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{
                background: 'rgba(139,92,246,0.1)',
                border: '1px solid rgba(139,92,246,0.3)',
                color: 'var(--color-accent-violet)',
                fontFamily: 'Inter',
              }}
            >
              Recognition
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.08 }}
            className="font-black tracking-tight"
            style={{
              fontFamily: 'Plus Jakarta Sans',
              fontSize: 'clamp(2.2rem, 6vw, 4rem)',
              color: 'var(--color-text-primary)',
              lineHeight: 1.05,
            }}
          >
            Words of{' '}
            <motion.span
              style={{
                background: 'linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-cyan), var(--color-tertiary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200%',
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            >
              Appreciation
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.16 }}
            className="text-base max-w-lg mx-auto"
            style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)', lineHeight: 1.7 }}
          >
            Kind recognition from the managers and leads I've had the privilege of working alongside.
          </motion.p>
        </div>

        {/* Card grid — 3 columns keeps images readable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMAGES.map((img, i) => (
            <AppreciationCard
              key={img.src}
              src={img.src}
              label={img.label}
              index={i}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>

        {/* Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <div
            className="flex items-center gap-2 text-xs"
            style={{ fontFamily: 'Inter', color: 'var(--color-text-muted)' }}
          >
            <div className="w-4 h-px" style={{ background: 'var(--color-accent-violet)' }} />
            Click any card to view full screenshot
            <div className="w-4 h-px" style={{ background: 'var(--color-accent-cyan)' }} />
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={IMAGES}
            activeIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onChange={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
