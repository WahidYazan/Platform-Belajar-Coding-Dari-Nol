import type { Tutorial } from "../types"

export const deployVercel: Tutorial = {
    slug: "deploy-vercel",
    title: "Deploy Aplikasi ke Vercel",
    description:
      "Publikasikan aplikasi Next.js ke internet dengan Vercel connect GitHub, auto-deploy, dan kelola environment variables.",
    category: "Deployment",
    level: "Menengah",
    minutes: 10,
    date: "2026-08-14",
    content: [
      {
        type: "p",
        text: "Vercel adalah platform hosting terbaik untuk aplikasi Next.js. Keunggulannya: deploy otomatis setiap kali kamu push ke GitHub, HTTPS gratis, dan CDN global. Gratis untuk project pribadi.",
      },
      { type: "h2", text: "Persiapan" },
      {
        type: "list",
        ordered: true,
        items: [
          "Pastikan project sudah di-push ke GitHub.",
          "Pastikan build berhasil lokal: npm run build.",
          "Buat akun di vercel.com (login dengan GitHub).",
        ],
      },
      { type: "h2", text: "Import project" },
      {
        type: "list",
        ordered: true,
        items: [
          "Klik 'Add New...' → 'Project'.",
          "Pilih repository dari daftar.",
          "Framework terdeteksi otomatis: Next.js.",
          "Klik Deploy. Selesai kamu dapat URL seperti https://my-app.vercel.app.",
        ],
      },
      {
        type: "callout",
        title: "Auto-deploy",
        text: "Setiap push ke branch main akan otomatis membangun dan men-deploy versi terbaru. Ini yang disebut CI/CD dalam bentuk paling sederhana.",
      },
      { type: "h2", text: "Custom domain" },
            {
        type: "callout",
        title: "Noted",
        text: "Jika Tidak Memakai Domain Silahkan Skip Langkah Ini.",
        tone: "tip"
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `# Di dashboard Vercel → Settings → Domains:
1. Tambahkan domain kamu (contoh: kodingku.dev) [Optional]
2. Vercel menampilkan DNS record untuk diset di registrar domain
3. Set record A/ALIAS/CNAME sesuai instruksi
4. Tunggu propagasi (bisa 1-24 jam)
5. HTTPS aktif otomatis dengan sertifikat gratis`,
      },
      { type: "h2", text: "Environment variables" },
      {
        type: "p",
        text: "Jangan pernah menaruh secret (API key, database URL) di kode atau di commit. Simpan di Vercel:",
      },
      {
        type: "code",
        lang: "javascript",
        filename: ".env.example (di-commit)",
        code: `DATABASE_URL=postgres://...
API_SECRET=isi_secret_kamu

// Di kode, baca dari environment:
const dbUrl = process.env.DATABASE_URL;`,
      },
      {
        type: "list",
        items: [
          "Vercel → Project → Settings → Environment Variables → tambahkan.",
          "Bisa beda nilai untuk Production / Preview / Development.",
          "File .env lokal jangan pernah di-commit (masukkan ke .gitignore).",
          "Commit file .env.example sebagai template yang aman.",
        ],
      },
      {
        type: "callout",
        title: "Preview deployments",
        tone: "tip",
        text: "Setiap pull request otomatis dibuatkan URL preview. Ini memudahkan review sebelum merge workflow standar tim profesional.",
      },
      {
        type: "p",
        text: "Itu dia! Project pertamamu sudah online dan bisa dibagikan. Masukkan URL-nya ke portofolio dan CV ini bukti nyata kemampuanmu.",
      },
    ],
  }
