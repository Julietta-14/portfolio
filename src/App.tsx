import { Suspense, lazy } from 'react'
import { ThemeProvider } from '@/context/ThemeContext'
import CustomCursor from '@/components/ui/CustomCursor'
import PageTransition from '@/components/ui/PageTransition'
import ScrollProgress      from '@/components/ui/ScrollProgress'

// Sections (will build these next)
const Navbar = lazy(() => import('@/components/sections/Navbar'))
const Hero = lazy(() => import('@/components/sections/Hero'))
const Skills = lazy(() => import('@/components/sections/Skills'))
const Projects = lazy(() => import('@/components/sections/Projects'))
const Stats    = lazy(() => import('@/components/sections/Stats'))
const Timeline = lazy(() => import('@/components/sections/Timeline'))
const Contact = lazy(() => import('@/components/sections/Contact'))
const Footer = lazy(() => import('@/components/sections/Footer'))

function SectionFallback() {
  return (
    <div className="w-full py-24 flex items-center justify-center">
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--color-accent-violet)', borderTopColor: 'transparent' }}
      />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="noise relative min-h-dvh cursor-none">

        {/* Page wipe transition on load */}
        <PageTransition />
        <ScrollProgress />

        {/* Custom cursor (desktop only) */}
        <CustomCursor />

        {/* Ambient background glows — fixed, behind everything */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[140px] opacity-20"
            style={{ background: 'var(--color-accent-violet)' }}
          />
          <div
            className="absolute bottom-[10%] right-[-10%] w-[50%] h-[60%] rounded-full blur-[140px] opacity-15"
            style={{ background: 'var(--color-accent-cyan)' }}
          />
        </div>

        {/* Navigation */}
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>

        {/* Main content */}
        <main id="main-content">
          <Suspense fallback={<SectionFallback />}>
            <Hero />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Stats />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Timeline />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </main>

        {/* Footer */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>

      </div>
    </ThemeProvider>
  )
}