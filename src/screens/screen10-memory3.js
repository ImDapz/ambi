/* screens/screen10-memory3.js — extra memory screen */

export function buildScreen10() {
  return `
  <div id="screen-10" class="screen">
    <button class="music-btn js-music-btn">🎵</button>

    <img src="/photo4.png"
         style="width: 80%; height: 300px; display: block;
                object-fit: cover; object-position: center 30%;">

    <p class="title-big" style="font-size:19px;margin-bottom:10px;">
    In the end
    </p>

    <p style="font-size:13px;font-weight:600;color:#4a6cb7;text-align:center;
              line-height:1.7;max-width:280px;">
               yash itu tiga kategori foto favorit aku, but sebenarnya semua foto dari kamu itu favorit aku semua baee
          </p>

    <button class="btn" style="margin-top:22px;" onclick="goTo('letter-transition')">
      klik ini &lt;3
    </button>
  </div>`
}
