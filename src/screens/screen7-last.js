/* screens/screen7-last.js — "okayy last one" intro */
import { GIFS } from '../config.js'

export function buildScreen7() {
  return `
  <div id="screen-7" class="screen">
    <button class="music-btn js-music-btn">🎵</button>

    <div class="gif-with-play" style="cursor:default;">
      <img src="${GIFS.last}" alt="capoo" style="border-radius:16px;" />
    </div>

    <p class="title-big" style="margin-top:8px;font-size:17px;line-height:1.6;">
      okayy last one, i made something<br>for your birthday, read it slowly<br>okayyyy
    </p>

    <button class="btn" style="margin-top:20px;padding:14px 24px;font-size:18px;"
            onclick="goTo(9)">
      &lt;3
    </button>
  </div>`
}
