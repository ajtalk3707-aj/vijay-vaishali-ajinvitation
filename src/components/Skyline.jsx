import { motion } from 'framer-motion'

const WIN = [[14, 96], [34, 96], [54, 96], [74, 96], [14, 122], [34, 122], [54, 122], [74, 122]]
const CREN = Array.from({ length: 6 }, (_, i) => 108 + i * 9)

// one side of the haveli (mirrored for the other side)
const Side = ({ win }) => (
  <>
    <rect className="s" x="0" y="78" width="104" height="82" />
    <path className="s" d="M26 78 Q52 34 78 78Z" /><rect className="s" x="51" y="20" width="2" height="24" /><circle className="s" cx="52" cy="19" r="2.5" />
    <rect className="s" x="86" y="58" width="14" height="22" /><path className="s" d="M84 58 Q93 42 102 58Z" />
    <rect className="s" x="4" y="62" width="14" height="18" /><path className="s" d="M2 62 Q11 46 20 62Z" />
    <rect className="s" x="104" y="112" width="56" height="48" />
    {CREN.map((x) => <rect key={x} className="s" x={x} y="107" width="5" height="6" />)}
    {WIN.map(([x, y]) => <motion.path key={x + '-' + y} className="win" d={`M${x} ${y + 10} v-6 a4 4 0 0 1 8 0 v6z`} style={{ opacity: win }} />)}
  </>
)

export default function Skyline({ sil, win, className }) {
  return (
    <motion.svg className={className} viewBox="0 0 400 160" preserveAspectRatio="xMidYMax meet" style={{ '--sil': sil, overflow: 'visible' }} aria-hidden="true">
      <rect className="s" x="-900" y="146" width="2200" height="60" />
      <g><Side win={win} /></g>
      <g transform="translate(400 0) scale(-1 1)"><Side win={win} /></g>
      <rect className="s" x="160" y="124" width="80" height="36" />
      <path className="s" d="M184 124 Q200 100 216 124Z" />
    </motion.svg>
  )
}
