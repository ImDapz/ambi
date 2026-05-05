/* screens/screen3-ready.js — "Are you ready?" + tombol yes/no */
import { GIFS } from '../config.js'

export function buildScreen3() {
  return `
  <div id="screen-3" class="screen">
    <button class="music-btn js-music-btn">🎵</button>

    <div class="gif-with-play" style="cursor:default;">
      <img src="${GIFS.ready}" alt="capoo ready" />
    </div>

    <p class="title-big" style="margin-top:4px;">
      are you readyy to open thisss?
    </p>

    <div class="btn-row" style="margin-top:20px;">
      <button class="btn"         onclick="goTo(5)">yess</button>
      <button class="btn btn-outline" onclick="goTo(4)">noo</button>
    </div>
  </div>`
}
