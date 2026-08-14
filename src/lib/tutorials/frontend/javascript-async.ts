import type { Tutorial } from "../types"

export const javascriptAsync: Tutorial = {
    slug: "javascript-async",
    title: "Async JavaScript: Promise, Async/Await & Fetch",
    description:
      "Ambil data dari server dengan fetch, pahami event loop, dan tulis kode asinkron yang rapi dengan async/await.",
    category: "JavaScript",
    level: "Menengah",
    minutes: 16,
    date: "2026-08-14",
    content: [
      {
        type: "p",
        text: "Mengambil data dari internet membutuhkan waktu — bisa 100ms atau 10 detik. JavaScript tidak boleh membeku sambil menunggu. Di sinilah pemrograman asinkron bekerja: jalankan tugas lain sambil menunggu respons.",
      },
      { type: "h2", text: "Masalahnya: tugas memakan waktu" },
      {
        type: "code",
        lang: "javascript",
        filename: "masalah.js",
        code: `// Bayangkan ini memakan 3 detik
const data = getDataDariInternet(); // ❌ membekukan halaman

// JavaScript butuh cara menjalankan ini tanpa membekukan UI
// Jawabannya: Promise`,
      },
      { type: "h2", text: "Promise: janji hasil di masa depan" },
      {
        type: "code",
        lang: "javascript",
        filename: "promise.js",
        code: `// Promise punya 3 status: pending, fulfilled, rejected
fetch("https://api.contoh.com/users")
  .then((response) => response.json())   // fulfilled
  .then((data) => console.log(data))
  .catch((error) => console.error("Gagal:", error)); // rejected`,
      },
      { type: "h2", text: "async/await: cara modern yang rapi" },
      {
        type: "code",
        lang: "javascript",
        filename: "async.js",
        code: `async function loadUsers() {
  try {
    const response = await fetch("https://api.contoh.com/users");

    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Gagal memuat data:", error);
  }
}

// async function selalu mengembalikan Promise
const users = await loadUsers();`,
      },
      {
        type: "list",
        items: [
          "await hanya bisa dipakai di dalam fungsi async.",
          "try/catch menangkap error dari jaringan maupun status non-200.",
          "async/await adalah gula sintaks di atas Promise — konsepnya sama.",
        ],
      },
      { type: "h2", text: "Memakai fetch di halaman web" },
      {
        type: "code",
        lang: "html",
        filename: "index.html",
        code: `<ul id="user-list"></ul>

<script>
  async function renderUsers() {
    const list = document.querySelector("#user-list");
    list.innerHTML = "<li>Memuat...</li>";

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await res.json();

      list.innerHTML = users
        .map((user) => \`<li>\${user.name} — \${user.email}</li>\`)
        .join("");
    } catch (error) {
      list.innerHTML = "<li>Gagal memuat data</li>";
    }
  }

  renderUsers();
</script>`,
      },
      {
        type: "callout",
        title: "Jalankan banyak sekaligus",
        tone: "tip",
        text: "Promise.all menjalankan beberapa request paralel dan menunggu semuanya: const [a, b] = await Promise.all([fetchA(), fetchB()]). Ini jauh lebih cepat daripada menunggu satu per satu.",
      },
      { type: "h2", text: "Latihan: aplikasi cek cuaca" },
      {
        type: "p",
        text: "Gunakan API publik open-meteo.com untuk mengambil suhu kota, lalu tampilkan di halaman. Latihan ini melatih pola lengkap yang akan kamu pakai di semua aplikasi nyata: loading → fetch → render → error handling.",
      },
      {
        type: "p",
        text: "Konsep async ini adalah jembatan menuju backend. Di sana, istilahnya sama — hanya berjalan di server. Lanjut ke Node.js & Express saat kamu siap.",
      },
    ],
  }
