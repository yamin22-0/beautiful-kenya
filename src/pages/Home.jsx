import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { motion, useScroll, useTransform } from 'framer-motion'

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
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── Data ────────────────────────────────────────────────────── */
const CURTAIN_IMAGE =
  'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1800&q=80'

const SCROLL_PANELS = [
  {
    image: 'https://plus.unsplash.com/premium_photo-1661843615544-b2c973491c8b?w=1200&q=80',
    eyebrow: 'The Wild',
    heading: 'Where the migration never ends',
    body: 'Over two million wildebeest, zebra, and gazelle move across the Mara-Serengeti ecosystem in an ancient, unbroken rhythm. No fence. No schedule. Just the oldest spectacle on earth.',
  },
  {
    image: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200&q=80',
    eyebrow: 'The People',
    heading: 'Forty-seven tribes, one country',
    body: 'From Maasai warriors on the plains to Swahili traders on the coast, Kenya\'s cultural breadth is staggering. Every community carries a distinct language, ceremony, and way of reading the land.',
  },
  {
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
    eyebrow: 'The Shore',
    heading: '500 km of Indian Ocean coastline',
    body: 'Dhow silhouettes at dusk. Coral gardens. White sand so fine it squeaks. The Kenyan coast has been a crossroads of Indian Ocean trade for a thousand years — and it shows in every alleyway of Lamu.',
  },
]

const STATS = [
  { value: '580,367', unit: 'km²', label: 'Total Area' },
  { value: '54M+',   unit: '',    label: 'Population' },
  { value: '47',     unit: '',    label: 'Counties' },
  { value: '68',     unit: '',    label: 'Languages' },
]

const WORLD_LINKS = [
  { to: '/wildlife',  label: 'Wildlife',  image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=75' },
  { to: '/culture',   label: 'Culture',   image: 'https://images.unsplash.com/photo-1515657241610-a6b33f0f6c5a?w=800&q=75' },
  { to: '/coastline', label: 'Coast',     image: 'https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&q=75' },
  { to: '/discover',  label: 'Highlands', image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=75' },
  { to: '/discover',  label: 'Cuisine',   image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=75' },
]

/* ── Curtain Hero ────────────────────────────────────────────── */
function CurtainHero() {
  const [revealed, setRevealed] = useState(false)
  const [loaded,   setLoaded]   = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 120)
    return () => clearTimeout(t)
  }, [])

  const show = revealed && loaded

  return (
    <section className="hero curtain-hero" aria-label="Beautiful Kenya — welcome">
      <img
        src={CURTAIN_IMAGE}
        alt="Maasai Mara sunrise, Kenya"
        className="curtain-hero__img"
        onLoad={() => setLoaded(true)}
        fetchPriority="high"
      />
      <div className="overlay overlay--heavy" aria-hidden="true" />

      {/* Left curtain panel */}
      <motion.div
        className="curtain-panel curtain-panel--left"
        aria-hidden="true"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: show ? 0 : 1 }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      />
      {/* Right curtain panel */}
      <motion.div
        className="curtain-panel curtain-panel--right"
        aria-hidden="true"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: show ? 0 : 1 }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      />

      <div className="curtain-hero__content">
        <motion.span
          className="eyebrow eyebrow--red curtain-hero__eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 16 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
        >
          East Africa · Kenya
        </motion.span>

        <motion.h1
          className="curtain-hero__title"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 32 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.15 }}
        >
          Beautiful<br />Kenya
        </motion.h1>

        <motion.div
          className="curtain-hero__rule"
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: show ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
        />

        <motion.p
          className="curtain-hero__sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 16 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.55 }}
        >
          Wild landscapes. Ancient cultures.<br />
          An ocean that remembers everything.
        </motion.p>

        <motion.div
          className="curtain-hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 16 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.7 }}
        >
          <NavLink to="/discover" className="btn btn--primary">
            Explore Kenya
          </NavLink>
          <NavLink to="/wildlife" className="btn btn--ghost-light">
            See the Wildlife
          </NavLink>
        </motion.div>
      </div>

      <motion.div
        className="curtain-hero__scroll-cue"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ delay: 2.1, duration: 0.6 }}
      >
        <span className="curtain-hero__scroll-line" />
        <span className="curtain-hero__scroll-label">Scroll</span>
      </motion.div>
    </section>
  )
}

/* ── Sticky Scroll Narrative ─────────────────────────────────── */
function StickyPanel({ panel, index, total, scrollYProgress }) {
  const start = index / total
  const end   = (index + 1) / total
  const mid   = (start + end) / 2
  const isLast = index === total - 1

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.06, mid, end - 0.06, end],
    [0, 1, 1, 1, isLast ? 1 : 0]
  )
  const y = useTransform(
    scrollYProgress,
    [start, start + 0.08, end],
    [40, 0, isLast ? 0 : -20]
  )
  const imgScale = useTransform(scrollYProgress, [start, end], [1.06, 1.0])

  return (
    <motion.div className="sticky-panel" style={{ opacity }} aria-hidden={index > 0 ? 'true' : undefined}>
      <div className="sticky-panel__img-wrap">
        <motion.img
          src={panel.image}
          alt={panel.heading}
          className="sticky-panel__img"
          style={{ scale: imgScale }}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
        <div className="overlay" aria-hidden="true" />
      </div>
      <motion.div className="sticky-panel__text" style={{ y }}>
        <span className="eyebrow eyebrow--red">{panel.eyebrow}</span>
        <h2 className="sticky-panel__heading">{panel.heading}</h2>
        <span className="rule-red" aria-hidden="true" />
        <p className="sticky-panel__body">{panel.body}</p>
        <span className="sticky-panel__counter font-mono" aria-hidden="true">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </motion.div>
    </motion.div>
  )
}

function StickyNarrative() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      className="sticky-narrative"
      ref={containerRef}
      aria-label="Kenya highlights"
    >
      {SCROLL_PANELS.map((panel, i) => (
        <StickyPanel
          key={i}
          panel={panel}
          index={i}
          total={SCROLL_PANELS.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </section>
  )
}

/* ── Stats strip ─────────────────────────────────────────────── */
function StatsStrip() {
  return (
    <section className="stats-strip section--soft" aria-label="Kenya by the numbers">
      <div className="container">
        <dl className="stats-strip__grid">
          {STATS.map(({ value, unit, label }, i) => (
            <div key={label} className={`stats-strip__item reveal delay-${i + 1}`}>
              <dt className="stats-strip__label">{label}</dt>
              <dd className="stats-strip__value">
                <span className="stats-strip__number">{value}</span>
                {unit && <span className="stats-strip__unit">{unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ── Five Worlds ─────────────────────────────────────────────── */
function FiveWorlds() {
  const [hovered, setHovered] = useState(null)

  return (
    <section className="five-worlds section" aria-labelledby="five-worlds-heading">
      <div className="container">
        <div className="five-worlds__header reveal">
          <span className="eyebrow">What Awaits You</span>
          <h2 className="five-worlds__heading" id="five-worlds-heading">
            Five worlds,<br />one nation
          </h2>
        </div>
      </div>

      <div className="five-worlds__strip" role="list" aria-label="Kenya's five worlds">
        {WORLD_LINKS.map(({ to, label, image }, i) => (
          <NavLink
            key={label}
            to={to}
            className={[
              'world-card',
              hovered === i ? 'world-card--hovered' : '',
              hovered !== null && hovered !== i ? 'world-card--dimmed' : '',
            ].join(' ').trim()}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            role="listitem"
            aria-label={`Explore ${label}`}
          >
            <img src={image} alt={label} className="world-card__img" loading="lazy" />
            <div className="world-card__overlay" aria-hidden="true" />
            <div className="world-card__content">
              <span className="world-card__label">{label}</span>
              <span className="world-card__arrow" aria-hidden="true">→</span>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  )
}

/* ── Pull Quote ──────────────────────────────────────────────── */
function PullQuote() {
  return (
    <section className="pull-quote-section section" aria-label="About Kenya">
      <div className="container">
        <div className="pull-quote-section__inner">
          <div className="pull-quote-section__left reveal--left">
            <blockquote className="pull-quote quote-block">
              "Kenya is not a country you visit. It is a country that visits you — and never quite leaves."
            </blockquote>
            <cite className="pull-quote-section__cite font-mono">
              — Traveller's Journal, Nairobi 1962
            </cite>
          </div>

          <div className="pull-quote-section__right reveal">
            <p>
              Kenya straddles the equator yet holds glaciers on Mount Kenya. It has the oldest
              fossilised human footprints on earth and one of Africa's fastest-growing cities.
              It is simultaneously ancient and urgent.
            </p>
            <p>
              This is a place where you can watch a million animals move across an open plain
              at dawn, then eat fresh crab on a dhow at sunset, then fall asleep to the sound
              of the Indian Ocean.
            </p>
            <p>No single story contains it.</p>
            <NavLink to="/discover" className="btn btn--ghost" style={{ marginTop: 'var(--space-3)' }}>
              Start Discovering
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Featured Story ──────────────────────────────────────────── */
function FeaturedStory() {
  return (
    <section className="featured-story" aria-labelledby="featured-story-heading">
      <div className="featured-story__img-wrap">
        <img
          src="https://images.unsplash.com/photo-1682681611078-2ba8a6f6e0fa?w=1200&q=80"
          alt="Maasai warrior overlooking the savannah"
          className="img-cover"
          loading="lazy"
        />
        <div className="overlay overlay--heavy" aria-hidden="true" />
        <div className="featured-story__img-label" aria-hidden="true">
          <span className="eyebrow">Featured Story</span>
        </div>
      </div>

      <div className="featured-story__text">
        <span className="eyebrow eyebrow--red reveal">The Maasai</span>
        <h2 className="featured-story__heading reveal delay-1" id="featured-story-heading">
          Guardians of the last open plains
        </h2>
        <span className="rule-red reveal delay-2" aria-hidden="true" />
        <p className="reveal delay-2">
          For centuries, the Maasai have lived alongside lions, elephants, and leopards
          without fences or fear. Their cattle are their currency. Their beadwork is their
          biography. Their territory — stretching from southern Kenya into northern Tanzania —
          is one of the last places on earth where humans and megafauna genuinely coexist.
        </p>
        <p className="reveal delay-3">
          Today, Maasai communities are at the forefront of conservation, running wildlife
          conservancies that generate more revenue per acre than any other land use in the region.
        </p>
        <NavLink
          to="/culture"
          className="featured-story__link link-underline font-mono reveal delay-3"
        >
          Read about Kenya's cultures →
        </NavLink>
      </div>
    </section>
  )
}

/* ── Page ────────────────────────────────────────────────────── */
export default function Home() {
  useReveal()

  return (
    <main>
      <CurtainHero />
      <StickyNarrative />
      <StatsStrip />
      <FiveWorlds />
      <PullQuote />
      <FeaturedStory />
    </main>
  )
}