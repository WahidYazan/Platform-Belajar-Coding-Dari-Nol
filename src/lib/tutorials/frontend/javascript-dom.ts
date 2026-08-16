import type { Tutorial } from "../types"

export const javascriptDom: Tutorial = {
    slug: "javascript-dom",
    title: "JavaScript & DOM: Manipulasi Elemen dan Event",
    description:
      "Hubungkan JavaScript dengan halaman: pilih elemen, ubah konten, tangani klik, dan buat halaman benar-benar interaktif.",
    category: "JavaScript",
    level: "Pemula",
    minutes: 15,
    date: "2026-08-14",
    content: [
      {
        type: "p",
        text: "JavaScript di browser bukan hanya menulis console.log ia bisa memilih elemen HTML, mengubahnya, dan merespons aksi pengguna. Inilah kekuatan yang membuat website menjadi aplikasi.",
      },
      { type: "h2", text: "Apa itu DOM?" },
      {
        type: "p",
        text: "DOM (Document Object Model) adalah representasi struktur halaman sebagai objek JavaScript. Browser mengubah HTML menjadi pohon objek yang bisa kamu baca dan ubah lewat kode.",
      },
      { type: "h2", text: "Memilih elemen" },
      {
        type: "code",
        lang: "javascript",
        filename: "seleksi.js",
        code: `// Pilih satu elemen (yang pertama cocok)
const title = document.querySelector(".hero-title");

// Pilih berdasarkan id
const btn = document.getElementById("submit-btn");

// Pilih banyak elemen → NodeList (mirip array)
const cards = document.querySelectorAll(".card");
console.log(cards.length); // jumlah elemen

// Bisa juga kombinasikan selektor
const firstItem = document.querySelector("ul li:first-child");`,
      },
      { type: "h2", text: "Mengubah konten dan style" },
      {
        type: "code",
        lang: "javascript",
        filename: "ubah.js",
        code: `const title = document.querySelector(".hero-title");

// Ubah teks
title.textContent = "Judul baru";

// Ubah HTML (hati-hati XSS jika dari input user!)
// title.innerHTML = "<em>Judul</em>";

// Ubah style
title.style.color = "#2563eb";

// Tambah/hapus class
title.classList.add("highlighted");
title.classList.remove("hidden");
title.classList.toggle("active");`,
      },
      {
        type: "callout",
        title: "textContent vs innerHTML",
        tone: "warning",
        text: "Gunakan textContent untuk menampilkan teks dari pengguna. innerHTML merender HTML mentah jika isinya berasal dari input pengguna, itu celah keamanan (XSS).",
      },
      { type: "h2", text: "Membuat dan menghapus elemen" },
      {
        type: "code",
        lang: "javascript",
        filename: "buat.js",
        code: `const list = document.querySelector("#todo-list");

// Buat elemen
const li = document.createElement("li");
li.textContent = "Belajar DOM";
li.className = "todo-item";

// Tambahkan ke halaman
list.appendChild(li);

// Hapus elemen
li.remove();`,
      },
      { type: "h2", text: "Event: merespons pengguna" },
      {
        type: "code",
        lang: "javascript",
        filename: "event.js",
        code: `const btn = document.querySelector("#submit-btn");

// Event listener
btn.addEventListener("click", (event) => {
  console.log("Tombol diklik!", event);
});

// Event lain yang umum
form.addEventListener("submit", handleSubmit); // submit form
input.addEventListener("input", handleInput);  // saat mengetik
window.addEventListener("keydown", handleKey); // keyboard
document.addEventListener("DOMContentLoaded", init); // halaman siap`,
      },
      { type: "h2", text: "Project mini: lampu lalu lintas" },
      {
        type: "code",
        lang: "html",
        filename: "index.html",
        code: `<div class="lampu" data-warna="merah"></div>
<button id="ganti">Ganti Warna</button>

<script>
  const lampu = document.querySelector(".lampu");
  const btn = document.querySelector("#ganti");
  const warna = ["merah", "kuning", "hijau"];
  let index = 0;

  btn.addEventListener("click", () => {
    index = (index + 1) % warna.length;
    lampu.dataset.warna = warna[index];
    // lalu atur warna background via CSS
    // [data-warna="merah"] { background: red; } dst.
  });
</script>`,
      },
      {
        type: "callout",
        title: "Event delegation",
        tone: "tip",
        text: "Jika punya 100 tombol yang dibuat dinamis, jangan pasang listener satu per satu. Pasang satu listener di kontainer, lalu cek event.target ini pola event delegation yang wajib dikenal.",
      },
      {
        type: "p",
        text: "Sekarang kamu bisa membuat halaman interaktif. Materi berikutnya menjembatani JavaScript dengan dunia server: async, promise, dan fetch API.",
      },
    ],
  }
