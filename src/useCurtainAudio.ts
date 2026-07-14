let ctx: AudioContext | null = null
let master: GainNode | null = null
let noiseBuffer: AudioBuffer | null = null
let lastNoisePlay = 0
let lastBellPlay = 0
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
  const t = c.currentTime
  const amp = 0.03 + Math.min(1, intensity) * 0.08

  // Noise (沙沙声)
  if (now - lastNoisePlay > 40) {
    lastNoisePlay = now
    const src = c.createBufferSource()
    src.buffer = noiseBuffer
    src.playbackRate.value = 0.7 + Math.random() * 0.6

    const lp = c.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 2000 + Math.random() * 2000

    const g = c.createGain()
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(amp, t + 0.008)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.15 + Math.random() * 0.1)

    src.connect(lp)
    lp.connect(g)
    g.connect(master)
    src.start(t, Math.random() * 0.3, 0.15)
    src.stop(t + 0.25)
  }

  // Bell (铃音)
  if (intensity > 0.03 && now - lastBellPlay > 150) {
    const bellChance = Math.min(1, intensity * 3)
    if (Math.random() < bellChance) {
      lastBellPlay = now
      const notes = [1046.5, 1318.5, 1568, 2093, 2637, 3136]
      const f0 = notes[Math.floor(Math.random() * notes.length)]
      const strikeAmp = 0.02 + intensity * 0.04
      const detune = 1 + (Math.random() - 0.5) * 0.008

      const partials = [
        { ratio: 1, gain: 1, decay: 1.2 },
        { ratio: 2.76, gain: 0.4, decay: 0.6 },
        { ratio: 5.12, gain: 0.2, decay: 0.3 },
      ]

      for (const p of partials) {
        const osc = c.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = f0 * p.ratio * detune

        const og = c.createGain()
        const pAmp = strikeAmp * p.gain
        og.gain.setValueAtTime(0, t)
        og.gain.linearRampToValueAtTime(pAmp, t + 0.002)
        og.gain.exponentialRampToValueAtTime(0.0001, t + p.decay)

        osc.connect(og)
        og.connect(master)
        osc.start(t)
        osc.stop(t + p.decay + 0.05)
      }

      // Delayed second bell (叠音)
      if (Math.random() < 0.3) {
        const dt = 0.04 + Math.random() * 0.06
        const f1 = notes[Math.floor(Math.random() * notes.length)]
        const osc2 = c.createOscillator()
        osc2.type = 'sine'
        osc2.frequency.value = f1 * detune

        const og2 = c.createGain()
        og2.gain.setValueAtTime(0, t + dt)
        og2.gain.linearRampToValueAtTime(strikeAmp * 0.4, t + dt + 0.002)
        og2.gain.exponentialRampToValueAtTime(0.0001, t + dt + 0.5)

        osc2.connect(og2)
        og2.connect(master)
        osc2.start(t + dt)
        osc2.stop(t + dt + 0.55)
      }
    }
  }
}
