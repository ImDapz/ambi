/* screens/screen11-memory2.js — "I hope we keep creating memories" */

export function buildScreen11() {
  return `
  <div id="screen-11" class="screen">
    <button class="music-btn js-music-btn">🎵</button>

    <div class="photo-card">
              <img src="/photo3.jpeg" style="width:100%;height:305px;object-fit:cover;">
    </div>

	<p class="title-big" style="font-size:19px;margin-bottom:10px;">
     Ini favorit ku juga
    </p>

    <p style="font-size:13px;font-weight:600;color:#4a6cb7;text-align:center;
              line-height:1.7;max-width:280px;">
	Karna sebelum kamu ngasih pap buket itu aku masih inget dimana kamu said sorry karna gada foto buket itu dan ganti nya kamu ngirimi pap ini
	
    </p>

    <button class="btn" style="margin-top:22px;" onclick="goTo(12)">
      klik ini &lt;3
    </button>
  </div>`
}
