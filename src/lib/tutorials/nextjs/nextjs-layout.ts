import type { Tutorial } from "../types"

export const nextjsLayout: Tutorial = {
    slug: "nextjs-layout",
    title: "Layout, Styling & Metadata: Kerangka Situs",
    description:
      "Buat layout yang dipakai semua halaman, styling dengan CSS Modules & Tailwind, serta kelola judul dan SEO per halaman.",
    category: "Next.js",
    level: "Pemula",
    minutes: 15,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Layout adalah bagian UI yang dipakai ulang di banyak halaman header, navigasi, footer. Di Next.js, layout dibuat cukup sekali dan otomatis membungkus semua halaman di dalam folder yang sama.",
      },
      { type: "h2", text: "Root layout" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/layout.tsx",
        code: `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Sinau Coding", template: "%s Sinau Coding" },
  description: "Belajar coding dari nol dalam Bahasa Indonesia.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body>
        <header>Logo & navigasi</header>
        <main>{children}</main>
        <footer>© {new Date().getFullYear()} Sinau Coding</footer>
      </body>
    </html>
  );
}`,
      },
      {
        type: "list",
        items: [
          "Root layout WAJIB ada dan berisi <html> dan <body>.",
          "Layout tetap ada saat navigasi antar halaman tidak di-render ulang.",
          "props.children berisi halaman (page.tsx) yang sedang aktif.",
          "Gunakan LayoutProps helper tanpa import.",
        ],
      },
      { type: "h2", text: "Nested layout" },
      {
        type: "p",
        text: "Buat layout.tsx di sub-folder untuk membungkus hanya rute di folder itu. Contoh: semua halaman dashboard memakai sidebar:",
      },
      {
        type: "code",
        lang: "tsx",
        filename: "app/dashboard/layout.tsx",
        code: `export default function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return (
    <div style={{ display: "flex" }}>
      <aside>Sidebar dashboard</aside>
      <main>{children}</main>
    </div>
  );
}`,
      },
      {
        type: "p",
        text: "Struktur rute: layout root membungkus layout dashboard, yang membungkus setiap halaman dashboard.",
      },
      { type: "h2", text: "Styling dengan CSS Modules" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/components/kartu.tsx",
        code: `import styles from "./kartu.module.css";

export function Kartu({ judul }: { judul: string }) {
  return (
    <div className={styles.kartu}>
      <h3 className={styles.judul}>{judul}</h3>
    </div>
  );
}`,
      },
      {
        type: "code",
        lang: "css",
        filename: "app/components/kartu.module.css",
        code: `.kartu {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
}

.judul {
  font-size: 1.25rem;
  font-weight: 600;
}`,
      },
      {
        type: "callout",
        title: "Kenapa CSS Modules?",
        tone: "tip",
        text: "Nama class di CSS Modules di-hash otomatis (mis. kartu_a1b2c3), jadi tidak akan bentrok dengan komponen lain. Aman tanpa berpikir global scope.",
      },
      { type: "h2", text: "Styling dengan Tailwind" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/components/badge.tsx",
        code: `export function Badge({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
      {label}
    </span>
  );
}`,
      },
      {
        type: "p",
        text: "create-next-app menyiapkan Tailwind CSS sejak awal. Class utility ditulis langsung di className cepat untuk prototyping dan menjaga konsistensi.",
      },
      { type: "h2", text: "Metadata per halaman" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/blog/page.tsx",
        code: `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tulisan terbaru tentang coding.",
};

export default function BlogPage() {
  return <h1>Blog</h1>;
}`,
      },
      {
        type: "code",
        lang: "tsx",
        filename: "app/blog/[slug]/page.tsx",
        code: `import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const judul = slug.replaceAll("-", " ");

  return {
    title: judul,
    description: \`Artikel tentang \${judul}.\`,
  };
}`,
      },
      {
        type: "list",
        items: [
          "metadata statis cukup dengan export const metadata.",
          "generateMetadata bisa membuat metadata dinamis per halaman.",
          "title.template \"%s Sinau Coding\" otomatis menyisipkan judul halaman.",
        ],
      },
      {
        type: "callout",
        title: "Latihan",
        tone: "info",
        text: "Buat nested layout di app/blog/ yang menampilkan daftar kategori di samping konten. Set metadata dinamis di halaman /blog/[slug].",
      },
      {
        type: "p",
        text: "Kerangka situs sudah rapi. Lanjut ke tutorial Server & Client Components konsep inti Next.js.",
      },
    ],
  }
