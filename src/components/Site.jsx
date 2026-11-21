import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValueEvent } from 'framer-motion'
import Countdown from './Countdown.jsx'
import CouplePhoto from './CouplePhoto.jsx'
import Skyline from './Skyline.jsx'
import Stars from './Stars.jsx'
import { FALLBACK } from '../photo.js'
import { useLang } from '../lang.jsx'
import { CFG } from '../copy.js'

const ease = [0.22, 1, 0.36, 1]
const rv = {
  hidden: { opacity: 0, y: 44, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease } },
}
const Reveal = ({ children, className, as = 'div', amount = 0.25, ...p }) => {
  const C = motion[as]
  return <C className={className} variants={rv} initial="hidden" whileInView="show" viewport={{ once: true, amount }} {...p}>{children}</C>
}
const Head = ({ no, children }) => (
  <Reveal className="head"><span className="kick">{no}</span><h2>{children}</h2><span className="hflour"><i /><b>☀</b><i /></span></Reveal>
)
const intro = (i) => ({
  hidden: { opacity: 0, y: 36, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: 0.6 + i * 0.28, duration: 1.3, ease } },
})

function addToCalendar(title) {
  const s = new Date(CFG.weddingISO), e = new Date(s.getTime() + 4 * 36e5)
  const f = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', `DTSTART:${f(s)}`, `DTEND:${f(e)}`, `SUMMARY:${title}`,
    'LOCATION:Neelkanth Farm Party Plot\\, Junagadh', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  a.download = 'wedding-invitation.ics'; a.click()
}

/* the living sky: it moves from dawn to night as you scroll, with a sun that becomes a moon */
function LivingSky() {
  const { scrollYProgress: p } = useScroll()
  const [progressPercent, setProgressPercent] = useState(0)
  useMotionValueEvent(p, 'change', (v) => setProgressPercent(Math.round(v * 100)))
  const S = [0, 0.28, 0.5, 0.78, 1]
  const top = useTransform(p, S, ['#ffcfae', '#ffe39a', '#bfe0f5', '#7b4a9e', '#12103a'])
  const mid = useTransform(p, S, ['#ffe3c8', '#fff0c4', '#e4f0f3', '#e8627a', '#1f1b55'])
  const bot = useTransform(p, S, ['#fff4e4', '#fff9e8', '#fff6e2', '#ffb36b', '#2d2870'])
  const bg = useMotionTemplate`linear-gradient(180deg, ${top} 0%, ${mid} 55%, ${bot} 100%)`
  const ox = useTransform(p, [0, 1], ['10vw', '90vw'])
  const oy = useTransform(p, [0, 0.5, 1], ['30vh', '10vh', '30vh'])
  const sunO = useTransform(p, [0.72, 0.86], [1, 0])
  const moonO = useTransform(p, [0.76, 0.9], [0, 1])
  const sunCol = useTransform(p, [0, 0.45, 0.72], ['#ffb347', '#fff0a0', '#ff6a4d'])
  const starsO = useTransform(p, [0.74, 0.92], [0, 1])
  const sil = useTransform(p, [0, 0.5, 0.75, 1], ['#e4b48e', '#d9b38c', '#3a1e3c', '#07061c'])
  const win = useTransform(p, [0, 0.5, 0.75, 1], [0.15, 0, 0.9, 1])
  const progressY = useTransform(p, [0, 1], ['0%', '100%'])
  return (
    <>
      <div className="lsky" aria-hidden="true">
        <motion.div className="lsky-bg" style={{ background: bg }} />
        <Stars opacity={starsO} count={70} />
        <motion.div className="orb" style={{ left: ox, top: oy }}>
          <motion.i className="sunorb" style={{ opacity: sunO, background: sunCol }} />
          <motion.i className="moonorb" style={{ opacity: moonO }} />
        </motion.div>
        <Skyline className="lline" sil={sil} win={win} />
      </div>
      <motion.aside className="day-progress" role="progressbar" aria-label="Sunrise to night progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent}>
        <span className="day-progress-dawn" aria-hidden="true">☀</span>
        <span className="day-progress-track">
          <motion.span className="day-progress-marker" style={{ top: progressY }} aria-hidden="true">☀</motion.span>
        </span>
        <span className="day-progress-night" aria-hidden="true">☾</span>
      </motion.aside>
    </>
  )
}

const TOD = [['🌅', '🌞', '🌇', '🌙'], ['🌞', '🌤️', '🌇']]
function Events({ t }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 65%'] })
  const sy = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  let n = 0
  return (
    <div className="tline" ref={ref}>
      <span className="ttrack" /><motion.span className="tsun" style={{ top: sy }}>🌞</motion.span>
      {t.schedule.days.map((d, di) => (
        <div key={d.label} className="tday">
          <Reveal className="dayhead"><span>{d.label}</span><b>{d.date}</b></Reveal>
          {d.items.map((e, ii) => {
            const em = TOD[di]?.[ii] || e.icon
            n += 1
            return (
              <motion.article key={e.title + e.time} className="tcard" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={rv}>
                <div className={`tchip tod-${['🌇', '🌙'].includes(em) ? 'dark' : 'light'}`} style={{ '--g': GRAD[em] }}>
                  <span className="tem">{em}</span><time>{e.time}</time>
                </div>
                <div className="tbody"><span className="tno">{String(n).padStart(2, '0')}</span><h3>{e.title}</h3>{e.desc && <p>{e.desc}</p>}</div>
              </motion.article>
            )
          })}
        </div>
      ))}
    </div>
  )
}
const GRAD = {
  '🌅': 'linear-gradient(135deg,#ffcf9f,#ffe9b0)', '🌞': 'linear-gradient(135deg,#bfe0f5,#fff3c4)', '🌤️': 'linear-gradient(135deg,#ffe08a,#ffb26b)',
  '🌇': 'linear-gradient(135deg,#ff9a6b,#c95b94)', '🌙': 'linear-gradient(135deg,#2d2870,#12103a)',
}

function Compass() {
  return (
    <motion.svg className="compass" viewBox="0 0 200 200" animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: 'linear' }} aria-hidden="true">
      <circle cx="100" cy="100" r="94" fill="none" stroke="#e0a43c" strokeWidth="1.2" /><circle cx="100" cy="100" r="80" fill="none" stroke="#e0a43c" strokeWidth=".8" strokeDasharray="2 6" />
      {Array.from({ length: 8 }, (_, k) => <path key={k} d="M100 12 L108 100 L100 188 L92 100 Z" fill={k % 2 ? '#f08a24' : '#e2566b'} opacity={k % 2 ? 0.5 : 0.8} transform={`rotate(${k * 22.5} 100 100)`} />)}
      <circle cx="100" cy="100" r="10" fill="#fff8ee" stroke="#e0a43c" />
    </motion.svg>
  )
}

function RsvpForm({ t }) {
  const f = t.form
  const [name, setName] = useState(''), [guests, setGuests] = useState(2), [att, setAtt] = useState(0), [note, setNote] = useState(''), [err, setErr] = useState(false)
  const [lanterns, setLanterns] = useState([])
  const send = (e) => {
    e.preventDefault()
    if (!name.trim()) return setErr(true)
    window.open(`https://wa.me/91${CFG.phone}?text=${encodeURIComponent(f.compose(name.trim(), guests, f.attend[att], note.trim()))}`, '_blank', 'noopener')
    const id = Date.now()
    setLanterns((l) => [...l, id]); setTimeout(() => setLanterns((l) => l.filter((x) => x !== id)), 6500)
  }
  return (
    <form className="rform" onSubmit={send} noValidate>
      <label>{f.name}<input value={name} onChange={(e) => { setName(e.target.value); setErr(false) }} aria-invalid={err} autoComplete="name" /></label>
      {err && <small className="err">{f.need}</small>}
      <div className="row"><span>{f.guests}</span>
        <div className="step">
          <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} aria-label="−">−</button>
          <motion.b key={guests} initial={{ scale: 1.4 }} animate={{ scale: 1 }}>{guests}</motion.b>
          <button type="button" onClick={() => setGuests(Math.min(20, guests + 1))} aria-label="+">+</button>
        </div>
      </div>
      <div className="chips" role="radiogroup">
        {f.attend.map((a, i) => <button type="button" key={a} role="radio" aria-checked={att === i} className={att === i ? 'on' : ''} onClick={() => setAtt(i)}>{a}</button>)}
      </div>
      <label>{f.note}<textarea rows="2" value={note} onChange={(e) => setNote(e.target.value)} /></label>
      <motion.button className="btn sun" type="submit" whileTap={{ scale: 0.96 }}>{f.send}</motion.button>
      {lanterns.map((id) => (
        <motion.span key={id} className="lantern" initial={{ y: 0, x: 0, opacity: 0, scale: 0.6 }} animate={{ y: '-120vh', x: [0, 30, -20, 25], opacity: [0, 1, 1, 0], scale: 1.2 }} transition={{ duration: 6, ease: 'easeOut' }}>🏮</motion.span>
      ))}
    </form>
  )
}

export default function Site() {
  const { t, lang } = useLang()
  const [copied, setCopied] = useState(false)
  const mapUrl = `${CFG.mapQuery}`
  const mapUrl1 = `${CFG.mapQuery1}`
  const extra = CFG.photos.slice(1)
  const share = async () => {
    const data = { title: t.share.text, text: t.share.text, url: location.href }
    try { if (navigator.share) return await navigator.share(data); await navigator.clipboard.writeText(location.href); setCopied(true); setTimeout(() => setCopied(false), 2200) } catch {}
  }

  return (
    <>
      <LivingSky />
      <main className="site">
        {/* ───── HERO · the sun becomes the portrait ───── */}
        <section id="home" className="hero">
          <motion.p className="eyebrow" variants={intro(0)} initial="hidden" animate="show">{t.hero.eyebrow}</motion.p>
          <motion.div className="sunport" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8, ease }}>
            <i className="srays" /><i className="shalo" />
            <div className="sdisc"><motion.div className="kb" animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}><CouplePhoto /></motion.div></div>
            <i className="sring" />
          </motion.div>
          <h1>
            <motion.span className="nm" variants={intro(1)} initial="hidden" animate="show">{t.hero.g}</motion.span>
            <motion.span className="amp" variants={intro(2)} initial="hidden" animate="show">{t.hero.and}</motion.span>
            <motion.span className="nm" variants={intro(3)} initial="hidden" animate="show">{t.hero.b}</motion.span>
          </h1>
          <motion.p className="hdate" variants={intro(4)} initial="hidden" animate="show">{t.hero.date} · {t.hero.place}</motion.p>
          <motion.div variants={intro(5)} initial="hidden" animate="show" style={{ width: '100%' }}><Countdown /></motion.div>
          <motion.div variants={intro(6)} initial="hidden" animate="show" className="hero-btns">
            <motion.button className="btn sun" onClick={() => addToCalendar(t.cal.title)} whileTap={{ scale: 0.96 }}>🗓 {t.cal.btn}</motion.button>
          </motion.div>
          <motion.div className="cue" animate={{ y: [0, 9, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.4, repeat: Infinity }}>⌄</motion.div>
        </section>

        {/* ───── INVITATION ───── */}
        <section id="invite" className="sec">
          <div className="sheet arch">
            <Head no={t.ch[0]}>{t.invite.title}</Head>
            <Reveal className="sh">{t.invite.ganesh}</Reveal>
            <Reveal className="sh dim">{t.invite.sh1}</Reveal>
            <Reveal as="p" className="lead">{t.invite.intro}</Reveal>
            <Reveal className="namecard"><span>{t.hero.g}</span><em>{t.hero.and}</em><span>{t.hero.b}</span></Reveal>
            <Reveal as="p" className="lead">{t.invite.blessing}</Reveal>
            <Reveal className="sh dim">{t.invite.sh2}</Reveal>
            <Reveal as="blockquote" className="pull">“{t.invite.quote}”</Reveal>
          </div>
        </section>

        {/* ───── GALLERY (only if more photos are listed) ───── */}
        {extra.length > 0 && (
          <section className="sec">
            <Head no="☀">{t.gallery.title}</Head>
            <div className="windows">
              {extra.map((p, i) => (
                <motion.figure key={p} variants={rv} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                  <img src={p} alt="" loading="lazy" onError={(e) => { e.currentTarget.src = FALLBACK }} />
                  <figcaption>{t.gallery.cap[i % t.gallery.cap.length]}</figcaption>
                </motion.figure>
              ))}
            </div>
          </section>
        )}

        {/* ───── EVENTS · a day under the moving sun ───── */}
        <section id="events" className="sec">
          <Head no={t.ch[1]}>{t.schedule.title}</Head>
          <Events t={t} />
          <Reveal className="sheet slim"><p className="lead">{t.kalrav.msg}</p><p className="dim">{t.kalrav.sender}</p></Reveal>
        </section>

        {/* ───── VENUE ───── */}
        <section id="venue" className="sec">
          <div className="sheet venue">
            <Head no={t.ch[2]}>{t.venue.title}</Head>
            <Reveal><Compass /></Reveal>
            <Reveal as="h3" className="vname">{t.venue.name}</Reveal>
            <Reveal className="vlines">{t.venue.lines.map((l) => <p key={l}>{l}</p>)}</Reveal>
            <Reveal><motion.a className="btn sun" href={mapUrl} target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.96 }}>📍 {t.venue.btnMap}</motion.a></Reveal>
          </div>
        </section>

        {/* ───── VENUE 2───── */}
        <section id="venue2" className="sec">
          <div className="sheet venue">
            <Head no={t.ch[2]}>{t.venue2.title}</Head>
            <Reveal><Compass /></Reveal>
            <Reveal as="h3" className="vname">{t.venue2.name}</Reveal>
            <Reveal className="vlines">{t.venue2.lines.map((l) => <p key={l}>{l}</p>)}</Reveal>
            <Reveal><motion.a className="btn sun" href={mapUrl1} target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.96 }}>📍 {t.venue2.btnMap}</motion.a></Reveal>
          </div>
        </section>

        {/* ───── FAMILY · postcards ───── */}
        <section className="sec">
          <Head no={t.ch[3]}>{t.family.title}</Head>
          <motion.div key={lang} className="cards" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}>
            {t.family.cards.map((c, i) => (
              <motion.div key={c.t} className="postcard" style={{ '--r': `${(i % 2 ? 1 : -1) * (1 + (i % 3) * 0.6)}deg` }} variants={rv} whileHover={{ rotate: 0, y: -6 }}>
                <span className="stamp">☀</span><h3>{c.t}</h3>{c.list.map((x) => <p key={x}>{x}</p>)}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ───── RSVP · under the night sky ───── */}
        <section id="rsvp" className="sec rsvp">
          <div className="sheet night">
            <Head no={t.ch[4]}>{t.rsvp.title}</Head>
            <Reveal as="p" className="lead">{t.rsvp.sub}</Reveal>
            <Reveal><RsvpForm t={t} /></Reveal>
            <Reveal className="two-btn">
              <motion.a className="btn ghost" href={`tel:+91${CFG.phone}`} whileTap={{ scale: 0.96 }}>{t.rsvp.call}: +91 {CFG.phone}</motion.a>
              <motion.button className="btn ghost" onClick={share} whileTap={{ scale: 0.96 }}>{copied ? t.share.copied : `↗ ${t.share.btn}`}</motion.button>
            </Reveal>
          </div>
          <Reveal className="foot"><span className="mono">{t.hero.initials}</span><p>{t.footer}</p></Reveal>
        </section>
      </main>
    </>
  )
}
