import type { Tutorial } from "../types"

export const nextjsRouting: Tutorial = {
    slug: "nextjs-routing",
    title: "Routing: Folder, Dynamic Route & Navigasi",
    description:
      "Buat halaman dengan file-based routing, tangkap parameter dinamis, dan navigasi antar halaman dengan Link.",
    category: "Next.js",
    level: "Pemula",
    minutes: 16,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Di Next.js, folder di dalam app/ menentukan URL. Tidak ada file konfigurasi routing — struktur file itu sendiri adalah rute. Ini disebut file-based routing.",
      },
      { type: "h2", text: "Folder = URL" },
      {
        type: "code",
        lang: "bash",
        filename: "struktur",
        code: `app/
├─ page.tsx          → /
├─ tentang/page.tsx  → /tentang
├─ blog/page.tsx     → /blog
└─ blog/[slug]/page.tsx → /blog/:slug (dinamis)`,
      },
      { type: "h2", text: "Membuat halaman (page.tsx)" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/tentang/page.tsx",
        code: `export default function TentangPage() {
  return (
    <div>
      <h1>Tentang Sinau Coding</h1>
      <p>Kami membantu orang belajar coding dari nol.</p>
    </div>
  );
}`,
      },
      {
        type: "list",
        items: [
          "page.tsx adalah file khusus yang menampilkan halaman.",
          "Setiap folder membutuhkan page.tsx agar bisa diakses.",
          "Export default sebuah komponen React (boleh async).",
          "Route yang tidak punya page.tsx otomatis 404.",
        ],
      },
      { type: "h2", text: "Dynamic route: [slug]" },
      {
        type: "p",
        text: "Nama folder dalam kurung siku [ ] menjadi parameter yang bisa diakses lewat params. Parameter ini berupa Promise — wajib di-await:",
      },
      {
        type: "code",
        lang: "tsx",
        filename: "app/blog/[slug]/page.tsx",
        code: `export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;

  return <h1>Postingan: {slug}</h1>;
}

// URL: /blog/laravel-untuk-pemula
// Output: Postingan: laravel-untuk-pemula`,
      },
      { type: "h2", text: "searchParams: query string" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/blog/page.tsx",
        code: `export default async function BlogPage({
  searchParams,
}: PageProps<"/blog">) {
  const { tag, halaman } = await searchParams;

  // ?tag=javascript&halaman=2
  return (
    <p>Filter tag: {tag} · Halaman {halaman}</p>
  );
}`,
      },
      {
        type: "callout",
        title: "Promise params",
        tone: "warning",
        text: "Di versi ini, params dan searchParams adalah Promise. Wajib const { slug } = await params. Lupa await = error. Gunakan helper PageProps yang sudah disediakan tanpa import.",
      },
      { type: "h2", text: "Navigasi dengan Link" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/components/nav.tsx",
        code: `import Link from "next/link";

export function Nav() {
  return (
    <nav>
      <Link href="/">Beranda</Link>
      <Link href="/tentang">Tentang</Link>
      <Link href="/blog">Blog</Link>

      {/* Link dinamis */}
      <Link href="/blog/laravel-dasar">Baca: Laravel</Link>
    </nav>
  );
}`,
      },
      {
        type: "list",
        items: [
          "Link melakukan client-side navigation — cepat, tanpa reload penuh.",
          "Halaman yang terhubung di-prefetch otomatis di background.",
          "Gunakan href sebagai string biasa (\" \"), bukan string template.",
        ],
      },
      { type: "h2", text: "Navigasi programatik: useRouter" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/components/login-button.tsx",
        code: `"use client";

import { useRouter } from "next/navigation";

export function LoginButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        // Setelah proses login...
        router.push("/dashboard");
      }}
    >
      Masuk
    </button>
  );
}`,
      },
      { type: "h2", text: "generateStaticParams: halaman statis" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/blog/[slug]/page.tsx",
        code: `export function generateStaticParams() {
  return [
    { slug: "laravel-dasar" },
    { slug: "nextjs-routing" },
  ];
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  return <h1>{slug}</h1>;
}`,
      },
      {
        type: "p",
        text: "generateStaticParams membuat halaman di-pre-render saat build — halaman yang sama setiap orang kunjungi jadi sangat cepat.",
      },
      {
        type: "callout",
        title: "Latihan",
        tone: "info",
        text: "Buat rute /profil, rute dinamis /produk/[id], dan halaman /produk yang punya searchParams ?kategori=. Hubungkan semuanya dengan Link dari halaman beranda.",
      },
      {
        type: "p",
        text: "Routing beres. Lanjut ke tutorial Layout & Styling agar semua halaman memakai kerangka yang sama.",
      },
    ],
  }
