/* screens/screen5-birthday.js — "Today this pretty girl turns 18" */
import { GIFS } from '../config.js'

export function buildScreen5() {
  return `
  <div id="screen-5" class="screen">
    <button class="music-btn js-music-btn">🎵</button>

    <div class="gif-with-play" onclick="goTo(6)">
      <img src="${GIFS.birthday}" alt="capoo birthday" style="border-radius:16px;" />
      <div class="play-overlay"></div>
    </div>

    <p class="title-big" style="margin-top:8px;">
      Today, this pretty girl turns 18!<br>
      <span style="font-weight:700;font-size:17px;">happy birthday, my love 🤍</span>
    </p>

    <button class="btn" style="margin-top:20px;" onclick="goTo(6)">
      open it &lt;3
    </button>
  </div>`
}
