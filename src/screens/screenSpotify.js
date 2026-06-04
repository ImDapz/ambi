/* =============================================
   screenSpotify.js — Spotify Player
   - Playlist dari config.js (format dictionary)
   - Cover diekstrak otomatis dari ID3 tag MP3
   - Warna background card = dominant color cover (Canvas API)
   ============================================= */

import { PLAYLIST } from '../config.js'
import { getGlobalAudio } from '../modules/music.js'
import jsmediatags from 'jsmediatags'

let currentTrack = 0
let audio = null

// Cache metadata yang sudah diekstrak { file: { title, artist, album, cover } }
const trackMeta = {}

// ── Ekstrak metadata + cover dari MP3 ──────────────────────────────
async function readMetadata(track) {
  const staticCover = track.cover || null

  try {
    const response = await fetch('/music/' + track.file)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    // ← KUNCI: pakai .blob() bukan .arrayBuffer()
    const blob = await response.blob()

    return await new Promise((resolve) => {
      jsmediatags.read(blob, {
        onSuccess: (tag) => {
          const tags = tag.tags
          let coverUrl = staticCover || '/cover.jpg'

          if (!staticCover && tags.picture) {
            const { data, format } = tags.picture
            const coverBlob = new Blob([new Uint8Array(data)], { type: format })
            coverUrl = URL.createObjectURL(coverBlob)
          }

          resolve({
            title:  tags.title  || track.title  || track.file.replace('.mp3', ''),
            artist: tags.artist || track.artist || 'Unknown Artist',
            album:  tags.album  || track.album  || '',
            cover:  coverUrl,
          })
        },
        onError: (err) => {
          console.warn('[jsmediatags] error:', err)
          resolve({
            title:  track.title  || track.file.replace('.mp3', ''),
            artist: track.artist || 'Unknown Artist',
            album:  track.album  || '',
            cover:  staticCover || '/cover.jpg',
          })
        },
      })
    })
  } catch (err) {
    console.warn('[readMetadata] fetch gagal:', err)
    return {
      title:  track.title  || track.file.replace('.mp3', ''),
      artist: track.artist || 'Unknown Artist',
      album:  track.album  || '',
      cover:  staticCover || '/cover.jpg',
    }
  }
}

// ── Ekstrak dominant color dari URL gambar pakai Canvas ─────────────
function getDominantColor(imgUrl) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        // Sample kecil aja biar cepat
        canvas.width  = 50
        canvas.height = 50
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, 50, 50)
        const data = ctx.getImageData(0, 0, 50, 50).data

        // Hitung rata-rata RGB tapi skip pixel yang terlalu terang/gelap
        let r = 0, g = 0, b = 0, count = 0
        for (let i = 0; i < data.length; i += 4) {
          const pr = data[i], pg = data[i+1], pb = data[i+2]
          const brightness = (pr + pg + pb) / 3
          // Skip putih (>220) dan hitam (<30)
          if (brightness > 220 || brightness < 30) continue
          r += pr; g += pg; b += pb; count++
        }
        if (count === 0) { resolve(null); return }
        r = Math.round(r / count)
        g = Math.round(g / count)
        b = Math.round(b / count)

        // Gelapi sedikit buat background card
        const darken = 0.65
        resolve({
          base:   `rgb(${Math.round(r*darken)}, ${Math.round(g*darken)}, ${Math.round(b*darken)})`,
          dark:   `rgb(${Math.round(r*0.35)}, ${Math.round(g*0.35)}, ${Math.round(b*0.35)})`,
          accent: `rgb(${r}, ${g}, ${b})`,
          raw:    { r, g, b },
        })
      } catch {
        resolve(null)
      }
    }
    img.onerror = () => resolve(null)
    img.src = imgUrl
  })
}

// ── Apply warna dinamis ke card ──────────────────────────────────────
async function applyDynamicColor(coverUrl) {
  const card = document.getElementById('sp-card')
  if (!card) return

  const color = await getDominantColor(coverUrl)
  if (!color) {
    // Fallback ke warna default
    card.style.background = 'linear-gradient(160deg, #6b2d5e 0%, #3d1a38 100%)'
    card.style.setProperty('--sp-accent', '#c06aa0')
    return
  }

  const { base, dark, accent, raw } = color
  card.style.background = `linear-gradient(160deg, ${base} 0%, ${dark} 100%)`
  card.style.setProperty('--sp-accent', accent)

  // Ganti warna progress bar thumb juga
  const style = document.getElementById('sp-dynamic-style')
  if (style) {
    style.textContent = `
      #sp-progress-bar::-webkit-slider-thumb { background: rgb(${raw.r},${raw.g},${raw.b}) !important; }
      #sp-progress-bar::-moz-range-thumb      { background: rgb(${raw.r},${raw.g},${raw.b}) !important; }
      .sp-track.sp-active .sp-track-name      { color: rgb(${raw.r},${raw.g},${raw.b}) !important; }
      .sp-track.sp-active .sp-track-num       { color: rgb(${raw.r},${raw.g},${raw.b}) !important; }
    `
  }
}

// ── HTML template ───────────────────────────────────────────────────
export function buildScreenSpotify() {
  return `
  <style id="sp-dynamic-style"></style>

  <div id="screen-spotify" class="screen sp-screen">
    <button class="music-btn js-music-btn">🎵</button>

    <div class="sp-card" id="sp-card">

      <!-- Spotify logo pojok kanan atas -->
      <div class="sp-logo">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white" opacity="0.85">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </div>

      <!-- Header: cover + info playlist -->
      <div class="sp-header">
        <img class="sp-cover-img" id="sp-main-cover" src="/cover.jpg" alt="cover" />
        <div class="sp-header-info">
          <div class="sp-playlist-name">for u</div>
          <div class="sp-playlist-by">Lovee</div>
          <div class="sp-save-btn">
            <span class="sp-save-icon">⊕</span> Save on Spotify
          </div>
        </div>
      </div>

      <!-- Preview badge + controls -->
      <div class="sp-controls-row">
        <span class="sp-preview-badge">Preview</span>
        <div class="sp-controls">
          <button class="sp-ctrl-btn js-prev" title="Previous">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
            </svg>
          </button>
          <button class="sp-ctrl-btn js-next" title="Next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 4V8l-5.5 4zM16 6h2v12h-2z"/>
            </svg>
          </button>
          <button class="sp-ctrl-btn sp-ctrl-more">•••</button>
          <button class="sp-play-big" id="sp-play-btn">
            <svg id="sp-play-icon" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="sp-progress-wrap">
        <input type="range" id="sp-progress-bar" class="sp-progress-bar" value="0" min="0" max="100" step="0.1" />
        <div class="sp-time-row">
          <span id="sp-current-time">0:00</span>
          <span id="sp-duration">0:00</span>
        </div>
      </div>

      <!-- Tracklist -->
      <div class="sp-tracklist" id="sp-tracklist">
        ${PLAYLIST.map((t, i) => `
          <div class="sp-track ${i === 0 ? 'sp-active' : ''}" data-index="${i}">
            <span class="sp-track-num">${i === 0 ? '▶' : i + 1}</span>
            <div class="sp-track-info">
              <div class="sp-track-name">${t.title || t.file.replace('.mp3','')}</div>
              <div class="sp-track-artist">${t.artist || ''}</div>
            </div>
            <span class="sp-track-dur" id="sp-dur-${i}">–:––</span>
          </div>
        `).join('')}
      </div>
    </div>

    <button class="btn" style="margin-top:18px;flex-shrink:0;" onclick="goTo('letter')">
      Lanjut →
    </button>
  </div>`
}

// ── Init ──────────────────────────────────────────────────────────────
export async function initScreenSpotify() {
  audio = getGlobalAudio()

  // Load semua metadata
  for (const track of PLAYLIST) {
    trackMeta[track.file] = await readMetadata(track)
  }

  // Update tracklist dengan info metadata
  renderTracklist()

  // Muat duration semua track
  await preloadDurations()

  // Load track pertama
  loadTrack(0, false)

  // Event listeners
  document.addEventListener('click', handleSpotifyClick)

  audio.addEventListener('timeupdate', updateProgress)
  audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % PLAYLIST.length
    loadTrack(currentTrack, true)
  })

  // Seek bar drag
  const bar = document.getElementById('sp-progress-bar')
  if (bar) {
    bar.addEventListener('input', () => {
      if (audio.duration) {
        audio.currentTime = (bar.value / 100) * audio.duration
      }
    })
  }
}

// ── Pre-load durasi semua track ───────────────────────────────────────
async function preloadDurations() {
  const promises = PLAYLIST.map((track, i) => {
    return new Promise((resolve) => {
      const tmp = new Audio()
      tmp.preload = 'metadata'
      tmp.src = '/music/' + track.file
      tmp.onloadedmetadata = () => {
        const el = document.getElementById(`sp-dur-${i}`)
        if (el) el.textContent = formatTime(tmp.duration)
        resolve()
      }
      tmp.onerror = () => resolve()
    })
  })
  await Promise.all(promises)
}

// ── Render tracklist ──────────────────────────────────────────────────
function renderTracklist() {
  const container = document.getElementById('sp-tracklist')
  if (!container) return

  container.innerHTML = PLAYLIST.map((track, i) => {
    const meta = trackMeta[track.file] || track
    const isActive = i === currentTrack
    return `
      <div class="sp-track ${isActive ? 'sp-active' : ''}" data-index="${i}">
        <span class="sp-track-num">${isActive ? '▶' : i + 1}</span>
        <div class="sp-track-info">
          <div class="sp-track-name">${meta.title}</div>
          <div class="sp-track-artist">${meta.artist}</div>
        </div>
        <span class="sp-track-dur" id="sp-dur-${i}">–:––</span>
      </div>
    `
  }).join('')

}

// ── Load track ────────────────────────────────────────────────────────
function loadTrack(index, autoplay = true) {
  currentTrack = index
  const track = PLAYLIST[index]
  const meta  = trackMeta[track.file] || track

  audio.src = '/music/' + track.file
  if (autoplay) {
    audio.play().catch(() => {})
    setPlayIcon(true)
  } else {
    setPlayIcon(false)
  }

  // Update cover
  const coverUrl = meta.cover || '/cover.jpg'
  const coverEl  = document.getElementById('sp-main-cover')
  if (coverEl) coverEl.src = coverUrl

  // Update warna dinamis
  applyDynamicColor(coverUrl)

  // Update tracklist highlight
  document.querySelectorAll('.sp-track').forEach((el, i) => {
    const numEl = el.querySelector('.sp-track-num')
    if (i === index) {
      el.classList.add('sp-active')
      if (numEl) numEl.textContent = '▶'
    } else {
      el.classList.remove('sp-active')
      if (numEl) numEl.textContent = String(i + 1)
    }
  })
}

// ── Controls ──────────────────────────────────────────────────────────
function handleSpotifyClick(e) {
  if (!document.getElementById('screen-spotify')?.classList.contains('active')) return

  const trackEl = e.target.closest('.sp-track')
  if (trackEl) {
    loadTrack(Number(trackEl.dataset.index), true)
    return
  }

  if (e.target.closest('#sp-play-btn') || e.target.closest('.sp-play-big')) togglePlay()
  else if (e.target.closest('.js-prev')) prevTrack()
  else if (e.target.closest('.js-next')) nextTrack()
}

function togglePlay() {
  if (audio.paused) {
    audio.play().catch(() => {})
    setPlayIcon(true)
  } else {
    audio.pause()
    setPlayIcon(false)
  }
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + PLAYLIST.length) % PLAYLIST.length
  loadTrack(currentTrack, true)
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % PLAYLIST.length
  loadTrack(currentTrack, true)
}

function setPlayIcon(playing) {
  const icon = document.getElementById('sp-play-icon')
  if (!icon) return
  icon.innerHTML = playing
    ? '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'   // pause
    : '<path d="M8 5v14l11-7z"/>'                        // play
}

// ── Progress ──────────────────────────────────────────────────────────
function updateProgress() {
  const bar  = document.getElementById('sp-progress-bar')
  const curr = document.getElementById('sp-current-time')
  const dur  = document.getElementById('sp-duration')
  if (!audio.duration) return
  if (bar)  bar.value         = (audio.currentTime / audio.duration) * 100
  if (curr) curr.textContent  = formatTime(audio.currentTime)
  if (dur)  dur.textContent   = formatTime(audio.duration)
}

function formatTime(secs) {
  if (!secs || isNaN(secs)) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}
