// Built-in generative music: a tanpura-style drone + soft flute notes in a morning (Bhairav-like) scale.
// setLevel(0..1) brightens the sound as the sun rises in the opening. No audio file needed.
export function createAmbient() {
  let ctx, master, lp, bus, shim, timer, running = false, idx = 2, level = 0
  const SC = [261.63, 277.18, 329.63, 349.23, 392.0, 415.3, 493.88, 523.25, 554.37, 659.25]

  const build = () => {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
    master = ctx.createGain(); master.gain.value = 0
    lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520
    master.connect(lp); lp.connect(ctx.destination)
    const drone = ctx.createGain(); drone.gain.value = 0.12; drone.connect(master)
    ;[[65.41, 'sine'], [98.0, 'sine'], [130.81, 'triangle'], [196.0, 'sine']].forEach(([f, type], i) => {
      const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = i * 3; o.connect(drone); o.start()
    })
    shim = ctx.createGain(); shim.gain.value = 0; shim.connect(master)
    ;[523.25, 659.25, 783.99].forEach((f, i) => {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f; o.detune.value = i * 6 - 6; o.connect(shim); o.start()
    })
    const lfo = ctx.createOscillator(), lg = ctx.createGain()
    lfo.frequency.value = 0.1; lg.gain.value = 0.04; lfo.connect(lg); lg.connect(drone.gain); lfo.start()
    bus = ctx.createGain()
    const dl = ctx.createDelay(1.5); dl.delayTime.value = 0.55
    const fb = ctx.createGain(); fb.gain.value = 0.42
    bus.connect(master); bus.connect(dl); dl.connect(fb); fb.connect(dl); dl.connect(master)
  }

  const flute = (f) => {
    const t = ctx.currentTime, g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.17, t + 0.28)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.6)
    g.connect(bus)
    const vib = ctx.createOscillator(), vg = ctx.createGain()
    vib.frequency.value = 5; vg.gain.value = 9; vib.connect(vg)
    ;[[f, 'sine', 1], [f * 2, 'sine', 0.14]].forEach(([fr, type, amp]) => {
      const o = ctx.createOscillator(), og = ctx.createGain()
      o.type = type; o.frequency.value = fr; og.gain.value = amp; vg.connect(o.detune)
      o.connect(og); og.connect(g); o.start(t); o.stop(t + 2.7)
    })
    vib.start(t); vib.stop(t + 2.7)
  }

  const bell = (f, when = 0) => {
    const t = ctx.currentTime + when, g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.18, t + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3.4)
    g.connect(bus)
    ;[[f, 1], [f * 2.76, 0.22], [f * 5.4, 0.07]].forEach(([fr, amp]) => {
      const o = ctx.createOscillator(), og = ctx.createGain()
      o.type = 'sine'; o.frequency.value = fr; og.gain.value = amp
      o.connect(og); og.connect(g); o.start(t); o.stop(t + 3.5)
    })
  }

  const loop = () => {
    if (!running) return
    flute(SC[idx])
    idx = Math.min(SC.length - 1, Math.max(0, idx + [-2, -1, -1, 1, 1, 2][Math.floor(Math.random() * 6)]))
    timer = setTimeout(loop, 1900 - level * 900 + Math.random() * 1200)
  }

  return {
    start() {
      if (!ctx) build()
      ctx.resume()
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 4)
      if (!running) { running = true; loop() }
    },
    setLevel(v) {
      level = v
      if (!ctx) return
      lp.frequency.setTargetAtTime(520 + v * 3200, ctx.currentTime, 0.3)
      shim.gain.setTargetAtTime(v * 0.05, ctx.currentTime, 0.4)
    },
    chime() { if (!ctx) return; [523.25, 659.25, 783.99, 1046.5].forEach((f, k) => bell(f, k * 0.14)) },
    stop() {
      running = false; clearTimeout(timer)
      if (!ctx) return
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2)
      setTimeout(() => ctx && ctx.suspend(), 1300)
    },
  }
}

export function createFilePlayer(url) {
  const a = new Audio(url); a.loop = true; a.volume = 0
  let iv
  const fade = (to, done) => {
    clearInterval(iv)
    iv = setInterval(() => {
      a.volume = Math.max(0, Math.min(1, a.volume + (to > a.volume ? 0.04 : -0.04)))
      if (Math.abs(a.volume - to) < 0.05) { a.volume = to; clearInterval(iv); done && done() }
    }, 100)
  }
  return { start() { a.play().catch(() => {}); fade(0.7) }, stop() { fade(0, () => a.pause()) } }
}
