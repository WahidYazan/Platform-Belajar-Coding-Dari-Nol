import type { Tutorial } from "../types"

export const cssDasar: Tutorial = {
    slug: "css-dasar",
    title: "CSS Dasar: Styling & Box Model",
    description:
      "Pahami selektor, properti, dan box model CSS untuk mengubah halaman HTML menjadi tampilan yang menarik.",
    category: "CSS",
    level: "Pemula",
    minutes: 13,
    date: "2026-08-10",
    content: [
      {
        type: "p",
        text: "CSS (Cascading Style Sheets) mengatur tampilan halaman: warna, font, jarak, ukuran, dan posisi. Jika HTML adalah kerangka tulang, CSS adalah kulit, pakaian, dan riasannya.",
      },
      { type: "h2", text: "Tiga cara menulis CSS" },
      {
        type: "list",
        items: [
          "Inline: atribut style di dalam tag — contohnya <p style=\"color: red\">. Hindari, sulit dirawat.",
          "Internal: tag <style> di dalam <head>.",
          "Eksternal (terbaik): file .css terpisah yang di-link dari HTML.",
        ],
      },
      {
        type: "code",
        lang: "html",
        filename: "index.html",
        code: `<head>
  <link rel="stylesheet" href="style.css" />
</head>`,
      },
      { type: "h2", text: "Selektor dasar" },
      {
        type: "p",
        text: "Selektor menentukan elemen mana yang akan di-style:",
      },
      {
        type: "code",
        lang: "css",
        filename: "style.css",
        code: `/* Selektor tag */
p {
  color: #333;
}

/* Selektor class (paling sering dipakai) */
.card {
  background: #f5f5f5;
  padding: 16px;
}

/* Selektor id (hanya satu per halaman) */
#header {
  height: 64px;
}

/* Selektor kombinasi: p di dalam .article */
.article p {
  line-height: 1.7;
}`,
      },
      {
        type: "callout",
        title: "Class vs ID",
        tone: "tip",
        text: "Gunakan class untuk elemen yang berulang dan id untuk elemen unik. Class selalu ditulis dengan titik (.) dan id dengan pagar (#).",
      },
      { type: "h2", text: "Cascade & specificity" },
      {
        type: "p",
        text: "CSS bekerja seperti aturan yang saling tumpang tindih — itu arti 'cascading'. Ketika dua aturan bertabrakan, yang menang adalah yang lebih spesifik:",
      },
      {
        type: "code",
        lang: "css",
        filename: "specificity.css",
        code: `/* Semakin spesifik, semakin menang */
p       { color: gray }        /* specificity rendah */
.text   { color: blue }        /* menang melawan p */
#hero   { color: red }         /* menang melawan .text */
p.text  { color: green }       /* menang melawan .text */

/* Aturan terakhir dengan specificity sama juga menang */
p { color: black }
p { color: yellow }  /* ini yang dipakai */`,
      },
      { type: "h2", text: "Box model (wajib paham!)" },
      {
        type: "p",
        text: "Semua elemen HTML adalah kotak. Kotak itu terdiri dari empat lapisan dari dalam ke luar: content, padding, border, dan margin.",
      },
      {
        type: "code",
        lang: "css",
        filename: "box-model.css",
        code: `.box {
  width: 300px;          /* content */
  padding: 16px;         /* jarak dalam, antara konten dan border */
  border: 2px solid #333;/* garis tepi */
  margin: 20px;          /* jarak luar dengan elemen lain */
}

/* Lebih aman: ukuran termasuk padding & border */
*,
*::before,
*::after {
  box-sizing: border-box;
}`,
      },
      {
        type: "list",
        items: [
          "content — isi kotak (teks/gambar).",
          "padding — ruang dalam antara konten dan border.",
          "border — garis tepi kotak.",
          "margin — ruang luar memisahkan kotak dengan kotak lain.",
        ],
      },
      { type: "h2", text: "Warna, font & jarak yang umum" },
      {
        type: "code",
        lang: "css",
        filename: "style.css",
        code: `.card {
  background-color: #ffffff;
  color: #1a1a1a;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}`,
      },
      {
        type: "callout",
        title: "Praktik terbaik",
        tone: "tip",
        text: "Satu halaman = satu judul utama (<h1>). Pakai palet warna 2–3 warna utama, gunakan unit relatif seperti rem untuk font agar mengikuti ukuran default pengguna.",
      },
      {
        type: "p",
        text: "Lanjut ke tutorial berikutnya untuk mempelajari Flexbox & Grid, sistem layout yang akan mengubah cara kamu mengatur halaman.",
      },
    ],
  }
