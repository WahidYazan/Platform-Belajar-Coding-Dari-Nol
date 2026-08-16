import type { Tutorial } from "../types"

export const nextjsForm: Tutorial = {
    slug: "nextjs-form",
    title: "Form & Server Actions: Mengubah Data Tanpa API",
    description:
      "Buat form dengan Server Actions, validasi input, pending state, dan revalidasi data setelah submit.",
    category: "Next.js",
    level: "Menengah",
    minutes: 17,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Server Action adalah fungsi async yang berjalan di server dan bisa dipanggil langsung dari form. Tidak perlu membuat API route untuk form sederhana Next.js menangani pengiriman dan pembaruan UI dalam satu perjalanan.",
      },
      { type: "h2", text: "Membuat Server Action" },
      {
        type: "code",
        lang: "ts",
        filename: "app/lib/actions.ts",
        code: `"use server";

export async function simpanArtikel(formData: FormData) {
  const judul = formData.get("judul");
  const konten = formData.get("konten");

  // Simpan ke database...

  console.log("Disimpan:", judul, konten);
}`,
      },
      {
        type: "list",
        items: [
          "Tandai file dengan \"use server\" semua export menjadi Server Action.",
          "Server Action menerima FormData otomatis ketika dipakai di <form action={...}>.",
          "Hanya method POST yang bisa memanggil Server Action.",
        ],
      },
      { type: "h2", text: "Form di Server Component" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/artikel/baru/page.tsx",
        code: `import { simpanArtikel } from "@/app/lib/actions";

export default function ArtikelBaruPage() {
  return (
    <form action={simpanArtikel}>
      <div>
        <label htmlFor="judul">Judul</label>
        <input type="text" name="judul" id="judul" required />
      </div>

      <div>
        <label htmlFor="konten">Konten</label>
        <textarea name="konten" id="konten" rows="6" required />
      </div>

      <button type="submit">Simpan</button>
    </form>
  );
}`,
      },
      {
        type: "p",
        text: "Atribut name di input menentukan nama field yang dibaca dari FormData. Form tetap bekerja walau JavaScript belum dimuat (progressive enhancement).",
      },
      { type: "h2", text: "Validasi & pesan error" },
      {
        type: "code",
        lang: "ts",
        filename: "app/lib/actions.ts",
        code: `"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export type State = {
  error?: string;
};

export async function simpanArtikel(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const judul = String(formData.get("judul") ?? "");
  const konten = String(formData.get("konten") ?? "");

  if (judul.trim().length < 3) {
    return { error: "Judul minimal 3 karakter." };
  }
  if (konten.trim().length < 10) {
    return { error: "Konten minimal 10 karakter." };
  }

  await prisma.artikel.create({
    data: { judul, konten },
  });

  revalidatePath("/artikel");
  redirect("/artikel");
}`,
      },
      { type: "h2", text: "useActionState: pending & error di UI" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/components/form-artikel.tsx",
        code: `"use client";

import { useActionState } from "react";
import { simpanArtikel, type State } from "@/app/lib/actions";

const initialState: State = {};

export function FormArtikel() {
  const [state, formAction, pending] = useActionState(
    simpanArtikel,
    initialState,
  );

  return (
    <form action={formAction}>
      {state.error && (
        <p className="text-red-600">{state.error}</p>
      )}

      <div>
        <label htmlFor="judul">Judul</label>
        <input type="text" name="judul" id="judul" />
      </div>

      <div>
        <label htmlFor="konten">Konten</label>
        <textarea name="konten" id="konten" rows="6" />
      </div>

      <button type="submit" disabled={pending}>
        {pending ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}`,
      },
      {
        type: "list",
        items: [
          "useActionState(aksi, initialState) mengembalikan [state, formAction, pending].",
          "Server Action dipanggil dengan argumen kedua prevState.",
          "pending menjadi true saat aksi berjalan untuk tombol loading.",
        ],
      },
      { type: "h2", text: "Delete & update dengan tombol" },
      {
        type: "code",
        lang: "ts",
        filename: "app/lib/actions.ts",
        code: `"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function hapusArtikel(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.artikel.delete({ where: { id } });

  revalidatePath("/artikel");
}`,
      },
      {
        type: "code",
        lang: "tsx",
        filename: "app/components/tombol-hapus.tsx",
        code: `import { hapusArtikel } from "@/app/lib/actions";

export function TombolHapus({ id }: { id: number }) {
  return (
    <form action={hapusArtikel}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-red-600"
        onClick={(e) => {
          if (!confirm("Yakin hapus?")) e.preventDefault();
        }}
      >
        Hapus
      </button>
    </form>
  );
}`,
      },
      {
        type: "callout",
        title: "Keamanan",
        tone: "warning",
        text: "Server Action bisa dipanggil lewat POST langsung, bukan hanya dari form kamu. Selalu verifikasi autentikasi & otorisasi di dalam setiap aksi jangan hanya andalkan tombol yang tersembunyi.",
      },
      {
        type: "callout",
        title: "Latihan",
        tone: "info",
        text: "Buat form tambah tugas (judul + prioritas). Validasi minimal, tampilkan error dengan useActionState, lalu revalidatePath dan redirect ke daftar tugas.",
      },
      {
        type: "p",
        text: "Lanjut ke tutorial Route Handlers untuk membuat API JSON yang bisa dipakai aplikasi lain.",
      },
    ],
  }
