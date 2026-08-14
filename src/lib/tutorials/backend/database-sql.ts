import type { Tutorial } from "../types"

export const databaseSql: Tutorial = {
    slug: "database-sql",
    title: "Database & SQL Dasar",
    description:
      "Simpan data permanen: konsep database relasional, tabel, dan query SQL dari SELECT sampai JOIN.",
    category: "Backend",
    level: "Menengah",
    minutes: 15,
    date: "2026-08-14",
    content: [
      {
        type: "p",
        text: "Aplikasi nyata butuh menyimpan data secara permanen: user, postingan, transaksi. Database relasional (seperti PostgreSQL dan MySQL) adalah standar industri, dan SQL adalah bahasanya.",
      },
      { type: "h2", text: "Konsep dasar" },
      {
        type: "list",
        items: [
          "Database = kumpulan tabel.",
          "Tabel = kumpulan baris dengan kolom tetap (mirip spreadsheet).",
          "Baris = satu record (satu user, satu produk).",
          "Kolom = satu atribut (nama, email, harga).",
          "Primary key = kolom unik pengenal tiap baris (biasanya id).",
        ],
      },
      {
        type: "code",
        lang: "sql",
        filename: "users.sql",
        code: `-- Contoh tabel
CREATE TABLE users (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(100) NOT NULL,
  email    VARCHAR(255) UNIQUE NOT NULL,
  age      INT,
  created_at TIMESTAMP DEFAULT NOW()
);`,
      },
      { type: "h2", text: "SELECT: membaca data" },
      {
        type: "code",
        lang: "sql",
        filename: "select.sql",
        code: `-- Ambil semua kolom
SELECT * FROM users;

-- Ambil kolom tertentu
SELECT name, email FROM users;

-- Filter
SELECT * FROM users
WHERE age >= 18;

-- Urutkan & batasi
SELECT * FROM users
ORDER BY created_at DESC
LIMIT 10;

-- Cari teks
SELECT * FROM users
WHERE name ILIKE '%budi%';

-- Hitung
SELECT COUNT(*) FROM users;`,
      },
      { type: "h2", text: "INSERT, UPDATE, DELETE" },
      {
        type: "code",
        lang: "sql",
        filename: "write.sql",
        code: `-- Tambah data
INSERT INTO users (name, email, age)
VALUES ('Budi', 'budi@mail.com', 25);

-- Perbarui (JANGAN LUPA WHERE!)
UPDATE users
SET age = 26
WHERE id = 1;

-- Hapus (JANGAN LUPA WHERE!)
DELETE FROM users
WHERE id = 1;`,
      },
      {
        type: "callout",
        title: "WHERE itu wajib (untuk UPDATE/DELETE)",
        tone: "warning",
        text: "UPDATE dan DELETE tanpa WHERE berlaku untuk SEMUA baris. Satu kelupaan = seluruh tabel berubah/hilang. Selalu tulis WHERE dulu sebelum menjalankan.",
      },
      { type: "h2", text: "Relasi antar tabel" },
      {
        type: "p",
        text: "Data nyata saling berhubungan: satu user punya banyak postingan. Hubungan ini disebut one-to-many, dihubungkan lewat foreign key.",
      },
      {
        type: "code",
        lang: "sql",
        filename: "join.sql",
        code: `CREATE TABLE posts (
  id       SERIAL PRIMARY KEY,
  user_id  INT REFERENCES users(id),  -- foreign key
  title    VARCHAR(200) NOT NULL,
  body     TEXT
);

-- Gabungkan dua tabel dengan JOIN
SELECT
  posts.title,
  users.name AS penulis
FROM posts
JOIN users ON users.id = posts.user_id
WHERE users.id = 1;`,
      },
      {
        type: "list",
        items: [
          "INNER JOIN — hanya baris yang cocok di kedua tabel.",
          "LEFT JOIN — semua baris tabel kiri, yang cocok dari kanan (sisanya NULL).",
          "Foreign key menjaga integritas: tidak bisa merujuk id yang tidak ada.",
        ],
      },
      { type: "h2", text: "Dari SQL mentah ke ORM" },
      {
        type: "p",
        text: "Menulis SQL langsung itu penting dan wajib kamu pahami. Namun di project nyata, developer biasanya memakai ORM seperti Prisma atau Drizzle yang mengubah object JavaScript menjadi query SQL otomatis — dengan keamanan terhadap SQL injection.",
      },
      {
        type: "code",
        lang: "javascript",
        filename: "prisma.js",
        code: `// Contoh gaya ORM (Prisma)
const users = await prisma.user.findMany({
  where: { age: { gte: 18 } },
  orderBy: { createdAt: "desc" },
});`,
      },
      {
        type: "callout",
        title: "Langkah berikutnya",
        text: "Hubungkan Express + database menjadi aplikasi fullstack. Setelah itu, tambahkan autentikasi (login/register) — materi roadmap fase Backend & Database.",
      },
    ],
  }
