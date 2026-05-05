/* screens/screen9-memory1.js — "I'm so grateful for every moment" */

export function buildScreen9() {
  return `
  <div id="screen-9" class="screen">
    <button class="music-btn js-music-btn">🎵</button>

    <div class="photo-card">
      <div class="photo-placeholder" style="background:linear-gradient(135deg,#c8d8f0,#dce8ff);">
        📸
      </div>
    </div>

    <p class="title-bold" style="max-width:290px;">
      I'm so grateful for every<br>moment we've shared since then
    </p>

    <button class="btn" style="margin-top:22px;" onclick="goTo(11)">
      klik ini &lt;3
    </button>
  </div>`
}
