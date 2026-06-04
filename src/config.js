/* =============================================
   config.js — Edit semua konten di sini
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

// ── Spotify playlist — format dictionary ────────────────────────────
// Letakkan file MP3 di folder /public/
// cover: opsional — kalau null, akan diekstrak otomatis dari tag ID3
// Kalau ekstrak gagal, fallback ke /cover.jpg
export const PLAYLIST = [
  {
    file:   'Bestpart.mp3',
    title:  'Best Part',
    artist: 'Daniel Caesar ft. H.E.R.',
    album:  'Freudian',
    cover:  null,        // null = auto-extract dari ID3
  },
  {
    file:   'love.mp3',
    title:  'love.',
    artist: 'wave to earth',
    album:  '0.1 flaws and all',
    cover:  null,
  },
]

// ── Teks surat / birthday letter ────────────────────────────────────
export const LETTER_TEXT = `happy sweet seventeen baebae risma

finally kamu dah berusia 17 tahun yang dimana katanya umur yang spesial banget njayy.

Yaa disini aku pengen bilang makasih yaa baee. Makasih karena sampai hari ini kamu masih jadi salah satu alasan kenapa hari-hari aku terasa lebih berwarna. Makasih juga buat semua cerita, tawa, dan momen-momen kecil yang udah kita lewatin bareng. I love you baee.

oh yaa semoga di umur mu yang spesial ini kamu sehat sehat terus, bahagia terus, makin cantik ya walaupun udah cantik hehe, makin pinter, dan semua hal yang kamu harapkan bisa pelan-pelan tercapai yaa baee. Pokoknya semoga di umur mu yang 17 tahun ini menjadi tahun yang istimewa dan spesial buat kamu.

Terakhir ini hal kebiasaan kamu yaa, pliss pola makan mu diatur jangan keseringan ga makan apalagi ga sarapan. Sesibuk apa pun kamu itu, jaga kesehatan tetap nomor satu. trus jangan terlalu capek juga yaa baee. aku tau kamu selalu berusaha ngelakuin yang terbaik buat banyak hal, terutama urusan sekolah ama osis mu itu. tapi yaa jangan lupa istirahat juga dan aku disini selalu menyemangati mu baee. trus jangan banyak sedih juga baee, kalo kamu lagi sedih jangan dipendem sendiri yaa. aku tau terkadang kamu lebih nyimpen semuanya sendirian dan berusaha keliatan baik baik aja. gapapa kalo capek, gapapa kalo sedih tapi yaa jangan terlalu keras ama diri sendiri baee. aku selalu ada disini buat kamu, buat dengerin cerita kamu, keluh kesah kamu, dan hal-hal random yang pengen kamu ceritain, jadi jangan ngerasa sendirian yaa baee.

udah itu aja dari aku.

happy sweet seventeen baebae risma, i love you moree`

// ── Sound — pitch per angka numpad ─────────────────────────────────
export const KEY_PITCH = {
  0: 0.354,
  1: 0.420,
  2: 0.500,
  3: 0.595,
  4: 0.707,
  5: 1.000,
  6: 1.414,
  7: 2.000,
  8: 2.828,
  9: 4.000,
}
