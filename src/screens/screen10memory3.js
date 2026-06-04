/* screens/screen10-memory3.js — extra memory screen */

export function buildScreen10() {
  return `
  <div id="screen-10" class="screen">
    <button class="music-btn js-music-btn">🎵</button>

    <div class="photo-card" style="height:300px;">
      <img src="/photo4.jpeg"
           style="width:100%; height:100%; display:block;
                  object-fit:cover; object-position: center 30%;">
    </div>

    <p class="title-big" style="font-size:19px;margin-bottom:10px;">
      judul foto
    </p>

    <p style="font-size:13px;font-weight:600;color:#4a6cb7;text-align:center;
              line-height:1.7;max-width:280px;">
      tulis caption disini
    </p>

    <button class="btn" style="margin-top:22px;" onclick="goTo('letter-transition')">
      klik ini &lt;3
    </button>
  </div>`
}
