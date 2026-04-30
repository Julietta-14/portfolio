import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { NAV_LINKS, SITE_CONFIG } from '@/config/theme.config'
import { MoonStar, Sun } from 'lucide-react'

export default function Navbar() {
  const { toggleTheme, isDark } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''))
    const observers: IntersectionObserver[] = []

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        {
          threshold: 0,
          rootMargin: '-40% 0px -55% 0px'
        }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500"
        style={{ paddingTop: scrolled ? '8px' : '20px' }}
      >
        <div
          className="glass w-full max-w-6xl flex items-center justify-between px-6 transition-all duration-500"
          style={{
            borderRadius: scrolled ? '0.75rem' : '1rem',
            paddingTop: scrolled ? '10px' : '14px',
            paddingBottom: scrolled ? '10px' : '14px',
            boxShadow: scrolled
              ? '0 8px 32px rgba(139,92,246,0.15)'
              : '0 4px 16px rgba(0,0,0,0.2)',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="font-black tracking-tighter text-lg select-none"
            style={{
              fontFamily: 'Plus Jakarta Sans',
              color: 'var(--color-text-primary)',
            }}
            aria-label="Back to top"
          >
            {SITE_CONFIG.name}
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 cursor-pointer rounded-lg text-sm font-semibold${!isActive ? ' hover-pill' : ''}`}
                  style={{
                    fontFamily: 'Plus Jakarta Sans',
                    color: isActive
                      ? 'var(--color-accent-violet)'
                      : 'var(--color-text-muted)',
                    background: isActive ? 'rgba(139,92,246,0.1)' : 'transparent',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: 'var(--color-accent-violet)' }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right side: Theme toggle + Contact CTA */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              className="relative w-10 h-10 rounded-lg flex items-center justify-center hover-ring cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--color-text-secondary)',
              }}
              data-cursor="hover"
            >
              <span
                className="text-lg select-none transition-all duration-300"
                style={{ transform: isDark ? 'rotate(0deg)' : 'rotate(360deg)' }}
              >
                {isDark ? <Sun></Sun> : <MoonStar></MoonStar>}
              </span>
            </button>

            {/* Contact CTA — desktop */}
            <button
              onClick={() => handleNavClick('#contact')}
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold hover-glow-violet hover-shimmer"
              style={{
                fontFamily: 'Plus Jakarta Sans',
                background: 'var(--color-primary-container)',
                color: 'var(--color-on-primary)',
              }}
            >
              Contact
            </button>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="md:hidden w-10 h-10 rounded-lg flex flex-col items-center justify-center gap-1.25 transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <span
                className="block w-5 h-[1.5px] transition-all duration-300 origin-center"
                style={{
                  background: 'var(--color-text-primary)',
                  transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block w-5 h-[1.5px] transition-all duration-300"
                style={{
                  background: 'var(--color-text-primary)',
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? 'scaleX(0)' : 'none',
                }}
              />
              <span
                className="block w-5 h-[1.5px] transition-all duration-300 origin-center"
                style={{
                  background: 'var(--color-text-primary)',
                  transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-500"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          background: 'rgba(10,10,11,0.85)',
          backdropFilter: 'blur(16px)',
        }}
        aria-hidden={!menuOpen}
      >
        <div
          ref={menuRef}
          className="absolute top-24 left-4 right-4 rounded-2xl p-6 space-y-2"
          style={{
            background: 'var(--color-surface-container)',
            border: '1px solid rgba(255,255,255,0.08)',
            transform: menuOpen ? 'translateY(0) scale(1)' : 'translateY(-16px) scale(0.97)',
            transition: 'transform 400ms var(--ease-out-expo)',
          }}
        >
          {NAV_LINKS.map((link, i) => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-4 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-between"
                style={{
                  fontFamily: 'Plus Jakarta Sans',
                  color: isActive ? 'var(--color-accent-violet)' : 'var(--color-text-primary)',
                  background: isActive ? 'rgba(139,92,246,0.1)' : 'transparent',
                  transitionDelay: `${i * 40}ms`,
                }}
              >
                {link.label}
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </button>
            )
          })}

          <div className="pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => handleNavClick('#contact')}
              className="w-full py-4 rounded-xl font-bold text-base hover-glow-violet hover-shimmer"
              style={{
                fontFamily: 'Plus Jakarta Sans',
                background: 'var(--color-primary-container)',
                color: 'var(--color-on-primary)',
              }}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </>
  )
}