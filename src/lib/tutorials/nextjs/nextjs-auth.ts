import type { Tutorial } from "../types"

export const nextjsAuth: Tutorial = {
    slug: "nextjs-auth",
    title: "Autentikasi & Middleware: Login, Register & Proteksi",
    description:
      "Bangun login/register dengan session, proteksi halaman dengan middleware, dan lindungi Server Action.",
    category: "Next.js",
    level: "Menengah",
    minutes: 18,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Autentikasi di Next.js = mengelola session (cookie) di server. Kamu bisa memakai library seperti Auth.js (NextAuth), Supabase Auth, atau membuatnya sendiri dengan session cookie. Tutorial ini memakai pola session sederhana yang mudah dipahami.",
      },
      { type: "h2", text: "Pola dasar autentikasi" },
      {
        type: "list",
        items: [
          "Form login memvalidasi email + password (di server).",
          "Buat session cookie terenkripsi berisi data user.",
          "Middleware memeriksa cookie untuk memproteksi route.",
          "Server Action membaca session untuk otorisasi.",
        ],
      },
      { type: "h2", text: "Session dengan cookie" },
      {
        type: "code",
        lang: "ts",
        filename: "src/lib/session.ts",
        code: `import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET,
);

export async function buatSession(userId: number) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);

  const store = await cookies();
  store.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function bacaSession() {
  const store = await cookies();
  const token = store.get("session")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: number };
  } catch {
    return null;
  }
}`,
      },
      { type: "h2", text: "Form login (Server Action)" },
      {
        type: "code",
        lang: "ts",
        filename: "src/lib/actions.ts",
        code: `"use server";

import { redirect } from "next/navigation";
import { bcrypt } from "bcryptjs";
import { prisma } from "@/lib/db";
import { buatSession } from "@/lib/session";

export async function login(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return { error: "Email atau password salah." };
  }

  await buatSession(user.id);
  redirect("/dashboard");
}`,
      },
      { type: "h2", text: "Middleware: proteksi route" },
      {
        type: "code",
        lang: "ts",
        filename: "src/middleware.ts",
        code: `import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has("session");
  const path = request.nextUrl.pathname;

  const isProtected = path.startsWith("/dashboard");
  const isAuthPage = path === "/login" || path === "/register";

  if (isProtected && !hasSession) {
    return NextResponse.redirect(
      new URL("/login", request.url),
    );
  }

  if (isAuthPage && hasSession) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};`,
      },
      {
        type: "p",
        text: "Matcher di atas mengecualikan asset statis dan file _next. Semua halaman lain lewat middleware untuk dicek session.",
      },
      { type: "h2", text: "Otorisasi di Server Action" },
      {
        type: "code",
        lang: "ts",
        filename: "src/lib/actions.ts",
        code: `"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { bacaSession } from "@/lib/session";

export async function buatArtikel(formData: FormData) {
  const session = await bacaSession();
  if (!session) redirect("/login");

  await prisma.artikel.create({
    data: {
      judul: String(formData.get("judul")),
      konten: String(formData.get("konten")),
      userId: session.userId,
    },
  });

  redirect("/artikel");
}`,
      },
      {
        type: "callout",
        title: "Jangan hanya andalkan middleware",
        tone: "warning",
        text: "Middleware hanya menyembunyikan halaman dari user yang tidak login tapi Server Action bisa dipanggil langsung via POST. Selalu periksa session di dalam setiap action yang mengubah data.",
      },
      { type: "h2", text: "Menampilkan status login di UI" },
      {
        type: "code",
        lang: "tsx",
        filename: "src/app/components/nav-user.tsx",
        code: `import { prisma } from "@/lib/db";
import { bacaSession } from "@/lib/session";

export async function NavUser() {
  const session = await bacaSession();

  if (!session) {
    return (
      <a href="/login" className="btn">Masuk</a>
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true },
  });

  return <span>Halo, {user?.name} 👋</span>;
}`,
      },
      { type: "h2", text: "Logout" },
      {
        type: "code",
        lang: "ts",
        filename: "src/lib/actions.ts",
        code: `"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const store = await cookies();
  store.delete("session");
  redirect("/login");
}`,
      },
      {
        type: "callout",
        title: "Jangan hash ulang yang sudah di-hash",
        tone: "info",
        text: "Simpan password selalu dengan bcrypt (atau argon2). Saat login, bandingkan dengan compareSync jangan pernah membandingkan string plaintext.",
      },
      {
        type: "callout",
        title: "Latihan",
        tone: "info",
        text: "Terapkan session cookie + middleware pada project blogmu: halaman /dashboard terproteksi, halaman login/register hanya untuk guest, dan Server Action buat artikel hanya untuk user yang login.",
      },
      {
        type: "p",
        text: "Auth beres. Lanjut ke tutorial Optimasi & SEO untuk membuat aplikasi cepat dan mudah ditemukan.",
      },
    ],
  }
