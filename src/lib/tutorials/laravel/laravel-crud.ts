import type { Tutorial } from "../types"

export const laravelCrud: Tutorial = {
    slug: "laravel-crud",
    title: "CRUD Lengkap: Aplikasi Pertamamu",
    description:
      "Bangun aplikasi CRUD (Create, Read, Update, Delete) penuh untuk artikel gabungan route, controller, model, dan Blade.",
    category: "Laravel",
    level: "Menengah",
    minutes: 20,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "CRUD adalah empat operasi dasar semua aplikasi: Create, Read, Update, Delete. Tutorial ini menggabungkan semua yang sudah dipelajari menjadi satu aplikasi artikel yang berfungsi penuh.",
      },
      { type: "h2", text: "1. Siapkan Model + Migration" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan make:model Artikel -m
php artisan make:controller ArtikelController --resource`,
      },
      {
        type: "code",
        lang: "php",
        filename: "database/migrations/xxxx_create_artikels_table.php",
        code: `public function up(): void
{
    Schema::create('artikels', function (Blueprint $table) {
        $table->id();
        $table->string('judul');
        $table->text('konten');
        $table->string('penulis')->nullable();
        $table->timestamps();
    });
}`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Models/Artikel.php",
        code: `class Artikel extends Model
{
    protected $fillable = ['judul', 'konten', 'penulis'];
}`,
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan migrate`,
      },
      { type: "h2", text: "2. Daftarkan route resource" },
      {
        type: "code",
        lang: "php",
        filename: "routes/web.php",
        code: `use App\\Http\\Controllers\\ArtikelController;

Route::resource('artikel', ArtikelController::class);`,
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan route:list`,
      },
      {
        type: "p",
        text: "Satu baris itu membuat 7 route CRUD: index, create, store, show, edit, update, destroy. Cek dengan php artisan route:list.",
      },
      { type: "h2", text: "3. Controller lengkap" },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Artikel;
use Illuminate\\Http\\Request;

class ArtikelController extends Controller
{
    public function index()
    {
        $artikel = Artikel::latest()->paginate(5);
        return view('artikel.index', compact('artikel'));
    }

    public function create()
    {
        return view('artikel.create');
    }

    public function store(Request $request)
    {
        Artikel::create($request->all());
        return redirect()->route('artikel.index')
            ->with('sukses', 'Artikel berhasil dibuat');
    }

    public function show(Artikel $artikel)
    {
        return view('artikel.show', compact('artikel'));
    }

    public function edit(Artikel $artikel)
    {
        return view('artikel.edit', compact('artikel'));
    }

    public function update(Request $request, Artikel $artikel)
    {
        $artikel->update($request->all());
        return redirect()->route('artikel.index')
            ->with('sukses', 'Artikel berhasil diperbarui');
    }

    public function destroy(Artikel $artikel)
    {
        $artikel->delete();
        return redirect()->route('artikel.index')
            ->with('sukses', 'Artikel dihapus');
    }
}`,
      },
      {
        type: "callout",
        title: "Route model binding",
        tone: "tip",
        text: "Tanda Artikel $artikel di parameter membuat Laravel otomatis mencari data berdasarkan {artikel} dari URL, dan langsung menampilkan 404 jika tidak ada. Tanpa ini kamu harus menulis Artikel::findOrFail($id) manual.",
      },
      { type: "h2", text: "4. Layout" },
      {
        type: "code",
        lang: "php",
        filename: "resources/views/layouts/app.blade.php",
        code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>@yield('title')</title>
  <link rel="stylesheet" href="/css/app.css">
</head>
<body>
  <header>
    <a href="{{ route('artikel.index') }}">Beranda</a>
    <a href="{{ route('artikel.create') }}">Tulis Artikel</a>
  </header>

  @if (session('sukses'))
    <div class="alert">{{ session('sukses') }}</div>
  @endif

  <main>@yield('content')</main>
</body>
</html>`,
      },
      { type: "h2", text: "5. View index (baca daftar)" },
      {
        type: "code",
        lang: "php",
        filename: "resources/views/artikel/index.blade.php",
        code: `@extends('layouts.app')

@section('title', 'Semua Artikel')

@section('content')
  <h1>Semua Artikel</h1>

  @forelse ($artikel as $item)
    <article>
      <h2><a href="{{ route('artikel.show', $item) }}">{{ $item->judul }}</a></h2>
      <p>{{ $item->penulis }} · {{ $item->created_at->format('d M Y') }}</p>
    </article>
  @empty
    <p>Belum ada artikel.</p>
  @endforelse

  {{ $artikel->links() }}
@endsection`,
      },
      { type: "h2", text: "6. View create & edit (form)" },
      {
        type: "code",
        lang: "php",
        filename: "resources/views/artikel/create.blade.php",
        code: `@extends('layouts.app')

@section('title', 'Tulis Artikel')

@section('content')
  <h1>Tulis Artikel Baru</h1>

  <form action="{{ route('artikel.store') }}" method="POST">
    @csrf
    <div>
      <label>Judul</label>
      <input type="text" name="judul" required>
    </div>
    <div>
      <label>Konten</label>
      <textarea name="konten" rows="6" required></textarea>
    </div>
    <div>
      <label>Penulis</label>
      <input type="text" name="penulis">
    </div>
    <button type="submit">Simpan</button>
  </form>
@endsection`,
      },
      {
        type: "p",
        text: "Untuk edit, buat edit.blade.php dengan pola sama, tapi action ke {{ route('artikel.update', $artikel) }} dan method PUT (palsukan dengan @method('put')), lalu isi nilai lama di setiap input dengan value=\"{{ $artikel->judul }}\".",
      },
      { type: "h2", text: "7. View show & tombol hapus" },
      {
        type: "code",
        lang: "php",
        filename: "resources/views/artikel/show.blade.php",
        code: `@extends('layouts.app')

@section('content')
  <h1>{{ $artikel->judul }}</h1>
  <p>{{ $artikel->penulis }}</p>
  <p>{{ $artikel->konten }}</p>

  <a href="{{ route('artikel.edit', $artikel) }}">Edit</a>

  <form action="{{ route('artikel.destroy', $artikel) }}" method="POST"
        onsubmit="return confirm('Yakin hapus?')">
    @csrf
    @method('delete')
    <button type="submit">Hapus</button>
  </form>
@endsection`,
      },
      {
        type: "callout",
        title: "Kenapa @csrf wajib?",
        tone: "warning",
        text: "CSRF token mencegah serangan Cross-Site Request Forgery. Setiap form POST/PUT/DELETE di Laravel WAJIB menyertakan @csrf, jika tidak request ditolak dengan error 419.",
      },
      {
        type: "p",
        text: "Selamat, aplikasi CRUD pertamamu selesai! Lanjut ke tutorial Form & Validasi agar data yang masuk lebih aman dan terstruktur.",
      },
    ],
  }
