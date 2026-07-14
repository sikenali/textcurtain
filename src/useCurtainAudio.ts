let ctx: AudioContext | null = null
let master: GainNode | null = null
let noiseBuffer: AudioBuffer | null = null
let lastPlay = 0
let listenersAttached = false

function ensureContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
    master = ctx.createGain()
    master.gain.value = 0.85
    master.connect(ctx.destination)

    const len = ctx.sampleRate
    noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
  }
  attachUnlockListeners()
  return ctx
}

function tryUnlock() {
  if (!ctx) return
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }
  try {
    const buf = ctx.createBuffer(1, 1, ctx.sampleRate)
    const src = ctx.createBufferSource()
    src.buffer = buf
    src.connect(ctx.destination)
    src.start(0)
  } catch {
  }
}

function attachUnlockListeners() {
  if (listenersAttached || typeof window === 'undefined') return
  listenersAttached = true
  const unlock = () => {
    tryUnlock()
    if (ctx && ctx.state === 'running') {
      for (const ev of GESTURES) window.removeEventListener(ev, unlock)
    }
  }
  const GESTURES = ['pointerdown', 'touchstart', 'keydown', 'click'] as const
  for (const ev of GESTURES) window.addEventListener(ev, unlock, { passive: true })
}

export function unlockCurtainAudio() {
  ensureContext()
  tryUnlock()
}

export function playCurtainBrush(intensity: number) {
  const c = ensureContext()
  if (!c || !master || !noiseBuffer) return
  if (c.state === 'suspended') {
    c.resume().catch(() => {})
    return
  }

  const now = performance.now()
  if (now - lastPlay < 70) return
  lastPlay = now

  const t = c.currentTime
  const amp = 0.05 + Math.min(1, intensity) * 0.12

  const src = c.createBufferSource()
  src.buffer = noiseBuffer
  src.playbackRate.value = 0.85 + Math.random() * 0.3

  const bp = c.createBiquadFilter()
  bp.type = 'bandpass'
  bp.frequency.value = 1400 + intensity * 1800 + Math.random() * 500
  bp.Q.value = 1.4

  const g = c.createGain()
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(amp, t + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2)

  src.connect(bp)
  bp.connect(g)
  g.connect(master)
  src.start(t, Math.random() * 0.5, 0.25)
  src.stop(t + 0.3)

  if (intensity > 0.08) {
    const notes = [1567.98, 1760, 2093, 2349.3, 2637, 3135.96]
    const f0 = notes[Math.floor(Math.random() * notes.length)]
    const partials = [
      { ratio: 1, gain: 1, decay: 0.9 },
      { ratio: 2.32, gain: 0.55, decay: 0.55 },
      { ratio: 4.25, gain: 0.28, decay: 0.32 },
      { ratio: 6.63, gain: 0.14, decay: 0.18 },
    ]
    const strikeAmp = 0.05 + intensity * 0.09
    const detune = 1 + (Math.random() - 0.5) * 0.015

    for (const p of partials) {
      const osc = c.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = f0 * p.ratio * detune

      const og = c.createGain()
      const pAmp = strikeAmp * p.gain
      og.gain.setValueAtTime(0, t)
      og.gain.linearRampToValueAtTime(pAmp, t + 0.003)
      og.gain.exponentialRampToValueAtTime(0.0001, t + p.decay)

      osc.connect(og)
      og.connect(master)
      osc.start(t)
      osc.stop(t + p.decay + 0.05)
    }

    if (Math.random() < 0.35) {
      const dt = 0.06 + Math.random() * 0.08
      const f1 = notes[Math.floor(Math.random() * notes.length)]
      const osc2 = c.createOscillator()
      osc2.type = 'sine'
      osc2.frequency.value = f1 * detune

      const og2 = c.createGain()
      og2.gain.setValueAtTime(0, t + dt)
      og2.gain.linearRampToValueAtTime(strikeAmp * 0.5, t + dt + 0.003)
      og2.gain.exponentialRampToValueAtTime(0.0001, t + dt + 0.6)

      osc2.connect(og2)
      og2.connect(master)
      osc2.start(t + dt)
      osc2.stop(t + dt + 0.65)
    }
  }
}
