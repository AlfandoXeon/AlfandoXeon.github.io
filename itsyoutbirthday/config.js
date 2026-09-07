/**
 * Konfigurasi Aplikasi Web Ulang Tahun
 * Disesuaikan khusus untuk perayaan ulang tahun ke-24 berdasarkan plan.txt
 */

const CONFIG = {
  // ── Informasi Penerima & Pengirim ─────────────────────────────
  name: "Cintaku",
  sender: "Glorius Paskan Danu",
  photo: "./img/image copy 4.png", // Foto profil utama
  music: "./music/knt.mp4",        // Musik latar belakang (knt.mp4)

  // ── Tema & Warna ──────────────────────────────────────────────
  colors: {
    primary: "#f43f5e",            // Rose Romantis
    accent: "#a855f7",             // Violet Mewah
    dark: {
      background: "#090d16",       // Midnight Navy
      text: "#f8fafc",             // Putih Lembut
    },
    light: {
      background: "#fff5f7",       // Soft Warm Rose
      text: "#1e293b",             // Slate Gelap
    },
  },

  // ── Mode Tampilan Default ─────────────────────────────────────
  defaultMode: "dark",

  // ── Alur Cerita & Urutan Bagian (Sections) ─────────────────────
  sections: [
    // 1. Sapaan Awal
    {
      type: "greeting",
      title: "Hai",
      subtitle: "Hari ini adalah hari yang paling istimewa untukmu...",
    },

    // 2. Hitung Mundur Menuju Angka 7 (Nomor Punggung CR7 & Nomor Favorit)
    {
      type: "countdown",
      from: 3,
      goText: "7",
    },

    // 3. Pengumuman Ulang Tahun
    {
      type: "announcement",
      text: "Sekonyong-Konyong Ulang Tahun Hari Ini",
    },

    // 4. Catatan Spesial Angka 7 & Cristiano Ronaldo
    {
      type: "chatbox",
      sender: "Glorius Paskan Danu",
      message:
        "Tanggal 7 hari ulang tahunmu. Wah, angka 7! Nomor punggung Cristiano Ronaldo, sekaligus nomor favoritku. Semoga angka 7 ini membawa banyak keberuntungan, kebahagiaan, dan hal-hal indah untukmu.",
      buttonText: "Buka Surat Berikutnya",
    },

    // 5. Surat Cinta & Doa Manis Ultah ke-24
    {
      type: "chatbox",
      sender: "Glorius Paskan Danu",
      message:
        "Seperti merapalkan doa pelan-pelan...\nAku Glorius Paskan Danu mulai menulis kalimat manis untukmu xixi.\n\nSelamat atas kelahiran yang terus berulang dua puluh empat kali, cintaa!\nMelalui hadiah kecil ini aku titipkan yang manis-manis dan sederhana. Semoga aku terus menulis kata-kata setiap tanggal ulang tahunmu tiba.",
      buttonText: "Baca Puisi Untukmu",
    },

    // 6. Dekorasi Balon Meriah (24 Balon melambangkan usia 24)
    {
      type: "balloons",
      count: 24,
    },

    // 7. Bintang-bintang Berkelap-kelip
    {
      type: "stars",
      count: 45,
    },

    // 8. Puisi: "Kamu Dirayakan Olehku" (Dengan tombol skip dan jeda yang lebih responsif)
    {
      type: "ideas",
      title: "Kamu Dirayakan Olehku",
      lines: [
        "Aku ingin merayakanmu,",
        "tidak hanya pada setiap purnamamu...",
        "aku ingin merayakanmu,",
        "pada setiap detik, menit, hari yang sudah berhasil kau lalui...",
        "aku ingin merayakanmu,",
        "pada apa yang semampu kurayakan...",
        "aku ingin merayakanmu,",
        "sampai kau mengerti, ternyata ada seseorang yang sangat...",
        "<strong>BERSUKA CITA</strong> atas adanya dirimu,",
        "dan itu aku.",
      ],
      bigLetters: "24",
    },

    // 9. Sorotan Foto Profil & Doa Penuh Makna
    {
      type: "profile",
      photo: "./img/image copy 4.png",
      wishTitle: "Dirayakan Olehku",
      wishText:
        "Selamat ulang tahun yang ke-24 untuk seseorang yang kehadirannya selalu kusyukuri setiap hari.",
    },

    // 10. Pesta Kembang Api
    {
      type: "fireworks",
      count: 24,
    },

    // 11. Taburan Konfeti Warna-warni
    {
      type: "confetti",
      count: 9,
    },

    // 12. Galeri Seluruh 6 Foto Masa Kecil (Polaroid Interaktif)
    {
      type: "gallery",
      title: "Galeri Foto Masa Kecilmu",
      subtitle: "Perjalanan indah hingga kini genap berusia 24 tahun",
      photos: [
        {
          src: "./img/WhatsApp Image 2026-09-06 at 20.48.51.jpeg",
          caption: "Senyum ceria di depan cermin, auranya sehangat mentari pagi",
          year: "Masa Balita",
        },
        {
          src: "./img/image.png",
          caption: "Momen menggemaskan mengelus anabul kucing putih kesayangan",
          year: "Kecil & Penyayang",
        },
        {
          src: "./img/image copy.png",
          caption: "Pipi tembam yang selalu menggemaskan, duduk manis di sofa vintage",
          year: "Si Paling Imut",
        },
        {
          src: "./img/image copy 2.png",
          caption: "Paling keren dengan kacamata biru di samping pohon natal",
          year: "Gaya Juara",
        },
        {
          src: "./img/image copy 3.png",
          caption: "Santai di kursi bambu sambil menikmati biskuit ditemani anabul",
          year: "Momen Hangat",
        },
        {
          src: "./img/image copy 4.png",
          caption: "Pose kuncir dua paling ikonik dan selalu berhasil membuat tersenyum",
          year: "Penuh Ceria",
        },
      ],
    },

    // 13. Pesan Penutup & Tombol Putar Ulang
    {
      type: "closing",
      text: "Sekali lagi, Selamat Ulang Tahun yang ke-24, Cintaa! Terima kasih sudah tumbuh begitu hebat dan menjadi anugerah terindah.",
      signature: "Tertanda dengan segenap cinta,<br><strong>Glorius Paskan Danu</strong>",
      replayText: "Putar Ulang Ucapan",
    },
  ],
};
