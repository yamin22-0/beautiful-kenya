import { NavLink } from 'react-router'


const NAV_LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/discover',  label: 'Discover Kenya' },
  { to: '/culture',   label: 'Culture & Heritage' },
  { to: '/wildlife',  label: 'Wildlife & Nature' },
  { to: '/coastline', label: 'Coastline & Beaches' },
]

const EXPERIENCES = [
  'Maasai Mara Migration',
  'Mount Kenya Trek',
  'Lamu Old Town',
  'Amboseli & Kilimanjaro',
  'Diani Beach',
  'Samburu Reserve',
  'Lake Nakuru Flamingos',
  'Tsavo Red Elephants',
]

const PRACTICAL = [
  { label: 'Best Time to Visit',  value: 'Jul – Oct · Jan – Feb' },
  { label: 'Currency',            value: 'Kenyan Shilling (KES)' },
  { label: 'Capital',             value: 'Nairobi' },
  { label: 'Languages',           value: 'Swahili · English' },
  { label: 'Time Zone',           value: 'EAT (UTC +3)' },
  { label: 'Dialling Code',       value: '+254' },
]

const SOCIALS = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.172 2.25h6.954l4.254 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="4"/>
        <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.64 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.135-1.867 3.135-4.56 0-2.385-1.714-4.052-4.163-4.052-2.836 0-4.5 2.126-4.5 4.324 0 .856.33 1.773.741 2.274a.3.3 0 0 1 .069.286c-.076.312-.244.995-.277 1.134-.044.183-.147.222-.339.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446C17.523 22 22 17.523 22 12S17.523 2 12 2z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">

      {/* ── Top accent line ──────────────────────────────────── */}
      <div className="footer__top-rule" aria-hidden="true" />

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">

            {/* Col 1 — Brand + tagline + socials */}
            <div className="footer__col footer__col--brand">
              <NavLink to="/" className="footer__logo" aria-label="Beautiful Kenya — Home">
                <span className="footer__logo-mark" aria-hidden="true">BK</span>
                <span className="footer__logo-text">Beautiful Kenya</span>
              </NavLink>

              <p className="footer__tagline">
                East Africa's most extraordinary country — wild, warm, and endlessly surprising.
              </p>

              <address className="footer__coords">
                <span className="eyebrow">Located at</span>
                <span className="footer__coords-value">1.2921° S, 36.8219° E</span>
              </address>

              <div className="footer__socials" role="list" aria-label="Social media links">
                {SOCIALS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    className="footer__social-link"
                    aria-label={label}
                    role="listitem"
                    rel="noopener noreferrer"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Site navigation */}
            <div className="footer__col">
              <h3 className="footer__col-heading">Explore</h3>
              <nav aria-label="Footer site navigation">
                <ul className="footer__link-list">
                  {NAV_LINKS.map(({ to, label }) => (
                    <li key={to}>
                      <NavLink to={to} className="footer__link">
                        {label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Col 3 — Experiences */}
            <div className="footer__col">
              <h3 className="footer__col-heading">Experiences</h3>
              <ul className="footer__link-list" aria-label="Featured experiences">
                {EXPERIENCES.map((exp) => (
                  <li key={exp}>
                    <span className="footer__link footer__link--static">{exp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Practical info */}
            <div className="footer__col">
              <h3 className="footer__col-heading">Travel Info</h3>
              <dl className="footer__facts">
                {PRACTICAL.map(({ label, value }) => (
                  <div key={label} className="footer__fact">
                    <dt className="footer__fact-label">{label}</dt>
                    <dd className="footer__fact-value">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

          </div>
        </div>
      </div>

      {/* ── Marquee strip ────────────────────────────────────── */}
      <div className="footer__marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...EXPERIENCES, ...EXPERIENCES].map((exp, i) => (
            <span key={i} className="marquee-item">{exp}</span>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p className="footer__legal">
              © {year} Beautiful Kenya. Crafted with intention.
            </p>
            <p className="footer__credit">
              Images via{' '}
              <a href="https://unsplash.com" className="footer__credit-link" target="_blank" rel="noopener noreferrer">
                Unsplash
              </a>
              {' '}·{' '}
              <a href="https://pexels.com" className="footer__credit-link" target="_blank" rel="noopener noreferrer">
                Pexels
              </a>
            </p>
          </div>
        </div>
      </div>

    </footer>
  )
}