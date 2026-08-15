import type { Tutorial } from "../types"

export const laravelApi: Tutorial = {
    slug: "laravel-api",
    title: "Membangun REST API dengan Laravel",
    description:
      "Buat REST API dengan route api.php, API Resource, pagination, dan autentikasi token dengan Laravel Sanctum.",
    category: "Laravel",
    level: "Lanjutan",
    minutes: 19,
    date: "2026-08-15",
    content: [
      {
        type: "p",
        text: "API (Application Programming Interface) memungkinkan aplikasi lain — mobile app, SPA, atau layanan pihak ketiga — memakai data aplikasimu. Alih-alih mengembalikan HTML, API mengembalikan JSON.",
      },
      { type: "h2", text: "Route API" },
      {
        type: "code",
        lang: "php",
        filename: "routes/api.php",
        code: `use App\\Http\\Controllers\\Api\\ArtikelController;

// Semua route api otomatis diberi prefix /api
// GET  /api/artikel
// POST /api/artikel
// GET  /api/artikel/{artikel}
// ...
Route::apiResource('artikel', ArtikelController::class);`,
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan route:list --path=api`,
      },
      {
        type: "callout",
        title: "apiResource vs resource",
        tone: "tip",
        text: "apiResource hanya membuat route untuk API (tanpa create/edit yang menampilkan form HTML). Untuk API murni, ini pilihan yang tepat.",
      },
      { type: "h2", text: "Controller API" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan make:controller Api/ArtikelController --resource`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/Api/ArtikelController.php",
        code: `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Artikel;
use App\\Http\\Resources\\ArtikelResource;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;

class ArtikelController extends Controller
{
    public function index(): JsonResponse
    {
        return ArtikelResource::collection(
            Artikel::with('user')->paginate(10)
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'judul'  => ['required', 'string', 'max:255'],
            'konten' => ['required', 'string'],
        ]);

        $artikel = Artikel::create($validated);

        return (new ArtikelResource($artikel))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Artikel $artikel): ArtikelResource
    {
        return new ArtikelResource($artikel->load('user'));
    }

    public function update(Request $request, Artikel $artikel): ArtikelResource
    {
        $validated = $request->validate([
            'judul'  => ['sometimes', 'string', 'max:255'],
            'konten' => ['sometimes', 'string'],
        ]);

        $artikel->update($validated);

        return new ArtikelResource($artikel);
    }

    public function destroy(Artikel $artikel): JsonResponse
    {
        $artikel->delete();

        return response()->json(['message' => 'Artikel dihapus']);
    }
}`,
      },
      { type: "h2", text: "API Resource: bentuk respons yang rapi" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `php artisan make:resource ArtikelResource`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Resources/ArtikelResource.php",
        code: `<?php

namespace App\\Http\\Resources;

use Illuminate\\Http\\Request;
use Illuminate\\Http\\Resources\\Json\\JsonResource;

class ArtikelResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'judul'     => $this->judul,
            'konten'    => $this->konten,
            'penulis'   => $this->whenLoaded('user', fn () => [
                'id'   => $this->user->id,
                'name' => $this->user->name,
            ]),
            'created_at' => $this->created_at->toISOString(),
        ];
    }
}`,
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `curl http://localhost:8000/api/artikel

// Response:
// {
//   "data": [
//     {
//       "id": 1,
//       "judul": "Cara Instal Laravel",
//       "konten": "Panduan lengkap...",
//       "penulis": { "id": 1, "name": "Budi" },
//       "created_at": "2026-08-15T..."
//     }
//   ],
//   "links": { "first": "...", "last": "..." },
//   "meta": { "current_page": 1, ... }
// }`,
      },
      { type: "h2", text: "Autentikasi API dengan Sanctum" },
      {
        type: "p",
        text: "Sanctum memberikan token API untuk aplikasi yang tidak pakai session browser (mobile app, SPA):",
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `composer require laravel/sanctum

php artisan install:api

php artisan migrate`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Models/User.php",
        code: `use Laravel\\Sanctum\\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
}`,
      },
      {
        type: "code",
        lang: "php",
        filename: "app/Http/Controllers/Api/AuthController.php",
        code: `use App\\Models\\User;
use Illuminate\\Support\\Facades\\Hash;

public function login(Request $request)
{
    $credentials = $request->validate([
        'email'    => ['required', 'email'],
        'password' => ['required'],
    ]);

    $user = User::where('email', $credentials['email'])->first();

    if (!$user || !Hash::check($credentials['password'], $user->password)) {
        return response()->json([
            'message' => 'Email atau password salah.',
        ], 401);
    }

    $token = $user->createToken('mobile')->plainTextToken;

    return response()->json([
        'user'  => $user,
        'token' => $token,
    ]);
}`,
      },
      {
        type: "code",
        lang: "php",
        filename: "routes/api.php",
        code: `use App\\Http\\Controllers\\Api\\AuthController;

Route::post('/login', [AuthController::class, 'login']);

// Route di bawah butuh token
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('artikel', ArtikelController::class);
});`,
      },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `# Cara memakai token:
# Authorization: Bearer <token>

curl -H "Authorization: Bearer 3|abc123..." \\
     http://localhost:8000/api/user`,
      },
      {
        type: "callout",
        title: "HTTP status code",
        tone: "info",
        text: "Gunakan kode status yang tepat: 200 sukses, 201 data dibuat, 400 input salah, 401 belum login, 403 tidak punya akses, 404 tidak ditemukan, 422 validasi gagal.",
      },
      {
        type: "p",
        text: "Lanjut ke tutorial Project Akhir untuk membangun aplikasi lengkap yang menggabungkan semua konsep di atas.",
      },
    ],
  }
