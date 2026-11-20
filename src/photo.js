// Placeholder shown until you add your own photo (see README).
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffcf9f"/><stop offset=".6" stop-color="#f58a6b"/><stop offset="1" stop-color="#7b3f7e"/></linearGradient>
<linearGradient id="h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3f86"/><stop offset="1" stop-color="#2b2350"/></linearGradient></defs>
<rect width="600" height="800" fill="url(#g)"/>
<circle cx="300" cy="330" r="190" fill="#fff3c4" opacity=".55"/><circle cx="300" cy="330" r="130" fill="#fff8dc" opacity=".7"/>
<circle cx="245" cy="340" r="46" fill="url(#h)"/><path d="M165 660 C165 515 200 425 245 425 C290 425 325 515 325 660Z" fill="url(#h)"/>
<circle cx="365" cy="328" r="44" fill="#2b2350"/><path d="M285 660 C285 520 322 418 365 418 C408 418 445 520 445 660Z" fill="#2b2350"/>
<path d="M300 215 C250 170 215 200 235 235 C250 257 285 275 300 290 C315 275 350 257 365 235 C385 200 350 170 300 215Z" fill="#e2566b"/>
<text x="300" y="724" text-anchor="middle" font-family="Georgia,serif" font-size="26" fill="#fff" opacity=".95">your couple photo here</text>
<text x="300" y="758" text-anchor="middle" font-family="Georgia,serif" font-size="20" fill="#fff" opacity=".8">public/couple.jpg</text></svg>`
export const FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
