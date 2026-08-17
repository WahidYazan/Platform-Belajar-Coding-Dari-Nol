import type { Tutorial } from "../types"

export const phpDatabase: Tutorial = {
  slug: "php-database",
  title: "PHP: Database MySQL dengan PDO",
  description:
    "Pelajari cara koneksi dan manipulasi database MySQL menggunakan PDO di PHP: CRUD, prepared statements, dan transaksi.",
  category: "PHP",
  level: "Menengah",
  minutes: 25,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "Database adalah tempat menyimpan data secara permanen. MySQL adalah database paling populer untuk PHP. PDO (PHP Data Objects) adalah cara modern dan aman untuk berinteraksi dengan database mendukung banyak jenis database bukan hanya MySQL.",
    },
    { type: "h2", text: "Persiapan" },
    {
      type: "list",
      items: [
        "Pastikan MySQL/MariaDB terinstall (XAMPP sudah include).",
        "Buat database baru: CREATE DATABASE myapp;",
        "PDO extension aktif di PHP (biasanya sudah aktif).",
        "Untuk MySQL: pastikan php_mysql atau php_pdo_mysql aktif di php.ini.",
      ],
    },
    { type: "h2", text: "Koneksi ke Database" },
    {
      type: "code",
      lang: "php",
      filename: "koneksi.php",
      code: `<?php
// PDO Connection
$host = "localhost";
$dbname = "myapp";
$username = "root";
$password = "";

try {
    // Buat koneksi PDO
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
    echo "Koneksi berhasil!";
} catch (PDOException $e) {
    die("Koneksi gagal: " . $e->getMessage());
}

// Simpan di file terpisah (config/database.php)
// Dan di-include di setiap file yang butuh database
?>`,
    },
    { type: "h2", text: "Membuat Tabel (CREATE)" },
    {
      type: "code",
      lang: "php",
      filename: "create-table.php",
      code: `<?php
// Buat tabel users
$pdo->exec("CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    umur INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

// Tambah kolom baru (jika belum ada)
try {
    $pdo->exec("ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20)");
} catch (PDOException $e) {
    // Kolom sudah ada, abaikan
}
?>`,
    },
    { type: "h2", text: "INSERT: Menambah Data" },
    {
      type: "code",
      lang: "php",
      filename: "insert.php",
      code: `<?php
// INSERT biasa (BAHAYA: SQL Injection!)
$nama = "Budi";
$email = "budi@mail.com";
// $pdo->exec("INSERT INTO users (nama, email) VALUES ('$nama', '$email')");
// JANGAN PERNAH lakukan ini!

// INSERT dengan Prepared Statement (AMAN)
$stmt = $pdo->prepare("INSERT INTO users (nama, email, umur) VALUES (:nama, :email, :umur)");
$stmt->execute([
    ":nama" => "Budi Santoso",
    ":email" => "budi@mail.com",
    ":umur" => 25,
]);
echo "User baru ditambahkan! ID: " . $pdo->lastInsertId();

// INSERT banyak sekaligus (batch)
$users = [
    ["nama" => "Sari", "email" => "sari@mail.com", "umur" => 22],
    ["nama" => "Andi", "email" => "andi@mail.com", "umur" => 28],
    ["nama" => "Rina", "email" => "rina@mail.com", "umur" => 24],
];

$stmt = $pdo->prepare("INSERT INTO users (nama, email, umur) VALUES (?, ?, ?)");
foreach ($users as $user) {
    $stmt->execute([$user["nama"], $user["email"], $user["umur"]]);
}
echo count($users) . " user ditambahkan!";

// INSERT dengan transaction (lebih cepat untuk banyak data)
$pdo->beginTransaction();
try {
    $stmt = $pdo->prepare("INSERT INTO users (nama, email, umur) VALUES (?, ?, ?)");
    foreach ($users as $user) {
        $stmt->execute([$user["nama"], $user["email"], $user["umur"]]);
    }
    $pdo->commit();
} catch (Exception $e) {
    $pdo->rollBack();
    echo "Error: " . $e->getMessage();
}
?>`,
    },
    { type: "h2", text: "SELECT: Membaca Data" },
    {
      type: "code",
      lang: "php",
      filename: "select.php",
      code: `<?php
// Ambil semua data
$stmt = $pdo->query("SELECT * FROM users");
$users = $stmt->fetchAll();
foreach ($users as $user) {
    echo $user["nama"] . " - " . $user["email"] . "\\n";
}

// Ambil satu baris
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([1]);
$user = $stmt->fetch();
if ($user) {
    echo $user["nama"];
}

// Fetch dengan mode berbeda
$stmt = $pdo->query("SELECT * FROM users");

$all = $stmt->fetchAll();                          // array of array
$one = $stmt->fetch();                             // satu baris
$count = $stmt->fetchColumn();                     // satu kolom saja
$obj = $stmt->fetchObject();                       // stdclass object
$named = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);     // [id => nama]
$grouped = $stmt->fetchAll(PDO::FETCH_GROUP);      // grouped by first col

// Prepared statement dengan named parameters
$stmt = $pdo->prepare("SELECT * FROM users WHERE umur >= :umur AND kota = :kota");
$stmt->execute([":umur" => 18, ":kota" => "Jakarta"]);
$results = $stmt->fetchAll();

// Hitung jumlah
$stmt = $pdo->query("SELECT COUNT(*) FROM users");
$count = $stmt->fetchColumn();
echo "Total users: $count";

// LIMIT & OFFSET (pagination)
$page = 2;
$perPage = 10;
$offset = ($page - 1) * $perPage;
$stmt = $pdo->prepare("SELECT * FROM users LIMIT ? OFFSET ?");
$stmt->execute([$perPage, $offset]);
$users = $stmt->fetchAll();
?>`,
    },
    { type: "h2", text: "UPDATE & DELETE" },
    {
      type: "code",
      lang: "php",
      filename: "update-delete.php",
      code: `<?php
// UPDATE
$stmt = $pdo->prepare("UPDATE users SET nama = ?, umur = ? WHERE id = ?");
$stmt->execute(["Budi Santoso", 26, 1]);
echo $stmt->rowCount() . " baris diperbarui";

// UPDATE dengan CASE (kondisional)
$stmt = $pdo->prepare("UPDATE users SET
    umur = CASE WHEN umur < 18 THEN 18 ELSE umur END
    WHERE id = ?");
$stmt->execute([1]);

// DELETE
$stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
$stmt->execute([5]);
echo $stmt->rowCount() . " baris dihapus";

// DELETE semua data (hati-hati!)
// $pdo->exec("TRUNCATE TABLE users");

// Soft delete (lebih aman untuk produksi)
$stmt = $pdo->prepare("UPDATE users SET deleted_at = NOW() WHERE id = ?");
$stmt->execute([5]);

// Restore soft deleted
$stmt = $pdo->prepare("UPDATE users SET deleted_at = NULL WHERE id = ?");
$stmt->execute([5]);

// Hapus permanen (hanya untuk data yang sudah soft deleted)
$stmt = $pdo->prepare("DELETE FROM users WHERE id = ? AND deleted_at IS NOT NULL");
$stmt->execute([5]);
?>`,
    },
    { type: "h2", text: "Join & Relasi" },
    {
      type: "code",
      lang: "php",
      filename: "join.php",
      code: `<?php
// Setup tabel
$pdo->exec("CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(200),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)");

// JOIN: gabungkan data dari dua tabel
$stmt = $pdo->query("
    SELECT users.nama, posts.title, posts.content
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
");
$posts = $stmt->fetchAll();

foreach ($posts as $post) {
    echo $post["nama"] . ": " . $post["title"] . "\\n";
}

// LEFT JOIN: semua user, termasuk yang belum punya post
$stmt = $pdo->query("
    SELECT users.nama, COUNT(posts.id) as total_post
    FROM users
    LEFT JOIN posts ON users.id = posts.user_id
    GROUP BY users.id, users.nama
");

// GROUP BY & HAVING
$stmt = $pdo->query("
    SELECT user_id, COUNT(*) as total
    FROM posts
    GROUP BY user_id
    HAVING total > 5
    ORDER BY total DESC
");

// Subquery
$stmt = $pdo->query("
    SELECT * FROM users
    WHERE id IN (SELECT user_id FROM posts WHERE title LIKE '%PHP%')
");
?>`,
    },
    { type: "h2", text: "Transaksi" },
    {
      type: "code",
      lang: "php",
      filename: "transaksi.php",
      code: `<?php
// Transaksi: pastikan beberapa operasi berhasil semua atau gagal semua
try {
    $pdo->beginTransaction();

    // Kurangi saldo pengirim
    $stmt = $pdo->prepare("UPDATE accounts SET saldo = saldo - ? WHERE id = ?");
    $stmt->execute([100000, 1]);

    // Tambah saldo penerima
    $stmt = $pdo->prepare("UPDATE accounts SET saldo = saldo + ? WHERE id = ?");
    $stmt->execute([100000, 2]);

    // Catat transaksi
    $stmt = $pdo->prepare("INSERT INTO transactions (from_id, to_id, amount) VALUES (?, ?, ?)");
    $stmt->execute([1, 2, 100000]);

    $pdo->commit();
    echo "Transfer berhasil!";
} catch (Exception $e) {
    $pdo->rollBack();
    echo "Transfer gagal: " . $e->getMessage();
    // Semua perubahan dibatalkan
}

// Savepoint (partial rollback)
$pdo->beginTransaction();
try {
    // Operasi 1
    $pdo->exec("INSERT INTO users (nama, email) VALUES ('Test', 'test@mail.com')");

    $pdo->exec("SAVEPOINT sp1");

    try {
        // Operasi 2 (mungkin gagal)
        $pdo->exec("INSERT INTO users (nama, email) VALUES ('Test2', 'test@mail.com')");
    } catch (Exception $e) {
        $pdo->exec("ROLLBACK TO SAVEPOINT sp1");
        echo "Operasi 2 gagal, tapi operasi 1 tetap jalan";
    }

    $pdo->commit();
} catch (Exception $e) {
    $pdo->rollBack();
}
?>`,
    },
    {
      type: "callout",
      title: "Selalu pakai Prepared Statements!",
      tone: "warning",
      text: "SQL Injection adalah salah satu serangan paling berbahaya di web. SELALU gunakan prepared statements (prepare + execute) saat query melibatkan input user. Jangan pernah string concatenation langsung ke SQL!",
    },
    {
      type: "p",
      text: "Database adalah backbone aplikasi web. Lanjut ke bab OOP untuk memahami pemrograman berorientasi objek yang menjadi fondasi framework PHP modern.",
    },
  ],
}
