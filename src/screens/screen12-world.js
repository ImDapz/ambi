/* screens/screen12-world.js — "you deserve the world" */

export function buildScreen12() {
  return `
  <div id="screen-12" class="screen">
    <button class="music-btn js-music-btn">🎵</button>

    <div class="photo-card">
      <div class="photo-placeholder" style="background:linear-gradient(135deg,#1a2a6b,#2a4a9b);">
        💙
      </div>
    </div>

    <p class="title-big" style="font-size:19px;margin-bottom:10px;">
      you deserve the world and i'll<br>always love you
    </p>

    <p style="font-size:13px;font-weight:600;color:#4a6cb7;text-align:center;
              line-height:1.7;max-width:280px;">
      you never gave up on me and for that<br>
      im forever grateful, thankful to have<br>
      girlfriend like you
    </p>

    <!-- goTo('letter-transition') → screen 13 confetti → our-song -->
    <button class="btn" style="margin-top:20px;"
            onclick="goTo('letter-transition')">
      klik ini &lt;3
    </button>
  </div>`
}
