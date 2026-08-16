import type { Tutorial } from "../types"

export const nodejsDasar: Tutorial = {
    slug: "nodejs-dasar",
    title: "Node.js & NPM untuk Pemula",
    description:
      "Jalankan JavaScript di server, kelola package dengan NPM, dan buat server HTTP pertama dengan Express.",
    category: "Backend",
    level: "Menengah",
    minutes: 14,
    date: "2026-08-14",
    content: [
      {
        type: "p",
        text: "Node.js memungkinkan JavaScript berjalan di luar browser di server. Dengan begitu, satu bahasa (JavaScript) cukup untuk seluruh aplikasi: frontend dan backend.",
      },
      { type: "h2", text: "Menjalankan JavaScript dengan Node" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `# Cek instalasi
node --version
npm --version

# Jalankan file
node script.js

# Mode interaktif (REPL)
node`,
      },
      { type: "h2", text: "NPM: manajer package" },
      {
        type: "p",
        text: "NPM (Node Package Manager) mengunduh dan mengelola library yang orang lain tulis, sehingga kamu tidak perlu membangun semuanya dari nol.",
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `# Buat project baru
npm init -y

# Install package (masuk ke dependencies)
npm install express

# Install package khusus development
npm install -D typescript

# Simpan di package.json? Sudah otomatis.
# Install semua dependency dari package.json
npm install

# Jalankan script dari package.json
npm run dev`,
      },
      {
        type: "p",
        text: "Setelah install, muncul folder node_modules (isinya ribuan file jangan di-commit ke Git, abaikan dengan file .gitignore).",
      },
      { type: "h2", text: "Server pertama dengan Express" },
      {
        type: "code",
        lang: "javascript",
        filename: "server.js",
        code: `import express from "express";

const app = express();
const PORT = 3000;

// Middleware: membaca JSON dari request body
app.use(express.json());

// Route dasar
app.get("/", (req, res) => {
  res.send("Halo dari server!");
});

// Route dengan parameter
app.get("/users/:id", (req, res) => {
  res.json({ id: req.params.id, name: "Budi" });
});

// Route POST untuk menerima data
app.post("/users", (req, res) => {
  res.status(201).json({ created: req.body });
});

app.listen(PORT, () => {
  console.log(\`Server jalan di http://localhost:\${PORT}\`);
});`,
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `node server.js
# Buka http://localhost:3000 di browser

# Uji POST dengan curl
curl -X POST http://localhost:3000/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Sari"}'`,
      },
      {
        type: "list",
        items: [
          "GET mengambil data (baca).",
          "POST membuat data baru.",
          "PUT/PATCH memperbarui data.",
          "DELETE menghapus data.",
        ],
      },
      {
        type: "callout",
        title: "Package.json & lockfile",
        text: "package.json mencatat dependency versi kasar, package-lock.json mengunci versi persis. Commit keduanya! Jangan pernah commit node_modules.",
      },
      {
        type: "p",
        text: "Langkah berikutnya dalam roadmap: Express & REST API, lalu database. Gabungkan semuanya menjadi aplikasi fullstack.",
      },
    ],
  }
