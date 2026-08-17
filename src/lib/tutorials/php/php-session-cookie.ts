import type { Tutorial } from "../types"

export const phpSessionCookie: Tutorial = {
  slug: "php-session-cookie",
  title: "PHP: Session & Cookie",
  description:
    "Pelajari cara menyimpan state di PHP dengan session dan cookie: autentikasi,Remember Me, dan keamanan.",
  category: "PHP",
  level: "Menengah",
  minutes: 18,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "HTTP adalah stateless artinya setiap request terpisah. Session dan cookie memungkinkan PHP mengingat informasi user antar request seperti login status, isi keranjang belanja, dan preferensi.",
    },
    { type: "h2", text: "Cookie" },
    {
      type: "code",
      lang: "php",
      filename: "cookie.php",
      code: `<?php
// Set cookie (harus sebelum output apapun!)
setcookie(
    "nama",           // nama cookie
    "Budi",           // nilai
    time() + 86400,   // expiry: 1 hari dari sekarang
    "/",              // path: bisa diakses di semua halaman
    "",               // domain: kosong = domain saat ini
    false,            // secure: hanya HTTPS?
    true              // httpOnly: tidak bisa diakses via JS?
);

// Set cookie dengan opsi lengkap (PHP 7.3+)
setcookie("theme", "dark", [
    "expires"  => time() + (30 * 24 * 60 * 60), // 30 hari
    "path"     => "/",
    "domain"   => "example.com",
    "secure"   => true,
    "httponly"  => true,
    "samesite" => "Lax", // CSRF protection
]);

// Baca cookie
$nama = $_COOKIE["nama"] ?? "Tamu";
echo "Halo, $nama!";

// Hapus cookie
setcookie("nama", "", time() - 3600, "/");
unset($_COOKIE["nama"]);

// Cookie untuk Remember Me
$token = bin2hex(random_bytes(32));
setcookie("remember_token", $token, [
    "expires"  => time() + (30 * 24 * 60 * 60),
    "path"     => "/",
    "httponly"  => true,
    "secure"   => true,
    "samesite" => "Strict",
]);
// Simpan hash token di database untuk verifikasi
?>`,
    },
    { type: "h2", text: "Session" },
    {
      type: "code",
      lang: "php",
      filename: "session.php",
      code: `<?php
// Mulai session (harus sebelum output!)
session_start();

// Set session variables
$_SESSION["user_id"] = 123;
$_SESSION["nama"] = "Budi";
$_SESSION["role"] = "admin";
$_SESSION["login_time"] = time();

// Baca session
if (isset($_SESSION["user_id"])) {
    echo "Selamat datang, " . $_SESSION["nama"];
}

// Cek session
if (!isset($_SESSION["user_id"])) {
    header("Location: /login");
    exit;
}

// Hapus satu session variable
unset($_SESSION["role"]);

// Hapus semua session
session_unset();   // bersihkan $_SESSION
session_destroy(); // hancurkan session

// Regenerate session ID (keamanan: hindari session fixation)
session_regenerate_id(true);
?>`,
    },
    { type: "h2", text: "Sistem Login Sederhana" },
    {
      type: "code",
      lang: "php",
      filename: "login.php",
      code: `<?php
session_start();
require "config/database.php"; // koneksi PDO

// Jika sudah login, redirect ke dashboard
if (isset($_SESSION["user_id"])) {
    header("Location: /dashboard");
    exit;
}

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST["email"] ?? "");
    $password = $_POST["password"] ?? "";

    // Cari user berdasarkan email
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // Verifikasi password
    if ($user && password_verify($password, $user["password"])) {
        // Regenerate session ID
        session_regenerate_id(true);

        // Simpan data user di session
        $_SESSION["user_id"] = $user["id"];
        $_SESSION["nama"] = $user["nama"];
        $_SESSION["role"] = $user["role"];
        $_SESSION["login_time"] = time();

        // Update last login
        $stmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
        $stmt->execute([$user["id"]]);

        header("Location: /dashboard");
        exit;
    } else {
        $error = "Email atau password salah!";
        // Jangan beri tahu user mana yang salah (brute force protection)
    }
}
?>

<!DOCTYPE html>
<html>
<body>
    <h1>Login</h1>
    <?php if ($error): ?>
        <p style="color:red"><?= htmlspecialchars($error) ?></p>
    <?php endif; ?>
    <form method="POST">
        <input type="email" name="email" placeholder="Email" required>
        <input type="password" name="password" placeholder="Password" required>
        <label>
            <input type="checkbox" name="remember" value="ya">
            Ingat saya
        </label>
        <button type="submit">Login</button>
    </form>
</body>
</html>`,
    },
    { type: "h2", text: "Session Security" },
    {
      type: "code",
      lang: "php",
      filename: "session-security.php",
      code: `<?php
// Konfigurasi session yang aman (letakkan di awal script)
ini_set("session.use_strict_mode", 1);
ini_set("session.use_cookies", 1);
ini_set("session.use_only_cookies", 1);
ini_set("session.cookie_httponly", 1);
ini_set("session.cookie_secure", 1);    // HTTPS only
ini_set("session.cookie_samesite", "Strict");
ini_set("session.gc_maxlifetime", 1800); // 30 menit timeout

session_start();

// Session timeout (auto logout setelah 30 menit tidak aktif)
$timeout = 1800; // 30 menit
if (isset($_SESSION["last_activity"]) && (time() - $_SESSION["last_activity"]) > $timeout) {
    session_unset();
    session_destroy();
    header("Location: /login?reason=timeout");
    exit;
}
$_SESSION["last_activity"] = time();

// CSRF Token untuk form
function generateCSRFToken(): string {
    if (empty($_SESSION["csrf_token"])) {
        $_SESSION["csrf_token"] = bin2hex(random_bytes(32));
    }
    return $_SESSION["csrf_token"];
}

function verifyCSRFToken(?string $token): bool {
    return isset($_SESSION["csrf_token"])
        && hash_equals($_SESSION["csrf_token"], $token ?? "");
}

// Di form:
// <input type="hidden" name="csrf_token" value="<?= generateCSRFToken() ?>">

// Di proses:
// if (!verifyCSRFToken($_POST["csrf_token"])) die("Invalid CSRF!");
?>`,
    },
    {
      type: "callout",
      title: "Session vs Cookie",
      tone: "info",
      text: "Session: data disimpan di server (aman, tapi butuh resource server). Cookie: data disimpan di browser (ringan, tapi kurang aman). Untuk data sensitif (user ID, role) pakai session. Untuk preferensi non-sensitif (theme, bahasa) pakai cookie.",
    },
  ],
}
