import type { Tutorial } from "../types"

export const nextjsDeploy: Tutorial = {
    slug: "nextjs-deploy",
    title: "Deploy ke Vercel & Lingkungan Produksi",
    description:
      "Terbitkan aplikasi ke Vercel, kelola environment variable, dan pahami proses build produksi.",
    category: "Next.js",
    level: "Lanjutan",
    minutes: 14,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Kode yang tidak dideploy tidak berguna. Vercel adalah platform buatan para pembuat Next.js — integrasinya paling mulus: push ke GitHub, aplikasi langsung ter-build dan ter-hosting otomatis.",
      },
      { type: "h2", text: "1. Siapkan repository" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `git init
git add .
git commit -m "project pertama"

# Buat repo di GitHub, lalu:
git remote add origin https://github.com/username/nama-proyek.git
git push -u origin main`,
      },
      { type: "h2", text: "2. Import ke Vercel" },
      {
        type: "list",
        items: [
          "Daftar/masuk di vercel.com (bisa pakai akun GitHub).",
          "Klik Add New → Project.",
          "Pilih repo kamu → Import.",
          "Framework terdeteksi otomatis: Next.js.",
          "Klik Deploy.",
        ],
      },
      {
        type: "p",
        text: "Setiap push ke GitHub (atau pull request) otomatis membuat build baru. Inilah 'preview deployment' — setiap PR punya URL sendiri untuk ditest sebelum digabung.",
      },
      { type: "h2", text: "Environment variables" },
      {
        type: "code",
        lang: "bash",
        filename: ".env",
        code: `# Di lokal
DATABASE_URL=file:./dev.db
SESSION_SECRET=rahasia-super-amat-panjang`,
      },
      {
        type: "p",
        text: "Jangan commit .env (sudah ada di .gitignore). Di Vercel, tambahkan variabel yang sama lewat Project → Settings → Environment Variables. Ada tiga scope: Production, Preview, dan Development.",
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `# Cek semua env yang dipakai aplikasi
grep -r "process.env" src/`,
      },
      {
        type: "callout",
        title: "Secret tidak boleh di client",
        tone: "warning",
        text: "Variabel tanpa prefix NEXT_PUBLIC_ hanya tersedia di server. Jangan pernah menaruh secret di variabel NEXT_PUBLIC_* — itu akan dikirim ke browser.",
      },
      { type: "h2", text: "Produksi: build & start" },
      {
        type: "p",
        text: "Proses build di Vercel menjalankan npm run build. Pahami perbedaannya dengan development:",
      },
      {
        type: "list",
        items: [
          "npm run dev — development, hot reload, tanpa optimasi penuh.",
          "npm run build — build produksi, static page di-pre-render.",
          "npm start — menjalankan hasil build di server (node).",
          "Halaman statis dilayani CDN — sangat cepat di seluruh dunia.",
        ],
      },
      { type: "h2", text: "Analytics & monitoring" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/layout.tsx",
        code: `import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}`,
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `npm install @vercel/analytics @vercel/speed-insights`,
      },
      {
        type: "callout",
        title: "Kustom domain",
        tone: "tip",
        text: "Di Project → Settings → Domains, tambahkan domain milikmu. Vercel mengurus SSL (HTTPS) gratis dan otomatis. Biasanya cukup atur DNS A record ke IP Vercel (76.76.21.21).",
      },
      {
        type: "callout",
        title: "Checklist sebelum deploy",
        tone: "info",
        text: "1) npm run build tidak error. 2) Semua env sudah diisi di Vercel. 3) Tidak ada NEXT_PUBLIC_ berisi secret. 4) Metadata & title lengkap. 5) Lighthouse skor wajar. Lalu deploy!",
      },
      {
        type: "p",
        text: "Aplikasi sudah online! Lanjut ke tutorial Project Akhir untuk membangun aplikasi lengkap dari awal sampai deploy.",
      },
    ],
  }
