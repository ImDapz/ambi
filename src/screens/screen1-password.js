/* =============================================
   screen1-password.js — Numpad PIN screen
   
   CARA DEBUG:
     Import file ini sendiri di main.js,
     goTo(1) di console → screen muncul.
     Sound & bounce bekerja independen lewat
     import dari modules/sound.js.
   ============================================= */

import { GIFS, CORRECT_PIN } from '../config.js'
import { goTo }               from '../router.js'
import { playKeySound, triggerKeyBounce } from '../modules/sound.js'

// ── State lokal screen ini ──────────────────────────────────────────
const PIN_LENGTH = CORRECT_PIN.length  // otomatis = 10
let _pin = ''

// ── HTML template ───────────────────────────────────────────────────

export function buildScreen1() {
  const dots = Array.from({ length: PIN_LENGTH }, (_, i) =>
    `<div class="pin-dot" id="dot-${i}"></div>`
  ).join('')
  const keys = [1,2,3,4,5,6,7,8,9].map(n =>
    `<button class="num-key" data-key="${n}">${n}</button>`
  ).join('')

  return `
  <div id="screen-1" class="screen active">
    <button class="music-btn js-music-btn">🎵</button>

    <div class="gif-container">
      <img src="${GIFS.password}" alt="capoo" />
    </div>

    <p class="title-bold">
      Hi baee, ayo tebak passwordnya,<br>I bet u knoww!!
    </p>

    <div class="pin-dots" id="pin-dots">${dots}</div>

    <div class="numpad" id="numpad">
      ${keys}
      <button class="num-key zero-key" data-key="0">0</button>
      <button class="num-key js-backspace">⌫</button>
    </div>

    <p class="clue-text">clue : your birthday</p>
  </div>`
}

// ── Event listeners — dipasang setelah DOM render ───────────────────
export function initScreen1() {
  const numpad = document.getElementById('numpad')
  if (!numpad) return

  // Delegasi event ke numpad, bukan tiap tombol
  numpad.addEventListener('click', e => {
    const btn = e.target.closest('[data-key]')
    if (btn) {
      _handleInput(Number(btn.dataset.key), btn)
      return
    }
    if (e.target.closest('.js-backspace')) {
      _handleBackspace(e.target.closest('.js-backspace'))
    }
  })
}

// ── Logic ────────────────────────────────────────────────────────────
function _handleInput(n, btn) {
  if (_pin.length >= PIN_LENGTH) return
  triggerKeyBounce(btn)
  playKeySound(n)
  _pin += n
  _updateDots()
  if (_pin.length === PIN_LENGTH) setTimeout(_checkPin, 150)
}

function _handleBackspace(btn) {
  triggerKeyBounce(btn)
  playKeySound(3)
  _pin = _pin.slice(0, -1)
  _updateDots()
}

function _checkPin() {
  if (_pin === CORRECT_PIN) {
    _pin = ''; _updateDots(); goTo(2)
  } else {
    _shakeDots(); _pin = ''; setTimeout(_updateDots, 500)
  }
}

function _updateDots() {
  for (let i = 0; i < PIN_LENGTH; i++)
    document.getElementById(`dot-${i}`)?.classList.toggle('filled', i < _pin.length)
}

function _shakeDots() {
  document.querySelectorAll('.pin-dot').forEach(d => {
    d.style.animation = 'none'; void d.offsetHeight
    d.style.animation = 'dotShake 0.4s ease'
  })
  setTimeout(() => document.querySelectorAll('.pin-dot').forEach(d => d.style.animation = ''), 500)
}
