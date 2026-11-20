import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, animate, useMotionValue, useTransform, useMotionTemplate, useMotionValueEvent } from 'framer-motion'
import LangToggle from './LangToggle.jsx'
import CouplePhoto from './CouplePhoto.jsx'
import Skyline from './Skyline.jsx'
import Stars from './Stars.jsx'
import { useLang } from '../lang.jsx'

const wordV = {
  hidden: { opacity: 0, y: 14, filter: 'blur(12px)' },
  show: (i) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: i * 0.13, duration: 1, ease: [0.22, 1, 0.36, 1] } }),
}
const STOPS = [0, 0.3, 0.6, 0.85, 1]

export default function Intro({ onOpen, onChime, onLevel, onZoom, onDone }) {
  const { t } = useLang()
  const [stage, setStage] = useState('night') // night | risen | exit
  const [ready, setReady] = useState(false)
  const [line, setLine] = useState(-1)
  const [msg, setMsg] = useState('hint') // hint | keep | back
  const [progressPercent, setProgressPercent] = useState(0)
  const done = useRef(false), opened = useRef(false)
  const lines = t.intro.lines

  /* how far the sun must travel (px) */
  const H = useMemo(() => {
    const vh = window.innerHeight, hs = Math.min(230, Math.max(120, vh * 0.22))
    if (window.innerWidth <= 700) return Math.round(vh * 0.32)
    return Math.round(vh - 0.225 * hs - 0.42 * vh)
  }, [])
  const y = useMotionValue(0)
  const p = useTransform(y, (v) => Math.min(1, Math.max(0, -v / H)))

  /* everything in the sky is driven by p (0 = night … 1 = sunrise) */
  const top = useTransform(p, STOPS, ['#0b0a2a', '#2b1b5a', '#8a3c78', '#f08a5b', '#ffd9a0'])
  const mid = useTransform(p, STOPS, ['#15133f', '#4a2a6e', '#d65f6f', '#ffb26b', '#ffeccd'])
  const bot = useTransform(p, STOPS, ['#241a55', '#7b3f7e', '#ff9a6b', '#ffd08a', '#fff6e6'])
  const bg = useMotionTemplate`linear-gradient(180deg, ${top} 0%, ${mid} 55%, ${bot} 100%)`
  const starsO = useTransform(p, [0, 0.55], [1, 0])
  const moonO = useTransform(p, [0, 0.45], [0.95, 0])
  const cloudsO = useTransform(p, [0.3, 0.85], [0, 0.8])
  const raysO = useTransform(p, [0.25, 1], [0, 0.95])
  const haloO = useTransform(p, [0, 1], [0.35, 1])
  const sunScale = useTransform(p, [0, 1], [0.78, 1])
  const photoO = useTransform(p, [0.7, 1], [0, 1])
  const sil = useTransform(p, [0, 0.5, 1], ['#05041a', '#2a1030', '#4a2234'])
  const win = useTransform(p, [0, 0.85], [1, 0.1])

  useMotionValueEvent(p, 'change', (v) => {
    setProgressPercent(Math.round(v * 100))
    onLevel(v)
    if (v > 0.985 && !done.current) complete()
  })

  /* suspense lines, then the sun is ready to be dragged */
  useEffect(() => {
    const ts = lines.map((_, k) => setTimeout(() => setLine(k), 900 + k * 3300))
    ts.push(setTimeout(() => setLine(-1), 900 + lines.length * 3300 - 300))
    ts.push(setTimeout(() => setReady(true), 900 + lines.length * 3300 + 500))
    return () => ts.forEach(clearTimeout)
    // eslint-disable-next-line
  }, [])

  function complete() {
    if (done.current) return
    done.current = true
    animate(y, -H, { duration: 0.9, ease: 'easeOut' })
    onChime(); setStage('risen')
  }
  const dragStart = () => { if (!opened.current) { opened.current = true; onOpen() } setMsg('keep') }
  const dragEnd = () => {
    if (done.current) return
    if (p.get() > 0.985) return complete()
    setMsg('back')
    animate(y, 0, { type: 'spring', stiffness: 34, damping: 12 })
  }
  const skip = () => { if (!opened.current) { opened.current = true; onOpen() } setReady(true); complete() }
  const enter = () => { if (stage !== 'risen') return; setStage('exit'); onZoom(); setTimeout(onDone, 2300) }

  const clouds = useMemo(() => [[8, 26, 180, 40], [58, 18, 240, 48], [30, 38, 200, 36], [76, 34, 170, 34]], [])
  const risen = stage === 'risen' || stage === 'exit'
  const topText = !ready ? null : msg === 'hint' ? t.intro.hint : msg === 'keep' ? t.intro.keep : t.intro.back

  return (
    <motion.div className={`intro${stage === 'exit' ? ' is-exiting' : ''}`} animate={{ opacity: stage === 'exit' ? 0 : 1 }} transition={{ duration: 1.5, delay: stage === 'exit' ? 0.8 : 0 }}>
      <motion.div className="isky" style={{ background: bg }} />
      <Stars opacity={starsO} />
      <motion.i className="imoon" style={{ opacity: moonO }} />
      {clouds.map(([x, yy, w, h], i) => (
        <motion.i key={i} className="cloud" style={{ left: `${x}%`, top: `${yy}%`, width: w, height: h, opacity: cloudsO }}
          animate={{ x: [0, 30, 0] }} transition={{ duration: 14 + i * 3, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
      <div className="intro-lang"><LangToggle /></div>

      {/* text: suspense lines → hints → reveal */}
      <div className="itop" aria-live="polite">
        <AnimatePresence mode="sync">
          {!risen && line >= 0 && (
            <motion.p key={'l' + line} className="sline" initial="hidden" animate="show" exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.04, transition: { duration: 0.8 } }}>
              {lines[line].split(' ').map((w, i) => <motion.span key={i} custom={i} variants={wordV} className="w">{w}</motion.span>)}
            </motion.p>
          )}
          {!risen && topText && (
            <motion.p key={topText} className="hint" initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.8 }}>
              {topText}
            </motion.p>
          )}
          {risen && (
            <motion.div key="risen" className="rv" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.3, delayChildren: 0.9 } } }}>
              <motion.p className="rv-label" variants={wordV} custom={0}>{t.intro.risen}</motion.p>
              <motion.p className="rv-names" variants={wordV} custom={0}>{t.hero.g} <em>{t.hero.and}</em> {t.hero.b}</motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!risen && ready && (
        <div className="sun-progress" role="progressbar" aria-label="Sunrise progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent}>
          <div className="sun-progress-track"><motion.i style={{ scaleX: p }} /></div>
          <span>{progressPercent}%</span>
        </div>
      )}

      {/* the sun — drag it up. Let go too early and it sinks back */}
      <motion.div className={`sunwrap${risen ? '' : ' is-draggable'}`} style={{ y }} drag={risen ? false : 'y'} dragConstraints={{ top: -H, bottom: 0 }} dragElastic={0.04} dragMomentum={false}
        onDragStart={dragStart} onDragEnd={dragEnd}>
        <motion.div className="sunx" animate={{ scale: stage === 'exit' ? 20 : 1, opacity: stage === 'exit' ? [1, 1, 0] : 1 }} transition={{ duration: 2, ease: 'easeIn' }}>
          <motion.i className="rays" style={{ opacity: raysO }} />
          <motion.i className="halo" style={{ opacity: haloO }} />
          <motion.div className="sunsc" style={{ scale: sunScale }}>
            <div className="disc" />
            <motion.div className="discphoto" style={{ opacity: photoO }}><CouplePhoto /></motion.div>
            <i className="discring" />
          </motion.div>
          {ready && msg === 'hint' && !risen && (
            <motion.span className="arrow" animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }}>⌃</motion.span>
          )}
        </motion.div>
      </motion.div>

      <Skyline className="iline" sil={sil} win={win} />

      {risen && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.svg key={i} className="bird" viewBox="0 0 24 10" initial={{ x: '-12vw', opacity: 0 }} animate={{ x: '112vw', y: [0, -14, 8, -10, 0], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 7 + i * 0.8, delay: 0.5 + i * 0.5, ease: 'linear' }} style={{ top: `${24 + i * 4}%` }}>
              <path d="M0 8 Q6 -2 12 6 Q18 -2 24 8" fill="none" stroke="#3b2a5a" strokeWidth="1.5" strokeLinecap="round" />
            </motion.svg>
          ))}
          <motion.button className="enter" onClick={enter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: stage === 'exit' ? 0 : 1, y: 0 }} transition={{ delay: stage === 'exit' ? 0 : 2.4, duration: 1 }}>
            {t.intro.enter}
          </motion.button>
        </>
      )}
      {!risen && <button className="skip" onClick={skip}>{t.intro.skip}</button>}
    </motion.div>
  )
}
