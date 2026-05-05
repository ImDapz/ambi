/* screens/screen4-mad.js — Capoo marah kalau pilih "noo" */
import { GIFS } from '../config.js'

export function buildScreen4() {
  return `
  <div id="screen-4" class="screen">
    <button class="music-btn js-music-btn">🎵</button>

    <div class="gif-with-play" style="cursor:default;">
      <img src="${GIFS.mad}" alt="capoo mad" />
    </div>

    <p class="title-big"
       style="font-size:20px;text-transform:uppercase;letter-spacing:0.5px;margin-top:8px;">
      OH GITU SEKARANG KAMU<br>SAMA AKU? 😡
    </p>

    <button class="btn" style="margin-top:22px;" onclick="goTo(3)">back</button>
  </div>`
}
