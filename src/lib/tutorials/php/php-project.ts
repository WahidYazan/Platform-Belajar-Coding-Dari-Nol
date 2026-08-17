import type { Tutorial } from "../types"

export const phpProject: Tutorial = {
  slug: "php-project",
  title: "PHP Project: CRUD App Lengkap",
  description:
    "Bangun aplikasi CRUD lengkap dengan PHP: koneksi database, CRUD operations, form handling, dan error handling.",
  category: "PHP",
  level: "Lanjutan",
  minutes: 35,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "Saatnya menggabungkan semua yang sudah dipelajari. Kita akan membangun aplikasi CRUD (Create, Read, Update, Delete) manajemen produk lengkap dengan validasi, error handling, dan keamanan dasar.",
    },
    { type: "h2", text: "Struktur Project" },
    {
      type: "code",
      lang: "bash",
      filename: "terminal",
      code: `php-crud/
├── config/
│   └── database.php
├── src/
│   ├── Product.php
│   └── Validator.php
├── public/
│   ├── index.php
│   ├── create.php
│   ├── edit.php
│   ├── delete.php
│   └── css/
│       └── style.css
├── sql/
│   └── schema.sql
└── vendor/
    └── autoload.php`,
    },
    { type: "h2", text: "Database Schema" },
    {
      type: "code",
      lang: "sql",
      filename: "sql/schema.sql",
      code: `CREATE DATABASE IF NOT EXISTS php_crud;
USE php_crud;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL DEFAULT 0,
    stock INT NOT NULL DEFAULT 0,
    category VARCHAR(50) NOT NULL DEFAULT 'umum',
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO products (name, description, price, stock, category) VALUES
('Laptop ASUS', 'Laptop untuk kerja dan gaming', 12500000, 15, 'elektronik'),
('Keyboard Mechanical', 'Keyboard RGB switch blue', 850000, 50, 'aksesoris'),
('Monitor LG 24 inch', 'Monitor IPS Full HD', 2200000, 20, 'elektronik'),
('Mouse Logitech', 'Mouse wireless ergonomic', 350000, 100, 'aksesoris'),
('Headset Sony', 'Headset noise cancelling', 1800000, 30, 'aksesoris');`,
    },
    { type: "h2", text: "Database Config & Model" },
    {
      type: "code",
      lang: "php",
      filename: "config/database.php",
      code: `<?php
declare(strict_types=1);

return [
    "host" => "localhost",
    "dbname" => "php_crud",
    "username" => "root",
    "password" => "",
    "charset" => "utf8mb4",
];

// Koneksi PDO singleton
function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $config = require __DIR__ . "/database.php";
        $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset={$config['charset']}";
        $pdo = new PDO($dsn, $config["username"], $config["password"], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }
    return $pdo;
}
?>`,
    },
    {
      type: "code",
      lang: "php",
      filename: "src/Product.php",
      code: `<?php
declare(strict_types=1);

class Product {
    private PDO $db;

    public function __construct() {
        $this->db = getDB();
    }

    public function all(string $search = "", string $category = "all", int $page = 1, int $perPage = 10): array {
        $where = "WHERE deleted_at IS NULL";
        $params = [];

        if ($search) {
            $where .= " AND (name LIKE ? OR description LIKE ?)";
            $params[] = "%$search%";
            $params[] = "%$search%";
        }

        if ($category !== "all") {
            $where .= " AND category = ?";
            $params[] = $category;
        }

        $offset = ($page - 1) * $perPage;

        $countStmt = $this->db->prepare("SELECT COUNT(*) FROM products $where");
        $countStmt->execute($params);
        $total = (int) $countStmt->fetchColumn();

        $stmt = $this->db->prepare("SELECT * FROM products $where ORDER BY created_at DESC LIMIT ? OFFSET ?");
        $params[] = $perPage;
        $params[] = $offset;
        $stmt->execute($params);

        return [
            "data" => $stmt->fetchAll(),
            "meta" => [
                "total" => $total,
                "page" => $page,
                "per_page" => $perPage,
                "total_pages" => ceil($total / $perPage),
            ]
        ];
    }

    public function find(int $id): ?array {
        $stmt = $this->db->prepare("SELECT * FROM products WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$id]);
        return $stmt->fetch() ?: null;
    }

    public function create(array $data): int {
        $stmt = $this->db->prepare("INSERT INTO products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data["name"],
            $data["description"] ?? "",
            $data["price"],
            $data["stock"] ?? 0,
            $data["category"] ?? "umum",
            $data["image_url"] ?? null,
        ]);
        return (int) $this->db->lastInsertId();
    }

    public function update(int $id, array $data): bool {
        $fields = [];
        $params = [];
        foreach (["name", "description", "price", "stock", "category", "image_url"] as $field) {
            if (array_key_exists($field, $data)) {
                $fields[] = "$field = ?";
                $params[] = $data[$field];
            }
        }
        if (empty($fields)) return false;

        $params[] = $id;
        $stmt = $this->db->prepare("UPDATE products SET " . implode(", ", $fields) . " WHERE id = ?");
        $stmt->execute($params);
        return $stmt->rowCount() > 0;
    }

    public function delete(int $id): bool {
        $stmt = $this->db->prepare("UPDATE products SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$id]);
        return $stmt->rowCount() > 0;
    }

    public function getCategories(): array {
        $stmt = $this->db->query("SELECT DISTINCT category FROM products WHERE deleted_at IS NULL ORDER BY category");
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
}
?>`,
    },
    { type: "h2", text: "Validator & Views" },
    {
      type: "code",
      lang: "php",
      filename: "src/Validator.php",
      code: `<?php
declare(strict_types=1);

class Validator {
    private array $errors = [];

    public function validate(array $data, array $rules): bool {
        $this->errors = [];
        foreach ($rules as $field => $rule) {
            $value = $data[$field] ?? null;
            if (str_contains($rule, "required") && empty($value) && $value !== "0") {
                $this->errors[$field] = ucfirst($field) . " wajib diisi";
            }
            if (str_contains($rule, "numeric") && $value !== null && !is_numeric($value)) {
                $this->errors[$field] = ucfirst($field) . " harus berupa angka";
            }
            if (preg_match('/min:(\\d+)/', $rule, $m) && strlen((string)$value) < (int)$m[1]) {
                $this->errors[$field] = ucfirst($field) . " minimal {$m[1]} karakter";
            }
        }
        return empty($this->errors);
    }

    public function getErrors(): array { return $this->errors; }
    public function hasErrors(): bool { return !empty($this->errors); }
}

function e(string $text): string {
    return htmlspecialchars($text, ENT_QUOTES, "UTF-8");
}

function redirect(string $url): void {
    header("Location: $url");
    exit;
}

function flash(string $key, string $message): void {
    $_SESSION["flash"][$key] = $message;
}

function getFlash(string $key): ?string {
    $msg = $_SESSION["flash"][$key] ?? null;
    unset($_SESSION["flash"][$key]);
    return $msg;
}
?>`,
    },
    { type: "h2", text: "Halaman Utama (List)" },
    {
      type: "code",
      lang: "php",
      filename: "public/index.php",
      code: `<?php
declare(strict_types=1);
session_start();
require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../src/Product.php";
require_once __DIR__ . "/../src/Validator.php";

$productModel = new Product();
$search = $_GET["search"] ?? "";
$category = $_GET["category"] ?? "all";
$page = max(1, (int) ($_GET["page"] ?? 1));

$result = $productModel->all($search, $category, $page);
$products = $result["data"];
$meta = $result["meta"];
$categories = $productModel->getCategories();
$success = getFlash("success");
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Manajemen Produk</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container">
    <h1>Manajemen Produk</h1>

    <?php if ($success): ?>
        <div class="alert success"><?= e($success) ?></div>
    <?php endif; ?>

    <div class="actions">
        <a href="create.php" class="btn btn-primary">+ Tambah Produk</a>

        <form method="GET" class="search-form">
            <input type="text" name="search" placeholder="Cari produk..." value="<?= e($search) ?>">
            <select name="category">
                <option value="all">Semua Kategori</option>
                <?php foreach ($categories as $cat): ?>
                    <option value="<?= e($cat) ?>" <?= $category === $cat ? "selected" : "" ?>>
                        <?= e(ucfirst($cat)) ?>
                    </option>
                <?php endforeach; ?>
            </select>
            <button type="submit" class="btn">Cari</button>
        </form>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th><th>Nama</th><th>Harga</th><th>Stok</th><th>Kategori</th><th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            <?php if (empty($products)): ?>
                <tr><td colspan="6" class="text-center">Tidak ada data</td></tr>
            <?php else: ?>
                <?php foreach ($products as $i => $p): ?>
                    <tr>
                        <td><?= $meta["per_page"] * ($meta["page"] - 1) + $i + 1 ?></td>
                        <td><?= e($p["name"]) ?></td>
                        <td>Rp <?= number_format((float)$p["price"], 0, ",", ".") ?></td>
                        <td><?= $p["stock"] ?></td>
                        <td><span class="badge"><?= e($p["category"]) ?></span></td>
                        <td>
                            <a href="edit.php?id=<?= $p["id"] ?>" class="btn btn-small">Edit</a>
                            <a href="delete.php?id=<?= $p["id"] ?>" class="btn btn-danger btn-small"
                               onclick="return confirm('Yakin hapus?')">Hapus</a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            <?php endif; ?>
        </tbody>
    </table>

    <div class="pagination">
        <?php for ($i = 1; $i <= $meta["total_pages"]; $i++): ?>
            <a href="?page=<?= $i ?>&search=<?= e($search) ?>&category=<?= e($category) ?>"
               class="<?= $i === $meta["page"] ? "active" : "" ?>"><?= $i ?></a>
        <?php endfor; ?>
    </div>
</div>
</body>
</html>`,
    },
    {
      type: "callout",
      title: "Selanjutnya",
      tone: "tip",
      text: "Project ini bisa dikembangkan lebih lanjut: tambahkan autentikasi login, export CSV, image upload, API endpoint, atau migrate ke Laravel untuk struktur yang lebih profesional. Yang penting, pahami fondasi PHP ini sebelum naik ke framework!",
    },
    {
      type: "p",
      text: "Selamat! Kamu sudah membangun aplikasi CRUD lengkap dengan PHP. Fondasi ini cukup untuk memahami framework seperti Laravel atau Symfony. Terus praktik dan eksplorasi!",
    },
  ],
}
