/* screens/screen11-memory2.js — "I hope we keep creating memories" */

export function buildScreen11() {
  return `
  <div id="screen-11" class="screen">
    <button class="music-btn js-music-btn">🎵</button>

    <div class="photo-card">
      <div class="photo-placeholder" style="background:linear-gradient(135deg,#ffe8d6,#ffd6e7);">
        🌸
      </div>
    </div>

    <p class="title-bold" style="max-width:290px;">
      I hope we keep creating<br>memories, big and small, together
    </p>

    <button class="btn" style="margin-top:22px;" onclick="goTo(12)">
      klik ini &lt;3
    </button>
  </div>`
}
