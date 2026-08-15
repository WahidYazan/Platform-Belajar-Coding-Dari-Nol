import type { Tutorial } from "../types"

export const laravelProject: Tutorial = {
    slug: "laravel-project",
    title: "Project Akhir: Aplikasi Catatan Lengkap",
    description:
      "Gabungkan semua materi: bangun aplikasi catatan dengan auth, CRUD, relasi user, validasi, dan halaman yang aman.",
    category: "Laravel",
    level: "Lanjutan",
    minutes: 24,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Waktunya membangun aplikasi utuh. Kita buat 'CatatanKu' — aplikasi catatan pribadi di mana user bisa login, membuat/mengubah/menghapus catatan, dan setiap user hanya melihat catatannya sendiri. Ini menguji semua yang sudah dipelajari.",
      },
      { type: "h2", text: "Spesifikasi aplikasi" },
      {
        type: "list",
        items: [
          "Register & login (Breeze + middleware auth).",
          "CRUD catatan yang hanya bisa diakses pemiliknya.",
          "Relasi User hasMany Catatan.",
          "Validasi input dan flash message.",
          "Tampilan rapi dengan Blade + layout komponen.",
        ],
      },
      { type: "h2", text: "1. Setup & model" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `composer create-project laravel/laravel catatanku
cd catatanku

composer require laravel/breeze --dev
php artisan breeze:install blade
npm install && npm run dev

php artisan make:model Catatan -m
php artisan make:controller CatatanController --resource`,
      },
      {
        type: "code",
        lang: "php",
        filename: "database/migrations/xxxx_create_catatans_table.php",
        code: `public function up(): void
{
    Schema::create('catatans', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')
            ->constrained()
            ->cascadeOnDelete();
        $table->string('judul');
        $table->text('isi');
        $table->string('warna')->default('kuning');
        $table->timestamps();
    });
}`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Models/Catatan.php",
        code: `class Catatan extends Model
{
    protected $fillable = ['judul', 'isi', 'warna'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeMilikUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }
}`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Models/User.php",
        code: `public function catatans()
{
    return $this->hasMany(Catatan::class);
}`,
      },
      { type: "h2", text: "2. Route — semua butuh login" },
      {
        type: "code",
        lang: "php",
        filename: "routes/web.php",
        code: `use App\\Http\\Controllers\\CatatanController;

Route::middleware('auth')->group(function () {
    Route::get('/catatan', [CatatanController::class, 'index'])
        ->name('catatan.index');
    Route::get('/catatan/create', [CatatanController::class, 'create'])
        ->name('catatan.create');
    Route::post('/catatan', [CatatanController::class, 'store'])
        ->name('catatan.store');
    Route::get('/catatan/{catatan}', [CatatanController::class, 'show'])
        ->name('catatan.show');
    Route::get('/catatan/{catatan}/edit', [CatatanController::class, 'edit'])
        ->name('catatan.edit');
    Route::put('/catatan/{catatan}', [CatatanController::class, 'update'])
        ->name('catatan.update');
    Route::delete('/catatan/{catatan}', [CatatanController::class, 'destroy'])
        ->name('catatan.destroy');
});`,
      },
      { type: "h2", text: "3. Controller dengan otorisasi" },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/CatatanController.php",
        code: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Catatan;
use Illuminate\\Http\\Request;

class CatatanController extends Controller
{
    public function index()
    {
        $catatan = Catatan::milikUser(auth()->id())
            ->latest()
            ->paginate(12);

        return view('catatan.index', compact('catatan'));
    }

    public function create()
    {
        return view('catatan.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => ['required', 'string', 'max:100'],
            'isi'   => ['required', 'string', 'min:10'],
            'warna' => ['required', 'in:kuning,hijau,biru,merah'],
        ]);

        auth()->user()->catatans()->create($validated);

        return redirect()->route('catatan.index')
            ->with('sukses', 'Catatan berhasil dibuat');
    }

    public function show(Catatan $catatan)
    {
        $this->pastikanPemilik($catatan);
        return view('catatan.show', compact('catatan'));
    }

    public function edit(Catatan $catatan)
    {
        $this->pastikanPemilik($catatan);
        return view('catatan.edit', compact('catatan'));
    }

    public function update(Request $request, Catatan $catatan)
    {
        $this->pastikanPemilik($catatan);

        $validated = $request->validate([
            'judul' => ['required', 'string', 'max:100'],
            'isi'   => ['required', 'string', 'min:10'],
            'warna' => ['required', 'in:kuning,hijau,biru,merah'],
        ]);

        $catatan->update($validated);

        return redirect()->route('catatan.index')
            ->with('sukses', 'Catatan diperbarui');
    }

    public function destroy(Catatan $catatan)
    {
        $this->pastikanPemilik($catatan);
        $catatan->delete();

        return redirect()->route('catatan.index')
            ->with('sukses', 'Catatan dihapus');
    }

    // Proteksi: hanya pemilik yang boleh akses
    private function pastikanPemilik(Catatan $catatan): void
    {
        abort_if($catatan->user_id !== auth()->id(), 403);
    }
}`,
      },
      {
        type: "callout",
        title: "Kenapa butuh otorisasi sendiri?",
        tone: "warning",
        text: "Middleware auth hanya memastikan user login. Tapi user A bisa membuka /catatan/5 milik user B. Metode pastikanPemilik() (atau policy) inilah yang memastikan data hanya bisa diakses pemiliknya.",
      },
      { type: "h2", text: "4. View index" },
      {
        type: "code",
        lang: "php",
        filename: "resources/views/catatan/index.blade.php",
        code: `@extends('layouts.app')

@section('title', 'Catatanku')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h1>Catatanku</h1>
    <a href="{{ route('catatan.create') }}" class="btn btn-primary">+ Catatan Baru</a>
  </div>

  @forelse ($catatan as $item)
    <div class="card note note-{{ $item->warna }} mb-3">
      <div class="card-body">
        <h5 class="card-title">
          <a href="{{ route('catatan.show', $item) }}">{{ $item->judul }}</a>
        </h5>
        <p class="card-text">{{ Str::limit($item->isi, 100) }}</p>
        <small class="text-muted">{{ $item->created_at->diffForHumans() }}</small>
      </div>
    </div>
  @empty
    <p>Belum ada catatan. Buat catatan pertamamu!</p>
  @endforelse

  {{ $catatan->links() }}
@endsection`,
      },
      { type: "h2", text: "5. View create (dengan validasi + old)" },
      {
        type: "code",
        lang: "php",
        filename: "resources/views/catatan/create.blade.php",
        code: `@extends('layouts.app')

@section('title', 'Catatan Baru')

@section('content')
  <h1>Catatan Baru</h1>

  <form action="{{ route('catatan.store') }}" method="POST">
    @csrf

    <div class="mb-3">
      <label for="judul" class="form-label">Judul</label>
      <input type="text" name="judul" id="judul"
             value="{{ old('judul') }}"
             class="form-control @error('judul') is-invalid @enderror">
      @error('judul')
        <div class="invalid-feedback">{{ $message }}</div>
      @enderror
    </div>

    <div class="mb-3">
      <label for="isi" class="form-label">Isi</label>
      <textarea name="isi" id="isi" rows="6"
                class="form-control @error('isi') is-invalid @enderror">{{ old('isi') }}</textarea>
      @error('isi')
        <div class="invalid-feedback">{{ $message }}</div>
      @enderror
    </div>

    <div class="mb-3">
      <label class="form-label">Warna</label>
      @foreach (['kuning', 'hijau', 'biru', 'merah'] as $warna)
        <div class="form-check">
          <input class="form-check-input" type="radio" name="warna"
                 value="{{ $warna }}" id="warna-{{ $warna }}"
                 @checked(old('warna', 'kuning') === $warna)>
          <label class="form-check-label" for="warna-{{ $warna }}">
            {{ ucfirst($warna) }}
          </label>
        </div>
      @endforeach
    </div>

    <button type="submit" class="btn btn-primary">Simpan</button>
  </form>
@endsection`,
      },
      { type: "h2", text: "6. View show & edit" },
      {
        type: "code",
        lang: "php",
        filename: "resources/views/catatan/show.blade.php",
        code: `@extends('layouts.app')

@section('title', $catatan->judul)

@section('content')
  <div class="card note note-{{ $catatan->warna }}">
    <div class="card-body">
      <h1>{{ $catatan->judul }}</h1>
      <p class="text-muted">
        Dibuat {{ $catatan->created_at->format('d M Y H:i') }}
      </p>
      <p>{!! nl2br(e($catatan->isi)) !!}</p>

      <a href="{{ route('catatan.edit', $catatan) }}"
         class="btn btn-warning">Edit</a>

      <form action="{{ route('catatan.destroy', $catatan) }}" method="POST"
            class="d-inline">
        @csrf
        @method('delete')
        <button type="submit" class="btn btn-danger"
                onclick="return confirm('Hapus catatan ini?')">Hapus</button>
      </form>
    </div>
  </div>
@endsection`,
      },
      { type: "h2", text: "7. Coba & verifikasi" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan migrate --seed
php artisan serve

# Register user, buat catatan, edit, hapus.
# Login sebagai user lain — pastikan tidak bisa
# membuka catatan user pertama (harus 403).`,
      },
      {
        type: "callout",
        title: "Langkah berikutnya",
        tone: "tip",
        text: "Aplikasi pertamamu selesai! Perluas: tambah tag many-to-many, pencarian dengan scope, upload gambar, lalu deploy ke server (deploy-vercel untuk frontend / platform VPS untuk Laravel).",
      },
      {
        type: "p",
        text: "Kamu sudah menyelesaikan seluruh kurikulum Laravel: dasar, routing, Blade, controller, database, Eloquent, CRUD, validasi, auth, relasi, API, dan project akhir. Terus bangun project untuk mengasah skill!",
      },
    ],
  }
