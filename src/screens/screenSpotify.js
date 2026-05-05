/* =============================================
   screenSpotify.js — Spotify card UI
   
   State lokal: track aktif & status play/pause
   Tidak bergantung pada state global.
   ============================================= */

import { PLAYLIST } from '../config.js'

// ── State lokal screen ini ──────────────────────────────────────────
let _track   = 0
let _playing = false

// ── HTML template ───────────────────────────────────────────────────
export function buildScreenSpotify() {
  return `
  <div id="screen-spotify" class="screen">
    <button class="music-btn js-sp-music-btn">▶</button>

    <div class="spotify-card">
      <div class="sp-logo-icon">Spotify</div>

      <div class="sp-header">
        <div class="sp-cover">🐰</div>
        <div class="sp-info">
          <div class="sp-playlist-name">for u</div>
          <div class="sp-by">Lovee</div>
          <div class="sp-save">⊕ Save on Spotify</div>
        </div>
      </div>

      <span class="preview-badge">Preview</span>

      <div class="sp-controls">
        <button class="sp-skip js-sp-prev">⏮</button>
        <button class="sp-play-btn js-sp-play">▶</button>
        <button class="sp-skip js-sp-next">⏭</button>
      </div>

      <div class="sp-track-list" id="sp-track-list">
        ${_buildTrackList()}
      </div>
    </div>

    <button class="btn" style="margin-top:20px;" onclick="goTo('letter')">
      Lanjut →
    </button>
  </div>`
}

function _buildTrackList() {
  return PLAYLIST.map((t, i) => `
    <div class="sp-track ${i === _track && _playing ? 'active' : ''}"
         data-track="${i}">
      <span class="track-num">${i + 1}</span>
      <div class="track-info">
        <div class="track-name">${t.title}</div>
        <div class="track-artist">${t.artist}</div>
      </div>
      <span class="track-dur">${t.dur}</span>
    </div>`).join('')
}

// ── Event listeners ─────────────────────────────────────────────────
export function initScreenSpotify() {
  // Delegasi ke spotify card (dipasang sekali saja)
  document.addEventListener('click', e => {
    // Track klik
    const trackEl = e.target.closest('.sp-track[data-track]')
    if (trackEl) {
      _track   = Number(trackEl.dataset.track)
      _playing = true
      _refresh()
      return
    }
    // Tombol play/pause
    if (e.target.closest('.js-sp-play')) { _togglePlay(); return }
    if (e.target.closest('.js-sp-prev'))  { _prev(); return }
    if (e.target.closest('.js-sp-next'))  { _next(); return }
  })
}

// ── Logic ────────────────────────────────────────────────────────────
function _togglePlay() {
  _playing = !_playing
  _refresh()
}

function _prev() {
  _track   = (_track - 1 + PLAYLIST.length) % PLAYLIST.length
  _playing = true
  _refresh()
}

function _next() {
  _track   = (_track + 1) % PLAYLIST.length
  _playing = true
  _refresh()
}

function _refresh() {
  // Update track list
  const list = document.getElementById('sp-track-list')
  if (list) list.innerHTML = _buildTrackList()

  // Update play button
  document.querySelector('.js-sp-play')
    && (document.querySelector('.js-sp-play').textContent = _playing ? '⏸' : '▶')

  // Update music btn di kanan atas
  const musicBtn = document.querySelector('.js-sp-music-btn')
  if (musicBtn) {
    musicBtn.textContent = _playing ? '🎵' : '▶'
    musicBtn.classList.toggle('playing', _playing)
  }
}
