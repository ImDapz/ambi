/* screens/screen2-hi.js — "Hi Pretty" screen */
import { GIFS } from '../config.js'

export function buildScreen2() {
  return `
  <div id="screen-2" class="screen">
    <button class="music-btn js-music-btn">🎵</button>

    <p style="font-size:26px;font-weight:900;color:var(--text-dark);margin-bottom:16px;">Hi</p>

    <div class="gif-with-play" onclick="goTo(3)">
      <img src="${GIFS.hi}" alt="capoo hi" />
      <div class="play-overlay"></div>
    </div>

    <p class="title-big">hi, pretty 🫶🏼👋🏼</p>

    <button class="btn" style="margin-top:18px;" onclick="goTo(3)">
      tap disinii &lt;3
    </button>
  </div>`
}
