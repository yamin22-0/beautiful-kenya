import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/discover',  label: 'Discover' },
  { to: '/culture',   label: 'Culture' },
  { to: '/wildlife',  label: 'Wildlife' },
  { to: '/coastline', label: 'Coastline' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [theme,      setTheme]      = useState(() =>
    typeof window !== 'undefined'
      ? (localStorage.getItem('bk-theme') || 'light')
      : 'light'
  )
  const location = useLocation()
  const menuRef  = useRef(null)

  /* ── scroll listener ─────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── close menu on route change ──────────────────────────── */
  useEffect(() => { setMenuOpen(false) }, [location])

  /* ── close menu on Escape ────────────────────────────────── */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  /* ── lock body scroll when menu open ─────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* ── theme toggle ────────────────────────────────────────── */
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('bk-theme', next)
  }

  /* ── active link helper ──────────────────────────────────── */
  const isActive = (to) =>
    to === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(to)

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────── */}
      <header
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`}
        role="banner"
      >
        <div className="navbar__inner">

          {/* Logo */}
          <NavLink to="/" className="navbar__logo" aria-label="Beautiful Kenya — Home">
            <span className="navbar__logo-mark" aria-hidden="true">BK</span>
            <span className="navbar__logo-text">Beautiful Kenya</span>
          </NavLink>

          {/* Desktop links */}
          <nav className="navbar__links" aria-label="Main navigation">
            {LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={`navbar__link ${isActive(to) ? 'navbar__link--active' : ''}`}
                aria-current={isActive(to) ? 'page' : undefined}
              >
                {label}
                {isActive(to) && (
                  <motion.span
                    className="navbar__link-dot"
                    layoutId="nav-dot"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right controls */}
          <div className="navbar__controls">
            {/* Theme toggle */}
            <button
              className="navbar__theme-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="navbar__theme-icon" aria-hidden="true">
                {theme === 'light' ? (
                  /* moon */
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  /* sun */
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.25"/>
                    <line x1="8" y1="1" x2="8" y2="3"   stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                    <line x1="8" y1="13" x2="8" y2="15" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                    <line x1="1" y1="8" x2="3" y2="8"   stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                    <line x1="13" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                    <line x1="3.05" y1="3.05" x2="4.46" y2="4.46" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                    <line x1="11.54" y1="11.54" x2="12.95" y2="12.95" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                    <line x1="3.05" y1="12.95" x2="4.46" y2="11.54" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                    <line x1="11.54" y1="4.46" x2="12.95" y2="3.05" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                  </svg>
                )}
              </span>
            </button>

            {/* Plan CTA — desktop only */}
            <NavLink to="/discover" className="btn btn--primary navbar__cta">
              Plan Your Visit
            </NavLink>

            {/* Hamburger — mobile only */}
            <button
              className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="navbar__burger-line" aria-hidden="true" />
              <span className="navbar__burger-line" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── Side rail — desktop ──────────────────────────── */}
        <nav className="navbar__rail" aria-label="Page navigation rail">
          {LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={`navbar__rail-link ${isActive(to) ? 'navbar__rail-link--active' : ''}`}
              aria-current={isActive(to) ? 'page' : undefined}
            >
              <span className="navbar__rail-text">{label}</span>
            </NavLink>
          ))}
        </nav>
      </header>

      {/* ── Mobile full-screen overlay ───────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            ref={menuRef}
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{   opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="mobile-menu__nav" aria-label="Mobile navigation">
              {LINKS.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{   opacity: 0, x: 40 }}
                  transition={{
                    duration: 0.38,
                    delay: 0.12 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <NavLink
                    to={to}
                    className={`mobile-menu__link ${isActive(to) ? 'mobile-menu__link--active' : ''}`}
                    aria-current={isActive(to) ? 'page' : undefined}
                  >
                    <span className="mobile-menu__index" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="mobile-menu__footer">
              <span className="eyebrow">1.2921° S, 36.8219° E</span>
              <button
                className="mobile-menu__theme"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? 'Dark mode' : 'Light mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}