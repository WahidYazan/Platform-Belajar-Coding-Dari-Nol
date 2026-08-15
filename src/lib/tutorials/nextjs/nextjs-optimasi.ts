import type { Tutorial } from "../types"

export const nextjsOptimasi: Tutorial = {
    slug: "nextjs-optimasi",
    title: "Optimasi & SEO: Gambar, Font & Metadata",
    description:
      "Optimalkan gambar dan font, kelola metadata untuk SEO, dan buat aplikasi yang cepat dimuat.",
    category: "Next.js",
    level: "Lanjutan",
    minutes: 16,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Next.js memberi banyak optimasi di luar kotak, tapi hasil terbaik tetap butuh pemahaman. Tutorial ini membahas tiga area paling berdampak: gambar, font, dan SEO.",
      },
      { type: "h2", text: "next/image: optimasi gambar" },
      {
        type: "p",
        text: "Jangan pakai <img> biasa. Komponen Image dari Next.js mengoptimasi format, ukuran, dan lazy load otomatis:",
      },
      {
        type: "code",
        lang: "tsx",
        filename: "app/profil/page.tsx",
        code: `import Image from "next/image";

export default function ProfilPage() {
  return (
    <Image
      src="/avatar.png"        // file di public/
      alt="Foto profil"
      width={200}
      height={200}
      className="rounded-full"
      priority               // loading cepat (halaman utama)
    />
  );
}`,
      },
      {
        type: "list",
        items: [
          "width + height wajib agar layout tidak melompat (layout shift).",
          "alt wajib untuk aksesibilitas & SEO.",
          "priority untuk gambar penting di atas lipatan.",
          "Bisa pakai fill untuk gambar background + object-cover.",
        ],
      },
      { type: "h2", text: "next/font: font tanpa layout shift" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/layout.tsx",
        code: `import { Inter, Geist_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="id" className={inter.variable}>
      <body style={{ fontFamily: "var(--font-sans)" }}>
        {children}
      </body>
    </html>
  );
}`,
      },
      {
        type: "p",
        text: "next/font mengunduh font saat build, di-hosting sendiri (tanpa request ke Google), dan otomatis menghilangkan layout shift dari loading font.",
      },
      { type: "h2", text: "Metadata: pondasi SEO" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/layout.tsx",
        code: `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Sinau Coding", template: "%s — Sinau Coding" },
  description: "Belajar coding dari nol dalam Bahasa Indonesia.",
  openGraph: {
    title: "Sinau Coding",
    description: "Belajar coding dari nol.",
    type: "website",
    url: "https://sinau.example.com",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};`,
      },
      {
        type: "list",
        items: [
          "metadata diekspor dari layout atau page — Next.js merendernya di <head>.",
          "Open Graph dipakai saat link dibagikan di WhatsApp/Facebook.",
          "generateMetadata untuk metadata dinamis per halaman.",
        ],
      },
      { type: "h2", text: "Dynamic rendering vs static" },
      {
        type: "p",
        text: "Gunakan force-dynamic untuk halaman yang datanya berubah tiap request (mis. dashboard), dan biarkan Next.js menentukan sendiri untuk lainnya:",
      },
      {
        type: "code",
        lang: "tsx",
        filename: "app/dashboard/page.tsx",
        code: `export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return <h1>Data selalu segar</h1>;
}`,
      },
      { type: "h2", text: "Mengukur performa" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `npm run build

# Hasil build menampilkan ukuran route per route.
# Cari warning "Very Large Page Data" atau
# JavaScript bundle yang besar.`,
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `# Di browser: devtools → Lighthouse
# Skor 90+ untuk Performance & SEO itu target wajar.`,
      },
      {
        type: "callout",
        title: "Kebiasaan kecil, dampak besar",
        tone: "tip",
        text: "Gunakan <Image> untuk semua gambar, satu <h1> per halaman, metadata selalu diisi, dan jangan bungkus semuanya dengan \"use client\" — semakin kecil JS yang dikirim, semakin cepat aplikasi.",
      },
      {
        type: "p",
        text: "Aplikasi sudah cepat dan SEO-friendly. Lanjut ke tutorial Deploy untuk mengirimnya ke dunia nyata.",
      },
    ],
  }
