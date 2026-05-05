/* =============================================
   modules/sound.js — Numpad key sounds
   
   CARA DEBUG TANPA FILE INI:
     Komentar import di main.js → app tetap jalan,
     hanya suara numpad yang hilang. Tidak ada crash.
   
   CARA PAKAI:
     import { playKeySound, triggerKeyBounce } from './modules/sound.js'
     playKeySound(5)          // mainkan suara angka 5
     triggerKeyBounce(btnEl)  // animasi bounce tombol
   ============================================= */

import { KEY_PITCH } from '../config.js'

let audioCtx = null
let baseBuffer = null
let engineReady = false

// ── Init: load telephone.mp3 dari /public ──────────────────────────
export async function initSound() {
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()

    const res = await fetch('/telephone.mp3')
    if (!res.ok) {
      console.info('[sound] telephone.mp3 tidak ada → pakai fallback oscillator')
      return
    }

    const buf = await res.arrayBuffer()
    baseBuffer = await audioCtx.decodeAudioData(buf)
    engineReady = true
    console.info('[sound] engine siap ✅ (telephone.mp3)')
  } catch (e) {
    console.warn('[sound] init gagal, fallback aktif:', e.message)
  }
}

// ── Resume context (diperlukan setelah autoplay policy browser) ─────
function _resume() {
  if (audioCtx?.state === 'suspended') audioCtx.resume()
}

// ── Main: mainkan suara untuk angka n ──────────────────────────────
export function playKeySound(n) {
  const rate = KEY_PITCH[n] ?? 1.0

  if (engineReady && audioCtx && baseBuffer) {
    _playMp3(rate)
  } else {
    _playOscillator(rate)
  }
}

function _playMp3(rate) {
  _resume()
  try {
    const src = audioCtx.createBufferSource()
    src.buffer = baseBuffer
    src.playbackRate.value = rate

    const gain = audioCtx.createGain()
    gain.gain.setValueAtTime(0.75, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.28)

    src.connect(gain)
    gain.connect(audioCtx.destination)
    src.start()
  } catch (e) {
    console.warn('[sound] playMp3 error:', e.message)
  }
}

function _playOscillator(rate) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.frequency.value = 440 * rate
    osc.type = 'sine'

    gain.gain.setValueAtTime(0.35, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.22)
  } catch (e) {
    // silent fail — user tidak perlu tahu
  }
}

// ── Animasi bounce tombol ───────────────────────────────────────────
export function triggerKeyBounce(btn) {
  if (!btn) return
  btn.classList.remove('bounce')
  void btn.offsetWidth // force reflow untuk restart animasi
  btn.classList.add('bounce')
  setTimeout(() => btn.classList.remove('bounce'), 400)
}
