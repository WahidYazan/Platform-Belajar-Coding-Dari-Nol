import type { Tutorial } from "../types"

export const laravelAuth: Tutorial = {
    slug: "laravel-auth",
    title: "Autentikasi & Middleware: Login, Register & Proteksi",
    description:
      "Tambahkan sistem login dan register, cek user yang login, dan lindungi route dengan middleware.",
    category: "Laravel",
    level: "Menengah",
    minutes: 18,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "Sebagian besar aplikasi butuh pengguna yang bisa daftar dan login. Laravel menyediakan semua yang dibutuhkan hash password, session, dan middleware sehingga kamu fokus pada logika aplikasi, bukan mengulang mekanisme auth.",
      },
      { type: "h2", text: "Siapkan auth dengan Breeze" },
      {
        type: "p",
        text: "Cara resmi dan paling mudah: install starter kit Breeze yang membuat halaman login, register, dan lupa password lengkap dengan styling:",
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `composer require laravel/breeze --dev

php artisan breeze:install blade

php artisan migrate

npm install && npm run dev`,
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `# Route auth yang dibuat otomatis
php artisan route:list

# Login → GET/POST /login
# Register → GET/POST /register
# Logout → POST /logout
# Dashboard → GET /dashboard (terproteksi)`,
      },
      { type: "h2", text: "Proteksi route dengan middleware" },
      {
        type: "p",
        text: "Middleware adalah 'penjaga pintu' yang memeriksa request sebelum masuk ke controller. Middleware auth memastikan hanya user yang login yang bisa mengakses:",
      },
      {
        type: "code",
        lang: "php",
        filename: "routes/web.php",
        code: `// Proteksi satu route
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware('auth');

// Proteksi group route (termasuk semua metode CRUD)
Route::middleware('auth')->group(function () {
    Route::resource('artikel', ArtikelController::class);
});

// Harus GUEST (belum login) untuk halaman login/register
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'index']);
});`,
      },
      { type: "h2", text: "Mengakses user yang login" },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/ArtikelController.php",
        code: `use Illuminate\\Support\\Facades\\Auth;

// Cara 1: facade Auth
$user = Auth::user();              // User|null
Auth::id();                        // id atau null
Auth::check();                     // true/false

// Cara 2: helper auth()
$user = auth()->user();
$id   = auth()->id();

// Di Blade:
// @auth Logged in as {{ Auth::user()->name }} @endauth
// @guest Silakan login @endguest`,
      },
      { type: "h2", text: "Login & register manual (tanpa Breeze)" },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/AuthController.php",
        code: `use App\\Models\\User;
use Illuminate\\Support\\Facades\\Hash;
use Illuminate\\Support\\Facades\\Auth;

public function store(Request $request)
{
    $validated = $request->validate([
        'name'     => ['required', 'string', 'max:255'],
        'email'    => ['required', 'email', 'unique:users,email'],
        'password' => ['required', 'string', 'min:8', 'confirmed'],
    ]);

    $user = User::create([
        'name'     => $validated['name'],
        'email'    => $validated['email'],
        'password' => Hash::make($validated['password']),
    ]);

    Auth::login($user);
    return redirect()->route('dashboard');
}

public function login(Request $request)
{
    $credentials = $request->validate([
        'email'    => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        return redirect()->intended('/dashboard');
    }

    return back()->withErrors([
        'email' => 'Email atau password salah.',
    ])->onlyInput('email');
}

public function logout(Request $request)
{
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/');
}`,
      },
      {
        type: "callout",
        title: "Jangan simpan password mentah",
        tone: "warning",
        text: "Selalu hash password dengan Hash::make() jangan pernah simpan password sebagai teks biasa. Password ter-hash bersifat satu arah: tidak bisa dibalik jadi teks asli.",
      },
      { type: "h2", text: "Membuat middleware kustom" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan make:middleware CheckAdmin`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Middleware/CheckAdmin.php",
        code: `<?php

namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Auth;
use Symfony\\Component\\HttpFoundation\\Response;

class CheckAdmin
{
    public function handle(
        Request $request,
        Closure $next
    ): Response {
        if (Auth::user()?->role !== 'admin') {
            abort(403);
        }

        return $next($request);
    }
}`,
      },
      {
        type: "code",
        lang: "php",
        filename: "routes/web.php",
        code: `// Alias middleware (bootstrap/app.php)
// ->withMiddleware(function (Middleware $middleware) {
//     $middleware->alias(['admin' => \\App\\Http\\Middleware\\CheckAdmin::class]);
// })

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index']);
});`,
      },
      {
        type: "callout",
        title: "Latihan",
        tone: "info",
        text: "Tambahkan kolom role ke tabel users (migration). Buat halaman admin yang hanya bisa diakses user ber-role admin, dan halaman biasa untuk semua user yang login.",
      },
      {
        type: "p",
        text: "Lanjut ke tutorial Relasi Database untuk menghubungkan tabel (user punya banyak artikel) dan menampilkan data terhubung.",
      },
    ],
  }
