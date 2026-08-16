import type { Tutorial } from "../types";

export const caraKerjaWeb: Tutorial = {
    slug: "cara-kerja-web",
    title: "Cara Kerja Web: Internet, Browser & Server",
    description:
        "Pahami apa yang terjadi di balik layar setiap kali kamu membuka website fondasi konsep yang wajib dikuasai dari hari pertama.",
    category: "Dasar",
    level: "Pemula",
    minutes: 10,
    date: "2026-08-14",
    content: [
        {
            type: "p",
            text: "Sebelum menulis kode, kamu perlu memahami apa itu website dan bagaimana ia sampai ke layarmu. Konsep ini adalah fondasi semua materi selanjutnya tanpa memahaminya, istilah seperti 'server', 'API', dan 'deploy' akan selalu membingungkan.",
        },
        { type: "h2", text: "Apa yang terjadi saat kamu membuka website?" },
        {
            type: "list",
            ordered: true,
            items: [
                "Kamu mengetik alamat (misal: https://Sinau Coding.com) di browser.",
                "Browser menanyakan DNS: 'alamat IP dari Sinau Coding.com di mana?'",
                "Browser mengirim HTTP Request ke server (komputer yang menyimpan website).",
                "Server memproses, lalu mengirim balik HTTP Response berupa HTML, CSS, dan JavaScript.",
                "Browser merender kode itu menjadi halaman yang bisa kamu lihat dan klik.",
            ],
        },
        {
            type: "callout",
            title: "Intinya",
            text: "Website = file di komputer server. Browser = aplikasi yang meminta dan menampilkan file itu. Seluruh komunikasi terjadi lewat HTTP.",
        },
        { type: "h2", text: "Client, Server, dan HTTP" },
        {
            type: "p",
            text: "Dalam model client-server, browser kamu adalah client (yang meminta) dan server adalah komputer yang selalu menyala dan menyimpan website (yang melayani). Mereka berkomunikasi dengan protokol HTTP.",
        },
        {
            type: "code",
            lang: "bash",
            filename: "terminal",
            code: `# Request dari client (dipermudah)
GET /tutorials/html-dasar HTTP/1.1
Host: Sinau Coding.com

# Response dari server
HTTP/1.1 200 OK
Content-Type: text/html

<!DOCTYPE html>
<html>
  <body>
    <h1>HTML Dasar</h1>
  </body>
</html>`,
        },
        {
            type: "list",
            items: [
                "GET minta data (buka halaman).",
                "POST kirim data baru (submit form).",
                "Status 200 = sukses, 404 = tidak ditemukan, 500 = error server.",
            ],
        },
        { type: "h2", text: "Anatomi URL" },
        {
            type: "code",
            lang: "text",
            filename: "url",
            code: `https://Sinau Coding.com/tutorials/html-dasar?q=flexbox#top
|      |                     |               |            |
|      |                     |               |            +-- fragment (posisi di halaman)
|      |                     |               +-- query string (parameter)
|      |                     +-- path (halaman spesifik)
|      +-- domain (nama website)
+-- protokol (HTTP aman)`,
        },
        { type: "h2", text: "Server-side vs Client-side" },
        {
            type: "list",
            items: [
                "Client-side: kode berjalan di browser pengunjung (HTML, CSS, JavaScript).",
                "Server-side: kode berjalan di server (Node.js, Python, PHP).",
                "Server-side dipakai untuk data & keamanan; client-side untuk interaksi & tampilan.",
                "Fullstack developer menguasai keduanya.",
            ],
        },
        {
            type: "callout",
            title: "Kenapa ini penting?",
            text: "Saat kamu nanti belajar 'mengambil data dari API' atau 'deploy aplikasi', yang terjadi hanyalah komunikasi HTTP yang sama persis seperti di atas. Memahami ini lebih dulu membuat segalanya terasa logis.",
        },
    ],
};
