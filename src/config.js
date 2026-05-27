/* =============================================
   config.js — Edit semua konten di sini
   Tidak perlu buka file lain untuk ganti teks,
   PIN, GIF, atau playlist.
   ============================================= */

// ── PIN password (format: DDMMYY) ──────────────────────────────────
export const CORRECT_PIN = '00'

// ── GIF Capoo dari Giphy ────────────────────────────────────────────
export const GIFS = {
  password: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExemVkZnI4N29pbWVlazFra2ExZmp5amY0eDRqeTNxYmw3OWNwcHpiNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/fjxupFeOlzwRnhKT0b/giphy.gif',
  hi:       'https://media.giphy.com/media/xUPGcGzMdaaTX13PfW/giphy.gif',
  ready:    'https://media.tenor.com/nQGkHDj38ucAAAAi/cat-bugcat.gif',
  mad:      'https://media.tenor.com/aFhWic8AkNUAAAAi/h%E1%BB%A9-gi%E1%BA%ADn.gif',
  birthday: 'https://media.tenor.com/8oRk0EBWv1AAAAAj/bugcat-capoo.gif',
  love:     'https://media.tenor.com/x-xfvBmLgDoAAAAi/tkthao219-capoo.gif',
  last:     'https://i.pinimg.com/originals/29/4d/93/294d93123bae16823d7eef3c70ee0c31.gif',
}

// ── Spotify playlist ────────────────────────────────────────────────
export const PLAYLIST = [
  "love.mp3",
  "bgMusic.mp3"
 ]
// ── Teks surat / birthday letter ────────────────────────────────────
export const LETTER_TEXT = `On your special day, I just want to remind you how grateful I am to have you in my life. Thank you for being the amazing person you are—kind, loving, and always making everything feel a little warmer just by being around.

I hope this new year of your life brings you happiness, peace, and all the good things you've been wishing for. May every step you take feel lighter, and may you always be surrounded by love and people who truly care about you. You deserve so much more than you know.

I love you endlessly, and I'll always be here for you — through every moment, big or small.

Happy 18th birthday, my love 🤍`

// ── Sound — pitch per angka numpad ─────────────────────────────────
// 5 = base (1.0), naik ke 9, turun ke 0
export const KEY_PITCH = {
  0: 0.354,
  1: 0.420,
  2: 0.500,
  3: 0.595,
  4: 0.707,
  5: 1.000,  // ← telephone.mp3 base
  6: 1.414,
  7: 2.000,
  8: 2.828,
  9: 4.000,
}





