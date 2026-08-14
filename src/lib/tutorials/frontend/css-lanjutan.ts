import type { Tutorial } from "../types"

export const cssLanjutan: Tutorial = {
    slug: "css-lanjutan",
    title: "CSS Lanjutan: Pseudo-class, Transition & Animasi",
    description:
      "Beri hidup pada halaman: hover state, transform, transisi halus, keyframe animation, dan CSS variables.",
    category: "CSS",
    level: "Menengah",
    minutes: 14,
    date: "2026-08-14",
    content: [
      {
        type: "p",
        text: "CSS tidak hanya mengatur tampilan diam — ia bisa merespons interaksi dan bergerak. Tutorial ini mengangkat tingkat skill CSS-mu dari 'bisa' menjadi 'rapi dan profesional'.",
      },
      { type: "h2", text: "Pseudo-class: gaya saat kondisi tertentu" },
      {
        type: "code",
        lang: "css",
        filename: "pseudo.css",
        code: `/* Saat kursor di atas elemen */
.btn:hover {
  background: #2563eb;
  color: white;
}

/* Saat elemen menerima fokus (keyboard) */
.input:focus {
  outline: 2px solid #2563eb;
}

/* Anak pertama / terakhir */
li:first-child { font-weight: bold; }
li:last-child  { color: gray; }

/* Setiap baris genap di tabel */
tr:nth-child(even) {
  background: #f5f5f5;
}

/* Kotak centang yang dicentang */
input:checked + label {
  text-decoration: line-through;
}`,
      },
      { type: "h2", text: "Pseudo-element: gaya bagian dari elemen" },
      {
        type: "code",
        lang: "css",
        filename: "pseudo-element.css",
        code: `/* Gaya baris pertama */
p::first-line {
  font-weight: bold;
}

/* Konten yang disisipkan sebelum/after */
.quote::before {
  content: "\\201C";   /* tanda kutip */
  font-size: 2em;
}

/* Tooltip sederhana memakai ::after */
[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  opacity: 0;
  transition: opacity 0.2s;
}
[data-tooltip]:hover::after {
  opacity: 1;
}`,
      },
      { type: "h2", text: "Transition: gerakan halus" },
      {
        type: "code",
        lang: "css",
        filename: "transition.css",
        code: `.card {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  /* properti apa saja yang berubah + durasi */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}`,
      },
      {
        type: "callout",
        title: "Transition di properti tertentu",
        tone: "tip",
        text: "Jangan animasikan semua properti (transition: all). Batasi ke properti yang benar-benar berubah agar performa tetap mulus — transform dan opacity adalah yang paling ringan.",
      },
      { type: "h2", text: "Transform: ubah bentuk tanpa mengganggu layout" },
      {
        type: "code",
        lang: "css",
        filename: "transform.css",
        code: `.btn {
  transform: scale(1);
  transition: transform 0.15s;
}
.btn:active {
  transform: scale(0.95);   /* efek tekan */
}

.spinner {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}`,
      },
      { type: "h2", text: "Keyframe animation: gerakan bertahap" },
      {
        type: "code",
        lang: "css",
        filename: "animasi.css",
        code: `@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  animation: fadeInUp 0.6s ease-out;
}

/* Animasi dengan jeda bertingkat */
.card:nth-child(1) { animation-delay: 0s; }
.card:nth-child(2) { animation-delay: 0.1s; }
.card:nth-child(3) { animation-delay: 0.2s; }`,
      },
      { type: "h2", text: "CSS Variables (custom properties)" },
      {
        type: "code",
        lang: "css",
        filename: "variables.css",
        code: `:root {
  --color-primary: #2563eb;
  --color-text: #1a1a1a;
  --radius: 12px;
  --space: 16px;
}

.button {
  background: var(--color-primary);
  border-radius: var(--radius);
  padding: var(--space) calc(var(--space) * 1.5);
}

/* Ganti tema hanya dengan mengubah satu nilai */
.dark {
  --color-text: #f5f5f5;
}`,
      },
      {
        type: "callout",
        title: "Kenapa variables?",
        text: "Satu nilai dipakai banyak tempat. Ubah sekali, semua ikut berubah. Ini dasar sistem desain modern dan cara kerja tema gelap/terang di framework seperti Tailwind.",
      },
      {
        type: "p",
        text: "Dengan pseudo-class, transition, dan animasi, halamanmu terasa hidup. Selanjutnya, saatnya masuk JavaScript dan membuat halaman benar-benar interaktif.",
      },
    ],
  }
