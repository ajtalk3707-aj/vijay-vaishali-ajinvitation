# Sunrise Haveli — Wedding Invitation Website with Couple Photo (React + Vite + Framer Motion)

Theme: night-indigo → saffron dawn → gold, with a Rajasthani haveli skyline. Fonts: Fraunces + Allura (English), Noto Serif Gujarati.
The page background is a *living sky*: as guests scroll it moves from dawn to noon to dusk to night, with a sun that becomes a moon.

## ADD YOUR COUPLE PHOTO
1. Put your photo in `public/` as `public/couple.jpg` (portrait; the face should be in the upper half).
2. It is already listed in `src/copy.js` → `photos: ['/couple.jpg']`.
   More photos → "Beautiful Moments" arched windows: `photos: ['/couple.jpg', '/p2.jpg', '/p3.jpg']`.
Until then a placeholder illustration is shown.

## Suspense opening — "Raise the Sun"
1. A deep night sky over a haveli skyline, stars twinkling. Two lines appear word by word:
   "Every great love story begins in the quiet of the night…  …and waits for the first light of dawn."
2. A glowing sun peeks above the wall. **Drag it upward with a finger.** If you let go too early the sun slowly sinks back.
3. As it rises the whole scene changes with your finger: stars fade, the sky turns violet → rose → saffron → gold, clouds drift in,
   haveli windows dim, rays spread and the music brightens (flute + drone, built-in).
4. At the top the sun *becomes your couple photo*; birds fly across and a bell chime rings. The names appear.
5. Tap **Enter the invitation** — you walk into the sun and the website appears.

## Website
Hero (portrait inside a sun, live countdown, add-to-calendar) → Invitation (arched sheet) → Moments → "A Day Under the Sun" timeline
(each event has a sky-coloured chip: sunrise, noon, dusk, night — a little sun travels down the line as you scroll)
→ Venue (compass) → Family (postcards) → RSVP under the night sky — submit to launch a sky lantern and open WhatsApp.
Gujarati/English switch + music in the top bar, section dock at the bottom.

## Run
    npm install
    npm run dev       # http://localhost:5173
    npm run build     # dist/ → deploy to Vercel / Netlify

## Edit
`src/copy.js` → text (gu + en), phone, map, **countdown date (`weddingISO`)**, photos, optional `musicUrl`.
`src/styles.css` → colours at the top (`--ind`, `--saf`, `--cor` …).
