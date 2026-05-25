/* =============================================
   modules/music.js — Background music controller
   
   CARA DEBUG TANPA FILE INI:
     Komentar import di main.js → app tetap jalan,
     hanya musik background yang hilang.
   
   CARA PAKAI:
     import { initMusic, setMusicPlaying, fadeMusicOut } from './modules/music.js'
     initMusic()
     setMusicPlaying(true)   // play
     fadeMusicOut(1500)      // fade out dalam 1.5 detik
   ============================================= */

let _bgAudio = null
let _playing  = false
let _fadeTimer = null
const MUSIC_START_SEC = 0 // ← ganti angka ini, misal 185 = detik ke 3:05

// ── Init: buat elemen audio + connect ke bgMusic ───────────────────
// File /public/bgMusic.mp3 — taruh mp3 kamu di sini
export function initMusic() {
  _bgAudio = new Audio('/bgMusic.mp3')
  _bgAudio.currentTime = MUSIC_START_SEC
  _bgAudio.loop   = true
  _bgAudio.volume = 0.7

  _bgAudio.addEventListener('error', () => {
    console.info('[music] bgMusic.mp3 tidak ada — musik dinonaktifkan')
    _bgAudio = null
  })
}  

// ── Play / pause ────────────────────────────────────────────────────
export function setMusicPlaying(on) {
  if (!_bgAudio) return
  _playing = on

  if (on) {
    _bgAudio.play().catch(() => {})
  } else {
    _bgAudio.pause()
  }
}

export function isPlaying() {
  return _playing
}

// ── Fade out perlahan lalu pause ────────────────────────────────────
export function fadeMusicOut(durationMs = 2000) {
  if (!_bgAudio || !_playing) return
  if (_fadeTimer) clearInterval(_fadeTimer)

  const steps    = 30
  const interval = durationMs / steps
  const decrement = _bgAudio.volume / steps

  _fadeTimer = setInterval(() => {
    if (_bgAudio.volume > decrement) {
      _bgAudio.volume = Math.max(0, _bgAudio.volume - decrement)
    } else {
      _bgAudio.volume = 0
      _bgAudio.pause()
      _playing = false
      clearInterval(_fadeTimer)
      _fadeTimer = null
    }
  }, interval)
}

// ── Fade in dari volume 0 ────────────────────────────────────────────
export function fadeMusicIn(targetVolume = 0.7, durationMs = 1500) {
  if (!_bgAudio) return
  if (_fadeTimer) clearInterval(_fadeTimer)

  _bgAudio.volume = 0
  _bgAudio.play().catch(() => {})
  _playing = true

  const steps     = 30
  const interval  = durationMs / steps
  const increment = targetVolume / steps

  _fadeTimer = setInterval(() => {
    if (_bgAudio.volume < targetVolume - increment) {
      _bgAudio.volume = Math.min(targetVolume, _bgAudio.volume + increment)
    } else {
      _bgAudio.volume = targetVolume
      clearInterval(_fadeTimer)
      _fadeTimer = null
    }
  }, interval)
}
