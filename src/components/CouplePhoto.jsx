import { useEffect, useState } from 'react'
import { FALLBACK } from '../photo.js'
import { CFG } from '../copy.js'

// Returns the photo URL, or the placeholder if the file is missing.
export function usePhotoSrc(index = 0) {
  const want = CFG.photos[index] || FALLBACK
  const [src, setSrc] = useState(want)
  useEffect(() => {
    const im = new Image()
    im.onerror = () => setSrc(FALLBACK)
    im.src = want
  }, [want])
  return src
}

export default function CouplePhoto({ index = 0, className, alt = 'Darshan & Ishita', style }) {
  const src = usePhotoSrc(index)
  return <img className={className} style={style} src={src} alt={alt} draggable="false" />
}
