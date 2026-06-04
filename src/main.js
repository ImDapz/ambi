/* =============================================
   main.js — Entry point

   Tugas file ini HANYA:
     1. Import CSS
     2. Import semua screen builder
     3. Render HTML ke #app
     4. Init modul (sound, music, spotify)

   CARA NONAKTIFKAN 1 SCREEN UNTUK DEBUG:
     Komentar 1 baris import + 1 baris build
     → screen itu hilang, sisanya tetap jalan

   CARA NONAKTIFKAN SOUND:
     Komentar import sound + initScreen1Sound()
     → app tetap jalan tanpa suara
   ============================================= */

// ── CSS (urutan penting) ────────────────────────────────────────────
import './css/base.css'
import './css/screens.css'
import './css/components.css'
import './css/numpad.css'
import './css/spotify.css'
import './css/particles.css'

// ── Router (harus pertama sebelum screen) ──────────────────────────
import './router.js'

// ── Screen builders ─────────────────────────────────────────────────
import { buildScreen1,  initScreen1  } from './screens/screen1-password.js'
import { buildScreen2               } from './screens/screen2-hi.js'
import { buildScreen3               } from './screens/screen3-ready.js'
import { buildScreen4               } from './screens/screen4-mad.js'
import { buildScreen5               } from './screens/screen5-birthday.js'
import { buildScreen6               } from './screens/screen6-love.js'
import { buildScreen7               } from './screens/screen7-last.js'
import { buildScreen9               } from './screens/screen9-memory1.js'
import { buildScreen11              } from './screens/screen11-memory2.js'
import { buildScreen12              } from './screens/screen12-world.js'
import { buildScreen10              } from './screens/screen10memory3.js'
import { buildScreen13              } from './screens/screen13-transition.js'
import { buildScreenOurSong         } from './screens/screenOurSong.js'
import { buildScreenSpotify, initScreenSpotify } from './screens/screenSpotify.js'
import { buildScreenLetter          } from './screens/screenLetter.js'

// ── Modul opsional ──────────────────────────────────────────────────
import { initSound  } from './modules/sound.js'
import { initMusic  } from './modules/music.js'

// ── Music button global handler ─────────────────────────────────────
import { setMusicPlaying, isPlaying } from './modules/music.js'

// ── Render ──────────────────────────────────────────────────────────
function render() {
  const app = document.getElementById('app')
  if (!app) return

  app.innerHTML = `
    <div class="phone-frame">
      ${buildScreen1()}
      ${buildScreen2()}
      ${buildScreen3()}
      ${buildScreen4()}
      ${buildScreen5()}
      ${buildScreen6()}
      ${buildScreen7()}
      ${buildScreen9()}
      ${buildScreen11()}
      ${buildScreen12()}
      ${buildScreen13()}
      ${buildScreenOurSong()}
      ${buildScreenSpotify()}
      ${buildScreenLetter()}
    </div>
  `
}

// ── Init event listeners ─────────────────────────────────────────────
function initEvents() {
  // Screen 1: numpad
  initScreen1()

  // Spotify controls
  initScreenSpotify()

  // Music button (semua screen pakai class .js-music-btn)
  // Pakai event delegation dari phone-frame
  document.querySelector('.phone-frame')
    ?.addEventListener('click', e => {
      if (e.target.closest('.js-music-btn')) {
        const nowPlaying = !isPlaying()
        setMusicPlaying(nowPlaying)
        // Update semua music-btn yang visible
        document.querySelectorAll('.js-music-btn').forEach(btn => {
          btn.textContent = nowPlaying ? '🎵' : '▶'
          btn.classList.toggle('playing', nowPlaying)
        })
      }
    })
}

// ── Boot ─────────────────────────────────────────────────────────────
render()
initEvents()

// Sound & music init setelah interaksi pertama (browser autoplay policy)
document.addEventListener('click', () => {
  initSound()
  initMusic()
  setMusicPlaying(true)

  // Update semua music btn ke playing state
  document.querySelectorAll('.js-music-btn').forEach(btn => {
    btn.textContent = '🎵'
    btn.classList.add('playing')
  })
}, { once: true })
