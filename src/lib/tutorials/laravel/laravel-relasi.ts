import type { Tutorial } from "../types"

export const laravelRelasi: Tutorial = {
    slug: "laravel-relasi",
    title: "Relasi Database & Eloquent: One-to-Many & Many-to-Many",
    description:
      "Hubungkan tabel dengan Eloquent relations: belongsTo, hasMany, belongsToMany, eager loading, dan penggunaannya di Blade.",
    category: "Laravel",
    level: "Lanjutan",
    minutes: 18,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Database relasional menyimpan data di banyak tabel yang saling terhubung: User punya banyak Artikel, Artikel punya banyak Kategori. Eloquent relations membuat relasi ini mudah dipakai seperti properti biasa.",
      },
      { type: "h2", text: "Siapkan tabel & foreign key" },
      {
        type: "code",
        lang: "php",
        filename: "database/migrations/xxxx_add_user_id_to_artikels_table.php",
        code: `public function up(): void
{
    Schema::table('artikels', function (Blueprint $table) {
        $table->foreignId('user_id')
            ->nullable()
            ->constrained()
            ->nullOnDelete();
    });
}

public function down(): void
{
    Schema::table('artikels', function (Blueprint $table) {
        $table->dropConstrainedForeignId('user_id');
    });
}`,
      },
      { type: "h2", text: "Relasi One-to-Many" },
      {
        type: "code",
        lang: "php",
        filename: "app/Models/User.php",
        code: `use Illuminate\\Database\\Eloquent\\Relations\\HasMany;

class User extends Authenticatable
{
    // Satu user punya BANYAK artikel
    public function artikels(): HasMany
    {
        return $this->hasMany(Artikel::class);
    }
}`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Models/Artikel.php",
        code: `use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;

class Artikel extends Model
{
    // Satu artikel dimiliki SATU user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}`,
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan tinker

> $user = App\\Models\\User::find(1);
> $user->artikels;          // koleksi artikel milik user 1
> $artikel = App\\Models\\Artikel::find(1);
> $artikel->user->name;     // nama user pemilik artikel`,
      },
      { type: "h2", text: "Menyimpan data dengan relasi" },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `// Simpan artikel milik user yang login
$artikel = auth()->user()->artikels()->create([
    'judul'  => 'Judul artikel',
    'konten' => 'Isi artikel...',
]);

// Cara manual (jika sudah ada user id)
Artikel::create([
    'judul'   => 'Judul',
    'konten'  => 'Isi',
    'user_id' => auth()->id(),
]);`,
      },
      { type: "h2", text: "Relasi Many-to-Many" },
      {
        type: "p",
        text: "Satu artikel bisa punya banyak kategori, dan satu kategori bisa dipakai banyak artikel. Butuh tabel pivot perantara:",
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan make:model Kategori -m
php artisan make:migration create_artikel_kategori_table`,
      },
      {
        type: "code",
        lang: "php",
        filename: "database/migrations/xxxx_create_artikel_kategori_table.php",
        code: `public function up(): void
{
    Schema::create('artikel_kategori', function (Blueprint $table) {
        $table->id();
        $table->foreignId('artikel_id')->constrained()->cascadeOnDelete();
        $table->foreignId('kategori_id')->constrained()->cascadeOnDelete();
    });
}`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Models/Artikel.php",
        code: `use Illuminate\\Database\\Eloquent\\Relations\\BelongsToMany;

public function kategoris(): BelongsToMany
{
    return $this->belongsToMany(Kategori::class);
}`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Models/Kategori.php",
        code: `use Illuminate\\Database\\Eloquent\\Relations\\BelongsToMany;

public function artikels(): BelongsToMany
{
    return $this->belongsToMany(Artikel::class);
}`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `// Lampirkan kategori ke artikel
$artikel->kategoris()->attach([1, 2]);      // tambah relasi
$artikel->kategoris()->sync([1, 2, 3]);     // samakan (hapus yang lain)
$artikel->kategoris()->detach(1);           // hapus satu relasi

// Ambil kategori milik artikel
$artikel->kategoris;                        // koleksi Kategori`,
      },
      { type: "h2", text: "Eager loading: hindari N+1 query" },
      {
        type: "p",
        text: "Tanpa eager loading, loop 100 artikel akan menjalankan 101 query (1 + 100). Eager loading menjalankan hanya 2 query:",
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `// Buruk: N+1 query
$artikel = Artikel::all();
// foreach... $artikel->user->name  ← 1 query per artikel

// Baik: eager loading
$artikel = Artikel::with(['user', 'kategoris'])->get();

// Hanya kolom tertentu
$artikel = Artikel::with('user:id,name,email')->get();

// Selalu eager load otomatis
// class Artikel extends Model {
//   protected $with = ['user'];
// }`,
      },
      { type: "h2", text: "Memakai relasi di Blade" },
      {
        type: "code",
        lang: "php",
        filename: "resources/views/artikel/index.blade.php",
        code: `@forelse ($artikel as $item)
  <article>
    <h2>{{ $item->judul }}</h2>
    <p>
      Oleh {{ $item->user->name }} ·
      @foreach ($item->kategoris as $kategori)
        <span class="tag">{{ $kategori->nama }}</span>
      @endforeach
    </p>
  </article>
@empty
  <p>Belum ada artikel.</p>
@endforelse`,
      },
      {
        type: "callout",
        title: "Latihan",
        tone: "info",
        text: "Buat relasi: User hasMany Post, Post belongsToMany Tag. Tampilkan daftar post beserta penulis dan tag dengan eager loading. Tambahkan scope untuk filter berdasarkan tag.",
      },
      {
        type: "p",
        text: "Lanjut ke tutorial API untuk membuka data aplikasimu sebagai REST API yang bisa dipakai aplikasi lain.",
      },
    ],
  }
