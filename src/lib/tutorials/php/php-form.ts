import type { Tutorial } from "../types"

export const phpFormHandling: Tutorial = {
  slug: "php-form-handling",
  title: "PHP: Form Handling (GET & POST)",
  description:
    "Pelajari cara menerima dan memproses data form dari HTML dengan metode GET dan POST di PHP.",
  category: "PHP",
  level: "Pemula",
  minutes: 18,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "Form adalah cara user mengirim data ke server. PHP menyediakan superglobal $_GET dan $_POST untuk menerima data dari form HTML. Ini adalah fitur paling dasar dan paling sering dipakai di web.",
    },
    { type: "h2", text: "Form HTML & PHP" },
    {
      type: "code",
      lang: "html",
      filename: "form.html",
      code: `<!DOCTYPE html>
<html>
<head>
    <title>Form Login</title>
</head>
<body>
    <!-- Method GET: data muncul di URL -->
    <form action="proses.php" method="GET">
        <input type="text" name="nama" placeholder="Nama">
        <input type="email" name="email" placeholder="Email">
        <input type="submit" value="Kirim (GET)">
    </form>

    <hr>

    <!-- Method POST: data tersembunyi di URL -->
    <form action="proses.php" method="POST">
        <input type="text" name="nama" placeholder="Nama">
        <input type="email" name="email" placeholder="Email">
        <textarea name="pesan" placeholder="Pesan"></textarea>
        <select name="kategori">
            <option value="umum">Umum</option>
            <option value="bug">Bug Report</option>
            <option value="fitur">Saran Fitur</option>
        </select>
        <input type="checkbox" name="newsletter" value="ya">
        <label>Saya ingin berlangganan newsletter</label>
        <input type="submit" value="Kirim (POST)">
    </form>
</body>
</html>`,
    },
    { type: "h2", text: "Memproses Form dengan PHP" },
    {
      type: "code",
      lang: "php",
      filename: "proses.php",
      code: `<?php
// Cek method yang digunakan
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Ambil data dari POST (aman dari injection)
    $nama = $_POST["nama"] ?? "";
    $email = $_POST["email"] ?? "";
    $pesan = $_POST["pesan"] ?? "";
    $kategori = $_POST["kategori"] ?? "umum";
    $newsletter = $_POST["newsletter"] ?? "";

    // Tampilkan data
    echo "Nama: " . htmlspecialchars($nama) . "\\n";
    echo "Email: " . htmlspecialchars($email) . "\\n";
    echo "Pesan: " . htmlspecialchars($pesan) . "\\n";
    echo "Kategori: " . htmlspecialchars($kategori) . "\\n";
    echo "Newsletter: " . ($newsletter === "ya" ? "Ya" : "Tidak") . "\\n";
}

// GET data (dari URL: proses.php?nama=Budi&email=budi@mail.com)
if (isset($_GET["nama"])) {
    $nama = $_GET["nama"];
    echo "Halo, " . htmlspecialchars($nama);
}
?>`,
    },
    { type: "h2", text: "Validasi & Keamanan Form" },
    {
      type: "code",
      lang: "php",
      filename: "validasi.php",
      code: `<?php
$errors = [];
$nama = $email = $pesan = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Ambil dan bersihkan input
    $nama = trim($_POST["nama"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $pesan = trim($_POST["pesan"] ?? "");

    // Validasi: nama wajib, minimal 3 karakter
    if (empty($nama)) {
        $errors[] = "Nama wajib diisi!";
    } elseif (strlen($nama) < 3) {
        $errors[] = "Nama minimal 3 karakter!";
    }

    // Validasi: email wajib dan format benar
    if (empty($email)) {
        $errors[] = "Email wajib diisi!";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Format email tidak valid!";
    }

    // Validasi: pesan wajib
    if (empty($pesan)) {
        $errors[] = "Pesan wajib diisi!";
    } elseif (strlen($pesan) < 10) {
        $errors[] = "Pesan minimal 10 karakter!";
    }

    // Jika tidak ada error, proses
    if (empty($errors)) {
        // Simpan ke database, kirim email, dll
        echo "Terima kasih, $nama! Pesan kamu sudah dikirim.";

        // Reset form
        $nama = $email = $pesan = "";
    }
}
?>

<!-- Tampilkan form dengan error -->
<form method="POST">
    <!-- Tampilkan error jika ada -->
    <?php if (!empty($errors)): ?>
        <div style="color: red;">
            <?php foreach ($errors as $error): ?>
                <p><?= htmlspecialchars($error) ?></p>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

    <input type="text" name="nama" value="<?= htmlspecialchars($nama) ?>" placeholder="Nama">
    <input type="email" name="email" value="<?= htmlspecialchars($email) ?>" placeholder="Email">
    <textarea name="pesan" placeholder="Pesan"><?= htmlspecialchars($pesan) ?></textarea>
    <button type="submit">Kirim</button>
</form>`,
    },
    { type: "h2", text: "CSRF Protection" },
    {
      type: "code",
      lang: "php",
      filename: "csrf.php",
      code: `<?php
session_start();

// Generate CSRF token
function generateCSRFToken() {
    if (empty($_SESSION["csrf_token"])) {
        $_SESSION["csrf_token"] = bin2hex(random_bytes(32));
    }
    return $_SESSION["csrf_token"];
}

// Verifikasi CSRF token
function verifyCSRFToken($token) {
    return isset($_SESSION["csrf_token"])
        && hash_equals($_SESSION["csrf_token"], $token);
}

// Di form HTML:
// <input type="hidden" name="csrf_token" value="<?= generateCSRFToken() ?>">

// Saat memproses:
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!verifyCSRFToken($_POST["csrf_token"] ?? "")) {
        die("CSRF token tidak valid!");
    }
    // Proses form...
}
?>`,
    },
    { type: "h2", text: "File Upload" },
    {
      type: "code",
      lang: "php",
      filename: "upload.php",
      code: `<?php
// HTML Form:
// <form method="POST" enctype="multipart/form-data">
//   <input type="file" name="foto">
//   <button type="submit">Upload</button>
// </form>

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $file = $_FILES["foto"] ?? null;

    if ($file && $file["error"] === UPLOAD_ERR_OK) {
        // Info file
        $nama = $file["name"];         // nama asli
        $tmp = $file["tmp_name"];       // lokasi sementara
        $ukuran = $file["size"];        // dalam byte
        $tipe = $file["type"];          // MIME type
        $ekstensi = pathinfo($nama, PATHINFO_EXTENSION);

        // Validasi
        $ekstensiDiizinkan = ["jpg", "jpeg", "png", "gif", "webp"];
        $ukuranMaks = 5 * 1024 * 1024; // 5MB

        if (!in_array(strtolower($ekstensi), $ekstensiDiizinkan)) {
            die("Ekstensi tidak diizinkan!");
        }

        if ($ukuran > $ukuranMaks) {
            die("Ukuran file terlalu besar!");
        }

        // Generate nama unik
        $namaBaru = uniqid("upload_") . "." . $ekstensi;
        $tujuan = "uploads/" . $namaBaru;

        // Pastikan folder uploads ada
        if (!is_dir("uploads")) {
            mkdir("uploads", 0755, true);
        }

        // Pindahkan file
        if (move_uploaded_file($tmp, $tujuan)) {
            echo "Upload berhasil: $tujuan";
        } else {
            echo "Gagal upload file!";
        }
    }
}
?>`,
    },
    {
      type: "callout",
      title: "Keamanan",
      tone: "warning",
      text: "Selalu gunakan htmlspecialchars() saat menampilkan input user di HTML untuk mencegah XSS (Cross-Site Scripting). Jangan pernah percaya data dari user selalu validasi dan sanitasi!",
    },
    {
      type: "p",
      text: "Form handling adalah fondasi interaksi user-server. Lanjut kebab File Handling untuk memahami cara kerja file di PHP.",
    },
  ],
}
