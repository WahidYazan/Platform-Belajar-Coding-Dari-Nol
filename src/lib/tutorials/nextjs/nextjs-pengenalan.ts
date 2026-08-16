import type { Tutorial } from "../types"

export const nextjsPengenalan: Tutorial = {
    slug: "nextjs-pengenalan",
    title: "Pengenalan & Instalasi: Project Next.js Pertamamu",
    description:
      "Apa itu Next.js, cara membuat project dengan create-next-app, dan memahami struktur folder yang dihasilkan.",
    category: "Next.js",
    level: "Pemula",
    minutes: 12,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Next.js adalah framework React untuk aplikasi produksi. Berbeda dengan React murni yang hanya jalan di browser, Next.js menambahkan routing, rendering di server, dan banyak optimasi di luar kotak. Ini pilihan utama perusahaan untuk membangun aplikasi web modern.",
      },
      { type: "h2", text: "Kenapa Next.js?" },
      {
        type: "list",
        items: [
          "File-based routing folder di app/ langsung jadi URL, tanpa config.",
          "Server Components ambil data di server, hasilnya cepat dan SEO-friendly.",
          "Optimasi otomatis gambar, font, dan bundle JavaScript.",
          "Full-stack backend (Route Handlers) dan frontend satu aplikasi.",
          "Deploy mudah Vercel, Netlify, dan banyak platform mendukung penuh.",
        ],
      },
      { type: "h2", text: "Syarat & instalasi" },
      {
        type: "p",
        text: "Butuh Node.js versi 20.9 atau lebih baru. Buat project baru dengan perintah:",
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `node -v   # cek versi Node.js

npx create-next-app@latest nama-proyek

# Ikuti prompt untuk belajar, pilih:
# TypeScript: Yes
# ESLint: Yes
# Tailwind CSS: Yes
# src/ directory: Yes
# App Router: Yes (wajib)
# Import alias: Yes (@/*)`,
      },
      { type: "h2", text: "Menjalankan project" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `cd nama-proyek
npm run dev

# Buka http://localhost:3000`,
      },
      {
        type: "p",
        text: "Next.js menggunakan Turbopack sebagai bundler default cepat saat development. Edit file di app/page.tsx lalu simpan, hasilnya langsung terlihat di browser tanpa reload manual (hot reload).",
      },
      { type: "h2", text: "Struktur folder yang dihasilkan" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `nama-proyek/
├─ app/            # routing + halaman (folder = URL)
│  ├─ layout.tsx   # layout root (wajib, berisi <html> & <body>)
│  ├─ page.tsx     # halaman "/" (home)
│  └─ globals.css  # style global
├─ public/         # asset statis: gambar, favicon
├─ src/            # (opsional) jika memilih src directory
├─ next.config.ts  # konfigurasi Next.js
├─ tsconfig.json   # konfigurasi TypeScript
└─ package.json`,
      },
      { type: "h2", text: "Script yang tersedia" },
      {
        type: "code",
        lang: "bash",
        filename: "package.json",
        code: `"scripts": {
  "dev": "next dev",        // development server (Turbopack)
  "build": "next build",    // build untuk produksi
  "start": "next start",    // jalankan hasil build
  "lint": "eslint"          // cek kualitas kode
}`,
      },
      {
        type: "callout",
        title: "Import alias @/*",
        tone: "tip",
        text: "Alias @/ memetakan ke folder src/ (atau root jika tanpa src). Jadi import { Button } from \"@/components/button\" bukan ../../../components/button. Ini membuat kode rapi dan mudah dipindah.",
      },
      { type: "h2", text: "Perbedaan penting versi ini" },
      {
        type: "list",
        items: [
          "App Router adalah default (bukan Pages Router).",
          "params dan searchParams adalah Promise wajib di-await.",
          "TypeScript, ESLint, dan Tailwind aktif sejak awal.",
          "next build tidak lagi menjalankan linter otomatis.",
        ],
      },
      {
        type: "callout",
        title: "Latihan",
        tone: "info",
        text: "Buat project baru, jalankan npm run dev, lalu edit app/page.tsx menampilkan nama dan hobi kamu. Tambahkan halaman kedua di app/tentang/page.tsx dan coba akses di http://localhost:3000/tentang.",
      },
      {
        type: "p",
        text: "Lanjut ke tutorial Routing untuk memahami cara Next.js menghubungkan folder dengan URL.",
      },
    ],
  }
