import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router'
import { motion, useScroll, useTransform } from 'framer-motion'

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
const TRIBES = [
  {
    name: 'Maasai',
    region: 'Rift Valley · Southern Kenya',
    image: 'https://media.istockphoto.com/id/2188203192/photo/warriors-from-maasai-tribe-mount-kilimanjaro-on-the-background-kenya-africa.webp?a=1&b=1&s=612x612&w=0&k=20&c=DNCZCS-dv1AdxGwzqS7-grPFHwMf9oH5VbTU5eS-zTk=',
    alt: 'Maasai warriors with Mount Kilimanjaro in the background',
    desc: 'Iconic semi-nomadic pastoralists known for their distinctive dress, jumping dance, and deep coexistence with wildlife on the open plains.',
  },
  {
    name: 'Kikuyu',
    region: 'Central Highlands',
    image: 'https://media.istockphoto.com/id/637905132/photo/traditional-tribal-village-of-kenyan-people.webp?a=1&b=1&s=612x612&w=0&k=20&c=xtn-TB-9sV7U07zsOAFyJ7IsmCLcjRLYITjJ_7zifCM=',
    alt: 'Traditional Kikuyu tribal village',
    desc: "Kenya's largest ethnic group, rooted in the fertile highlands around Mount Kenya. Renowned farmers, traders, and political thinkers.",
  },
  {
    name: 'Luo',
    region: 'Nyanza · Lake Victoria',
    image: 'https://media.istockphoto.com/id/638669188/photo/african-woman-preparing-common-ugali.webp?a=1&b=1&s=612x612&w=0&k=20&c=Krox9AiLsdh8zfaWj02qjyn03vs2X3Up6KJkda7weno=',
    alt: 'African woman preparing ugali, a Luo staple',
    desc: 'A Nilotic people of the Lake Victoria basin, celebrated for their music, oral tradition, and deep fishing culture.',
  },
  {
    name: 'Luhya',
    region: 'Western Kenya',
    image: 'https://plus.unsplash.com/premium_photo-1664971411530-9d2199405d53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNoaWNrZW58ZW58MHx8MHx8fDA%3D',
    alt: 'Western Kenya countryside',
    desc: "Kenya's second-largest community — a confederation of 18 sub-tribes known for bull-fighting festivals and rich agricultural traditions.",
  },
  {
    name: 'Kamba',
    region: 'Eastern Kenya',
    image: 'https://media.istockphoto.com/id/2194337158/photo/hut-rondavel-wood-wall-and-fence-with-thatched-roof-in-african-village-typical-rural.webp?a=1&b=1&s=612x612&w=0&k=20&c=ArjTwDQ-qzvK-h4A08eFA12YWxDq6iUwgpzD4fjFkvM=',
    alt: 'Traditional African hut with thatched roof in a Kamba village',
    desc: 'Master craftspeople and traders of the eastern plains. Kamba wood carving and beadwork are among the most distinctive in East Africa.',
  },
  {
    name: 'Swahili',
    region: 'Kenya Coast',
    image: 'https://media.istockphoto.com/id/2213429419/photo/aerial-view-of-the-sailboat-on-blue-sea-empty-white-sandy-beach-umbrellas-at-sunset-summer-in.webp?a=1&b=1&s=612x612&w=0&k=20&c=IURb_O27QRWPNB27dXFik59482JIIMYbwSVHRn-vI00=',
    alt: 'Aerial view of a sailboat on the Kenyan coast',
    desc: 'Born from centuries of Indian Ocean trade, the Swahili culture blends African, Arab, and Persian influences into a coastal civilisation unlike any other.',
  },
  {
    name: 'Somali',
    region: 'North Eastern Kenya',
    image: 'https://images.unsplash.com/photo-1543458104-7d567484d770?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtZWxzfGVufDB8fDB8fHww',
    alt: 'Camels in the northern Kenya arid landscape',
    desc: 'Pastoralist communities of the vast northern frontier, known for their resilience, oral poetry, and centuries-old camel herding traditions across the arid plains.',
  },
]

const DEEP_DIVES = [
  {
    eyebrow: 'The Maasai',
    heading: 'Keepers of the open plain',
    image: 'https://images.unsplash.com/photo-1610982330184-b26f7ea46541?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hYXNhaXxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'Maasai people in traditional dress',
    accent: 'red',
    paragraphs: [
      "The Maasai are perhaps Africa's most recognisable people — and also among the most misunderstood. Their territory spans some 160,000 km² of southern Kenya and northern Tanzania, overlapping directly with the world's most important wildlife corridors.",
      "For the Maasai, cattle are sacred — a measure of wealth, a medium of ceremony, a living connection to their ancestors. A Maasai man's social standing is read in his herd. Their diet has historically centred on milk, blood, and meat — protein-dense, perfectly adapted to a semi-arid landscape.",
      'Today, Maasai communities are redefining conservation. Their conservancies — including the Olare Motorogi and Mara North — produce higher biodiversity outcomes than any state park in the region, while generating income that flows directly to families.',
    ],
  },
  {
    eyebrow: 'The Luo',
    heading: 'A people of rhythm and water',
    image: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200&q=80',
    alt: 'Lake Victoria at sunrise',
    accent: 'green',
    paragraphs: [
      "The Luo arrived at Lake Victoria's eastern shore from the Nile basin around the 15th century, bringing with them a rich oral tradition and a reverence for the lake that has shaped every aspect of their culture.",
      "Music runs through Luo life like water. The nyatiti — an eight-stringed lyre — carries stories across generations. Benga, the guitar-driven sound that became Kenya's popular music, was born from Luo rhythms meeting electric strings in Nairobi's bars in the 1960s.",
      'The Luo also gave Kenya some of its most consequential intellectuals and political figures. Their tradition of fierce, eloquent debate — conducted in the shade of a simba — continues to shape national conversation.',
    ],
  },
  {
    eyebrow: 'The Swahili Coast',
    heading: 'Where Africa met the ocean',
    image: 'https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=1200&q=80',
    alt: 'Lamu dhow on the Indian Ocean',
    accent: 'red',
    paragraphs: [
      "For over a thousand years, the Kenyan coast was one of the world's great crossroads. Arab traders, Persian merchants, Indian sailors, and Portuguese navigators all passed through — and many stayed. The Swahili people are their descendants.",
      'Swahili architecture tells this story in stone. The carved wooden doors of Mombasa, the coral-block houses of Lamu, the ruined city of Gede — each is a palimpsest of cultures layered over centuries. Lamu\'s old town is a UNESCO World Heritage Site, and justifiably so.',
      'Swahili cuisine is perhaps the richest expression of this fusion — pilau spiced with cardamom and cloves, biryani that travelled from Persia, coconut-milk curries that speak to centuries of Indian Ocean trade.',
    ],
  },
]

const CRAFTS = [
  {
    label: 'Beadwork',
    image: 'https://images.unsplash.com/photo-1629481995102-ff98d306dd8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8QmVhZHdvcmt8ZW58MHx8MHx8fDA%3D',
    alt: 'Colourful African beadwork',
    desc: 'Maasai beads encode identity — age, marital status, community — in patterns worn on the body.',
  },
  {
    label: 'Music & Dance',
    image: 'https://images.unsplash.com/photo-1704494785222-7ee39e82f88c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFhc2FpJTIwTXVzaWMlMjAlMjYlMjBEYW5jZXxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'Maasai music and dance performance',
    desc: 'From the Maasai adumu jump to Luo nyatiti music, performance is how Kenya passes memory forward.',
  },
  {
    label: 'Wood Carving',
    image: 'https://images.unsplash.com/photo-1590880795696-20c7dfadacde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdvb2QlMjBjYXJ2aW5nfGVufDB8fDB8fHww',
    alt: 'Intricate African wood carving',
    desc: 'Kamba carvers of Wamunyu produce work of extraordinary detail — animals, figures, and abstract forms exported globally.',
  },
  {
    label: 'Swahili Cuisine',
    image: 'https://images.unsplash.com/photo-1771796992969-05bb88a0516a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBpbGF1fGVufDB8fDB8fHww',
    alt: 'Kenyan pilau rice dish',
    desc: "Pilau, biryani, samosas, coconut curries — the coast's food is a thousand years of Indian Ocean trade on a plate.",
  },
]

const TIMELINE = [
  { year: '~1000 AD', event: 'Swahili trading cities established along the coast — Mombasa, Malindi, Lamu thrive as Indian Ocean hubs.' },
  { year: '1498',     event: 'Vasco da Gama arrives at Malindi. Portuguese presence begins a century of coastal disruption.' },
  { year: '1600s',    event: 'Omani Arabs drive out the Portuguese. Fort Jesus in Mombasa changes hands repeatedly over 200 years.' },
  { year: '1888',     event: 'Imperial British East Africa Company granted charter. Colonial era begins in earnest.' },
  { year: '1920',     event: 'Kenya becomes a British Crown Colony. Land alienation drives resistance across all communities.' },
  { year: '1952',     event: 'Mau Mau uprising begins. Kikuyu-led armed resistance against British colonial rule.' },
  { year: '1963',     event: 'Independence. Jomo Kenyatta becomes the first Prime Minister on 12 December — Jamhuri Day.' },
  { year: '2010',     event: 'New constitution passed by referendum, enshrining devolution, rights, and the 47-county structure.' },
  { year: 'Today',    event: 'Kenya stands as East Africa\'s economic hub — home to 68 languages, 47 tribes, and one shared identity.' },
]

/* ── Hero with B&W to colour drag reveal ────────────────────── */
function CultureHero() {
  const [sliderX, setSliderX] = useState(55)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const updateSlider = (clientX) => {
    if (!containerRef.current) return
    const { left, width } = containerRef.current.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100))
    setSliderX(pct)
  }

  const onMouseDown = () => { dragging.current = true }
  const onMouseMove = (e) => { if (dragging.current) updateSlider(e.clientX) }
  const onMouseUp   = () => { dragging.current = false }
  const onTouchMove = (e) => { updateSlider(e.touches[0].clientX) }

  useEffect(() => {
    window.addEventListener('mouseup',   onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mouseup',   onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <section
      className="hero culture-hero"
      aria-label="Culture and Heritage"
      ref={containerRef}
      onMouseMove={onMouseMove}
    >
      {/* B&W layer — full width */}
      <img
        src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1800&q=80"
        alt="Maasai ceremony in black and white"
        className="culture-hero__img culture-hero__img--bw"
        fetchpriority="high"
      />

      {/* Colour layer — clipped to right of slider */}
      <div
        className="culture-hero__colour-wrap"
        style={{ clipPath: `inset(0 0 0 ${sliderX}%)` }}
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1800&q=80"
          alt=""
          className="culture-hero__img culture-hero__img--colour"
        />
      </div>

      {/* Drag handle */}
      <div
        className="culture-hero__handle"
        style={{ left: `${sliderX}%` }}
        onMouseDown={onMouseDown}
        onTouchMove={onTouchMove}
        onTouchStart={onMouseDown}
        role="slider"
        aria-label="Drag to reveal colour"
        aria-valuenow={Math.round(sliderX)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft')  setSliderX(v => Math.max(0,   v - 2))
          if (e.key === 'ArrowRight') setSliderX(v => Math.min(100, v + 2))
        }}
      >
        <div className="culture-hero__handle-line" aria-hidden="true" />
        <div className="culture-hero__handle-knob" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4l-4 6 4 6M13 4l4 6-4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div
        className="overlay overlay--heavy"
        aria-hidden="true"
        style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
      />

      {/* Text content */}
      <div className="culture-hero__content">
        <motion.span
          className="eyebrow culture-hero__eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          47 Tribes · One Kenya
        </motion.span>
        <motion.h1
          className="culture-hero__title"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
        >
          Culture &<br />Heritage
        </motion.h1>
        <motion.p
          className="culture-hero__hint font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          aria-hidden="true"
        >
          ← drag to reveal →
        </motion.p>
      </div>
    </section>
  )
}

/* ── Tribes grid ─────────────────────────────────────────────── */
function TribesGrid() {
  return (
    <section className="tribes section" aria-labelledby="tribes-heading">
      <div className="container">
        <div className="tribes__header reveal">
          <span className="eyebrow">Meet the People</span>
          <h2 className="tribes__heading" id="tribes-heading">
            Six communities,<br />six worlds
          </h2>
        </div>

        <div className="tribes__grid">
          {TRIBES.map((tribe, i) => (
            <article
              key={tribe.name}
              className="tribe-card"
              style={{ '--card-delay': `${i * 80}ms` }}
              aria-labelledby={`tribe-${i}-name`}
            >
              <div className="tribe-card__img-wrap">
                <img
                  src={tribe.image}
                  alt={tribe.alt}
                  className="tribe-card__img"
                  loading={i < 4 ? 'eager' : 'lazy'}
                />
                <div className="tribe-card__overlay" aria-hidden="true" />
              </div>
              <div className="tribe-card__body">
                <span className="tribe-card__region font-mono">{tribe.region}</span>
                <h3 className="tribe-card__name" id={`tribe-${i}-name`}>{tribe.name}</h3>
                <p className="tribe-card__desc">{tribe.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Deep Dives (sticky scroll stack) ───────────────────────── */
function DeepDives() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      className="deep-dives"
      ref={containerRef}
      aria-label="Cultural deep dives"
    >
      {DEEP_DIVES.map((dive, i) => (
        <DeepDivePanel
          key={i}
          dive={dive}
          index={i}
          total={DEEP_DIVES.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </section>
  )
}

function DeepDivePanel({ dive, index, total, scrollYProgress }) {
  const start  = index / total
  const end    = (index + 1) / total
  const isLast = index === total - 1

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, isLast ? 1 : 0]
  )
  const y = useTransform(
    scrollYProgress,
    [start, start + 0.08, end],
    [50, 0, isLast ? 0 : -30]
  )

  return (
    <motion.div
      className={`deep-dive-panel deep-dive-panel--${dive.accent}`}
      style={{ opacity }}
    >
      <div className="deep-dive-panel__img-wrap">
        <img
          src={dive.image}
          alt={dive.alt}
          className="deep-dive-panel__img"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </div>
      <motion.div className="deep-dive-panel__text" style={{ y }}>
        <span className="eyebrow eyebrow--red">{dive.eyebrow}</span>
        <h2 className="deep-dive-panel__heading">{dive.heading}</h2>
        <span className={`rule-${dive.accent}`} aria-hidden="true" />
        {dive.paragraphs.map((p, pi) => (
          <p key={pi} className="deep-dive-panel__para">{p}</p>
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ── Crafts & Traditions ─────────────────────────────────────── */
function Crafts() {
  return (
    <section className="crafts section section--soft" aria-labelledby="crafts-heading">
      <div className="container">
        <div className="crafts__header reveal">
          <span className="eyebrow">Traditions & Crafts</span>
          <h2 className="crafts__heading" id="crafts-heading">
            Made by hand,<br />carried by memory
          </h2>
        </div>

        <div className="crafts__grid">
          {CRAFTS.map((craft, i) => (
            <article
              key={craft.label}
              className={`craft-item reveal delay-${i + 1}`}
              aria-labelledby={`craft-${i}-label`}
            >
              <div className="craft-item__img-wrap">
                <img
                  src={craft.image}
                  alt={craft.alt}
                  className="craft-item__img"
                  loading="lazy"
                />
              </div>
              <h3 className="craft-item__label" id={`craft-${i}-label`}>{craft.label}</h3>
              <p className="craft-item__desc">{craft.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Timeline ────────────────────────────────────────────────── */
function Timeline() {
  return (
    <section className="timeline section" aria-labelledby="timeline-heading">
      <div className="container">
        <div className="timeline__header reveal">
          <span className="eyebrow">Kenya Through Time</span>
          <h2 className="timeline__heading" id="timeline-heading">
            A thousand years<br />in nine moments
          </h2>
        </div>

        <div className="timeline__track" role="list">
          {TIMELINE.map((item, i) => (
            <div
              key={i}
              className={`timeline-entry reveal ${i % 2 === 0 ? 'timeline-entry--left' : 'timeline-entry--right'} delay-${(i % 4) + 1}`}
              role="listitem"
            >
              <div className="timeline-entry__content">
                <span className="timeline-entry__year font-mono">{item.year}</span>
                <p className="timeline-entry__event">{item.event}</p>
              </div>
              <div className="timeline-entry__dot" aria-hidden="true" />
            </div>
          ))}
          <div className="timeline__line" aria-hidden="true" />
        </div>

        <div className="timeline__cta reveal">
          <NavLink to="/discover" className="btn btn--ghost">
            Explore Kenya's regions →
          </NavLink>
        </div>
      </div>
    </section>
  )
}

/* ── Page ────────────────────────────────────────────────────── */
export default function Culture() {
  useReveal()

  return (
    <main>
      <CultureHero />
      <TribesGrid />
      <DeepDives />
      <Crafts />
      <Timeline />
    </main>
  )
}