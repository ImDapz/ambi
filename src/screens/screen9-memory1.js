/* screens/screen9-memory1.js — "I'm so grateful for every moment" */

export function buildScreen9() {
  return `
  <div id="screen-9" class="screen">
    <button class="music-btn js-music-btn">🎵</button>

	<div class="photo-card" style="height:300px;">
	  <img src="/photo1.jpeg" 
	       style="width:100%; height:100%; display:block; 
	              object-fit:cover; object-position: center 30%;">
	</div>

    <p class="title-big" style="font-size:19px;margin-bottom:10px;">
      If life is a movie, you are the bestpart
    </p>

    <p style="font-size:13px;font-weight:600;color:#4a6cb7;text-align:center;
              line-height:1.7;max-width:280px;">
      Adegan yang tak akan pernah bosan tuk kuputar ulang dan kenanganya akan kusimpan.
    </p>

    <button class="btn" style="margin-top:22px;" onclick="goTo(11)">
      klik ini &lt;3
    </button>
  </div>`
}
