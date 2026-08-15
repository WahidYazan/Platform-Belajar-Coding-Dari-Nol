import type { Tutorial } from "../types"

export const laravelBlade: Tutorial = {
    slug: "laravel-blade",
    title: "Blade Templating: Layout & Komponen Tampilan",
    description:
      "Gunakan template engine Blade untuk membuat layout yang rapi, menampilkan data, dan menulis kondisional dengan elegan.",
    category: "Laravel",
    level: "Pemula",
    minutes: 15,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Blade adalah template engine bawaan Laravel. File Blade berakhiran .blade.php dan berada di resources/views/. Blade membuat penulisan tampilan PHP menjadi singkat dan aman dari XSS.",
      },
      { type: "h2", text: "Menampilkan data: {{ }}" },
      {
        type: "p",
        text: "Kurung kurawal ganda menampilkan variabel dan otomatis meng-escape output (mencegah serangan XSS):",
      },
      {
        type: "code",
        lang: "php",
        filename: "resources/views/welcome.blade.php",
        code: `<h1>Halo, {{ $nama }}!</h1>
<p>Umur: {{ $umur }}</p>

{{-- Ini komentar Blade — tidak dikirim ke HTML --}}

{{-- Fungsi PHP juga bisa dipakai --}}
<p>Sekarang: {{ now()->format('d-m-Y') }}</p>`,
      },
      {
        type: "code",
        lang: "php",
        filename: "routes/web.php",
        code: `Route::get('/', function () {
    return view('welcome', [
        'nama' => 'Budi',
        'umur' => 21,
    ]);
});`,
      },
      { type: "h2", text: "Direktif kondisional: @if, @unless, @for" },
      {
        type: "code",
        lang: "php",
        filename: "resources/views/welcome.blade.php",
        code: `@if ($umur >= 17)
  <p>Kamu sudah dewasa.</p>
@elseif ($umur >= 13)
  <p>Kamu remaja.</p>
@else
  <p>Kamu masih anak-anak.</p>
@endif

@unless ($loggedIn)
  <p>Silakan login dulu.</p>
@endunless

@for ($i = 0; $i < 3; $i++)
  <span>Iterasi {{ $i }}</span>
@endfor

@foreach ($hobi as $item)
  <li>{{ $item }}</li>
@endforeach`,
      },
      { type: "h2", text: "Layout dengan @extends & @section" },
      {
        type: "p",
        text: "Buat layout utama sekali, lalu setiap halaman cukup mengisi bagian yang berbeda. Ini menghindari duplikasi header/nav/footer.",
      },
      {
        type: "code",
        lang: "php",
        filename: "resources/views/layouts/app.blade.php",
        code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>@yield('title', 'Aplikasi')</title>
  <link rel="stylesheet" href="/css/app.css">
</head>
<body>
  <header>
    <nav>
      <a href="/">Beranda</a>
      <a href="/artikel">Artikel</a>
    </nav>
  </header>

  <main>
    @yield('content')
  </main>

  <footer>© {{ date('Y') }} Sinau Coding</footer>
</body>
</html>`,
      },
      {
        type: "code",
        lang: "php",
        filename: "resources/views/artikel.blade.php",
        code: `@extends('layouts.app')

@section('title', 'Daftar Artikel')

@section('content')
  <h1>Semua Artikel</h1>
  <p>Ini daftar artikel.</p>
@endsection`,
      },
      { type: "h2", text: "Komponen & slot" },
      {
        type: "p",
        text: "Cara modern yang direkomendasikan adalah komponen dengan <x-nama> dan slot:",
      },
      {
        type: "code",
        lang: "php",
        filename: "resources/views/components/kartu.blade.php",
        code: `<div class="kartu">
  <h3 class="kartu-judul">{{ $judul }}</h3>
  <div class="kartu-isi">
    {{ $slot }}
  </div>
</div>`,
      },
      {
        type: "code",
        lang: "php",
        filename: "resources/views/home.blade.php",
        code: `<x-kartu judul="Profil">
  <p>Ini isi kartu yang diisi lewat slot.</p>
</x-kartu>`,
      },
      { type: "h2", text: "Blade & routing" },
      {
        type: "code",
        lang: "php",
        filename: "resources/views/home.blade.php",
        code: `{{-- Named route --}}
<a href="{{ route('artikel.show', ['slug' => 'blade-layout']) }}">Baca</a>

{{-- Halaman aktif berdasarkan URL sekarang --}}
<a href="/artikel"
   class="@if (request()->is('artikel*')) aktif @endif">
  Artikel
</a>`,
      },
      {
        type: "callout",
        title: "Hati-hati XSS",
        tone: "warning",
        text: "Gunakan {!! $html !!} HANYA jika kamu yakin datanya aman (misalnya konten dari admin terpercaya). Data dari user harus selalu ditampilkan dengan {{ $data }} agar di-escape.",
      },
      {
        type: "p",
        text: "Selanjutnya kita akan memindahkan logika dari route ke Controller — pola MVC yang benar. Lanjut ke tutorial Controller.",
      },
    ],
  }
