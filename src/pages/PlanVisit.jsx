import { useEffect, useRef } from 'react'
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
const AIRLINES = [
  { name: 'Kenya Airways',         note: 'National carrier · Nairobi hub · Africa & worldwide',                         url: 'https://www.kenya-airways.com' },
  { name: 'Ethiopian Airlines',    note: 'Best connections from North America & Asia via Addis Ababa',                   url: 'https://www.ethiopianairlines.com' },
  { name: 'Emirates',              note: 'Dubai hub · excellent connections from Europe, Asia, Australia',               url: 'https://www.emirates.com' },
  { name: 'Qatar Airways',         note: 'Doha hub · direct to JKIA Nairobi and MBA Mombasa',                           url: 'https://www.qatarairways.com' },
  { name: 'British Airways',       note: 'London Heathrow direct to Nairobi · strong Europe connections',               url: 'https://www.britishairways.com' },
  { name: 'KLM Royal Dutch Airlines', note: 'Amsterdam to Nairobi · good European network',                             url: 'https://www.klm.com' },
  { name: 'Turkish Airlines',      note: 'Istanbul hub · competitive pricing from Europe & Middle East',                 url: 'https://www.turkishairlines.com' },
  { name: 'Flydubai',              note: 'Budget option via Dubai · connects to Mombasa coast',                         url: 'https://www.flydubai.com' },
]

const SAFARI_LODGES = [
  { name: "Governors' Camp",          note: 'Maasai Mara · on the Mara River · legendary camp since 1972',             url: 'https://www.governorscamp.com' },
  { name: 'Angama Mara',              note: 'Maasai Mara · hilltop luxury · filmed in Out of Africa',                  url: 'https://angama.com' },
  { name: 'Ol Pejeta Bush Camp',      note: 'Laikipia · last northern white rhinos · community conservancy',           url: 'https://www.olpejetabushcamp.com' },
  { name: 'Sarara Camp',              note: 'Namunyak · northern Kenya · singing wells experience',                    url: 'https://www.sararacamp.com' },
  { name: 'Amboseli Serena Safari Lodge', note: 'Amboseli · Kilimanjaro views · elephant corridor',                    url: 'https://www.serenahotels.com/amboseli' },
  { name: 'Sasaab Lodge',             note: "Samburu · Ewaso Ng'iro River · intimate luxury camp",                     url: 'https://www.thesafaricollection.com/sasaab' },
]

const NAIROBI_HOTELS = [
  { name: 'The Hemingways Nairobi',   note: 'Karen · boutique five-star · near Giraffe Centre',                        url: 'https://www.hemingways-nairobi.com' },
  { name: 'Tribe Hotel',              note: 'Gigiri · design hotel · near UN compound',                                url: 'https://www.tribe-hotel.com' },
  { name: 'Villa Rosa Kempinski',     note: 'Westlands · landmark luxury · city centre',                               url: 'https://www.kempinski.com/nairobi' },
  { name: 'Ole Sereni',               note: 'Langata · overlooks Nairobi National Park · wildlife views at breakfast', url: 'https://www.olesereni.com' },
  { name: 'The Boma Nairobi',         note: 'Upper Hill · modern business hotel · great value',                        url: 'https://www.thebomanairobi.com' },
]

const COASTAL_HOTELS = [
  { name: 'Hemingways Watamu',        note: 'Watamu · beachfront · marine park access',                                url: 'https://www.hemingways-watamu.com' },
  { name: 'Alfajiri Villas',          note: 'Diani · private clifftop villas · Indian Ocean',                         url: 'https://www.alfajirivillas.com' },
  { name: 'The Majlis Resort',        note: 'Manda Island · Lamu Archipelago · dhow transfers only',                   url: 'https://www.themajlisresorts.com' },
  { name: 'Neptune Beach Resort',     note: 'Mombasa · family-friendly · all-inclusive option',                        url: 'https://www.neptunehotels.com' },
  { name: 'Pinewood Beach Resort',    note: 'Diani · eco-certified · coral reef snorkelling',                          url: 'https://www.pinewoodkenya.com' },
]

const AIRBNBS = [
  { name: 'Airbnb Kenya',             note: 'Nairobi apartments, Lamu guesthouses, Diani villas — widest selection',   url: 'https://www.airbnb.com/s/Kenya' },
  { name: 'Booking.com Kenya',        note: 'Hotels, guesthouses, lodges — free cancellation filters',                 url: 'https://www.booking.com/country/ke.html' },
  { name: 'Expedia Kenya Hotels',     note: 'Bundle flights + hotel for savings on Nairobi & Mombasa',                 url: 'https://www.expedia.com/Kenya-Hotels.d602.Travel-Guide-Hotels' },
]

const RESTAURANTS = [
  { name: 'TripAdvisor — Nairobi Restaurants',      note: 'Ranked listings · Nyama Choma to fine dining · updated reviews', url: 'https://www.tripadvisor.com/Restaurants-g294207-Nairobi.html' },
  { name: 'TripAdvisor — Mombasa Restaurants',      note: 'Swahili coast cuisine · seafood · beachside dining',             url: 'https://www.tripadvisor.com/Restaurants-g294208-Mombasa.html' },
  { name: 'TripAdvisor — Diani Beach Restaurants',  note: 'South coast · fresh catch · sunset rooftop options',             url: 'https://www.tripadvisor.com/Restaurants-g616052-Diani_Beach.html' },
  { name: 'EatOut Kenya',                           note: 'Local restaurant guide · Nairobi focus · reservations',          url: 'https://eatout.co.ke' },
  { name: 'Google Maps — Nairobi Food',             note: 'Live hours, photos, directions · most reliable for current status', url: 'https://www.google.com/maps/search/restaurants+nairobi' },
]

const ESSENTIALS = [
  { name: 'Kenya eCitizen Visa Portal',   note: 'Official · e-visa for most nationalities · apply 2–4 weeks before travel', url: 'https://www.ecitizen.go.ke' },
  { name: 'Kenya Wildlife Service',       note: 'National park fees · booking · conservation info',                          url: 'https://www.kws.go.ke' },
  { name: 'Kenya Tourism Board',          note: 'Official travel info · safety · regional guides',                           url: 'https://magicalkenya.com' },
  { name: 'Maasai Mara Conservancies',    note: 'MWCT · private conservancy access · migration calendars',                   url: 'https://www.masaimara.com' },
  { name: 'SafariBookings.com',           note: 'Compare safari operators · reviews · transparent pricing',                  url: 'https://www.safaribookings.com/kenya' },
  { name: 'Yellow Fever Certificate',     note: 'Required if arriving from endemic country · KEPHIS guidelines',             url: 'https://www.kephis.org' },
]

/* ── Link row ────────────────────────────────────────────────── */
function LinkRow({ item, index }) {
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="pv-link-row"
      style={{ '--i': index }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="pv-link-row__text">
        <span className="pv-link-row__name">{item.name}</span>
        <span className="pv-link-row__note font-mono">{item.note}</span>
      </div>
      <div className="pv-link-row__arrow" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.a>
  )
}

/* ── Section block ───────────────────────────────────────────── */
function PVSection({ eyebrow, heading, subheading, items, accent }) {
  return (
    <section className="pv-section section" aria-labelledby={`pv-${eyebrow}`}>
      <div className="container">
        <div className="pv-section__header reveal">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="pv-section__heading" id={`pv-${eyebrow}`}>{heading}</h2>
          {subheading && <p className="pv-section__sub font-mono">{subheading}</p>}
        </div>
        <div className={`pv-section__list ${accent ? 'pv-section__list--accent' : ''}`}>
          {items.map((item, i) => <LinkRow key={item.url} item={item} index={i} />)}
        </div>
      </div>
    </section>
  )
}

/* ── Sub-section ─────────────────────────────────────────────── */
function PVSubSection({ label, items }) {
  return (
    <div className="pv-subsection reveal">
      <span className="pv-subsection__label font-mono">{label}</span>
      <div className="pv-subsection__list">
        {items.map((item, i) => <LinkRow key={item.url} item={item} index={i} />)}
      </div>
    </div>
  )
}

/* ── IMAGE BREAK 1 — Nairobi aerial (after hero) ─────────────── */
function BreakNairobi() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div className="pv-break pv-break--full reveal" ref={ref}>
      <div className="pv-break__img-wrap">
        <motion.img
          src="https://plus.unsplash.com/premium_photo-1733317260639-6fb8eb703c78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmFpcm9iaXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Aerial view of Nairobi city skyline"
          className="pv-break__img"
          style={{ y }}
          loading="lazy"
        />
        <div className="pv-break__overlay" aria-hidden="true" />
      </div>
      <div className="pv-break__caption">
        <span className="pv-break__caption-text font-mono">Nairobi · 1,795 m above sea level · Africa's green city</span>
      </div>
    </div>
  )
}

/* ── IMAGE BREAK 2 — Safari split (after airlines) ───────────── */
function BreakSafari() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <div className="pv-break pv-break--split reveal" ref={ref}>
      <div className="pv-break__split-text">
        <span className="eyebrow">Bush & Savanna</span>
        <blockquote className="pv-break__quote">
          "Until you have slept under an African sky, you have not truly rested."
        </blockquote>
        <p className="pv-break__split-body">
          The best safari camps are not hotels. They are places where the boundary between inside and outside disappears — where a lion's roar wakes you at 3am and feels, somehow, like a privilege.
        </p>
      </div>
      <div className="pv-break__split-img-wrap">
        <motion.img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.1.0"
          alt="Safari tent camp in the Maasai Mara at golden hour"
          className="pv-break__split-img"
          style={{ y: imgY }}
          loading="lazy"
        />
        <div className="pv-break__split-overlay" aria-hidden="true" />
      </div>
    </div>
  )
}

/* ── IMAGE BREAK 3 — Coast full-bleed (after stay) ───────────── */
function BreakCoast() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div className="pv-break pv-break--full reveal" ref={ref}>
      <div className="pv-break__img-wrap">
        <motion.img
          src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0"
          alt="Pristine white sand beach on the Kenyan coast"
          className="pv-break__img"
          style={{ y }}
          loading="lazy"
        />
        <div className="pv-break__overlay" aria-hidden="true" />
      </div>
      <div className="pv-break__caption">
        <span className="pv-break__caption-text font-mono">Diani Beach · South Coast · 536 km of Indian Ocean shore</span>
      </div>
    </div>
  )
}

/* ── IMAGE BREAK 4 — Food & Mara duo (after eat section) ─────── */
function BreakFoodDuo() {
  return (
    <div className="pv-break pv-break--duo reveal">
      <div className="pv-break__duo-item">
        <div className="pv-break__duo-img-wrap">
          <img
            src="https://plus.unsplash.com/premium_photo-1661310177352-f586bf23a403?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JpbGxlZHMlMjBtZWF0fGVufDB8fDB8fHww"
            alt="Kenyan Nyama Choma — grilled meat with ugali"
            className="pv-break__duo-img"
            loading="lazy"
          />
        </div>
        <span className="pv-break__duo-caption font-mono">Nyama Choma · national dish · grilled over open flame</span>
      </div>
      <div className="pv-break__duo-item">
        <div className="pv-break__duo-img-wrap">
          <img
            src="https://media.istockphoto.com/id/598530030/photo/wildebeest-migration.webp?a=1&b=1&s=612x612&w=0&k=20&c=JD3c-KMHRK-V0ewhgl3KCnuEM2auLfU31YDoZC8g4kY="
            alt="Wildebeest migration crossing the Maasai Mara"
            className="pv-break__duo-img"
            loading="lazy"
          />
        </div>
        <span className="pv-break__duo-caption font-mono">Maasai Mara · Jul – Oct · peak migration season</span>
      </div>
    </div>
  )
}

/* ── Hero ────────────────────────────────────────────────────── */
function PVHero() {
  return (
    <section className="pv-hero" aria-labelledby="pv-hero-heading">
      {/* Background image */}
      <div className="pv-hero__bg" aria-hidden="true">
        <img
          src="https://media.istockphoto.com/id/2249314551/photo/passenger-airplane-landing-at-dusk.webp?a=1&b=1&s=612x612&w=0&k=20&c=vqwmHUP75YkQhDPhiKlXjULeoinOrfKKVWAfF7oyYAQ="
          alt=""
          className="pv-hero__bg-img"
          fetchPriority="high"
        />
        <div className="pv-hero__bg-overlay" />
      </div>
      <div className="container">
        <div className="pv-hero__inner">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Beautiful Kenya
          </motion.span>

          <motion.h1
            className="pv-hero__heading"
            id="pv-hero-heading"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Plan your<br />visit
          </motion.h1>

          <motion.p
            className="pv-hero__sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
          >
            Everything you need to get to Kenya, sleep well, eat well,
            and move through the country with ease — curated and linked in one place.
          </motion.p>

          <motion.div
            className="pv-hero__stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {[
              { v: '1.2921° S', l: 'Nairobi' },
              { v: 'GMT +3',    l: 'East Africa Time' },
              { v: 'KES',       l: 'Kenyan Shilling' },
              { v: 'e-Visa',    l: 'Most nationalities' },
            ].map((s) => (
              <div key={s.l} className="pv-hero__stat">
                <span className="pv-hero__stat-value font-mono">{s.v}</span>
                <span className="pv-hero__stat-label font-mono">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="pv-hero__rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          style={{ transformOrigin: 'left center' }}
          aria-hidden="true"
        />
      </div>
    </section>
  )
}

/* ── Stay section ────────────────────────────────────────────── */
function StaySection() {
  return (
    <section className="pv-section section" aria-labelledby="pv-stay-heading">
      <div className="container">
        <div className="pv-section__header reveal">
          <span className="eyebrow">Where to Stay</span>
          <h2 className="pv-section__heading" id="pv-stay-heading">
            Lodges, hotels<br />&amp; apartments
          </h2>
          <p className="pv-section__sub font-mono">
            From bush camps in the Mara to Lamu guesthouses — choose your base.
          </p>
        </div>
        <PVSubSection label="Safari Lodges &amp; Camps"            items={SAFARI_LODGES} />
        <PVSubSection label="Nairobi Hotels"                       items={NAIROBI_HOTELS} />
        <PVSubSection label="Coast &amp; Beach"                    items={COASTAL_HOTELS} />
        <PVSubSection label="Self-catering &amp; Booking Platforms" items={AIRBNBS} />
      </div>
    </section>
  )
}

/* ── Footer CTA ──────────────────────────────────────────────── */
function PVFooter() {
  return (
    <section className="pv-footer section" aria-label="You are ready">
      <div className="container">
        <div className="pv-footer__inner reveal">
          <span className="eyebrow">You&rsquo;re ready.</span>
          <h2 className="pv-footer__heading">Kenya is waiting.</h2>
          <p className="pv-footer__coords font-mono">
            &minus;1.2921&deg; S, 36.8219&deg; E &nbsp;&middot;&nbsp; Nairobi, Kenya
          </p>
          <div className="pv-footer__actions">
            <NavLink to="/discover" className="btn btn--primary">Explore the regions</NavLink>
            <NavLink to="/wildlife" className="btn btn--ghost">View wildlife &rarr;</NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Page ────────────────────────────────────────────────────── */
export default function PlanVisit() {
  useReveal()

  return (
    <main>
      <PVHero />
      <BreakNairobi />

      <PVSection
        eyebrow="Getting There"
        heading="Airlines flying to Kenya"
        subheading="JKIA Nairobi is the main hub · Mombasa (MBA) serves the coast"
        items={AIRLINES}
        accent
      />
      <BreakSafari />

      <StaySection />
      <BreakCoast />

      <PVSection
        eyebrow="Eat &amp; Drink"
        heading="Find somewhere to eat"
        subheading="Swahili pilau to Nairobi rooftops — start your search here"
        items={RESTAURANTS}
      />
      <BreakFoodDuo />

      <PVSection
        eyebrow="Essential Links"
        heading="Visas, parks &amp; planning"
        subheading="Everything official — sorted before you land"
        items={ESSENTIALS}
        accent
      />

      <PVFooter />
    </main>
  )
}