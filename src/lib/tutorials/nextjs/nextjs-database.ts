import type { Tutorial } from "../types"

export const nextjsDatabase: Tutorial = {
    slug: "nextjs-database",
    title: "Database & Prisma: Data yang Tersimpan",
    description:
      "Hubungkan Next.js dengan database memakai Prisma ORM: model, migrasi, dan query di Server Component.",
    category: "Next.js",
    level: "Menengah",
    minutes: 18,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Aplikasi serius butuh data yang tersimpan. Prisma adalah ORM paling populer di ekosistem Next.js kamu mendefinisikan skema dengan bahasa yang mudah, lalu Prisma membuat tipe TypeScript dan query yang aman.",
      },
      { type: "h2", text: "Setup Prisma" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `# SQLite untuk latihan lokal (tanpa setup server)
npm install prisma @prisma/client
npx prisma init --datasource-provider sqlite`,
      },
      {
        type: "p",
        text: "Dua file penting dihasilkan: prisma/schema.prisma (definisi model) dan prisma/dev.db (database SQLite).",
      },
      { type: "h2", text: "Definisikan model" },
      {
        type: "code",
        lang: "prisma",
        filename: "prisma/schema.prisma",
        code: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Artikel {
  id        Int      @id @default(autoincrement())
  judul     String
  konten    String
  penulis   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`,
      },
      { type: "h2", text: "Migrasi & generate client" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `npx prisma migrate dev --name init

# 1. Membuat file migrasi
# 2. Menerapkan ke database
# 3. Generate Prisma Client (tipe TypeScript otomatis)`,
      },
      { type: "h2", text: "Client singleton" },
      {
        type: "p",
        text: "Buat satu instance Prisma Client yang dipakai ulang agar tidak membuat koneksi baru tiap render (di development):",
      },
      {
        type: "code",
        lang: "ts",
        filename: "src/lib/db.ts",
        code: `import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}`,
      },
      { type: "h2", text: "Query di Server Component" },
      {
        type: "code",
        lang: "tsx",
        filename: "app/artikel/page.tsx",
        code: `import { prisma } from "@/lib/db";

export default async function ArtikelPage() {
  const artikel = await prisma.artikel.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <ul>
      {artikel.map((item) => (
        <li key={item.id}>
          <a href={"/artikel/" + item.id}>
            {item.judul}
          </a>
        </li>
      ))}
    </ul>
  );
}`,
      },
      { type: "h2", text: "Query yang sering dipakai" },
      {
        type: "code",
        lang: "ts",
        filename: "src/lib/queries.ts",
        code: `// Semua data
const semua = await prisma.artikel.findMany();

// Satu data
const satu = await prisma.artikel.findUnique({
  where: { id: 1 },
});

// Filter + urutkan
const hasil = await prisma.artikel.findMany({
  where: { penulis: "Budi" },
  orderBy: { createdAt: "desc" },
  take: 10,
});

// Hitung
const jumlah = await prisma.artikel.count({
  where: { penulis: "Budi" },
});

// Buat data
const baru = await prisma.artikel.create({
  data: { judul: "Judul", konten: "Isi" },
});

// Update
await prisma.artikel.update({
  where: { id: 1 },
  data: { judul: "Judul baru" },
});

// Hapus
await prisma.artikel.delete({ where: { id: 1 } });`,
      },
      { type: "h2", text: "Relasi antar model" },
      {
        type: "code",
        lang: "prisma",
        filename: "prisma/schema.prisma",
        code: `model User {
  id       Int       @id @default(autoincrement())
  name     String
  email    String    @unique
  artikel  Artikel[]
}

model Artikel {
  id      Int     @id @default(autoincrement())
  judul   String
  konten  String
  user    User    @relation(fields: [userId], references: [id])
  userId  Int
}`,
      },
      {
        type: "code",
        lang: "ts",
        filename: "src/lib/queries.ts",
        code: `// Ambil user beserta artikelnya (include relasi)
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: { artikel: true },
});

// Ambil artikel dengan penulisnya
const artikel = await prisma.artikel.findUnique({
  where: { id: 1 },
  include: { user: true },
});`,
      },
      {
        type: "callout",
        title: "Jalankan migrasi",
        tone: "warning",
        text: "Setiap kali mengubah prisma/schema.prisma, jalankan npx prisma migrate dev --name nama_perubahan lalu npx prisma generate. Jangan lupa commit file migrasi ke Git agar tim punya skema sama.",
      },
      {
        type: "callout",
        title: "Latihan",
        tone: "info",
        text: "Buat model Tugas (id, judul, selesai boolean). Migrasi, lalu tampilkan daftar tugas di Server Component. Tambahkan relasi ke model User.",
      },
      {
        type: "p",
        text: "Data sudah tersimpan. Lanjut ke tutorial Autentikasi & Middleware untuk login, register, dan proteksi halaman.",
      },
    ],
  }
