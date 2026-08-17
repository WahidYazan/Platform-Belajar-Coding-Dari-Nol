import type { Tutorial } from "../types"

export const phpSecurity: Tutorial = {
  slug: "php-security",
  title: "PHP: Security Best Practices",
  description:
    "Pelajari keamanan PHP: SQL injection, XSS, CSRF, password hashing, input validation, dan secure coding.",
  category: "PHP",
  level: "Lanjutan",
  minutes: 20,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "Keamanan adalah aspek terpenting dalam pengembangan web. PHP memiliki beberapa celah keamanan yang harus dipahami dan dicegah. Artikel ini membahas serangan paling umum dan cara mencegahnya.",
    },
    { type: "h2", text: "1. SQL Injection" },
    {
      type: "code",
      lang: "php",
      filename: "sql-injection.php",
      code: `<?php
// BAHAYA: SQL Injection!
$email = $_POST["email"];
// $pdo->query("SELECT * FROM users WHERE email = '$email'");
// Jika user input: ' OR '1'='1' --
// Query jadi: SELECT * FROM users WHERE email = '' OR '1'='1' --'

// AMAN: Prepared Statement
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

// Named parameters juga aman
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email AND status = :status");
$stmt->execute([":email" => $email, ":status" => "active"]);

// Dynamic column name (harus whitelist, tidak bisa pakai ?)
$allowed = ["nama", "email", "created_at"];
$sort = in_array($_GET["sort"] ?? "", $allowed) ? $_GET["sort"] : "created_at";
$stmt = $pdo->query("SELECT * FROM users ORDER BY $sort");
?>`,
    },
    { type: "h2", text: "2. Cross-Site Scripting (XSS)" },
    {
      type: "code",
      lang: "php",
      filename: "xss-prevention.php",
      code: `<?php
// BAHAYA: XSS (Cross-Site Scripting)
$userInput = $_GET["name"] ?? "";
// echo "Halo, $userInput"; // Jika input <script>alert('hack')</script>

// AMAN: htmlspecialchars()
echo "Halo, " . htmlspecialchars($userInput, ENT_QUOTES, "UTF-8");

// Fungsi helper untuk output aman
function e(string $text): string {
    return htmlspecialchars($text, ENT_QUOTES, "UTF-8");
}

// Pakai di mana saja
echo "<p>Nama: " . e($user["nama"]) . "</p>";
echo "<p>Email: " . e($user["email"]) . "</p>";

// Untuk attribute HTML
echo '<div data-name="' . e($name) . '">';

// Untuk JavaScript dalam HTML
echo "<script>var name = " . json_encode($name) . ";</script>";

// Content Security Policy header
header("Content-Security-Policy: default-src 'self'; script-src 'self'");
?>`,
    },
    { type: "h2", text: "3. Password Hashing" },
    {
      type: "code",
      lang: "php",
      filename: "password.php",
      code: `<?php
// BAHAYA: md5() atau sha1() untuk password!
// $hash = md5($password); // JANGAN PERNAH!

// AMAN: password_hash() + password_verify()
$password = "rahasia123";

// Hash password (otomatis generate salt)
$hash = password_hash($password, PASSWORD_DEFAULT);
// Contoh hash: $2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

// Verifikasi password
if (password_verify($password, $hash)) {
    echo "Password benar!";
} else {
    echo "Password salah!";
}

// Cek apakah hash perlu di-update (karena cost factor berubah)
if (password_needs_rehash($hash, PASSWORD_DEFAULT, ["cost" => 12])) {
    $newHash = password_hash($password, PASSWORD_DEFAULT, ["cost" => 12]);
    // Update di database
    $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
    $stmt->execute([$newHash, $userId]);
}

// Generate random password
function generatePassword(int $length = 16): string {
    return bin2hex(random_bytes($length / 2));
}

// Random string untuk API key
$apiKey = bin2hex(random_bytes(32)); // 64 karakter hex
?>`,
    },
    { type: "h2", text: "4. File Upload Security" },
    {
      type: "code",
      lang: "php",
      filename: "upload-security.php",
      code: `<?php
function secureUpload(array $file, array $allowedExts = ["jpg", "jpeg", "png", "gif"]): ?string {
    // Cek error
    if ($file["error"] !== UPLOAD_ERR_OK) {
        return null;
    }

    // Cek ukuran (maks 5MB)
    if ($file["size"] > 5 * 1024 * 1024) {
        return null;
    }

    // Cek ekstensi
    $ext = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));
    if (!in_array($ext, $allowedExts)) {
        return null;
    }

    // Cek MIME type (bisa dipalsu, jadi jangan hanya andalkan ini)
    $allowedMimes = [
        "image/jpeg", "image/png", "image/gif", "image/webp"
    ];
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($file["tmp_name"]);
    if (!in_array($mime, $allowedMimes)) {
        return null;
    }

    // Generate nama unik
    $newName = bin2hex(random_bytes(16)) . "." . $ext;

    // Simpan di luar public root
    $uploadDir = $_SERVER["DOCUMENT_ROOT"] . "/../private/uploads/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $path = $uploadDir . $newName;
    if (move_uploaded_file($file["tmp_name"], $path)) {
        return $newName;
    }

    return null;
}

// Penggunaan
if (isset($_FILES["foto"])) {
    $filename = secureUpload($_FILES["foto"]);
    if ($filename) {
        echo "Upload berhasil: $filename";
    } else {
        echo "Upload gagal!";
    }
}
?>`,
    },
    { type: "h2", text: "5. Input Validation & Sanitasi" },
    {
      type: "code",
      lang: "php",
      filename: "validation.php",
      code: `<?php
// Filter extension built-in PHP
$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
$umur = filter_input(INPUT_POST, "umur", FILTER_VALIDATE_INT, [
    "options" => ["min_range" => 1, "max_range" => 150]
]);
$url = filter_input(INPUT_GET, "url", FILTER_VALIDATE_URL);

// Sanitasi input
$nama = filter_input(INPUT_POST, "nama", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$angka = filter_input(INPUT_POST, "angka", FILTER_SANITIZE_NUMBER_INT);

// Custom validation function
function validate(array $data, array $rules): array {
    $errors = [];
    foreach ($rules as $field => $rule) {
        $value = $data[$field] ?? "";
        if (str_contains($rule, "required") && empty($value)) {
            $errors[$field] = "$field wajib diisi";
        }
        if (str_contains($rule, "email") && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $errors[$field] = "$field format tidak valid";
        }
        if (preg_match('/min:(\\d+)/', $rule, $m) && strlen($value) < $m[1]) {
            $errors[$field] = "$field minimal {$m[1]} karakter";
        }
    }
    return $errors;
}

$errors = validate($_POST, [
    "nama" => "required|min:3",
    "email" => "required|email",
    "password" => "required|min:8",
]);

if (!empty($errors)) {
    jsonResponse(422, ["errors" => $errors]);
}
?>`,
    },
    {
      type: "callout",
      title: "Security Checklist",
      tone: "warning",
      text: "Selalu lakukan: (1) Prepared statements untuk SQL, (2) htmlspecialchars() untuk output HTML, (3) password_hash() untuk password, (4) CSRF token untuk form, (5) Validasi & sanitasi semua input, (6) HTTPS di produksi, (7) Error logging bukan display.",
    },
  ],
}
