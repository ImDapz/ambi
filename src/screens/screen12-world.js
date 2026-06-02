/* screens/screen12-world.js — "you deserve the world" */

export function buildScreen12() {
  return `
  <div id="screen-12" class="screen">
    <button class="music-btn js-music-btn">🎵</button>

    <div class="photo-card">
    	<img src="/photo3.jpeg" style="width:100%;height:405px;bottom:20px;object-fit:cover;">
    </div>

    <p class="title-big" style="font-size:19px;margin-bottom:10px;">
      Dirimu sang pelengkap hari
    </p>

    <p style="font-size:13px;font-weight:600;color:#4a6cb7;text-align:center;
              line-height:1.7;max-width:280px;">
      Aku merasa bahwa itu melengkapi hariku<br>
      dan aku selamanya berterimakasih<br>
      memiliki seorang sepertimu
    </p>

    <!-- goTo('letter-transition') → screen 13 confetti → our-song -->
    <button class="btn" style="margin-top:20px;"
            onclick="goTo('letter-transition')">
      klik ini &lt;3
    </button>
  </div>`
}
