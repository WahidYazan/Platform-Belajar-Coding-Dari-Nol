import type { Tutorial } from "../types"

export const nextjsServerClient: Tutorial = {
    slug: "nextjs-server-client",
    title: "Server & Client Components: Kapan Memakai Apa",
    description:
      "Pahami dua jenis komponen di Next.js — kapan berjalan di server, kapan butuh 'use client', dan cara menyusunnya.",
    category: "Next.js",
    level: "Menengah",
    minutes: 17,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Salah satu hal yang membedakan Next.js dari React murni: setiap komponen bisa berjalan di server (Server Component) atau di browser (Client Component). Memilih dengan tepat adalah keterampilan inti.",
      },
      { type: "h2", text: "Apa perbedaan keduanya?" },
      {
        type: "list",
        items: [
          "Server Component — di-render di server. Cocok untuk ambil data, baca secret, konten statis.",
          "Client Component — di-render di browser. Butuh untuk state, event handler, dan API browser.",
          "Semua komponen default-nya Server Component.",
          "Tambahkan \"use client\" di baris pertama file untuk membuat Client Component.",
        ],
      },
      { type: "h2", text: "Kapan pakai Server Component?" },
      {
        type: "list",
        items: [
          "Mengambil data dari database atau API (kredensial aman di server).",
          "Menggunakan API key atau secret yang tidak boleh bocor.",
          "Menampilkan konten yang tidak interaktif.",
          "Mengurangi JavaScript yang dikirim ke browser.",
          "Ingin hasil SEO-friendly dan cepat dimuat pertama kali.",
        ],
      },
      { type: "h2", text: "Kapan pakai Client Component?" },
      {
        type: "list",
        items: [
          "Membutuhkan useState, useEffect, atau custom hook.",
          "Menangani event seperti onClick dan onChange.",
          "Memakai API browser: localStorage, window, geolocation.",
          "Komponen pihak ketiga yang butuh interaktivitas.",
        ],
      },
      {
        type: "code",
        lang: "tsx",
        filename: "app/components/like-button.tsx",
        code: `"use client";

import { useState } from "react";

export function LikeButton({ likes }: { likes: number }) {
  const [total, setTotal] = useState(likes);

  return (
    <button onClick={() => setTotal(total + 1)}>
      Suka ({total})
    </button>
  );
}`,
      },
      { type: "h2", text: "Menyusun keduanya" },
      {
        type: "p",
        text: "Pola terbaik: Server Component mengambil data, lalu meneruskan hasilnya sebagai props ke Client Component yang kecil:",
      },
      {
        type: "code",
        lang: "tsx",
        filename: "app/artikel/[slug]/page.tsx",
        code: `import { LikeButton } from "@/app/components/like-button";
import { getArtikel } from "@/lib/data";

export default async function ArtikelPage({
  params,
}: PageProps<"/artikel/[slug]">) {
  const { slug } = await params;
  const artikel = await getArtikel(slug); // di server

  return (
    <article>
      <h1>{artikel.judul}</h1>
      <p>{artikel.konten}</p>

      {/* Client Component kecil, data dari server */}
      <LikeButton likes={artikel.suka} />
    </article>
  );
}`,
      },
      {
        type: "callout",
        title: "Jangan boros use client",
        tone: "warning",
        text: "Satu file \"use client\" membuat semua komponen yang di-render dari sana masuk bundle client. Letakkan \"use client\" pada komponen interaktif sekecil mungkin — jangan pada layout yang besar.",
      },
      { type: "h2", text: "Client Component bisa memuat Server Component" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/components/modal.tsx",
        code: `"use client";

export function Modal({ children }: { children: React.ReactNode }) {
  const [buka, setBuka] = useState(false);

  return (
    <>
      <button onClick={() => setBuka(true)}>Buka</button>
      {buka && <div className="overlay">{children}</div>}
    </>
  );
}`,
      },
      {
        type: "code",
        lang: "tsx",
        filename: "app/page.tsx",
        code: `import { Modal } from "@/app/components/modal";
import { Keranjang } from "@/app/components/keranjang";

export default function Page() {
  return (
    <Modal>
      {/* Server Component dirender di server,
          lalu dikirim ke client sebagai children */}
      <Keranjang />
    </Modal>
  );
}`,
      },
      { type: "h2", text: "Context & provider" },
      {
        type: "p",
        text: "React Context (misalnya theme) tidak bisa dipakai langsung di Server Component. Buat provider sebagai Client Component, lalu bungkus children:",
      },
      {
        type: "code",
        lang: "tsx",
        filename: "app/theme-provider.tsx",
        code: `"use client";

import { createContext, useState } from "react";

export const TemaContext = createContext("terang");

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tema, setTema] = useState("terang");

  return (
    <TemaContext.Provider value={tema}>
      {children}
    </TemaContext.Provider>
  );
}`,
      },
      {
        type: "code",
        lang: "tsx",
        filename: "app/layout.tsx",
        code: `import { ThemeProvider } from "@/app/theme-provider";

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}`,
      },
      {
        type: "callout",
        title: "Praktik terbaik",
        tone: "tip",
        text: "Default: Server Component. Tambah \"use client\" HANYA saat benar-benar butuh interaktivitas. Semakin kecil bagian client, semakin cepat dan ringan aplikasimu.",
      },
      {
        type: "p",
        text: "Sekarang kamu paham dua dunia komponen. Lanjut ke Data Fetching untuk mengambil data langsung di server.",
      },
    ],
  }
