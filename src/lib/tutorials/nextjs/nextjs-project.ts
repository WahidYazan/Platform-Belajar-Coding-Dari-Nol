import type { Tutorial } from "../types"

export const nextjsProject: Tutorial = {
    slug: "nextjs-project",
    title: "Project Akhir: Aplikasi Blog Lengkap",
    description:
      "Gabungkan semua materi: bangun blog dengan auth, CRUD artikel, Prisma, dan deploy ke Vercel.",
    category: "Next.js",
    level: "Lanjutan",
    minutes: 24,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Waktunya menyatukan semuanya. Kita bangun 'Blog Sinau' aplikasi blog lengkap: user login, CRUD artikel dengan relasi ke penulis, tampilan rapi, lalu deploy. Inilah gambaran kerja seorang Next.js developer sesungguhnya.",
      },
      { type: "h2", text: "Spesifikasi" },
      {
        type: "list",
        items: [
          "Auth: register, login, logout (session cookie + middleware).",
          "CRUD artikel yang hanya bisa diubah pemiliknya.",
          "Relasi User → Artikel (one-to-many) dengan Prisma.",
          "Server Action untuk form + validasi.",
          "Route Handler /api/artikel untuk API.",
          "Deploy ke Vercel.",
        ],
      },
      { type: "h2", text: "1. Setup project & Prisma" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `npx create-next-app@latest blog-sinau
cd blog-sinau

npm install @prisma/client bcryptjs
npm install -D prisma jose
npx prisma init --datasource-provider sqlite`,
      },
      {
        type: "code",
        lang: "prisma",
        filename: "prisma/schema.prisma",
        code: `model User {
  id       Int       @id @default(autoincrement())
  name     String
  email    String    @unique
  password String
  artikel  Artikel[]
}

model Artikel {
  id        Int      @id @default(autoincrement())
  judul     String
  konten    String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
}`,
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `npx prisma migrate dev --name init`,
      },
      { type: "h2", text: "2. Session & middleware" },
      {
        type: "code",
        lang: "ts",
        filename: "src/lib/session.ts",
        code: `import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function buatSession(userId: number) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);

  (await cookies()).set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function bacaSession() {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: number };
  } catch {
    return null;
  }
}`,
      },
      { type: "h2", text: "3. Server Actions: auth & artikel" },
      {
        type: "code",
        lang: "ts",
        filename: "src/lib/actions.ts",
        code: `"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { bacaSession, buatSession } from "@/lib/session";

export async function register(formData: FormData) {
  const name = String(formData.get("name"));
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const user = await prisma.user.create({
    data: { name, email, password: hash(password) },
  });

  await buatSession(user.id);
  redirect("/dashboard");
}

export async function buatArtikel(formData: FormData) {
  const session = await bacaSession();
  if (!session) redirect("/login");

  const judul = String(formData.get("judul"));
  const konten = String(formData.get("konten"));

  if (judul.length < 3 || konten.length < 10) {
    return { error: "Judul min 3, konten min 10 karakter." };
  }

  await prisma.artikel.create({
    data: { judul, konten, userId: session.userId },
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function hapusArtikel(formData: FormData) {
  const session = await bacaSession();
  if (!session) redirect("/login");

  const id = Number(formData.get("id"));
  const artikel = await prisma.artikel.findUnique({ where: { id } });

  if (!artikel || artikel.userId !== session.userId) {
    return { error: "Tidak berhak menghapus." };
  }

  await prisma.artikel.delete({ where: { id } });
  revalidatePath("/dashboard");
}`,
      },
      { type: "h2", text: "4. Halaman dashboard" },
      {
        type: "code",
        lang: "tsx",
        filename: "src/app/dashboard/page.tsx",
        code: `import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { bacaSession } from "@/lib/session";
import { FormArtikel } from "@/app/components/form-artikel";
import { DaftarArtikel } from "@/app/components/daftar-artikel";

export default async function DashboardPage() {
  const session = await bacaSession();
  if (!session) redirect("/login");

  const artikel = await prisma.artikel.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      <FormArtikel />

      <DaftarArtikel artikel={artikel} />
    </main>
  );
}`,
      },
      { type: "h2", text: "5. Komponen form" },
      {
        type: "code",
        lang: "tsx",
        filename: "src/app/components/form-artikel.tsx",
        code: `"use client";

import { useActionState } from "react";
import { buatArtikel } from "@/lib/actions";

export function FormArtikel() {
  const [state, action, pending] = useActionState(
    buatArtikel,
    { error: undefined },
  );

  return (
    <form action={action} className="my-8 space-y-4">
      {state?.error && (
        <p className="text-red-600">{state.error}</p>
      )}

      <div>
        <label htmlFor="judul">Judul</label>
        <input
          type="text"
          id="judul"
          name="judul"
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label htmlFor="konten">Konten</label>
        <textarea
          id="konten"
          name="konten"
          rows="6"
          required
          className="w-full rounded border p-2"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {pending ? "Menyimpan..." : "Simpan Artikel"}
      </button>
    </form>
  );
}`,
      },
      { type: "h2", text: "6. Daftar artikel + hapus" },
      {
        type: "code",
        lang: "tsx",
        filename: "src/app/components/daftar-artikel.tsx",
        code: `import { hapusArtikel } from "@/lib/actions";

type Artikel = {
  id: number;
  judul: string;
  konten: string;
};

export function DaftarArtikel({
  artikel,
}: {
  artikel: Artikel[];
}) {
  if (artikel.length === 0) {
    return <p className="text-gray-500">Belum ada artikel.</p>;
  }

  return (
    <ul className="space-y-4">
      {artikel.map((item) => (
        <li key={item.id} className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold">{item.judul}</h2>
          <p className="line-clamp-2 text-sm text-gray-600">
            {item.konten}
          </p>

          <form action={hapusArtikel}>
            <input type="hidden" name="id" value={item.id} />
            <button
              type="submit"
              className="mt-2 text-sm text-red-600"
            >
              Hapus
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}`,
      },
      { type: "h2", text: "7. Middleware proteksi" },
      {
        type: "code",
        lang: "ts",
        filename: "src/middleware.ts",
        code: `import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has("session");

  if (request.nextUrl.pathname.startsWith("/dashboard") && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};`,
      },
      { type: "h2", text: "8. Deploy" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `# SQLite tidak ideal untuk produksi Vercel (serverless).
# Untuk produksi gunakan PostgreSQL (mis. Vercel Postgres,
# Supabase, atau Neon) lalu ubah datasource di schema.prisma.

npm run build     # pastikan tidak error
git push          # lalu import ke Vercel

# Tambahkan env di Vercel: DATABASE_URL, SESSION_SECRET`,
      },
      {
        type: "callout",
        title: "Checklist pengaman",
        tone: "warning",
        text: "1) hapusArtikel memeriksa pemilik (userId === session.userId). 2) register hash password. 3) buatArtikel mengecek session. 4) env diset di Vercel. 5) .env tidak ter-commit.",
      },
      {
        type: "p",
        text: "Selamat kamu sudah membangun aplikasi full-stack dari nol sampai deploy! Perluas dengan fitur edit artikel, komentar, kategori, dan pencarian. Terus bangun project untuk mengasah skill.",
      },
    ],
  }
