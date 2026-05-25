/* =============================================
   screen13-transition.js — Confetti burst transition
   
   Screen ini auto-navigasi ke 'our-song' setelah 3.5 detik.
   Dipanggil lewat goTo('letter-transition') di router.
   ============================================= */

import { goTo }          from '../router.js'
import { spawnConfetti } from '../modules/confetti.js'
import { fadeMusicOut }  from '../modules/music.js'

export function buildScreen13() {
  return `
  <div id="screen-13" class="screen">
    <div class="confetti-wrap" id="confetti-wrap"></div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
      <div style="font-size:64px;">🎉</div>
      <p style="font-size:24px;font-weight:900;color:var(--text-dark);">Happy Birthday!!</p>
      <p style="font-size:16px;font-weight:600;color:#4a6cb7;">🩵🩵🩵</p>
    </div>
  </div>`
}

// Dipanggil oleh router saat id === 'letter-transition'
export function triggerTransition13() {
  // Aktifkan screen 13
  const prev = document.querySelector('.screen.active')
  if (prev) prev.classList.remove('active')

  const el = document.getElementById('screen-13')
  if (el) {
    el.classList.add('active', 'slide-in')
    setTimeout(() => el.classList.remove('slide-in'), 500)
  }

  // Efek
  spawnConfetti('confetti-wrap')
  //fadeMusicOut(1500)

  // Auto lanjut ke our-song
  setTimeout(() => goTo('our-song'), 3500)
}
