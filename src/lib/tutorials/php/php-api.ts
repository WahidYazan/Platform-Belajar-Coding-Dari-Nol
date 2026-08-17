import type { Tutorial } from "../types"

export const phpApi: Tutorial = {
  slug: "php-api",
  title: "PHP: REST API",
  description:
    "Pelajari cara membuat REST API dengan PHP murni: routing, JSON response, CRUD, dan autentikasi JWT.",
  category: "PHP",
  level: "Menengah",
  minutes: 25,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "REST API memungkinkan aplikasi berkomunikasi via HTTP menggunakan JSON. PHP bisa menjadi backend API yang solid untuk mobile apps, SPA, atau integrasi antar layanan.",
    },
    { type: "h2", text: "API Dasar dengan PHP" },
    {
      type: "code",
      lang: "php",
      filename: "api/index.php",
      code: `<?php
// Router sederhana untuk API
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require "../config/database.php";

$method = $_SERVER["REQUEST_METHOD"];
$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$segments = explode("/", trim($uri, "/"));

// Simple routing
$resource = $segments[1] ?? "";
$id = $segments[2] ?? null;

switch ($resource) {
    case "users":
        handleUsers($method, $id, $pdo);
        break;
    case "posts":
        handlePosts($method, $id, $pdo);
        break;
    default:
        jsonResponse(404, ["error" => "Endpoint tidak ditemukan"]);
}

function jsonResponse(int $code, mixed $data): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}
?>`,
    },
    { type: "h2", text: "CRUD API" },
    {
      type: "code",
      lang: "php",
      filename: "api/users.php",
      code: `<?php
function handleUsers(string $method, ?string $id, PDO $pdo): void {
    switch ($method) {
        case "GET":
            if ($id) {
                // GET single user
                $stmt = $pdo->prepare("SELECT id, nama, email, created_at FROM users WHERE id = ?");
                $stmt->execute([$id]);
                $user = $stmt->fetch();
                if (!$user) jsonResponse(404, ["error" => "User tidak ditemukan"]);
                jsonResponse(200, $user);
            } else {
                // GET all users (with pagination)
                $page = (int) ($_GET["page"] ?? 1);
                $limit = (int) ($_GET["limit"] ?? 10);
                $offset = ($page - 1) * $limit;

                $stmt = $pdo->prepare("SELECT id, nama, email, created_at FROM users LIMIT ? OFFSET ?");
                $stmt->execute([$limit, $offset]);
                $users = $stmt->fetchAll();

                $count = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();

                jsonResponse(200, [
                    "data" => $users,
                    "meta" => [
                        "total" => $count,
                        "page" => $page,
                        "limit" => $limit,
                        "pages" => ceil($count / $limit),
                    ]
                ]);
            }
            break;

        case "POST":
            $input = json_decode(file_get_contents("php://input"), true);

            // Validasi
            $errors = [];
            if (empty($input["nama"])) $errors["nama"] = "Wajib diisi";
            if (empty($input["email"])) $errors["email"] = "Wajib diisi";
            if (!filter_var($input["email"] ?? "", FILTER_VALIDATE_EMAIL)) {
                $errors["email"] = "Format tidak valid";
            }
            if (!empty($errors)) jsonResponse(422, ["errors" => $errors]);

            // Cek duplikat
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$input["email"]]);
            if ($stmt->fetch()) jsonResponse(409, ["error" => "Email sudah terdaftar"]);

            // Simpan
            $stmt = $pdo->prepare("INSERT INTO users (nama, email, password) VALUES (?, ?, ?)");
            $stmt->execute([
                $input["nama"],
                $input["email"],
                password_hash($input["password"] ?? "password123", PASSWORD_DEFAULT)
            ]);

            jsonResponse(201, [
                "message" => "User berhasil dibuat",
                "id" => $pdo->lastInsertId()
            ]);
            break;

        case "PUT":
            if (!$id) jsonResponse(400, ["error" => "ID diperlukan"]);
            $input = json_decode(file_get_contents("php://input"), true);

            $fields = [];
            $params = [];
            foreach (["nama", "email"] as $field) {
                if (isset($input[$field])) {
                    $fields[] = "$field = ?";
                    $params[] = $input[$field];
                }
            }
            if (empty($fields)) jsonResponse(400, ["error" => "Tidak ada data yang diupdate"]);

            $params[] = $id;
            $stmt = $pdo->prepare("UPDATE users SET " . implode(", ", $fields) . " WHERE id = ?");
            $stmt->execute($params);

            jsonResponse(200, ["message" => "User berhasil diupdate"]);
            break;

        case "DELETE":
            if (!$id) jsonResponse(400, ["error" => "ID diperlukan"]);
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$id]);
            if ($stmt->rowCount() === 0) jsonResponse(404, ["error" => "User tidak ditemukan"]);
            jsonResponse(200, ["message" => "User berhasil dihapus"]);
            break;

        default:
            jsonResponse(405, ["error" => "Method tidak diizinkan"]);
    }
}
?>`,
    },
    { type: "h2", text: "Autentikasi dengan JWT" },
    {
      type: "code",
      lang: "php",
      filename: "api/auth.php",
      code: `<?php
// JWT sederhana (untuk produksi pakai library seperti firebase/php-jwt)

function generateJWT(array $payload, string $secret, int $expiry = 3600): string {
    $header = base64_encode(json_encode(["alg" => "HS256", "typ" => "JWT"]));
    $payload["iat"] = time();
    $payload["exp"] = time() + $expiry;
    $payloadEncoded = base64_encode(json_encode($payload));

    $signature = hash_hmac("sha256", "$header.$payloadEncoded", $secret);
    $signatureEncoded = base64_encode($signature);

    return "$header.$payloadEncoded.$signatureEncoded";
}

function verifyJWT(string $token, string $secret): ?array {
    $parts = explode(".", $token);
    if (count($parts) !== 3) return null;

    [$header, $payload, $signature] = $parts;
    $expectedSig = base64_encode(hash_hmac("sha256", "$header.$payload", $secret));

    if (!hash_equals($expectedSig, $signature)) return null;

    $data = json_decode(base64_decode($payload), true);
    if (!$data || $data["exp"] < time()) return null;

    return $data;
}

function getUserFromToken(): ?array {
    $auth = $_SERVER["HTTP_AUTHORIZATION"] ?? "";
    if (!str_starts_with($auth, "Bearer ")) return null;

    $token = substr($auth, 7);
    $secret = "your-secret-key-change-in-production";
    return verifyJWT($token, $secret);
}

// Login endpoint
if ($_SERVER["REQUEST_METHOD"] === "POST" && $resource === "login") {
    $input = json_decode(file_get_contents("php://input"), true);
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$input["email"] ?? ""]);
    $user = $stmt->fetch();

    if ($user && password_verify($input["password"] ?? "", $user["password"])) {
        $token = generateJWT([
            "user_id" => $user["id"],
            "nama" => $user["nama"],
            "role" => $user["role"],
        ], $secret);

        jsonResponse(200, [
            "token" => $token,
            "user" => [
                "id" => $user["id"],
                "nama" => $user["nama"],
                "email" => $user["email"],
            ]
        ]);
    } else {
        jsonResponse(401, ["error" => "Email atau password salah"]);
    }
}

// Protected route example
function requireAuth(): array {
    $user = getUserFromToken();
    if (!$user) {
        jsonResponse(401, ["error" => "Token tidak valid atau expired"]);
    }
    return $user;
}
?>`,
    },
    {
      type: "callout",
      title: "Tips REST API",
      tone: "tip",
      text: "Gunakan HTTP status code yang benar: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 422 Validation Error, 500 Server Error. Selalu konsisten dalam format JSON response.",
    },
  ],
}
