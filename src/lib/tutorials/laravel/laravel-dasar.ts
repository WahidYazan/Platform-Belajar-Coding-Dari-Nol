import type { Tutorial } from "../types"

export const laravelDasar: Tutorial = {
    slug: "laravel-dasar",
    title: "Laravel Dasar: Pengenalan & Instalasi",
    description:
      "Kenali framework PHP paling populer: apa itu Laravel, syarat instalasi, dan struktur folder proyek pertamamu.",
    category: "Laravel",
    level: "Pemula",
    minutes: 12,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Laravel adalah framework PHP untuk membangun aplikasi web. Framework artinya kumpulan aturan dan alat yang sudah jadi kamu tinggal mengisi logika bisnis, bukan membangun semuanya dari nol. Laravel dikenal karena sintaks yang bersih, ekosistem yang besar, dan kemudahan untuk ditim-tim.",
      },
      { type: "h2", text: "Apa yang membuat Laravel populer?" },
      {
        type: "list",
        items: [
          "MVC (Model-View-Controller) struktur yang rapi dan dipakai industri.",
          "Blade template engine yang mudah dibaca ({{ $nama }}).",
          "Eloquent ORM bekerja dengan database tanpa menulis SQL mentah.",
          "Artisan command-line tool untuk generate kode otomatis.",
          "Ekosistem lengkap: auth, queue, notifikasi, testing, dan lainnya siap pakai.",
        ],
      },
      { type: "h2", text: "Syarat sebelum mulai" },
      {
        type: "p",
        text: "Laravel butuh PHP versi terbaru dan Composer (package manager PHP). Pastikan keduanya terpasang:",
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php -v
# PHP 8.2+ (rekomendasi untuk Laravel 11/12)

composer --version
# Composer version 2.x`,
      },
      {
        type: "callout",
        title: "Butuh versi berapa?",
        tone: "tip",
        text: "Selalu pakai Laravel versi terbaru (LTS lebih baik untuk produksi). Cek dokumentasi resmi laravel.com untuk persyaratan PHP yang tepat.",
      },
      { type: "h2", text: "Instalasi dengan Composer" },
      {
        type: "p",
        text: "Buka terminal, lalu buat proyek baru:",
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `composer create-project laravel/laravel nama-proyek

cd nama-proyek
php artisan serve`,
      },
      {
        type: "p",
        text: "Setelah php artisan serve berjalan, buka http://localhost:8000 di browser. Jika muncul halaman selamat datang Laravel, instalasi sukses!",
      },
      { type: "h2", text: "Mengenal struktur folder" },
      {
        type: "list",
        items: [
          "app/ kode inti aplikasi: controllers, models, dan services.",
          "routes/ file yang mendefinisikan URL aplikasi (web.php, api.php).",
          "resources/views/ file Blade (.blade.php) untuk tampilan.",
          "database/ migration, seeder, dan factory untuk database.",
          "public/ folder yang ter-akses publik: index.php, gambar, CSS.",
          "config/ pengaturan aplikasi (database, mail, dsb.).",
          "bootstrap/ cara aplikasi diboot, termasuk cache.",
        ],
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `ls -1
app     bootstrap  config  database  public  resources  routes  storage  tests`,
      },
      { type: "h2", text: "Kenalan dengan Artisan" },
      {
        type: "p",
        text: "Artisan adalah command-line tool Laravel. Beberapa perintah yang sering dipakai:",
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan list          # semua perintah tersedia
php artisan make:controller NamaController
php artisan make:model Nama
php artisan migrate        # jalankan migrasi database
php artisan tinker         # REPL untuk uji coba kode`,
      },
      {
        type: "callout",
        title: "Saran belajar",
        tone: "info",
        text: "Jangan hafal perintah. Biasakan mengetik php artisan list dan baca bantuan per perintah (php artisan help make:model). Belajar Laravel adalah belajar ekosistemnya.",
      },
      {
        type: "p",
        text: "Lanjut ke tutorial Routing untuk memahami bagaimana Laravel menghubungkan URL dengan kode.",
      },
    ],
  }
