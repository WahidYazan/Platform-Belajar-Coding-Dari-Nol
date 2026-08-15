import type { Tutorial } from "../types"

export const nextjsApi: Tutorial = {
    slug: "nextjs-api",
    title: "Route Handlers: Membuat API di Next.js",
    description:
      "Buat endpoint REST dengan route.ts — GET, POST, PUT, DELETE — lengkap dengan status code dan pengambilan data.",
    category: "Next.js",
    level: "Menengah",
    minutes: 16,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Route Handlers memungkinkan kamu membuat API (endpoint JSON) di dalam App Router. Cocok untuk webhook, integrasi pihak ketiga, atau endpoint yang dipakai aplikasi mobile — berbeda dari Server Action yang khusus untuk form.",
      },
      { type: "h2", text: "Membuat Route Handler" },
      {
        type: "p",
        text: "Buat file route.ts di dalam folder. Nama fungsi menentukan metode HTTP:",
      },
      {
        type: "code",
        lang: "tsx",
        filename: "app/api/artikel/route.ts",
        code: `import { prisma } from "@/lib/db";

export async function GET() {
  const artikel = await prisma.artikel.findMany();

  return Response.json(artikel);
}

export async function POST(request: Request) {
  const body = await request.json();
  const artikel = await prisma.artikel.create({
    data: {
      judul: body.judul,
      konten: body.konten,
    },
  });

  return Response.json(artikel, { status: 201 });
}`,
      },
      {
        type: "list",
        items: [
          "route.ts hanya ada di app/ — tidak bisa bersebelahan dengan page.tsx di folder yang sama.",
          "Export GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS.",
          "Route Handler tidak di-cache secara default.",
          "Gunakan Response.json() untuk respons JSON.",
        ],
      },
      { type: "h2", text: "Route Handler dinamis" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/api/artikel/[id]/route.ts",
        code: `import { prisma } from "@/lib/db";

type Params = Promise<{ id: string }>;

export async function GET(
  request: Request,
  { params }: { params: Params },
) {
  const { id } = await params;
  const artikel = await prisma.artikel.findUnique({
    where: { id: Number(id) },
  });

  if (!artikel) {
    return Response.json(
      { error: "Artikel tidak ditemukan" },
      { status: 404 },
    );
  }

  return Response.json(artikel);
}

export async function DELETE(
  request: Request,
  { params }: { params: Params },
) {
  const { id } = await params;
  await prisma.artikel.delete({ where: { id: Number(id) } });

  return Response.json({ message: "Artikel dihapus" });
}`,
      },
      {
        type: "callout",
        title: "params berupa Promise",
        tone: "warning",
        text: "Sama seperti di halaman, params di Route Handler juga Promise — wajib await. Ini pembeda dari versi Next.js lama.",
      },
      { type: "h2", text: "Validasi input" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/api/artikel/route.ts",
        code: `export async function POST(request: Request) {
  const body = await request.json();

  const judul = String(body.judul ?? "").trim();
  const konten = String(body.konten ?? "").trim();

  if (judul.length < 3 || konten.length < 10) {
    return Response.json(
      {
        error: "Judul min 3 karakter, konten min 10 karakter.",
      },
      { status: 422 },
    );
  }

  // ...lanjut menyimpan
}`,
      },
      {
        type: "list",
        items: [
          "400 — input salah / malformed.",
          "401 — belum login.",
          "403 — tidak punya akses.",
          "404 — data tidak ada.",
          "422 — validasi gagal.",
          "500 — error server.",
        ],
      },
      { type: "h2", text: "Membaca query string" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/api/artikel/route.ts",
        code: `export async function GET(request: Request) {
  const url = new URL(request.url);
  const tag = url.searchParams.get("tag");
  const halaman = Number(url.searchParams.get("halaman") ?? "1");

  const artikel = await prisma.artikel.findMany({
    where: tag ? { kategori: tag } : undefined,
    skip: (halaman - 1) * 10,
    take: 10,
  });

  return Response.json(artikel);
}

// GET /api/artikel?tag=javascript&halaman=2`,
      },
      { type: "h2", text: "Memakai API dari client" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/components/data.tsx",
        code: `"use client";

import { useEffect, useState } from "react";

export function Data() {
  const [artikel, setArtikel] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/artikel")
      .then((res) => res.json())
      .then(setArtikel);
  }, []);

  return (
    <ul>
      {artikel.map((item) => (
        <li key={item.id}>{item.judul}</li>
      ))}
    </ul>
  );
}`,
      },
      {
        type: "callout",
        title: "Route Handler vs Server Action",
        tone: "info",
        text: "Gunakan Server Action untuk form/mutasi dari UI aplikasimu sendiri. Gunakan Route Handler saat endpoint dibutuhkan aplikasi lain (mobile, webhook, integrasi) atau perlu status code yang presisi.",
      },
      {
        type: "callout",
        title: "Latihan",
        tone: "info",
        text: "Buat endpoint /api/tugas dengan GET (daftar) dan POST (tambah). Tambahkan rute dinamis /api/tugas/[id] untuk DELETE. Uji dengan curl atau Postman.",
      },
      {
        type: "p",
        text: "Lanjut ke tutorial Database & Prisma untuk menghubungkan aplikasi dengan database sungguhan.",
      },
    ],
  }
