import type { Tutorial } from "../types"

export const cssFlexboxGrid: Tutorial = {
    slug: "css-flexbox-grid",
    title: "Flexbox & Grid: Layout Modern",
    description:
      "Kuasai dua sistem layout utama CSS — Flexbox untuk satu dimensi dan Grid untuk dua dimensi.",
    category: "CSS",
    level: "Menengah",
    minutes: 14,
    date: "2026-08-12",
    content: [
      {
        type: "p",
        text: "Sebelum Flexbox & Grid, mengatur layout adalah mimpi buruk. Sekarang dua sistem ini membuat layout 90% halaman web menjadi mudah. Aturan praktisnya: Flexbox untuk satu arah, Grid untuk dua arah.",
      },
      { type: "h2", text: "Flexbox: satu dimensi" },
      {
        type: "p",
        text: "Flexbox menyusun anak elemen dalam satu baris (row) atau satu kolom (column). Cukup set display: flex pada kontainer, lalu gunakan properti untuk mengontrol arah, pembungkusan, dan perataan.",
      },
      {
        type: "code",
        lang: "css",
        filename: "flex.css",
        code: `.navbar {
  display: flex;
  justify-content: space-between; /* horizontal */
  align-items: center;            /* vertical */
  gap: 12px;
}

/* Kotak yang fleksibel: memenuhi sisa ruang */
.spacer {
  flex: 1;
}

/* Responsif: turun ke kolom di layar kecil */
@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
  }
}`,
      },
      {
        type: "list",
        items: [
          "flex-direction: row / column — arah utama.",
          "justify-content — perataan pada arah utama (horizontal di row).",
          "align-items — perataan pada arah silang (vertical di row).",
          "gap — jarak antar anak elemen.",
        ],
      },
      { type: "h2", text: "Grid: dua dimensi" },
      {
        type: "p",
        text: "Grid membagi area menjadi baris dan kolom sekaligus. Ini sempurna untuk layout halaman dan kartu.",
      },
      {
        type: "code",
        lang: "css",
        filename: "grid.css",
        code: `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 kolom sama lebar */
  gap: 20px;
}

/* Kolom responsif tanpa media query */
.auto-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

/* Area spesifik */
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-areas:
    "sidebar main";
}
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }`,
      },
      {
        type: "callout",
        title: "Unit fr",
        tone: "tip",
        text: "fr (fraction) membagi ruang yang tersisa. 1fr 1fr 1fr = tiga kolom sama lebar. Kombinasikan dengan px: 250px 1fr berarti kolom pertama tetap 250px, sisanya untuk kolom kedua.",
      },
      { type: "h2", text: "Kapan memakai apa?" },
      {
        type: "list",
        items: [
          "Navbar, tombol berjajar, footer → Flexbox.",
          "Layout halaman, galeri kartu, dashboard → Grid.",
          "Keduanya bisa digabung: Grid untuk halaman, Flexbox di dalam tiap sel.",
        ],
      },
      { type: "h2", text: "Latihan: galeri kartu" },
      {
        type: "p",
        text: "Buat container dengan 6 kartu. Gunakan auto-fit minmax(200px, 1fr) agar di layar kecil kartu otomatis menjadi 1 kolom, di layar lebar menjadi 3 kolom. Itu responsive design tanpa satu pun media query.",
      },
      {
        type: "callout",
        title: "Langkah berikutnya",
        text: "Layout sudah lancar? Saatnya membuat halamanmu interaktif dengan JavaScript.",
      },
    ],
  }
