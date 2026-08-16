import type { Tutorial } from "../types"

export const laravelRouting: Tutorial = {
    slug: "laravel-routing",
    title: "Routing & Controller: Menghubungkan URL dengan Kode",
    description:
      "Pelajari cara mendefinisikan route, parameter URL, named route, dan memindahkan logika ke controller.",
    category: "Laravel",
    level: "Pemula",
    minutes: 14,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Routing adalah jantung aplikasi web: menentukan URL apa yang tersedia dan kode apa yang dijalankan ketika URL itu diakses. Di Laravel, route didefinisikan di folder routes/.",
      },
      { type: "h2", text: "File route utama" },
      {
        type: "list",
        items: [
          "routes/web.php route untuk aplikasi web (yang dibuka di browser).",
          "routes/api.php route untuk API (prefix /api, tanpa session/CSRF).",
          "routes/console.php perintah artisan kustom.",
          "routes/channels.php broadcast channel (jarang dipakai pemula).",
        ],
      },
      { type: "h2", text: "Route dasar" },
      {
        type: "code",
        lang: "php",
        filename: "routes/web.php",
        code: `<?php

use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/tentang', function () {
    return 'Halaman Tentang';
});

Route::post('/kontak', function () {
    return 'Data terkirim';
});

Route::put('/pengguna/1', function () {
    return 'Data diperbarui';
});

Route::delete('/pengguna/1', function () {
    return 'Data dihapus';
});`,
      },
      {
        type: "list",
        items: [
          "get mengambil halaman/data.",
          "post mengirim data baru (form).",
          "put / patch memperbarui data.",
          "delete menghapus data.",
        ],
      },
      { type: "h2", text: "Parameter URL" },
      {
        type: "p",
        text: "Gunakan kurung kurawal { } untuk menangkap bagian dinamis dari URL:",
      },
      {
        type: "code",
        lang: "php",
        filename: "routes/web.php",
        code: `Route::get('/artikel/{slug}', function (string $slug) {
    return "Artikel: {$slug}";
});

// URL: /artikel/cara-instal-laravel
// Output: Artikel: cara-instal-laravel

Route::get('/pengguna/{id}', function (int $id) {
    return "Pengguna ID: {$id}";
});

// Parameter opsional dengan tanda ?
Route::get('/kategori/{nama?}', function (?string $nama = null) {
    return $nama ? "Kategori: {$nama}" : 'Semua kategori';
});`,
      },
      {
        type: "callout",
        title: "Validasi parameter",
        tone: "tip",
        text: "Gunakan where() untuk membatasi format parameter, misalnya hanya angka: Route::get('/user/{id}', ...)->whereNumber('id'). Ada juga whereAlpha, whereUuid, dan where('id', '[0-9]+').",
      },
      { type: "h2", text: "Named route" },
      {
        type: "p",
        text: "Memberi nama route memudahkan pemanggilan di Blade, controller, dan redirect. Jika URL berubah, kode tidak perlu diganti di banyak tempat:",
      },
      {
        type: "code",
        lang: "php",
        filename: "routes/web.php",
        code: `Route::get('/artikel/{slug}', function () {
    // ...
})->name('artikel.show');

// Di controller atau route lain:
$url = route('artikel.show', ['slug' => 'laravel-untuk-pemula']);

// Di Blade:
// <a href="{{ route('artikel.show', ['slug' => $artikel->slug]) }}">Baca</a>`,
      },
      { type: "h2", text: "Redirect & fallback" },
      {
        type: "code",
        lang: "php",
        filename: "routes/web.php",
        code: `// Redirect dari URL lama ke URL baru
Route::redirect('/lama', '/baru');

// Halaman 404 untuk URL yang tidak dikenali (harus paling bawah)
Route::fallback(function () {
    return abort(404);
});`,
      },
      { type: "h2", text: "Menuju Controller" },
      {
        type: "p",
        text: "Menulis logika di dalam closure membuat routes/web.php menjadi gemuk. Praktik terbaik: buat controller dan panggil dari route.",
      },
      {
        type: "code",
        lang: "php",
        filename: "routes/web.php",
        code: `use App\\Http\\Controllers\\ArtikelController;

Route::get('/artikel', [ArtikelController::class, 'index']);
Route::get('/artikel/{slug}', [ArtikelController::class, 'show']);
Route::post('/artikel', [ArtikelController::class, 'store']);`,
      },
      {
        type: "callout",
        title: "Latihan",
        tone: "info",
        text: "Buat 3 route: GET /profile (halaman profil), GET /post/{id} (menampilkan ID), dan named route /contact bernama contact. Coba akses dengan route('contact') dari tinker.",
      },
      {
        type: "p",
        text: "Lanjut ke tutorial Blade untuk mempelajari template tampilan pasangan routing yang paling sering dipakai.",
      },
    ],
  }
