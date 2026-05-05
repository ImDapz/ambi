/* =============================================
   modules/confetti.js — Confetti & floating hearts
   
   CARA DEBUG TANPA FILE INI:
     Komentar import → app tetap jalan, hanya
     animasi partikel yang tidak muncul.
   ============================================= */

const CONFETTI_ITEMS = ['🩵', '💙', '✨', '🎉', '🎊', '⭐', '💫', '🤍', '🌟']
const HEART_ITEMS    = ['🩵', '💙', '🤍', '💫', '✨', '⭐']

// ── Confetti burst (screen transisi) ───────────────────────────────
export function spawnConfetti(containerId = 'confetti-wrap') {
  const wrap = document.getElementById(containerId)
  if (!wrap) return

  for (let i = 0; i < 28; i++) {
    const el = document.createElement('div')
    el.classList.add('confetti-item')
    el.textContent = _rand(CONFETTI_ITEMS)
    el.style.left            = Math.random() * 100 + '%'
    el.style.animationDuration  = (2.5 + Math.random() * 2.5) + 's'
    el.style.animationDelay     = Math.random() * 1.2 + 's'
    el.style.fontSize           = (16 + Math.random() * 16) + 'px'
    wrap.appendChild(el)
  }
}

// ── Floating hearts (screen letter) ────────────────────────────────
// Spawn terus menerus selama maxCount hearts, lalu berhenti
export function spawnHearts(containerId = 'hearts-wrap', maxCount = 40) {
  const wrap = document.getElementById(containerId)
  if (!wrap) return

  let count = 0
  const interval = setInterval(() => {
    if (count >= maxCount) {
      clearInterval(interval)
      return
    }

    const el = document.createElement('div')
    el.classList.add('heart-float')
    el.textContent             = _rand(HEART_ITEMS)
    el.style.left              = Math.random() * 100 + '%'
    el.style.animationDuration = (4 + Math.random() * 5) + 's'
    el.style.animationDelay    = Math.random() * 2 + 's'
    el.style.fontSize          = (14 + Math.random() * 14) + 'px'
    wrap.appendChild(el)
    count++

    // Bersihkan elemen yang sudah selesai animasi supaya DOM tidak numpuk
    el.addEventListener('animationend', () => el.remove())
  }, 300)
}

function _rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
