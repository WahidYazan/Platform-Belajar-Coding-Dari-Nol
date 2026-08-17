import type { Tutorial } from "../types";

export const htmlDasar: Tutorial = {
    slug: "html-dasar",
    title: "HTML Dasar: Struktur Halaman Web",
    description: "Pelajari tag, atribut, dan elemen semantik HTML untuk membangun kerangka halaman web yang benar.",
    category: "HTML",
    level: "Pemula",
    minutes: 12,
    date: "2026-08-10",
    content: [
        {
            type: "p",
            text: "HTML (HyperText Markup Language) adalah bahasa yang mendefinisikan struktur sebuah halaman web. Bayangkan HTML sebagai kerangka tulang belum terlihat cantik, tapi tanpanya tidak ada yang bisa berdiri.",
        },
        { type: "h2", text: "Anatomi elemen HTML" },
        {
            type: "p",
            text: "Sebuah elemen HTML terdiri dari tag pembuka, konten, dan tag penutup:",
        },
        {
            type: "code",
            lang: "html",
            filename: "anatomi.html",
            code: `    <p>Ini adalah paragraf</p>
<!-- ^                      ^ -->
<!-- tag pembuka           tag penutup -->`,
        },
        {
            type: "list",
            items: [
                "Tag pembuka: <p> menandai awal elemen.",
                "Konten: teks atau elemen lain di dalamnya.",
                "Tag penutup: </p> menandai akhir elemen.",
                'Atribut: informasi tambahan di dalam tag pembuka, contohnya <a href="https://...">.',
            ],
        },
        { type: "h2", text: "Struktur dokumen HTML" },
        {
            type: "p",
            text: "Setiap halaman HTML harus memiliki kerangka dasar berikut:",
        },
        {
            type: "code",
            lang: "html",
            filename: "index.html",
            code: `<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <title>Halaman Pertamaku</title>
  </head>
  <body>
    <h1>Halo, Dunia!</h1>
    <p>Ini halaman pertamaku.</p>
  </body>
</html>`,
        },
        {
            type: "list",
            items: [
                "<!DOCTYPE html> deklarasi bahwa ini dokumen HTML5.",
                "<html> elemen akar yang membungkus seluruh halaman.",
                "<head> berisi metadata seperti judul dan charset (tidak tampil).",
                "<body> berisi semua konten yang terlihat oleh pengguna.",
            ],
        },
        { type: "h2", text: "Elemen semantik (yang penting!)" },
        {
            type: "p",
            text: "Elemen semantik memberi makna pada bagian halaman, bukan sekadar tampilan. Ini bagus untuk SEO dan aksesibilitas:",
        },
        {
            type: "code",
            lang: "html",
            filename: "semantik.html",
            code: `<header>  <!-- bagian atas: logo, navigasi -->
  <nav>     <!-- kumpulan link navigasi -->
    <a href="/">Beranda</a>
    <a href="/tentang">Tentang</a>
  </nav>
</header>

<main>    <!-- konten utama halaman -->
  <article> <!-- satu konten mandiri -->
    <h2>Judul Artikel</h2>
    <p>Isi artikel...</p>
  </article>
</main>

<footer>  <!-- bagian bawah: copyright -->
  <p>&copy; 2026 Sinau Coding</p>
</footer>`,
        },
        {
            type: "callout",
            title: "Hindari ini",
            tone: "warning",
            text: "Jangan pakai <div> untuk semuanya. <div> memang bisa untuk apa saja, tapi elemen semantik seperti <article>, <nav>, dan <footer> membuat halamanmu jauh lebih mudah dibaca mesin dan manusia.",
        },
        { type: "h2", text: "Tag yang paling sering dipakai" },
        {
            type: "list",
            items: [
                "<h1> sampai <h6> judul berjenjang (pakai satu <h1> per halaman).",
                "<p> paragraf.",
                '<a href="..."> link.',
                '<img src="..." alt="..."> gambar (alt wajib untuk aksesibilitas).',
                "<ul>/<ol> dan <li> daftar (list).",
                "<strong> dan <em> teks tebal dan miring.",
                "<button> tombol.",
            ],
        },
        { type: "h2", text: "Latihan singkat" },
        {
            type: "p",
            text: "Buat file index.html, lalu tulis halaman berisi judul, satu paragraf tentang dirimu, satu link ke Google, dan satu daftar hobi. Buka di browser untuk melihat hasilnya.",
        },
        {
            type: "callout",
            title: "Langkah berikutnya",
            text: "Setelah HTML lancar, lanjut ke CSS agar halamanmu tampil cantik. Lihat tutorial CSS Dasar.",
        },
    ],
};
