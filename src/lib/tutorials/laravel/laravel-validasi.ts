import type { Tutorial } from "../types"

export const laravelValidasi: Tutorial = {
    slug: "laravel-validasi",
    title: "Form & Validasi: Terima Data yang Aman",
    description:
      "Validasi input di server, tampilkan pesan error di Blade, simpan nilai lama, dan gunakan Form Request untuk aturan yang rapi.",
    category: "Laravel",
    level: "Menengah",
    minutes: 16,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Jangan pernah percaya input user. Validasi di sisi server adalah garis pertahanan utama validasi browser (required, type=email) bisa dilewati siapa saja. Laravel menyediakan validasi yang ringkas dan aman.",
      },
      { type: "h2", text: "Validasi di controller" },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `public function store(Request $request)
{
    $validated = $request->validate([
        'judul'   => ['required', 'string', 'max:255'],
        'konten'  => ['required', 'string', 'min:50'],
        'penulis' => ['nullable', 'string', 'max:100'],
        'email'   => ['required', 'email'],
    ]);

    Artikel::create($validated);

    return redirect()->route('artikel.index')
        ->with('sukses', 'Artikel berhasil dibuat');
}`,
      },
      {
        type: "p",
        text: "Jika validasi gagal, Laravel otomatis melempar error, kembali ke halaman form, dan mengirim pesan error tanpa perlu menulis satu baris if.",
      },
      { type: "h2", text: "Aturan validasi yang sering dipakai" },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `$request->validate([
    'nama'      => 'required|string|max:255',
    'email'     => 'required|email|unique:users,email',
    'password'  => 'required|string|min:8|confirmed',
    'umur'      => 'required|integer|min:17|max:100',
    'foto'      => 'required|image|mimes:jpg,png|max:2048',
    'tanggal'   => 'required|date|after:today',
    'kategori'  => 'required|exists:kategoris,id',
]);`,
      },
      { type: "h2", text: "Tampilkan error di Blade" },
      {
        type: "code",
        lang: "php",
        filename: "resources/views/artikel/create.blade.php",
        code: `<form action="{{ route('artikel.store') }}" method="POST">
  @csrf

  <div>
    <label>Judul</label>
    <input type="text" name="judul" value="{{ old('judul') }}">
    @error('judul')
      <p class="error">{{ $message }}</p>
    @enderror
  </div>

  <div>
    <label>Konten</label>
    <textarea name="konten" rows="6">{{ old('konten') }}</textarea>
    @error('konten')
      <p class="error">{{ $message }}</p>
    @enderror
  </div>

  <button type="submit">Simpan</button>
</form>`,
      },
      {
        type: "list",
        items: [
          "old('judul') nilai yang sudah diketik tetap muncul setelah validasi gagal.",
          "@error('judul') blok hanya tampil jika field itu error.",
          "$message pesan error default dari Laravel (bisa dikustom).",
        ],
      },
      { type: "h2", text: "Form Request: aturan yang rapi" },
      {
        type: "p",
        text: "Jika aturan validasi makin banyak, pindahkan ke class tersendiri bernama Form Request:",
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan make:request StoreArtikelRequest`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Requests/StoreArtikelRequest.php",
        code: `<?php

namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;

class StoreArtikelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // false = blokir request
    }

    public function rules(): array
    {
        return [
            'judul'   => ['required', 'string', 'max:255'],
            'konten'  => ['required', 'string', 'min:50'],
            'penulis' => ['nullable', 'string', 'max:100'],
        ];
    }

    public function messages(): array
    {
        return [
            'judul.required'  => 'Judul wajib diisi.',
            'konten.min'      => 'Konten minimal :min karakter.',
        ];
    }
}`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `use App\\Http\\Requests\\StoreArtikelRequest;

// Dari Request biasa → StoreArtikelRequest
public function store(StoreArtikelRequest $request)
{
    $validated = $request->validated();
    Artikel::create($validated);
    // ...redirect
}`,
      },
      {
        type: "callout",
        title: "Kustomisasi pesan",
        tone: "tip",
        text: "Default pesan error berbahasa Inggris. Ubah di lang/id/validation.php (buat dengan php artisan lang:publish), atau override per-atribut lewat metode messages() di Form Request.",
      },
      { type: "h2", text: "Flash message" },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `// Satu kali pakai, lalu hilang saat refresh
return redirect()->route('artikel.index')
    ->with('sukses', 'Artikel berhasil dibuat');

// Di Blade:
// @if (session('sukses'))
//   <div class="alert alert-sukses">{{ session('sukses') }}</div>
// @endif`,
      },
      {
        type: "callout",
        title: "Latihan",
        tone: "info",
        text: "Buat form pendaftaran dengan nama, email (unique), password min 8, dan konfirmasi password. Tampilkan semua error di bawah setiap field. Uji dengan data yang salah dan benar.",
      },
      {
        type: "p",
        text: "Lanjut ke tutorial Autentikasi untuk menambahkan login, register, dan proteksi halaman dengan middleware.",
      },
    ],
  }
