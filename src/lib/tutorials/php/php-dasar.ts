import type { Tutorial } from "../types"

export const phpDasar: Tutorial = {
  slug: "php-dasar",
  title: "PHP Dasar: Pengenalan & Instalasi",
  description:
    "Kenali bahasa PHP: apa itu PHP, cara kerja, instalasi, dan tulis skrip pertamamu.",
  category: "PHP",
  level: "Pemula",
  minutes: 15,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "PHP (PHP: Hypertext Preprocessor) adalah bahasa pemrograman server-side yang dirancang khusus untuk web. PHP berjalan di server, memproses logika, lalu menghasilkan HTML yang dikirim ke browser. Hampir 77% website di internet menggunakan PHP termasuk WordPress, Facebook, dan Wikipedia.",
    },
    { type: "h2", text: "Mengapa belajar PHP?" },
    {
      type: "list",
      items: [
        "Mudah dipelajari sintaksnya mirip C/Java tapi lebih sederhana.",
        "Ekosistem besar: WordPress, Laravel, Symfony, dan ribuan library.",
        " Hosting murah dan tersedia di hampir semua provider.",
        "Dokumentasi lengkap di php.net dengan ribuan contoh kode.",
        " Komunitas aktif dan banyak tutorial dalam Bahasa Indonesia.",
      ],
    },
    { type: "h2", text: "Cara kerja PHP" },
    {
      type: "p",
      text: "Berbeda dengan JavaScript yang berjalan di browser, PHP berjalan di server. Alurnya: (1) Browser request halaman → (2) Server menerima dan menjalankan kode PHP → (3) PHP menghasilkan HTML → (4) HTML dikirim ke browser → (5) Browser menampilkan halaman.",
    },
    {
      type: "code",
      lang: "php",
      filename: "index.php",
      code: `<?php
// Browser tidak melihat kode ini, hanya hasilnya
$judul = "Halo Dunia!";
echo "<h1>" . $judul . "</h1>";
echo "<p>Ini dihasilkan oleh PHP di server.</p>";
// Browser melihat:
// <h1>Halo Dunia!</h1>
// <p>Ini dihasilkan oleh PHP di server.</p>
?>`,
    },
    { type: "h2", text: "Instalasi PHP" },
    {
      type: "h3",
      text: "Cara 1: XAMPP (Recommended untuk pemula)",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Download XAMPP dari apachefriends.org.",
        "Install seperti biasa (centang Apache + MySQL).",
        "Buka XAMPP Control Panel → Start Apache.",
        "Buka folder htdocs (biasanya C:\\xampp\\htdocs).",
        "Buat folder baru, buat file index.php di dalamnya.",
        "Buka browser → ketik localhost/nama-folder.",
      ],
    },
    {
      type: "h3",
      text: "Cara 2: PHP standalone (untuk belajar CLI)",
    },
    {
      type: "code",
      lang: "bash",
      filename: "terminal",
      code: `# Ubuntu/Debian
sudo apt update
sudo apt install php php-cli php-mysql php-curl php-mbstring php-zip

# Mac (pakai Homebrew)
brew install php

# Cek instalasi
php -v
# PHP 8.3.x (cli)

# Jalankan file PHP dari terminal
php index.php`,
    },
    {
      type: "h3",
      text: "Cara 3: Docker (untuk produksi)",
    },
    {
      type: "code",
      lang: "dockerfile",
      filename: "Dockerfile",
      code: `FROM php:8.3-apache
COPY . /var/www/html/
RUN docker-php-ext-install pdo pdo_mysql
EXPOSE 80`,
    },
    {
      type: "callout",
      title: "Saran",
      tone: "tip",
      text: "Untuk pemula, pakai XAMPP dulu. Setelah nyaman, beralih ke Docker atau ServBay untuk proyek yang lebih serius.",
    },
    { type: "h2", text: "Struktur dasar file PHP" },
    {
      type: "code",
      lang: "php",
      filename: "hello.php",
      code: `<?php
// Semua kode PHP dimulai dengan tag ini
echo "Halo, Dunia!";
// Dan diakhiri dengan (opsional di file murni PHP)
?>`,
    },
    {
      type: "list",
      items: [
        "File PHP selalu berakhiran .php.",
        "Tag pembuka <?php dan penutup ?> (opsional di file murni PHP).",
        "Setiap pernyataan diakhiri dengan titik koma (;).",
        "Komentar satu baris pakai // atau #.",
        "Komentar multi-baris pakai /* ... */.",
      ],
    },
    { type: "h2", text: "Menjalankan PHP pertama kali" },
    {
      type: "code",
      lang: "php",
      filename: "pertama.php",
      code: `<?php
// Simpan file ini di htdocs/pertama/pertama.php

// Tampilkan teks
echo "Selamat datang di PHP!";

// Hitung sesuatu
$angka1 = 10;
$angka2 = 20;
$hasil = $angka1 + $angka2;
echo "<br>"; // newline di HTML
echo "Hasil penjumlahan: " . $hasil;

// Cek versi PHP
echo "<br>Versi PHP: " . phpversion();
?>`,
    },
    {
      type: "callout",
      title: "Catatan penting",
      tone: "info",
      text: "Variabel di PHP diawali dengan tanda $ ( dollar sign ). Ini yang membedakan PHP dari bahasa lain.",
    },
    {
      type: "p",
      text: "Sekarang kamu sudah punya PHP terinstal dan bisa menjalankan skrip pertama. Lanjut ke bab Variabel & Tipe Data untuk memahami cara menyimpan dan menggunakan data di PHP.",
    },
  ],
}
