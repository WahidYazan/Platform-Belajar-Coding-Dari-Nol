import type { Tutorial } from "../types"

export const laravelEloquent: Tutorial = {
    slug: "laravel-eloquent",
    title: "Eloquent ORM: Bekerja dengan Data Tanpa SQL Mentah",
    description:
      "Kuasi query dasar Eloquent: all, find, where, create, update, delete, sampai scope kustom dan pagination.",
    category: "Laravel",
    level: "Menengah",
    minutes: 17,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Eloquent adalah ORM bawaan Laravel. Setiap tabel punya Model sebuah class PHP yang mewakili satu baris data. Alih-alih menulis SELECT * FROM ..., kamu menulis Artikel::all(). Lebih aman dari SQL injection dan lebih mudah dibaca.",
      },
      { type: "h2", text: "Membuat Model" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan make:model Artikel

# Model + migration sekaligus:
php artisan make:model Artikel -m`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Models/Artikel.php",
        code: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Artikel extends Model
{
    // Nama tabel: 'artikel' (otomatis jamak dari nama class)
    // Primary key: 'id' (otomatis)
    // Timestamps: created_at & updated_at (aktif default)
}`,
      },
      {
        type: "callout",
        title: "Konvensi penamaan",
        tone: "tip",
        text: "Eloquent menghubungkan Model Artikel ke tabel 'artikels' (jamak) secara otomatis. Tabel kita bernama 'artikel', jadi set properti protected $table = 'artikel';. Kebiasaan baik: beri nama tabel jamak (users, artikels, products).",
      },
      { type: "h2", text: "Query membaca data" },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `use App\\Models\\Artikel;

// Semua data
$semua = Artikel::all();

// Cari berdasarkan primary key
$satu = Artikel::find(1);        // null jika tidak ada
$satu = Artikel::findOrFail(1);  // 404 jika tidak ada

// Filter
$lama = Artikel::where('penulis', 'Budi')
    ->orderBy('created_at', 'desc')
    ->get();

// Ambil hanya satu baris
$terbaru = Artikel::latest()->first();

// Hitung & agresi
Artikel::count();
Artikel::where('published', true)->count();`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Models/Artikel.php",
        code: `// di App\\Models\\Artikel
use Illuminate\\Database\\Eloquent\\Builder;

public function scopePublished(Builder $query): Builder
{
    return $query->where('published', true);
}

public function scopeByPenulis(Builder $query, string $nama): Builder
{
    return $query->where('penulis', $nama);
}`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `// Pakai scope kustom
$aktif = Artikel::published()->get();
$budi  = Artikel::published()->byPenulis('Budi')->get();`,
      },
      { type: "h2", text: "Menyimpan data" },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `use App\\Models\\Artikel;

// Cara 1: Model::create (butuh $fillable)
Artikel::create([
    'judul'   => 'Judul baru',
    'konten'  => 'Isi artikel',
    'penulis' => 'Siti',
]);

// Cara 2: new + save
$artikel = new Artikel();
$artikel->judul = 'Judul baru';
$artikel->konten = 'Isi artikel';
$artikel->save();`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Models/Artikel.php",
        code: `class Artikel extends Model
{
    // Kolom yang boleh diisi massal (mass assignment)
    protected $fillable = ['judul', 'konten', 'penulis', 'published'];

    // Kebalikannya: kolom yang DILARANG diisi massal
    // protected $guarded = ['id'];
}`,
      },
      {
        type: "callout",
        title: "Mass assignment protection",
        tone: "warning",
        text: "Tanpa $fillable (atau $guarded), Model::create() akan menolak semua input fitur keamanan bawaan agar user tidak bisa mengisi kolom sensitif seperti is_admin. Selalu daftarkan kolom yang memang boleh diisi user.",
      },
      { type: "h2", text: "Mengubah & menghapus data" },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `// Update
$artikel = Artikel::find(1);
$artikel->judul = 'Judul baru';
$artikel->save();

// atau
Artikel::where('id', 1)->update(['judul' => 'Judul baru']);

// Hapus
$artikel->delete();

// atau tanpa ambil objek dulu
Artikel::destroy(1);
Artikel::destroy([1, 2, 3]);`,
      },
      { type: "h2", text: "Pagination" },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `// 10 data per halaman, query string ?page=2 otomatis
$artikel = Artikel::published()
    ->latest()
    ->paginate(10);

// Di Blade:
// {{ $artikel->links() }}  → tombol navigasi halaman`,
      },
      {
        type: "callout",
        title: "Latihan",
        tone: "info",
        text: "Buat Model Produk dengan kolom nama, harga, stok. Latih: ambil produk dengan harga > 10000, update stok jadi 0, dan tampilkan 5 produk termahal. Pakai tinker untuk uji cepat.",
      },
      {
        type: "p",
        text: "Lanjut ke tutorial CRUD untuk menggabungkan semuanya: route + controller + model + blade jadi aplikasi nyata.",
      },
    ],
  }
