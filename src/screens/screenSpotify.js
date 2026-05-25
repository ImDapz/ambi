/* =============================================
   screenSpotify.js — Full Player with Local MP3
   ============================================= */

import { PLAYLIST } from '../config.js'
import { getGlobalAudio } from '../modules/music.js'

let currentTrack = 0
let audio = null

// ================== CONFIG PATH ==================
// Ubah ini kalau mau ambil langsung dari public/ tanpa folder music/
const MUSIC_BASE_PATH = '/'   // ganti jadi '/' kalau mau langsung dari public/

function parseFilename(filename) {
  let name = filename.replace('.mp3', '').replace(/\./g, ' ').trim()
  
  // Coba pisah Artist - Title
  const parts = name.split(/\s+-\s+/)
  if (parts.length > 1) {
    return { title: parts[1], artist: parts[0] }
  }
  
  return { 
    title: name, 
    artist: "Unknown Artist" 
  }
}

export function buildScreenSpotify() {
  return `
    <div id="screen-spotify" class="screen">
      <div class="spotify-main">
        
        <!-- Big Cover -->
        <div class="sp-big-cover">
          <img id="big-cover" src="/cover.jpg" alt="cover">
        </div>

        <!-- Player Card -->
        <div class="spotify-card">
          <div class="sp-header">
            <div class="sp-playlist-name">for u</div>
            <div class="sp-by">Lovee</div>
            <div class="sp-save">⊕ Save on Spotify</div>
          </div>

          <div class="sp-now-playing">
            <img id="mini-cover" src="/cover.jpg" alt="">
            <div class="sp-track-info">
              <div id="now-title" class="sp-now-title">Select a song</div>
              <div id="now-artist" class="sp-now-artist"></div>
            </div>
          </div>

          <div class="sp-progress">
            <span id="current-time">0:00</span>
            <input type="range" id="progress-bar" value="0" max="100" style="flex:1">
            <span id="duration">0:00</span>
          </div>

          <div class="sp-controls">
            <button class="sp-btn js-prev">⏮</button>
            <button class="sp-btn js-play" id="play-pause">▶</button>
            <button class="sp-btn js-next">⏭</button>
          </div>

          <div class="sp-tracklist" id="tracklist"></div>
        </div>
      </div>

      <button class="btn" onclick="goTo('letter')">Lanjut →</button>
    </div>
  `
}

export function initScreenSpotify() {
  audio = getGlobalAudio()

  renderTracklist()
  loadTrack(currentTrack)

  document.addEventListener('click', handleClick)
  audio.addEventListener('timeupdate', updateProgress)
  audio.addEventListener('ended', nextTrack)
}

function renderTracklist() {
  const container = document.getElementById('tracklist')
  container.innerHTML = PLAYLIST.map((file, i) => {
    const info = parseFilename(file)
    return `
      <div class="sp-track ${i === currentTrack ? 'active' : ''}" data-index="${i}">
        <span class="track-number">${i + 1}</span>
        <div class="track-details">
          <div class="track-name">${info.title}</div>
          <div class="track-artist">${info.artist}</div>
        </div>
      </div>
    `
  }).join('')
}

function loadTrack(index) {
  currentTrack = index
  const file = PLAYLIST[index]
  const info = parseFilename(file)

  // Path audio
  audio.src = MUSIC_BASE_PATH + file

  document.getElementById('now-title').textContent = info.title
  document.getElementById('now-artist').textContent = info.artist

  renderTracklist()

  // Auto play
  audio.play().catch(err => console.log("Play prevented:", err))
}

function handleClick(e) {
  const trackEl = e.target.closest('.sp-track')
  if (trackEl) {
    const index = Number(trackEl.dataset.index)
    loadTrack(index)
    return
  }

  if (e.target.closest('.js-play')) togglePlay()
  else if (e.target.closest('.js-prev')) prevTrack()
  else if (e.target.closest('.js-next')) nextTrack()
}

function togglePlay() {
  if (audio.paused) {
    audio.play()
    document.getElementById('play-pause').textContent = '⏸'
  } else {
    audio.pause()
    document.getElementById('play-pause').textContent = '▶'
  }
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + PLAYLIST.length) % PLAYLIST.length
  loadTrack(currentTrack)
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % PLAYLIST.length
  loadTrack(currentTrack)
}

function updateProgress() {
  const bar = document.getElementById('progress-bar')
  const curr = document.getElementById('current-time')
  const dur = document.getElementById('duration')

  if (audio.duration) {
    bar.value = (audio.currentTime / audio.duration) * 100
    curr.textContent = formatTime(audio.currentTime)
    dur.textContent = formatTime(audio.duration)
  }
}

function formatTime(secs) {
  if (!secs || isNaN(secs)) return "0:00"
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}
