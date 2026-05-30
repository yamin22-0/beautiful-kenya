import { useEffect, useRef, useState, useCallback } from 'react'
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
const ANIMALS = [
  {
    id: 'lion',
    name: 'Lion',
    latin: 'Panthera leo',
    region: 'Maasai Mara',
    tag: 'Big Five',
    population: '~2,000',
    popLabel: 'est. in Kenya',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1400&q=80',
    heroImage: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=1800&q=80',
    alt: 'Male lion resting on the Maasai Mara plains at golden hour',
    desc: 'The Mara is home to one of the most studied lion populations on earth. During the Great Migration, prides of up to thirty animals coordinate hunts across the open grassland — a spectacle unlike anything else in the natural world.',
    bestTime: 'Jul – Oct',
  },
  {
    id: 'elephant',
    name: 'Elephant',
    latin: 'Loxodonta africana',
    region: 'Amboseli · Tsavo',
    tag: 'Big Five',
    population: '~34,000',
    popLabel: 'est. in Kenya',
    image: 'https://plus.unsplash.com/premium_photo-1661843604276-84877d223e66?w=1400&q=80',
    heroImage: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0',
    alt: 'African elephant herd crossing the Amboseli plains with Kilimanjaro behind',
    desc: "Amboseli offers the iconic image: vast elephant herds moving beneath the snow-capped silhouette of Kilimanjaro. Tsavo East holds some of the continent's largest tuskers — bulls whose ivory sweeps close to the ground, a rarity in modern Africa.",
    bestTime: 'Jun – Oct',
  },
  {
    id: 'leopard',
    name: 'Leopard',
    latin: 'Panthera pardus',
    region: 'Maasai Mara · Laikipia',
    tag: 'Big Five',
    population: 'Elusive',
    popLabel: 'solitary & nocturnal',
    image: 'https://images.unsplash.com/photo-1569691105751-88df003de7a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxlb3BhcmR8ZW58MHx8MHx8fDA%3D',
    heroImage: 'https://images.unsplash.com/photo-1569691105751-88df003de7a4?w=1800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0',
    alt: 'Leopard draped over an acacia branch in the Maasai Mara',
    desc: "The least seen of the Big Five and the most haunting. Leopards cache kills in acacia trees to keep them from lions and hyenas — you may spot a carcass wedged high in the branches before you ever see the cat itself. Dawn and dusk drives give the best odds.",
    bestTime: 'Year-round',
  },
  {
    id: 'cheetah',
    name: 'Cheetah',
    latin: 'Acinonyx jubatus',
    region: 'Maasai Mara · Samburu',
    tag: 'Vulnerable',
    population: '~1,000',
    popLabel: 'est. in Kenya',
    image: 'https://images.unsplash.com/photo-1624958319297-d1aa3a41378e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hlZXRhaHxlbnwwfHwwfHx8MA%3D%3D',
    heroImage: 'https://images.unsplash.com/photo-1624958319297-d1aa3a41378e?w=1800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hlZXRhaHxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'Cheetah scanning the savanna from a termite mound at sunrise',
    desc: "The fastest land animal reaches 112 km/h in three seconds. In the Mara, named coalitions — the Tano Bora, a band of five male cheetahs — are known to every guide. Watching a coordinated hunt unfold across open grassland is the single most cinematic thing Kenya's wildlife offers.",
    bestTime: 'Jul – Oct',
  },
  {
    id: 'giraffe',
    name: 'Reticulated Giraffe',
    latin: 'Giraffa reticulata',
    region: 'Samburu · Laikipia',
    tag: 'Endangered',
    population: '~15,785',
    popLabel: 'globally',
    image: 'https://images.unsplash.com/photo-1604336755604-96ee6fa9f3f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
    heroImage: 'https://images.unsplash.com/photo-1604336755604-96ee6fa9f3f1?w=1800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0',
    alt: 'Reticulated giraffe against an acacia tree and blue sky in Samburu',
    desc: "The reticulated giraffe — found only in northern Kenya, Somalia, and Ethiopia — has larger, sharper-edged patches than the Maasai variety. Samburu National Reserve protects one of the most significant populations. The Giraffe Centre in Nairobi runs a critical breeding programme for the endangered Rothschild's subspecies.",
    bestTime: 'Jun – Sep',
  },
  {
    id: 'flamingo',
    name: 'Flamingo',
    latin: 'Phoeniconaias minor',
    region: 'Lake Nakuru · Lake Bogoria',
    tag: 'Near Threatened',
    population: 'Millions',
    popLabel: 'East African Rift',
    image: 'https://images.unsplash.com/photo-1497206365907-f5e630693df0?w=1400&auto=format&fit=crop&q=80&ixlib=rb-4.1.0',
    heroImage: 'https://images.unsplash.com/photo-1497206365907-f5e630693df0?w=1800&q=80',
    alt: 'Vast flock of lesser flamingos turning Lake Bogoria pink at dawn',
    desc: "At peak season, two million lesser flamingos turn the alkaline surface of Lake Bogoria into a solid sheet of pink — one of the great wildlife spectacles on earth. The birds feed on algae that only grow in the caustic soda-rich waters of Kenya's Rift Valley lakes.",
    bestTime: 'Nov – Apr',
  },
]

const WILDLIFE_FACTS = [
  { label: 'Protected land', value: '12%', unit: "of Kenya's total area" },
  { label: 'Bird species', value: '1,137', unit: 'recorded nationally' },
  { label: 'National parks', value: '23', unit: 'and reserves' },
  { label: 'Migration wildebeest', value: '1.5M', unit: 'cross the Mara annually' },
]

const CONSERVATION_PARAS = [
  'Kenya loses an elephant to poaching roughly every three days. In response, the Kenya Wildlife Service has deployed ranger units across all major reserves — and community conservancies now protect more land than the national park system itself.',
  'The Northern Rangelands Trust links 43 community conservancies across 42,000 square kilometres of northern Kenya. Local Samburu and Borana communities are the rangers, the researchers, and the beneficiaries. It is the most successful large-scale conservation model on the continent.',
  'Ol Pejeta Conservancy in Laikipia holds the last two northern white rhinos alive. Both are female. Scientists are working on in-vitro fertilisation using banked genetic material. The outcome is uncertain — but it is the only chance the subspecies has.',
]

/* ── Horizontal Scroll Hijack Hero ───────────────────────────── */
function WildlifeHero() {
  const stickyRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${(ANIMALS.length - 1) * 100}vw`]
  )

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.round(v * (ANIMALS.length - 1))
      setActiveIndex(Math.min(Math.max(idx, 0), ANIMALS.length - 1))
    })
    return unsubscribe
  }, [scrollYProgress])

  return (
    <section
      className="wildlife-hero"
      ref={stickyRef}
      aria-label="Wildlife of Kenya"
      style={{ '--animal-count': ANIMALS.length }}
    >
      <div className="wildlife-hero__sticky">
        <motion.div className="wildlife-hero__track" style={{ x }}>
          {ANIMALS.map((animal, i) => (
            <HeroPanel key={animal.id} animal={animal} index={i} />
          ))}
        </motion.div>
        <HeroOverlay activeIndex={activeIndex} scrollProgress={scrollYProgress} />
      </div>
    </section>
  )
}

function HeroPanel({ animal, index }) {
  return (
    <div className="wildlife-hero__panel" role="group" aria-label={animal.name}>
      <img
        src={animal.heroImage}
        alt={animal.alt}
        className="wildlife-hero__panel-img"
        loading={index === 0 ? 'eager' : 'lazy'}
        fetchPriority={index === 0 ? 'high' : 'auto'}
      />
      <div className="wildlife-hero__panel-gradient" aria-hidden="true" />
      <div className="wildlife-hero__panel-label">
        <span className="wildlife-hero__panel-tag font-mono">{animal.tag}</span>
        <h2 className="wildlife-hero__panel-name">{animal.name}</h2>
        <span className="wildlife-hero__panel-latin font-mono">{animal.latin}</span>
      </div>
    </div>
  )
}

function HeroOverlay({ activeIndex, scrollProgress }) {
  const scaleX = useTransform(scrollProgress, [0, 1], [0, 1])

  return (
    <div className="wildlife-hero__overlay" aria-hidden="true">
      <div className="wildlife-hero__top-bar">
        <span className="wildlife-hero__eyebrow font-mono">Kenya&rsquo;s Wildlife</span>
        <span className="wildlife-hero__counter font-mono">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              0{activeIndex + 1}
            </motion.span>
          </AnimatePresence>
          <span className="wildlife-hero__counter-total"> / 0{ANIMALS.length}</span>
        </span>
      </div>

      <div className="wildlife-hero__dots">
        {ANIMALS.map((a, i) => (
          <div
            key={a.id}
            className={`wildlife-hero__dot${i === activeIndex ? ' wildlife-hero__dot--active' : ''}`}
          />
        ))}
      </div>

      <div className="wildlife-hero__progress-track">
        <motion.div className="wildlife-hero__progress-fill" style={{ scaleX }} />
      </div>

      <ScrollHint scrollProgress={scrollProgress} />
    </div>
  )
}

function ScrollHint({ scrollProgress }) {
  const opacity = useTransform(scrollProgress, [0, 0.08], [1, 0])
  return (
    <motion.div className="wildlife-hero__hint font-mono" style={{ opacity }}>
      Scroll to explore
      <span className="wildlife-hero__hint-arrow" aria-hidden="true" />
    </motion.div>
  )
}

/* ── Facts Strip ─────────────────────────────────────────────── */
function FactsStrip() {
  return (
    <div className="wildlife-facts reveal">
      <div className="container">
        <div className="wildlife-facts__grid">
          {WILDLIFE_FACTS.map((f) => (
            <div key={f.label} className="wildlife-facts__item">
              <span className="wildlife-facts__value font-mono">{f.value}</span>
              <span className="wildlife-facts__label">{f.label}</span>
              <span className="wildlife-facts__unit font-mono">{f.unit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Animal Grid ─────────────────────────────────────────────── */
function AnimalGrid() {
  const [selected, setSelected] = useState(null)

  const open = useCallback((animal) => setSelected(animal), [])
  const close = useCallback(() => setSelected(null), [])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [close])

  return (
    <section className="animal-grid section" aria-labelledby="animals-heading">
      <div className="container">
        <div className="animal-grid__header reveal">
          <span className="eyebrow">The Animals</span>
          <h2 className="animal-grid__heading" id="animals-heading">
            Six encounters<br />worth crossing<br />a continent for
          </h2>
        </div>

        <div className="animal-grid__list" role="list">
          {ANIMALS.map((animal, i) => (
            <AnimalCard key={animal.id} animal={animal} index={i} onOpen={open} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <AnimalDetail animal={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  )
}

function AnimalCard({ animal, index, onOpen }) {
  return (
    <motion.article
      className="animal-card reveal"
      style={{ '--i': index }}
      layoutId={`animal-${animal.id}`}
      onClick={() => onOpen(animal)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(animal)}
      tabIndex={0}
      role="listitem"
      aria-label={`View details for ${animal.name}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="animal-card__img-wrap">
        <img
          src={animal.image}
          alt={animal.alt}
          className="animal-card__img"
          loading="lazy"
        />
        <div className="animal-card__overlay" aria-hidden="true" />
      </div>

      <div className="animal-card__body">
        <div className="animal-card__meta">
          <span className="animal-card__tag font-mono">{animal.tag}</span>
          <span className="animal-card__region font-mono">{animal.region}</span>
        </div>
        <h3 className="animal-card__name">{animal.name}</h3>
        <span className="animal-card__latin font-mono">{animal.latin}</span>
      </div>

      <div className="animal-card__stat">
        <span className="animal-card__stat-value font-mono">{animal.population}</span>
        <span className="animal-card__stat-unit font-mono">{animal.popLabel}</span>
      </div>

      <div className="animal-card__arrow" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.article>
  )
}

function AnimalDetail({ animal, onClose }) {
  return (
    <>
      <motion.div
        className="animal-detail__backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        className="animal-detail"
        layoutId={`animal-${animal.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label={`${animal.name} detail`}
      >
        <div className="animal-detail__img-wrap">
          <img
            src={animal.heroImage}
            alt={animal.alt}
            className="animal-detail__img"
          />
          <div className="animal-detail__img-gradient" aria-hidden="true" />
        </div>

        <div className="animal-detail__content">
          <button
            className="animal-detail__close font-mono"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="animal-detail__meta">
            <span className="animal-detail__tag font-mono">{animal.tag}</span>
            <div className="animal-detail__tags-row">
              <span className="animal-detail__region-tag font-mono">{animal.region}</span>
              <span className="animal-detail__region-tag font-mono">Best: {animal.bestTime}</span>
            </div>
          </div>

          <h2 className="animal-detail__name">{animal.name}</h2>
          <span className="animal-detail__latin font-mono">{animal.latin}</span>
          <p className="animal-detail__desc">{animal.desc}</p>

          <div className="animal-detail__stat-row">
            <div className="animal-detail__stat">
              <span className="animal-detail__stat-value font-mono">{animal.population}</span>
              <span className="animal-detail__stat-label font-mono">{animal.popLabel}</span>
            </div>
          </div>

          <NavLink to="/discover" className="btn btn--primary animal-detail__cta">
            Plan this safari
          </NavLink>
        </div>
      </motion.div>
    </>
  )
}

/* ── Migration Feature ───────────────────────────────────────── */
function MigrationFeature() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1])
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section className="migration section" ref={ref} aria-labelledby="migration-heading">
      <div className="migration__panel">
        <div className="migration__img-wrap">
          <motion.img
            src="https://plus.unsplash.com/premium_photo-1661843604276-84877d223e66?w=1800&auto=format&fit=crop&q=80"
            alt="Wildebeest herd during the Great Migration in Kenya"
            className="migration__img"
            style={{ scale: imgScale }}
            loading="lazy"
          />
          <div className="migration__overlay" aria-hidden="true" />
        </div>

        <div className="migration__content">
          <div className="container">
            <motion.div className="migration__inner" style={{ y: textY }}>
              <div className="reveal">
                <span className="eyebrow eyebrow--light">Annual Spectacle</span>
                <div className="migration__tag-row">
                  <span className="migration__tag font-mono">Jul – Oct</span>
                  <span className="migration__tag font-mono">Maasai Mara</span>
                  <span className="migration__tag font-mono">1.5M wildebeest</span>
                </div>
              </div>

              <h2 className="migration__heading reveal" id="migration-heading">
                The Great<br />Migration
              </h2>

              <div className="migration__body">
                <p className="migration__para reveal delay-1">
                  Every year, 1.5 million wildebeest and 200,000 zebra complete a 3,000-kilometre circuit between the Serengeti and the Maasai Mara, following rainfall and new grass. The Mara River crossings — where the herds plunge through crocodile-heavy water — are the defining image of African wildlife.
                </p>
                <p className="migration__para reveal delay-2">
                  The crossings are unpredictable. The herd may circle a crossing point for hours before a single animal breaks and triggers a mass charge. Guides who know the Mara&rsquo;s rhythms can read the signs — the bunching, the hesitation, the silence before the plunge.
                </p>
              </div>

              <div className="migration__cta reveal">
                <NavLink to="/discover" className="btn btn--outline-light">
                  Plan your migration safari &rarr;
                </NavLink>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Conservation ────────────────────────────────────────────── */
function Conservation() {
  return (
    <section className="conservation section section--soft" aria-labelledby="conservation-heading">
      <div className="container">
        <div className="conservation__grid">
          <div className="conservation__text reveal--left">
            <span className="eyebrow">On the Ground</span>
            <h2 className="conservation__heading" id="conservation-heading">
              Conservation<br />is the story
            </h2>
            <div className="conservation__body">
              {CONSERVATION_PARAS.map((p, i) => (
                <p key={i} className="conservation__para">{p}</p>
              ))}
            </div>
          </div>
          <div className="conservation__img-stack reveal">
            <div className="conservation__img-wrap conservation__img-wrap--top">
              <img
                src="https://plus.unsplash.com/premium_photo-1664303575598-026ebb947a96?w=800&auto=format&fit=crop&q=75"
                alt="Safari vehicle on the Kenyan savanna at golden hour"
                className="conservation__img"
                loading="lazy"
              />
            </div>
            <div className="conservation__img-wrap conservation__img-wrap--bottom">
              <img
                src="https://images.unsplash.com/photo-1505148230895-d9a785a555fa?w=800&auto=format&fit=crop&q=75"
                alt="Elephant herd moving through Amboseli at dusk"
                className="conservation__img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Wildlife CTA ─────────────────────────────────────────────── */
function WildlifeCTA() {
  return (
    <section className="wildlife-cta section" aria-label="Plan your safari">
      <div className="container">
        <div className="wildlife-cta__inner reveal">
          <span className="eyebrow">Plan Your Safari</span>
          <h2 className="wildlife-cta__heading">
            The wild<br />doesn&rsquo;t wait.
          </h2>
          <p className="wildlife-cta__coords font-mono">
            &minus;1.4061&deg; S, 35.0022&deg; E &nbsp;&middot;&nbsp; Maasai Mara, Kenya
          </p>
          <div className="wildlife-cta__actions">
            <NavLink to="/discover" className="btn btn--primary">
              Explore all regions
            </NavLink>
            <NavLink to="/coastline" className="btn btn--ghost">
              View coastline &rarr;
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Page ────────────────────────────────────────────────────── */
export default function Wildlife() {
  useReveal()

  return (
    <main>
      <WildlifeHero />
      <FactsStrip />
      <AnimalGrid />
      <MigrationFeature />
      <Conservation />
      <WildlifeCTA />
    </main>
  )
}