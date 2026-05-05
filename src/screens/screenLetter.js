/* =============================================
   screenLetter.js — Birthday letter dengan
   efek mengetik otomatis + floating hearts
   
   CARA DEBUG:
     goTo('letter') di console → typing mulai.
     Kalau confetti.js dinonaktifkan, hearts
     tidak muncul tapi typing tetap jalan.
   ============================================= */

import { LETTER_TEXT }  from '../config.js'
import { spawnHearts }  from '../modules/confetti.js'
import { fadeMusicOut } from '../modules/music.js'

// ── HTML template ───────────────────────────────────────────────────
export function buildScreenLetter() {
  return `
  <div id="screen-letter" class="screen screen-letter">
    <div class="floating-hearts-wrap" id="hearts-wrap"></div>
    <button class="music-btn js-music-btn">🎵</button>

    <div class="letter-container">
      <div class="letter-title">Happy birthday, my love 🤍🤍</div>
      <div class="letter-body" id="letter-text"></div>
    </div>

    <button class="btn" style="margin-top:20px;flex-shrink:0;"
            onclick="goTo(1)">
      Kembali ke Awal
    </button>
  </div>`
}

// ── Dipanggil oleh router saat screen ini aktif ─────────────────────
export function startLetter() {
  fadeMusicOut(1500)
  setTimeout(_startTyping, 300)
  spawnHearts('hearts-wrap', 40)
}

// ── Typing animation ─────────────────────────────────────────────────
function _startTyping() {
  const el = document.getElementById('letter-text')
  if (!el) return

  // Mulai dengan cursor berkedip
  el.innerHTML = '<span class="cursor-blink"></span>'

  let i = 0
  const SPEED_MS = 28   // ← ganti ini untuk mempercepat / memperlambat

  function _type() {
    if (i >= LETTER_TEXT.length) {
      // Hapus cursor setelah selesai
      el.querySelector('.cursor-blink')?.remove()
      return
    }

    const char   = LETTER_TEXT[i]
    const cursor = el.querySelector('.cursor-blink')

    if (char === '\n') {
      cursor.before(document.createElement('br'))
      // Paragraf baru = 2x newline dalam teks → tambah baris ekstra
      if (LETTER_TEXT[i + 1] === '\n') {
        cursor.before(document.createElement('br'))
        i++
      }
    } else {
      cursor.before(document.createTextNode(char))
    }

    i++

    // Auto-scroll ikut ketikan
    const container = el.closest('.letter-container')
    if (container) container.scrollTop = container.scrollHeight

    setTimeout(_type, SPEED_MS)
  }

  _type()
}
