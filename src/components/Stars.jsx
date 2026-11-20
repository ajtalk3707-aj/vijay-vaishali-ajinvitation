import { useMemo } from 'react'
import { motion } from 'framer-motion'
export default function Stars({ opacity, count = 80 }) {
  const stars = useMemo(() => Array.from({ length: count }, () => ({ x: Math.random() * 100, y: Math.random() * 70, s: 1 + Math.random() * 2.2, d: 2 + Math.random() * 4, dl: Math.random() * 5 })), [count])
  return (
    <motion.div className="stars" style={{ opacity }} aria-hidden="true">
      {stars.map((s, i) => <i key={i} className="star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDuration: `${s.d}s`, animationDelay: `${s.dl}s` }} />)}
    </motion.div>
  )
}
