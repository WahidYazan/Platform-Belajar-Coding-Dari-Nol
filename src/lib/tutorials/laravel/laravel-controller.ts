import type { Tutorial } from "../types"

export const laravelController: Tutorial = {
    slug: "laravel-controller",
    title: "Controller: Logika Aplikasi di Tempat yang Tepat",
    description:
      "Pahami pola MVC di Laravel: buat controller, kelola request & response, dan pisahkan logika dari route dan view.",
    category: "Laravel",
    level: "Pemula",
    minutes: 14,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Controller adalah lapisan 'otak' aplikasi: menerima request, memproses data (biasanya lewat Model), lalu mengembalikan response (biasanya view). Ini pola MVC yang membuat kode terstruktur.",
      },
      { type: "h2", text: "Membuat controller" },
      {
        type: "p",
        text: "Gunakan Artisan untuk membuat controller ia akan ditempatkan di app/Http/Controllers/:",
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan make:controller ArtikelController

# Berhasil: app/Http/Controllers/ArtikelController.php`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;

class ArtikelController extends Controller
{
    public function index()
    {
        return view('artikel.index');
    }
}`,
      },
      { type: "h2", text: "Menghubungkan route dengan controller" },
      {
        type: "code",
        lang: "php",
        filename: "routes/web.php",
        code: `use App\\Http\\Controllers\\ArtikelController;

Route::get('/artikel', [ArtikelController::class, 'index']);
Route::get('/artikel/{slug}', [ArtikelController::class, 'show']);`,
      },
      {
        type: "p",
        text: "Route pertama menangani GET /artikel dan memanggil metode index(). Route kedua menangkap {slug} dan meneruskannya ke metode show().",
      },
      { type: "h2", text: "Metode controller yang umum" },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `class ArtikelController extends Controller
{
    public function index() {}     // Daftar semua
    public function create() {}    // Form tambah baru
    public function store() {}     // Simpan data dari form
    public function show($id) {}   // Detail satu data
    public function edit($id) {}   // Form ubah
    public function update($id) {} // Simpan perubahan
    public function destroy($id) {}// Hapus data
}`,
      },
      {
        type: "callout",
        title: "Resource controller",
        tone: "tip",
        text: "Tujuh metode di atas adalah CRUD standar. Generate sekaligus dengan php artisan make:controller ArtikelController --resource, lalu daftarkan dengan Route::resource('artikel', ArtikelController::class) semua route CRUD dibuat otomatis.",
      },
      { type: "h2", text: "Request & input" },
      {
        type: "p",
        text: "Laravel menyuntikkan objek Request ke parameter metode kamu bisa membaca data yang dikirim user:",
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `public function store(Request $request)
{
    $judul  = $request->input('judul');
    $konten = $request->input('konten');

    // $request->all()        // semua input
    // $request->only(['a','b']) // hanya field tertentu
    // $request->has('gambar')   // cek field ada

    // Simpan data...
    return redirect()->route('artikel.index')
        ->with('sukses', 'Artikel berhasil dibuat!');
}

public function show(Request $request, string $id)
{
    // Request + parameter URL
    $tag = $request->query('tag');
    return "ID: {$id}, Tag: {$tag}";
}`,
      },
      { type: "h2", text: "Response" },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\RedirectResponse;

public function json(): JsonResponse
{
    return response()->json(['pesan' => 'Halo dari API']);
}

public function pindah(): RedirectResponse
{
    return redirect('/artikel');                    // redirect URL
    // return redirect()->route('artikel.show', ['id' => 5]); // named route
    // return redirect()->back();                   // kembali ke halaman asal
}

public function teks(): string
{
    return 'Response string biasa';
}`,
      },
      { type: "h2", text: "Passing data ke view" },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `use App\\Models\\Artikel;

public function index()
{
    $artikel = Artikel::all();

    // Tiga cara yang sama hasilnya:
    return view('artikel.index', ['artikel' => $artikel]);
    // return view('artikel.index')->with('artikel', $artikel);
    // return view('artikel.index', compact('artikel'));
}`,
      },
      {
        type: "callout",
        title: "Satu controller = satu resource",
        tone: "info",
        text: "Jangan buat satu controller untuk semua hal. Aturan praktis: satu controller mengelola satu jenis data (Artikel, User, Produk). Controller yang kecil dan fokus lebih mudah dirawat dan di-test.",
      },
      {
        type: "p",
        text: "Sekarang kamu sudah bisa membuat route, view, dan controller. Lanjut ke tutorial Database & Migration untuk menyimpan data sungguhan.",
      },
    ],
  }
