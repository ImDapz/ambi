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

    <p class="title-big" style="font-size:16px;margin-bottom:10px;">
   My pap paling favorit
    </p>

    <p style="font-size:15px;font-weight:600;color:#4a6cb7;text-align:center;S
              line-height:1.7;max-width:280px;">
         Ini pap favorit aku dari kamu, buket bunga risem yang tercantik, termanis, tergemas, terkyut dan terfavorit
    </p>


    <button class="btn" style="margin-top:22px;" onclick="goTo(11)">
      klik ini &lt;3
    </button>
  </div>`
}
