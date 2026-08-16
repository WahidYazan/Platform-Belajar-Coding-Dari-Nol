import type { Tutorial } from "../types";

export const nextjsDasar: Tutorial = {
    slug: "nextjs-dasar",
    title: "Next.js untuk Produksi: App Router & Server Components",
    description:
        "Kenali framework React paling populer: file-based routing, komponen server vs client, dan data fetching di server.",
    category: "Next.js",
    level: "Lanjutan",
    minutes: 17,
    date: "2026-08-14",
    content: [
        {
            type: "p",
            text: "React murni hanya berjalan di browser (client). Next.js adalah framework di atas React yang menambahkan routing, rendering di server, dan optimasi performa di luar kotak. Inilah yang paling banyak dipakai perusahaan untuk aplikasi produksi.",
        },
        { type: "h2", text: "Kenapa Next.js?" },
        {
            type: "list",
            items: [
                "File-based routing folder = URL, tanpa config.",
                "Server components ambil data langsung di server, lebih cepat dan SEO-friendly.",
                "Optimasi otomatis gambar, font, dan bundle size.",
                "API routes backend kecil bisa satu aplikasi.",
                "Deploy mudah Vercel/Netlify mendukung penuh.",
            ],
        },
        { type: "h2", text: "Routing dengan App Router" },
        {
            type: "p",
            text: "Setiap folder di app/ adalah segmen URL. Buat file page.tsx untuk menampilkan halaman.",
        },
        {
            type: "code",
            lang: "tsx",
            filename: "app/page.tsx",
            code: `export default function HomePage() {
  return <h1>Halaman Utama</h1>;
}`,
        },
        {
            type: "code",
            lang: "tsx",
            filename: "app/blog/[slug]/page.tsx",
            code: `// app/blog/[slug]/page.tsx → /blog/hello
export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params; // params berupa Promise
  return <h1>Postingan: {slug}</h1>;
}`,
        },
        {
            type: "callout",
            title: "Ini bukan Next.js versi lama",
            text: "Di versi ini, params dan searchParams adalah Promise wajib di-await. Perhatikan juga helper PageProps/LayoutProps yang disediakan tanpa import.",
        },
        { type: "h2", text: "Server vs Client Component" },
        {
            type: "p",
            text: "Secara default, semua komponen adalah Server Component: di-render di server, cocok untuk membaca data dan konten statis. Tambahkan 'use client' hanya saat butuh hook, event, atau state.",
        },
        {
            type: "code",
            lang: "tsx",
            filename: "app/page.tsx",
            code: `// Server Component (default)
async function PostList() {
  const res = await fetch("https://api.contoh.com/posts");
  const posts = await res.json();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`,
        },
        {
            type: "code",
            lang: "tsx",
            filename: "app/counter.tsx",
            code: `"use client"  // butuh state → client

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Hitungan: {count}
    </button>
  );
}`,
        },
        { type: "h2", text: "Navigasi dengan Link" },
        {
            type: "code",
            lang: "tsx",
            filename: "app/nav.tsx",
            code: `import Link from "next/link";

export function Nav() {
  return (
    <nav>
      <Link href="/">Beranda</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/tutorials">Tutorial</Link>
    </nav>
  );
}`,
        },
        {
            type: "list",
            items: [
                "Link melakukan client-side navigation cepat, tanpa reload.",
                "Halaman yang terhubung di-prefetch otomatis.",
                "Gunakan useRouter untuk navigasi programatik (misal setelah login).",
            ],
        },
        { type: "h2", text: "Metadata & SEO" },
        {
            type: "code",
            lang: "tsx",
            filename: "app/layout.tsx",
            code: `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Sinau Coding", template: "%s Sinau Coding" },
  description: "Roadmap belajar coding dari nol dalam Bahasa Indonesia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}`,
        },
        {
            type: "callout",
            title: "Langkah berikutnya",
            text: "Coba buat project: npx create-next-app@latest. Bangun halaman statis dulu, tambahkan dynamic route, lalu deploy ke Vercel (lihat tutorial Deploy). Itu siklus lengkap seorang Next.js developer.",
        },
        {
            type: "p",
            text: "Selamat kamu sudah menempuh seluruh jalur dari nol sampai framework produksi! Lanjutkan dengan memperdalam spesialisasi yang kamu pilih di roadmap, dan terus bangun project. Konsistensi adalah segalanya.",
        },
    ],
};
