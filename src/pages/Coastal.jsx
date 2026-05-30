import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

/* ── Scroll reveal hook ──────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    let io
    const t = setTimeout(() => {
      const els = document.querySelectorAll('.reveal, .reveal--left')
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible')
              io.unobserve(e.target)
            }
          }),
        { threshold: 0, rootMargin: '0px 0px -40px 0px' }
      )
      els.forEach((el) => io.observe(el))
    }, 60)
    return () => {
      clearTimeout(t)
      io?.disconnect()
    }
  }, [])
}

/* ── Data ────────────────────────────────────────────────────── */
const BEACHES = [
  {
    name: 'Diani Beach',
    region: 'South Coast · Kwale County',
    image: 'https://media.istockphoto.com/id/2213429419/photo/aerial-view-of-the-sailboat-on-blue-sea-empty-white-sandy-beach-umbrellas-at-sunset-summer-in.webp?a=1&b=1&s=612x612&w=0&k=20&c=IURb_O27QRWPNB27dXFik59482JIIMYbwSVHRn-vI00=',
    alt: 'Aerial view of Diani Beach with sailboat on blue sea',
    desc: "Sixteen kilometres of powder-white coral sand backed by indigenous forest. Consistently rated among Africa's finest beaches.",
    tag: 'South Coast',
  },
  {
    name: 'Watamu',
    region: 'North Coast · Kilifi County',
    image: 'https://images.unsplash.com/photo-1645689258319-3dcb737eee5e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Turquoise Indian Ocean waters',
    desc: 'A marine national park sits just offshore. Snorkel over coral gardens, kayak through mangrove creeks, watch whale sharks pass in the deep blue.',
    tag: 'Marine Park',
  },
  {
    name: 'Lamu Archipelago',
    region: 'North Coast · Lamu County',
    image: 'https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=1200&q=80',
    alt: 'Dhow sailing in the Lamu Archipelago',
    desc: 'No cars. No noise. Just dhows cutting through turquoise water and the slow rhythm of a town that has been trading since the 8th century.',
    tag: 'UNESCO Heritage',
  },
  {
    name: 'Malindi',
    region: 'North Coast · Kilifi County',
    image: 'https://images.unsplash.com/photo-1664093671658-a2aac3a344a9?w=800&q=75',
    alt: 'Malindi historic coastal town',
    desc: 'Where Vasco da Gama anchored in 1498. Today it mixes Italian beach culture with centuries of Swahili trading history along a wide, open shoreline.',
    tag: 'Historic Port',
  },
  {
    name: 'Tiwi Beach',
    region: 'South Coast · Kwale County',
   image: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJlYWNofGVufDB8fDB8fHww',
    alt: 'Quiet secluded south coast beach',
    desc: 'The quiet alternative to Diani. Hidden coves, rock pools at low tide, and a palm canopy so thick it blocks the midday sun entirely.',
    tag: 'Hidden Gem',
  },
]

const SWAHILI_FACTS = [
  { label: 'Coastline', value: '536 km', unit: 'of Indian Ocean shore' },
  { label: 'Trade winds', value: 'Nov – Mar', unit: 'northeast monsoon season' },
  { label: 'Oldest town', value: '8th c.', unit: 'Lamu, founded by Arab traders' },
  { label: 'Reef depth', value: '~15 m', unit: 'Watamu coral gardens' },
]

const LAMU_PARAS = [
  'Lamu old town is the oldest continuously inhabited settlement in East Africa. Its coral-stone houses, intricately carved wooden doors, and narrow labyrinthine streets have changed almost nothing in three hundred years.',
  'The town has no cars — goods move by donkey or by hand. At night, the only sounds are the call to prayer from the Riyadha Mosque and the slap of the Indian Ocean against the seawall.',
  'Swahili architecture here is a direct record of contact: Omani arches, Indian merchant windows, African plasterwork, Portuguese-era fortifications — all layered into a single street facade.',
]

/* ── Hero — bottom-bleed title treatment ─────────────────────── */
function CoastlineHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Parallax: image moves up slower than scroll
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  // Title fades out as user scrolls away
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.35], [0, -40])

  return (
    <section className="coastline-hero" ref={ref} aria-label="Coastline and Beaches">
      {/* Parallax image */}
      <motion.div className="coastline-hero__img-wrap" style={{ y: imgY }}>
        <img
          src="https://media.istockphoto.com/id/2213429419/photo/aerial-view-of-the-sailboat-on-blue-sea-empty-white-sandy-beach-umbrellas-at-sunset-summer-in.webp?a=1&b=1&s=612x612&w=0&k=20&c=IURb_O27QRWPNB27dXFik59482JIIMYbwSVHRn-vI00="
          alt="Aerial view of the Kenyan coast with white sand beach and turquoise water"
          className="coastline-hero__img"
          fetchpriority="high"
        />
        {/* Gradient that bleeds the image into the next section */}
        <div className="coastline-hero__bleed" aria-hidden="true" />
      </motion.div>

      {/* Bottom-edge title — partially cropped into next section */}
      <motion.div
        className="coastline-hero__title-wrap"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        <motion.span
          className="coastline-hero__eyebrow font-mono"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          536 km of Indian Ocean shore
        </motion.span>
        <motion.h1
          className="coastline-hero__title"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
        >
          Coastline<br />&amp; Beaches
        </motion.h1>
      </motion.div>
    </section>
  )
}

/* ── Facts strip ─────────────────────────────────────────────── */
function FactsStrip() {
  return (
    <div className="coast-facts reveal">
      <div className="container">
        <div className="coast-facts__grid">
          {SWAHILI_FACTS.map((f) => (
            <div key={f.label} className="coast-facts__item">
              <span className="coast-facts__value font-mono">{f.value}</span>
              <span className="coast-facts__label">{f.label}</span>
              <span className="coast-facts__unit font-mono">{f.unit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Accordion beach slider ──────────────────────────────────── */
function BeachAccordion() {
  // Track active on both hover (desktop) and click/tap (mobile)
  const [active, setActive] = useState(0)
  const isTouchDevice = useRef(false)

  useEffect(() => {
    isTouchDevice.current = window.matchMedia('(hover: none)').matches
  }, [])

  const handleEnter = (i) => {
    if (!isTouchDevice.current) setActive(i)
  }
  const handleTap = (i) => setActive(i)

  return (
    <section className="beaches section" aria-labelledby="beaches-heading">
      <div className="container">
        <div className="beaches__header reveal">
          <span className="eyebrow">The Shores</span>
          <h2 className="beaches__heading" id="beaches-heading">
            Five beaches,<br />five worlds
          </h2>
        </div>
      </div>

      {/* Full-bleed accordion — no container constraint */}
      <div
        className="beaches__accordion"
        role="list"
        aria-label="Beach accordion"
      >
        {BEACHES.map((beach, i) => (
          <BeachStrip
            key={beach.name}
            beach={beach}
            index={i}
            isActive={active === i}
            onEnter={() => handleEnter(i)}
            onTap={() => handleTap(i)}
          />
        ))}
      </div>
    </section>
  )
}

function BeachStrip({ beach, index, isActive, onEnter, onTap }) {
  return (
    <article
      className={`beach-strip ${isActive ? 'beach-strip--active' : ''}`}
      onMouseEnter={onEnter}
      onClick={onTap}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onTap()}
      role="listitem"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={beach.name}
    >
      {/* Image — always fully visible, the strip expands around it */}
      <div className="beach-strip__img-wrap">
        <img
          src={beach.image}
          alt={beach.alt}
          className="beach-strip__img"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
        <div className="beach-strip__overlay" aria-hidden="true" />
      </div>

      {/* Vertical label — fades out when active */}
      <div className="beach-strip__label-wrap">
        <span className="beach-strip__index font-mono">0{index + 1}</span>
        <span className="beach-strip__name-vertical">{beach.name}</span>
      </div>

      {/* Content — fades in when active */}
      <div className="beach-strip__content">
        <span className="beach-strip__tag font-mono">{beach.tag}</span>
        <h3 className="beach-strip__title">{beach.name}</h3>
        <span className="beach-strip__region font-mono">{beach.region}</span>
        <p className="beach-strip__desc">{beach.desc}</p>
      </div>
    </article>
  )
}

/* ── Editorial two-column divider ────────────────────────────── */
function CoastDivider() {
  return (
    <div className="coast-divider section">
      <div className="container">
        <div className="coast-divider__inner reveal">
          <div className="coast-divider__img-wrap">
            <img
              src="https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=1200&q=80"
              alt="Lamu dhow on the Indian Ocean"
              className="coast-divider__img"
              loading="lazy"
            />
          </div>
          <div className="coast-divider__text">
            <span className="eyebrow">The Indian Ocean</span>
            <blockquote className="coast-divider__quote">
              "The coast is not where Kenya ends.<br />
              It is where Africa meets the world."
            </blockquote>
            <p className="coast-divider__body">
              For a thousand years, the monsoon winds carried dhows between Arabia, Persia, and the Swahili shore. The coast was never a frontier — it was the centre of a world that extended deep across the Indian Ocean.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Lamu deep feature ───────────────────────────────────────── */
function LamuFeature() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1])

  return (
    <section className="lamu section" ref={ref} aria-labelledby="lamu-heading">
      {/* Full-bleed dark panel */}
      <div className="lamu__panel">
        <div className="lamu__img-wrap">
          <motion.img
            src="https://media.istockphoto.com/id/2213429419/photo/aerial-view-of-the-sailboat-on-blue-sea-empty-white-sandy-beach-umbrellas-at-sunset-summer-in.webp?a=1&b=1&s=612x612&w=0&k=20&c=IURb_O27QRWPNB27dXFik59482JIIMYbwSVHRn-vI00="
            alt="Aerial view of Lamu Island and the Indian Ocean"
            className="lamu__img"
            style={{ scale: imgScale }}
            loading="lazy"
          />
          <div className="lamu__img-overlay" aria-hidden="true" />
        </div>

        <div className="lamu__content">
          <div className="container">
            <div className="lamu__inner">
              <div className="lamu__meta reveal">
                <span className="eyebrow eyebrow--light">UNESCO World Heritage</span>
                <div className="lamu__tag-row">
                  <span className="lamu__tag font-mono">Est. 8th century</span>
                  <span className="lamu__tag font-mono">Lamu County</span>
                  <span className="lamu__tag font-mono">No motor vehicles</span>
                </div>
              </div>

              <h2 className="lamu__heading reveal" id="lamu-heading">
                Lamu:<br />the unhurried<br />shore
              </h2>

              <div className="lamu__body">
                {LAMU_PARAS.map((p, i) => (
                  <p key={i} className={`lamu__para reveal delay-${i + 1}`}>{p}</p>
                ))}
              </div>

              <div className="lamu__cta reveal">
                <NavLink to="/discover" className="btn btn--outline-light">
                  Explore the archipelago →
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Swahili cuisine feature ─────────────────────────────────── */
function SwahiliCuisine() {
  return (
    <section className="cuisine section section--soft" aria-labelledby="cuisine-heading">
      <div className="container">
        <div className="cuisine__grid">
          <div className="cuisine__text reveal--left">
            <span className="eyebrow">At the Table</span>
            <h2 className="cuisine__heading" id="cuisine-heading">
              A thousand years<br />on a plate
            </h2>
            <p className="cuisine__body">
              Pilau spiced with cardamom, black pepper, and clove. Biryani carried from the Persian Gulf. Coconut-milk curries that speak to centuries of Indian Ocean trade. Swahili food is the most honest record of the coast's history — every dish a layer of contact and exchange.
            </p>
            <p className="cuisine__body">
              Eat at a local restaurant in Lamu's old town. Order the pilau. Sit by the water. This is as close as you can get to understanding eight hundred years of Kenyan coastal life in a single meal.
            </p>
          </div>
          <div className="cuisine__img-wrap reveal">
            <img
              src="https://images.unsplash.com/photo-1771796992969-05bb88a0516a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBpbGF1fGVufDB8fDB8fHww"
              alt="Kenyan pilau rice — a fragrant Swahili spiced rice dish"
              className="cuisine__img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer CTA ──────────────────────────────────────────────── */
function CoastCTA() {
  return (
    <section className="coast-cta section" aria-label="Plan your visit">
      <div className="container">
        <div className="coast-cta__inner reveal">
          <span className="eyebrow">Plan Your Visit</span>
          <h2 className="coast-cta__heading">
            The coast is waiting.
          </h2>
          <p className="coast-cta__coords font-mono">
            −4.0435° S, 39.6682° E &nbsp;·&nbsp; Mombasa, Kenya
          </p>
          <div className="coast-cta__actions">
            <NavLink to="/discover" className="btn btn--primary">
              Explore all regions
            </NavLink>
            <NavLink to="/wildlife" className="btn btn--ghost">
              View wildlife →
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Page ────────────────────────────────────────────────────── */
export default function Coastline() {
  useReveal()

  return (
    <main>
      <CoastlineHero />
      <FactsStrip />
      <BeachAccordion />
      <CoastDivider />
      <LamuFeature />
      <SwahiliCuisine />
      <CoastCTA />
    </main>
  )
}