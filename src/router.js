/* =============================================
   router.js — Navigasi antar screen

   CARA PAKAI:
     import { goTo, onNavigate } from './router.js'
     goTo(3)
     goTo('spotify')
     onNavigate(id => console.log('pindah ke', id))

   CARA DEBUG TANPA FILE LAIN:
     File ini tidak bergantung modul apapun.
     Hanya butuh elemen #screen-{id} di DOM.
   ============================================= */

// Hook opsional — modul lain bisa daftar listener di sini
const _hooks = []

export function onNavigate(fn) {
  _hooks.push(fn)
}

export function goTo(id) {
  // Handle alias: 'letter-transition' → jalankan triggerTransition13
  if (id === 'letter-transition') {
    // Import dinamis agar tidak crash kalau file screen13 tidak ada
    import('./screens/screen13-transition.js')
      .then(m => m.triggerTransition13())
      .catch(() => console.warn('[router] screen13-transition.js tidak ada'))
    return
  }

  // Handle alias: 'letter' → goTo lalu startLetter
  if (id === 'letter') {
    _activate('screen-letter')
    import('./screens/screenLetter.js')
      .then(m => m.startLetter())
      .catch(() => console.warn('[router] screenLetter.js tidak ada'))
    _hooks.forEach(fn => fn(id))
    return
  }

  _activate(`screen-${id}`)
  _hooks.forEach(fn => fn(id))
}

function _activate(screenId) {
  // Nonaktifkan yang sekarang
  document.querySelector('.screen.active')
    ?.classList.remove('active')

  const el = document.getElementById(screenId)
  if (!el) {
    console.warn(`[router] Tidak ada elemen: #${screenId}`)
    return
  }

  el.classList.add('active', 'slide-in')
  setTimeout(() => el.classList.remove('slide-in'), 500)
}

// Expose ke window untuk onclick="goTo(...)" di HTML template
window.goTo = goTo
