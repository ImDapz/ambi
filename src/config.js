/* =============================================
   config.js — Edit semua konten di sini
   Tidak perlu buka file lain untuk ganti teks,
   PIN, GIF, atau playlist.
   ============================================= */

// ── PIN password (format: DDMMYY) ──────────────────────────────────
export const CORRECT_PIN = '1937284650'

// ── GIF Capoo dari Giphy ────────────────────────────────────────────
export const GIFS = {
  password: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2gzZmZnMXVsNWJsNHdoeWY4dGFpZm1uY3lycG9oNWxnY2pydGY2ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Rd6sn03ncIKHrfzcci/giphy.gif',
  hi:       'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3ZxdzBncGU3cWtkMGRiaWVzYnEybzJ2aGZjeXBlcGF1NnF4ZnFtZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/hA0OYhjYRgjMQcAqlS/giphy.gif',
  ready:    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWE2cGttaGc5NWVteGZyYjZwOG1qNnVlYmV1bDJneGVzMjZ6aHBqcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/RkDDt7sMZrZFNpJqOV/giphy.gif',
  mad:      'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2Rsa2o5Z3J1OHlka3l2eDRuaW94aHg1bml0dGQxdzJjc3E3eWVsdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/26BRzQS5HXcEWVJQQ/giphy.gif',
  birthday: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2Jzb3p4cHNkZjF3NmEzYmltejgybHJ6cGN2bHlyNHBobnhvcGpicyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/g9582DNuQppxC/giphy.gif',
  love:     'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExamFoYWs5ZjgyazJ0bm9lMnlpNXBpbnlheXg2aTg1aHN5cGNrYmNqZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VbnUQpnihPSIgIXuZv/giphy.gif',
  last:     'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzdna2poOGxnM3NkNG14aHpzeW01bXNnZHc1c3A2czg2aWlrZGJkaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/LmNwrBhejkK9EFP504/giphy.gif',
}

// ── Spotify playlist ────────────────────────────────────────────────
export const PLAYLIST = [
  { title: "Love Story (Taylor's Version)", artist: 'Taylor Swift', dur: '3:55' },
  { title: 'My Love Mine All Mine',         artist: 'Mitski',       dur: '2:17' },
  { title: "Mine (Taylor's Version)",       artist: 'Taylor Swift', dur: '3:51' },
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
