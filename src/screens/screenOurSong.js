/* screens/screenOurSong.js — "our song 🎵" halaman transisi */

export function buildScreenOurSong() {
  return `
  <div id="screen-our-song" class="screen">
    <button class="music-btn js-music-btn">▶</button>

    <div style="display:flex;gap:4px;align-items:center;margin-bottom:20px;">
      <span style="font-size:72px;filter:drop-shadow(0 4px 10px rgba(255,200,0,0.35));">🎵</span>
      <span style="font-size:72px;filter:drop-shadow(0 4px 10px rgba(180,100,200,0.35));">🎶</span>
    </div>

    <p style="font-size:22px;font-weight:800;color:var(--text-dark);">our song 🎵</p>

    <button class="btn" style="margin-top:28px;" onclick="goTo('spotify')">
      lanjut →
    </button>
  </div>`
}
