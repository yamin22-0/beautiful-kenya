import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'


/* ── Scroll reveal hook ──────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal--left')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── Data ────────────────────────────────────────────────────── */
const FILTERS = ['All', 'Rift Valley', 'Coast', 'North', 'Central', 'Western']

const GRID_IMAGES = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80',
    alt: 'Maasai Mara golden savannah at sunrise',
    location: 'Maasai Mara',
    region: 'Rift Valley',
    span: 'tall',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=900&q=80',
    alt: 'Elephant herd near Amboseli with Kilimanjaro',
    location: 'Amboseli',
    region: 'Rift Valley',
    span: 'wide',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=900&q=80',
    alt: 'Diani Beach turquoise water',
    location: 'Diani Beach',
    region: 'Coast',
    span: 'tall',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=900&q=80',
    alt: 'Maasai warrior portrait',
    location: 'Kajiado',
    region: 'Rift Valley',
    span: 'normal',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2VueWF8ZW58MHx8MHx8fDA%3D',
    alt: 'Mount Kenya peak through clouds',
    location: 'Mount Kenya',
    region: 'Central',
    span: 'normal',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=900&q=80',
    alt: 'Lion resting on a rock',
    location: 'Tsavo',
    region: 'Coast',
    span: 'wide',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80',
    alt: 'Wildebeest crossing the Mara River',
    location: 'Mara River',
    region: 'Rift Valley',
    span: 'tall',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1706398976968-9b9b9f89689d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5vdGhlcm4lMjBrZW55YXxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'Traditional Maasai beadwork',
    location: 'Samburu',
    region: 'North',
    span: 'normal',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1664093671658-a2aac3a344a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRpYW5pJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D',
    alt: 'Lamu Old Town narrow alley',
    location: 'Lamu',
    region: 'Coast',
    span: 'normal',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1623745493572-ef78d94249f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFrZSUyMG5ha3VydXxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'Lake Nakuru flamingos',
    location: 'Lake Nakuru',
    region: 'Rift Valley',
    span: 'wide',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1611144727915-ef30a08aaeb3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TmFpcm9iaXxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'Kenyan cuisine — nyama choma',
    location: 'Nairobi',
    region: 'Central',
    span: 'normal',
  },
  {
    id: 12,
    src: 'https://plus.unsplash.com/premium_photo-1666324044224-347cfb6f0189?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWJlcmRhcmUlMjBuYXRpb25hbCUyMHBhcmt8ZW58MHx8MHx8fDA%3D',
    alt: 'Fox in Aberdare forest',
    location: 'Aberdare',
    region: 'Central',
    span: 'tall',
  },
]

const REGIONS = [
  {
    name: 'Rift Valley',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80',
    alt: 'Rift Valley landscape',
    accent: 'red',
    desc: 'The great scar of the earth — a geological marvel stretching from Ethiopia to Mozambique. Kenya\'s Rift holds soda lakes pink with flamingos, towering escarpments, and the Maasai Mara, home to the greatest wildlife spectacle on earth.',
    highlights: ['Maasai Mara', 'Lake Naivasha', 'Hell\'s Gate', 'Lake Bogoria'],
  },
  {
    name: 'Northern Frontier',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&q=80',
    alt: 'Northern Kenya arid landscape',
    accent: 'green',
    desc: 'Wild, remote, and largely untouched. The north is where Kenya sheds its tourist skin. Samburu warriors, reticulated giraffe, Grevy\'s zebra, and the jade-green Jade Sea — Lake Turkana — the world\'s largest desert lake.',
    highlights: ['Samburu Reserve', 'Lake Turkana', 'Marsabit', 'Matthews Range'],
  },
  {
    name: 'The Coast',
    image: 'https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=1200&q=80',
    alt: 'Kenyan coast aerial view',
    accent: 'red',
    desc: 'A thousand years of Indian Ocean trade left its mark in the carved wooden doors of Mombasa, the coral houses of Lamu, and the spiced food of the Swahili coast. White sand, warm water, and a culture unlike anywhere else in Kenya.',
    highlights: ['Lamu Archipelago', 'Diani Beach', 'Watamu', 'Mombasa Old Town'],
  },
  {
    name: 'Central Highlands',
    image: 'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2VueWF8ZW58MHx8MHx8fDA%3D',
    alt: 'Mount Kenya peak',
    accent: 'green',
    desc: 'The beating heart of Kenya. Mount Kenya — Africa\'s second-highest peak — anchors a landscape of bamboo forests, Kikuyu farmland, and colonial-era tea estates. Nairobi, one of Africa\'s most dynamic cities, sits at its southern edge.',
    highlights: ['Mount Kenya', 'Aberdare Range', 'Nairobi', 'Nyeri'],
  },
]

const TRAVEL_FACTS = [
  { label: 'Best Time',   value: 'Jul – Oct · Jan – Feb' },
  { label: 'Currency',    value: 'KES (Kenyan Shilling)' },
  { label: 'Capital',     value: 'Nairobi' },
  { label: 'Language',    value: 'Swahili · English' },
  { label: 'Time Zone',   value: 'EAT UTC +3' },
  { label: 'Visa',        value: 'eTA available online' },
  { label: 'Calling',     value: '+254' },
  { label: 'Climate',     value: 'Equatorial · Semi-arid' },
]

/* ── Hero ────────────────────────────────────────────────────── */
function DiscoverHero() {
  return (
    <section
      className="hero discover-hero"
      aria-label="Discover Kenya"
    >
      <img
        src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1800&q=80"
        alt="Aerial view of Kenya landscape"
        className="discover-hero__img"
        fetchpriority="high"
      />
      <div className="overlay overlay--heavy" aria-hidden="true" />

      <div className="discover-hero__content">
        <motion.span
          className="eyebrow discover-hero__eyebrow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          Discover
        </motion.span>

        <motion.h1
          className="discover-hero__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        >
          Kenya,<br />
          <span className="discover-hero__title-line2">
            Unfiltered
            <span className="discover-hero__underline" aria-hidden="true" />
          </span>
        </motion.h1>

        <motion.p
          className="discover-hero__sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
        >
          Four distinct worlds. One extraordinary country.
          <br />
          From desert frontier to Indian Ocean shore.
        </motion.p>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        className="discover-hero__scroll"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span className="discover-hero__scroll-text font-mono">Scroll to explore</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="rgba(240,240,236,0.4)" strokeWidth="1"/>
          <motion.rect
            x="6.5" y="4" width="3" height="6" rx="1.5" fill="rgba(240,240,236,0.6)"
            animate={{ y: [4, 12, 4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </section>
  )
}

/* ── Photo Grid ──────────────────────────────────────────────── */
function PhotoGrid() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [expanded,     setExpanded]     = useState(null)
  const overlayRef = useRef(null)

  const filtered = activeFilter === 'All'
    ? GRID_IMAGES
    : GRID_IMAGES.filter(img => img.region === activeFilter)

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setExpanded(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Lock scroll when expanded
  useEffect(() => {
    document.body.style.overflow = expanded ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [expanded])

  const expandedImg = GRID_IMAGES.find(img => img.id === expanded)

  return (
    <section className="photo-grid-section section" aria-labelledby="grid-heading">
      <div className="container">
        <div className="photo-grid-section__header reveal">
          <span className="eyebrow">Visual Kenya</span>
          <h2 className="photo-grid-section__heading" id="grid-heading">
            A country in pictures
          </h2>
        </div>

        {/* Filter tabs */}
        <div
          className="filter-tabs reveal delay-1"
          role="tablist"
          aria-label="Filter by region"
        >
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-tab ${activeFilter === f ? 'filter-tab--active' : ''}`}
              onClick={() => setActiveFilter(f)}
              role="tab"
              aria-selected={activeFilter === f}
              aria-controls="photo-grid"
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <div
        className="photo-grid container"
        id="photo-grid"
        role="tabpanel"
        aria-label={`Photos: ${activeFilter}`}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((img) => (
            <motion.button
              key={img.id}
              className={`photo-cell photo-cell--${img.span}`}
              onClick={() => setExpanded(img.id)}
              aria-label={`View ${img.location} — ${img.alt}`}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="photo-cell__img"
                loading="lazy"
              />
              <div className="photo-cell__overlay" aria-hidden="true" />
              <span className="photo-cell__location font-mono">{img.location}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Expanded lightbox */}
      <AnimatePresence>
        {expanded && expandedImg && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Expanded view: ${expandedImg.location}`}
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={(e) => { if (e.target === overlayRef.current) setExpanded(null) }}
          >
            <motion.div
              className="lightbox__inner"
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1,    y: 0 }}
              exit={{ scale: 0.94,    y: 16 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={expandedImg.src.replace('w=900', 'w=1600')}
                alt={expandedImg.alt}
                className="lightbox__img"
              />
              <div className="lightbox__meta">
                <div>
                  <p className="lightbox__location">{expandedImg.location}</p>
                  <p className="lightbox__region font-mono">{expandedImg.region}</p>
                </div>
                <button
                  className="lightbox__close"
                  onClick={() => setExpanded(null)}
                  aria-label="Close expanded view"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ── Regions ─────────────────────────────────────────────────── */
function RegionsOverview() {
  return (
    <section className="regions section--soft" aria-labelledby="regions-heading">
      <div className="container">
        <div className="regions__header reveal">
          <span className="eyebrow">Four Worlds</span>
          <h2 className="regions__heading" id="regions-heading">
            Every corner, a different Kenya
          </h2>
        </div>

        <div className="regions__list">
          {REGIONS.map((region, i) => (
            <article
              key={region.name}
              className={`region-card reveal ${i % 2 === 1 ? 'region-card--flip' : ''}`}
              aria-labelledby={`region-${i}-heading`}
            >
              <div className="region-card__img-wrap">
                <img
                  src={region.image}
                  alt={region.alt}
                  className="region-card__img"
                  loading="lazy"
                />
              </div>

              <div className={`region-card__text region-card__text--${region.accent}`}>
                <span className="eyebrow">{`0${i + 1}`}</span>
                <h3
                  className="region-card__heading"
                  id={`region-${i}-heading`}
                >
                  {region.name}
                </h3>
                <span className={`rule-${region.accent}`} aria-hidden="true" />
                <p className="region-card__desc">{region.desc}</p>
                <ul className="region-card__highlights" aria-label="Highlights">
                  {region.highlights.map(h => (
                    <li key={h} className="region-card__highlight font-mono">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Travel Facts ────────────────────────────────────────────── */
function TravelFacts() {
  return (
    <section className="travel-facts section--dark" aria-label="Travel information">
      <div className="travel-facts__inner">
        {/* Left label */}
        <div className="travel-facts__label">
          <span className="eyebrow">Before You Go</span>
          <h2 className="travel-facts__heading">
            Essential<br />travel info
          </h2>
        </div>

        {/* Facts grid */}
        <dl className="travel-facts__grid">
          {TRAVEL_FACTS.map(({ label, value }, i) => (
            <div
              key={label}
              className={`travel-fact reveal delay-${(i % 4) + 1}`}
            >
              <dt className="travel-fact__label">{label}</dt>
              <dd className="travel-fact__value">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ── CTA ─────────────────────────────────────────────────────── */
function DiscoverCTA() {
  return (
    <section className="discover-cta section" aria-label="Get started">
      <div className="container">
        <div className="discover-cta__inner">
          <div className="discover-cta__text reveal">
            <span className="eyebrow">Ready?</span>
            <h2 className="discover-cta__heading">
              Experience Kenya
            </h2>
            <p>
              Whether you want to track lions at dawn, dive coral reefs at dusk,
              or sit with a Maasai elder and learn to read the land — it's all here.
            </p>
          </div>

          <div className="discover-cta__cards reveal delay-2">
            <NavLink to="/wildlife" className="cta-card">
              <div className="cta-card__img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=75"
                  alt="Wildlife"
                  className="cta-card__img"
                  loading="lazy"
                />
              </div>
              <div className="cta-card__body">
                <span className="eyebrow eyebrow--red">Wildlife</span>
                <p className="cta-card__label">The Big Five &amp; beyond</p>
                <span className="cta-card__arrow font-mono">Explore →</span>
              </div>
            </NavLink>

            <NavLink to="/coastline" className="cta-card">
              <div className="cta-card__img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=600&q=75"
                  alt="Coastline"
                  className="cta-card__img"
                  loading="lazy"
                />
              </div>
              <div className="cta-card__body">
                <span className="eyebrow eyebrow--green">Coastline</span>
                <p className="cta-card__label">500 km of paradise</p>
                <span className="cta-card__arrow font-mono">Explore →</span>
              </div>
            </NavLink>

            <NavLink to="/culture" className="cta-card">
              <div className="cta-card__img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=75"
                  alt="Culture"
                  className="cta-card__img"
                  loading="lazy"
                />
              </div>
              <div className="cta-card__body">
                <span className="eyebrow eyebrow--red">Culture</span>
                <p className="cta-card__label">47 tribes, one story</p>
                <span className="cta-card__arrow font-mono">Explore →</span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Page ────────────────────────────────────────────────────── */
export default function Discover() {
  useReveal()

  return (
    <main>
      <DiscoverHero />
      <PhotoGrid />
      <RegionsOverview />
      <TravelFacts />
      <DiscoverCTA />
    </main>
  )
}