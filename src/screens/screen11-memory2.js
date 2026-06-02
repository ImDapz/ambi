/* screens/screen11-memory2.js — "I hope we keep creating memories" */

export function buildScreen11() {
  return `
  <div id="screen-11" class="screen">
    <button class="music-btn js-music-btn">🎵</button>

    <div class="photo-card">
              <img src="/photo2.jpeg" style="width:100%;height:305px;object-fit:cover;">
    </div>

	<p class="title-big" style="font-size:19px;margin-bottom:10px;">
      seorang yang penting lagi favorit
    </p>

    <p style="font-size:13px;font-weight:600;color:#4a6cb7;text-align:center;
              line-height:1.7;max-width:280px;">
      Sampai sekarang, potret tentang kamu<br>
      masih memiliki tempat khusus<br>
      di galeri dan ingatanku.
    </p>

    <button class="btn" style="margin-top:22px;" onclick="goTo(12)">
      klik ini &lt;3
    </button>
  </div>`
}
