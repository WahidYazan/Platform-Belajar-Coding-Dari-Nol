import type { Tutorial } from "../types"

export const laravelDatabase: Tutorial = {
    slug: "laravel-database",
    title: "Database & Migration: Struktur Data yang Aman",
    description:
      "Atur tabel database dengan migration, isi data dengan seeder, dan kenali Eloquent Model untuk query yang elegan.",
    category: "Laravel",
    level: "Menengah",
    minutes: 16,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Aplikasi nyata butuh database. Laravel menyediakan migration (skema tabel versi), seeder (data awal), dan Eloquent (query builder berorientasi objek). Fokus kita: SQLite untuk latihan lokal agar tanpa setup ekstra.",
      },
      { type: "h2", text: "Mengatur koneksi database" },
      {
        type: "code",
        lang: "php",
        filename: ".env",
        code: `# SQLite (paling simpel untuk latihan)
DB_CONNECTION=sqlite
# Hapus baris DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD

# Lalu buat file kosong:
# touch database/database.sqlite`,
      },
      {
        type: "code",
        lang: "php",
        filename: ".env",
        code: `# MySQL (untuk proyek nyata)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database
DB_USERNAME=root
DB_PASSWORD=`,
      },
      { type: "h2", text: "Apa itu migration?" },
      {
        type: "p",
        text: "Migration adalah file yang mendeskripsikan struktur tabel. Karena disimpan di repository, seluruh tim (dan server produksi) bisa punya struktur database yang sama persis seperti Git untuk database.",
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan make:migration create_artikel_table

# Jalankan semua migration
php artisan migrate

# Lihat status
php artisan migrate:status

# Rollback migration terakhir
php artisan migrate:rollback`,
      },
      {
        type: "code",
        lang: "php",
        filename: "database/migrations/xxxx_create_artikel_table.php",
        code: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('artikel', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->text('konten');
            $table->string('penulis')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('artikel');
    }
};`,
      },
      { type: "h2", text: "Tipe kolom yang sering dipakai" },
      {
        type: "code",
        lang: "php",
        filename: "database/migrations/xxxx_create_artikel_table.php",
        code: `$table->id();                 // primary key auto-increment
$table->string('judul');       // VARCHAR
$table->text('konten');        // TEXT (panjang)
$table->boolean('published');  // true/false
$table->integer('views');      // angka
$table->decimal('harga', 10, 2); // angka desimal
$table->date('tanggal');       // tanggal
$table->unsignedBigInteger('user_id'); // foreign key
$table->foreign('user_id')->references('id')->on('users');
$table->timestamps();          // created_at + updated_at`,
      },
      { type: "h2", text: "Seeder: mengisi data awal" },
      {
        type: "p",
        text: "Seeder mengisi database dengan data contoh sangat berguna untuk pengembangan dan testing:",
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan make:seeder ArtikelSeeder
php artisan db:seed                  # jalankan semua seeder
php artisan db:seed --class=ArtikelSeeder`,
      },
      {
        type: "code",
        lang: "php",
        filename: "database/seeders/ArtikelSeeder.php",
        code: `<?php

namespace Database\\Seeders;

use App\\Models\\Artikel;
use Illuminate\\Database\\Seeder;

class ArtikelSeeder extends Seeder
{
    public function run(): void
    {
        Artikel::create([
            'judul'   => 'Cara Instal Laravel',
            'konten'  => 'Panduan lengkap instalasi...',
            'penulis' => 'Budi',
        ]);
    }
}`,
      },
      {
        type: "callout",
        title: "Sequelize?",
        tone: "info",
        text: "Catatan: Istilah 'seeder' di Laravel mirip konsep 'seed' di bahasa lain mengisi data awal. Jangan tertukar dengan ORM seperti Sequelize (JavaScript).",
      },
      { type: "h2", text: "Tinker: uji coba database" },
      {
        type: "p",
        text: "php artisan tinker membuka REPL untuk menguji query langsung:",
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan tinker

> App\\Models\\Artikel::all();
> App\\Models\\Artikel::count();
> App\\Models\\Artikel::where('penulis', 'Budi')->get();
> exit`,
      },
      {
        type: "p",
        text: "Lanjut ke tutorial Eloquent untuk mendalami Model dan query-query yang lebih kuat.",
      },
    ],
  }
