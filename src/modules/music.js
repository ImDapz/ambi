/* =============================================
   modules/music.js — Global Audio Controller
   Sekarang mengikuti playlist dari screenSpotify
   ============================================= */

let _audio = null
let _currentTrackIndex = 0

export function initMusic() {
  if (!_audio) {
    _audio = new Audio()
    window.globalAudio = _audio  // supaya bisa diakses dari screen lain
  }
  return _audio
}

export function getGlobalAudio() {
  return window.globalAudio || initMusic()
}

export function setMusicPlaying(on) {
  const audio = getGlobalAudio()
  if (on) {
    audio.play().catch(() => {})
  } else {
    audio.pause()
  }
}

// Dipanggil dari screenSpotify.js
export function playTrackFromPlaylist(index, playlist) {
  const audio = getGlobalAudio()
  if (!playlist || !playlist[index]) return

  _currentTrackIndex = index
  audio.src = `/music/${playlist[index]}`
  audio.play().catch(err => console.error("Play error:", err))
}

export function fadeMusicOut(durationMs = 1500) {
  const audio = getGlobalAudio()
  if (!audio) return

  const steps = 30
  const interval = durationMs / steps
  const decrement = audio.volume / steps

  const timer = setInterval(() => {
    if (audio.volume > decrement) {
      audio.volume = Math.max(0, audio.volume - decrement)
    } else {
      audio.volume = 0
      audio.pause()
      clearInterval(timer)
    }
  }, interval)
}

export function isPlaying() {
  const audio = getGlobalAudio()
  return audio && !audio.paused
}
