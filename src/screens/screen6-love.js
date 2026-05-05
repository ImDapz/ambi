/* screens/screen6-love.js — "Happy birthday to my most beautiful..." */
import { GIFS } from '../config.js'

export function buildScreen6() {
  return `
  <div id="screen-6" class="screen">
    <button class="music-btn js-music-btn">🎵</button>

    <div class="gif-with-play" onclick="goTo(7)">
      <img src="${GIFS.love}" alt="capoo love" style="border-radius:16px;" />
      <div class="play-overlay"></div>
    </div>

    <p class="title-big" style="margin-top:6px;">
      Happy birthday to my most<br>beautiful, loving, and caring<br>girlfriend 🤍
    </p>

    <p style="font-size:14px;font-weight:600;color:#4a6cb7;margin-top:6px;">
      I love youu so muchh!!!
    </p>

    <button class="btn" style="margin-top:18px;" onclick="goTo(7)">
      i have something for you 💌
    </button>
  </div>`
}
