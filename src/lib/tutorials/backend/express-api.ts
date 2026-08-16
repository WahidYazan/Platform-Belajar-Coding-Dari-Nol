import type { Tutorial } from "../types"

export const expressApi: Tutorial = {
    slug: "express-api",
    title: "Express & REST API: Backend Pertamamu",
    description:
      "Bangun server dengan Express, definisikan route, dan buat REST API CRUD sederhana dengan data di memori.",
    category: "Backend",
    level: "Menengah",
    minutes: 16,
    date: "2026-08-14",
    content: [
      {
        type: "p",
        text: "Setelah mengenal Node.js, saatnya membangun server sungguhan. Express adalah framework paling populer untuk membuat API di Node.js dipakai jutaan developer dan jadi fondasi yang bagus sebelum beralih ke Next.js API routes.",
      },
      { type: "h2", text: "Setup project" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `mkdir server-pertamaku
cd server-pertamaku
npm init -y
npm install express
npm install -D nodemon   # auto-restart saat file berubah`,
      },
      {
        type: "p",
        text: "Tambahkan script di package.json, lalu buat server:",
      },
      {
        type: "code",
        lang: "json",
        filename: "package.json",
        code: `"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}`,
      },
      { type: "h2", text: "Server pertama" },
      {
        type: "code",
        lang: "javascript",
        filename: "server.js",
        code: `import express from "express";

const app = express();
const PORT = 3000;

// Middleware bawaan untuk membaca JSON body
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API kamu hidup!" });
});

app.listen(PORT, () => {
  console.log(\`Server jalan di http://localhost:\${PORT}\`);
});`,
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `npm run dev
# Server jalan di http://localhost:3000

curl http://localhost:3000
# {"message":"API kamu hidup!"}`,
      },
      { type: "h2", text: "CRUD lengkap: data di memori" },
      {
        type: "code",
        lang: "javascript",
        filename: "server.js",
        code: `// Simpan data sementara di memori
let users = [
  { id: 1, name: "Budi" },
  { id: 2, name: "Sari" },
];
let nextId = 3;

// GET semua
app.get("/api/users", (req, res) => {
  res.json(users);
});

// GET satu
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User tidak ditemukan" });
  res.json(user);
});

// POST buat baru
app.post("/api/users", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Nama wajib diisi" });

  const newUser = { id: nextId++, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT perbarui
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

  user.name = req.body.name ?? user.name;
  res.json(user);
});

// DELETE hapus
app.delete("/api/users/:id", (req, res) => {
  users = users.filter((u) => u.id !== Number(req.params.id));
  res.status(204).end();
});`,
      },
      { type: "h2", text: "Uji dengan curl" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `# Buat user
curl -X POST http://localhost:3000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Andi"}'

# Ambil semua
curl http://localhost:3000/api/users

# Ambil satu
curl http://localhost:3000/api/users/1

# Hapus
curl -X DELETE http://localhost:3000/api/users/1`,
      },
      {
        type: "callout",
        title: "Kenapa return sebelum res?",
        tone: "tip",
        text: "Setelah res.json() dipanggil, function harus berhenti kalau tidak, kode di bawahnya ikut jalan dan bisa memicu error 'headers already sent'. return memastikan penghentian.",
      },
      { type: "h2", text: "Struktur project yang rapi" },
      {
        type: "p",
        text: "Untuk project kecil, satu file server.js cukup. Saat aplikasi membesar, pecah menjadi folder: routes/, controllers/, dan models/. Prinsipnya: satu tanggung jawab per file.",
      },
      {
        type: "callout",
        title: "Langkah berikutnya",
        text: "Data di memori hilang saat server restart. Itu sebabnya kamu butuh database pelajari di tutorial berikutnya.",
      },
    ],
  }
