import type { Tutorial } from "../types"

export const nextjsDataFetching: Tutorial = {
    slug: "nextjs-data-fetching",
    title: "Data Fetching: Ambil Data di Server",
    description:
      "Fetch data di Server Component, caching & revalidasi, dan pola streaming dengan loading.tsx.",
    category: "Next.js",
    level: "Menengah",
    minutes: 17,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Keunggulan besar Server Component: kamu bisa mengambil data langsung di dalam komponen dari API eksternal, database, atau ORM tanpa mengekspos kredensial ke browser. Tidak ada fetch di useEffect yang ribet.",
      },
      { type: "h2", text: "Fetch dengan fetch API" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/blog/page.tsx",
        code: `export default async function BlogPage() {
  const data = await fetch("https://api.contoh.com/posts");
  const posts = await data.json();

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`,
      },
      {
        type: "list",
        items: [
          "Jadikan komponen async Next.js akan menunggu data selesai.",
          "Fetch identik di satu pohon komponen di-memoize otomatis (tidak duplikat).",
          "Secara default fetch tidak di-cache dan menunggu selesai sebelum render.",
          "Gunakan use cache untuk menyimpan hasil, atau bungkus dengan <Suspense>/loading.tsx.",
        ],
      },
      { type: "h2", text: "Fetch dari database (ORM)" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/blog/page.tsx",
        code: `import { db, posts } from "@/lib/db";

export default async function BlogPage() {
  const semuaPost = await db.select().from(posts);

  return (
    <ul>
      {semuaPost.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`,
      },
      {
        type: "p",
        text: "Karena berjalan di server, kredensial database dan query tidak pernah sampai ke client bundle. Ini pola untuk proyek dengan Prisma, Drizzle, atau supabase-js.",
      },
      { type: "h2", text: "loading.tsx: streaming UI" },
      {
        type: "p",
        text: "Buat file loading.tsx di folder yang sama Next.js akan menampilkannya segera sambil data diproses, lalu menggantinya otomatis:",
      },
      {
        type: "code",
        lang: "tsx",
        filename: "app/blog/loading.tsx",
        code: `export default function Loading() {
  return (
    <div className="p-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-64 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />
      </div>
    </div>
  );
}`,
      },
      { type: "h2", text: "Suspense per komponen" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/dashboard/page.tsx",
        code: `import { Suspense } from "react";
import { Statistik } from "@/app/components/statistik";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Bagian lambat dibungkus Suspense,
          halaman lain tetap tampil duluan */}
      <Suspense fallback={<p>Memuat statistik...</p>}>
        <Statistik />
      </Suspense>
    </div>
  );
}`,
      },
      { type: "h2", text: "Caching & revalidasi" },
      {
        type: "p",
        text: "Untuk data yang berubah, gunakan tag dan revalidasi saat data dimutasi. Di Server Action, panggil revalidateTag setelah update:",
      },
      {
        type: "code",
        lang: "tsx",
        filename: "app/blog/page.tsx",
        code: `export default async function BlogPage() {
  const data = await fetch("https://api.contoh.com/posts", {
    next: { tags: ["posts"] },
  });
  const posts = await data.json();

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`,
      },
      {
        type: "code",
        lang: "ts",
        filename: "app/lib/actions.ts",
        code: `"use server";

import { revalidateTag, revalidatePath } from "next/cache";

export async function tambahPost(formData: FormData) {
  // ...simpan ke database

  revalidateTag("posts");     // data dengan tag "posts" diambil ulang
  revalidatePath("/blog");    // atau revalidasi berdasarkan path
}`,
      },
      {
        type: "callout",
        title: "Kapan data berubah?",
        tone: "info",
        text: "Data yang jarang berubah (profil, artikel) → revalidasi saat mutasi. Data real-time (chat, harga) → jangan cache, biarkan request-time. Pilih sesuai kebutuhan, bukan selalu satu pola.",
      },
      {
        type: "callout",
        title: "Latihan",
        tone: "info",
        text: "Buat halaman /posts yang fetch data publik (mis. jsonplaceholder). Tambahkan loading.tsx dan error.tsx (bungkus try/catch) agar UX tetap baik saat API lambat atau gagal.",
      },
      {
        type: "p",
        text: "Data sudah bisa tampil. Lanjut ke tutorial Form & Server Actions untuk menulis/mengubah data.",
      },
    ],
  }
