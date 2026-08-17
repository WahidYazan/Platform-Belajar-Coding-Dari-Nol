import type { Tutorial } from "../types"

export const phpModern: Tutorial = {
  slug: "php-modern",
  title: "PHP Modern: Fitur PHP 8.0 - 8.3",
  description:
    "Jelajahi fitur-fitur terbaru PHP: named arguments, match expression, enum, fiber, readonly, dan performance improvement.",
  category: "PHP",
  level: "Lanjutan",
  minutes: 22,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "PHP terus berkembang dengan fitur baru di setiap versi. PHP 8+ membawa perubahan besar: performance lebih cepat, type system lebih kuat, dan syntax lebih elegan. Memahami fitur modern membuat kode lebih bersih dan maintainable.",
    },
    { type: "h2", text: "PHP 8.0: Named Arguments & Match" },
    {
      type: "code",
      lang: "php",
      filename: "php80.php",
      code: `<?php
// Named Arguments - tidak perlu urut parameter
function createUser(string $name, string $email, int $age, string $role = "user") {
    return compact("name", "email", "age", "role");
}

$user = createUser(
    name: "Budi",
    email: "budi@mail.com",
    age: 25,
    role: "admin"
);

// Match Expression (lebih cepat dari switch, strict comparison)
$status = 200;
$message = match($status) {
    200 => "OK",
    301 => "Moved",
    404 => "Not Found",
    500 => "Server Error",
    default => "Unknown",
};

// Match dengan kondisi
$age = 25;
$group = match(true) {
    $age < 13 => "Child",
    $age < 18 => "Teenager",
    $age < 60 => "Adult",
    default => "Senior",
};

// Null safe operator (->?)
$country = $user?->address?->country;
// Jika $user atau $address null, hasilnya null (tidak error)

// Union Types
function format(int|float $value): string {
    return number_format($value, 2);
}

// Constructor property promotion
class Point {
    public function __construct(
        public readonly float $x,
        public readonly float $y,
    ) {}
}

$p = new Point(1.0, 2.0);
// $p->x = 5.0; // Error: readonly

// str_contains, str_starts_with, str_ends_with
echo str_contains("Hello World", "World"); // true
echo str_starts_with("Hello", "He");       // true
echo str_ends_with("Hello", "lo");         // true
?>`,
    },
    { type: "h2", text: "PHP 8.1: Enum, Fibers & Readonly" },
    {
      type: "code",
      lang: "php",
      filename: "php81.php",
      code: `<?php
// Enum (tipe data untuk value yang terbatas)
enum Status: string {
    case Draft = "draft";
    case Published = "published";
    case Archived = "archived";

    public function label(): string {
        return match($this) {
            self::Draft => "Draft",
            self::Published => "Diterbitkan",
            self::Archived => "Diarsipkan",
        };
    }

    public function color(): string {
        return match($this) {
            self::Draft => "gray",
            self::Published => "green",
            self::Archived => "red",
        };
    }
}

$status = Status::Published;
echo $status->value;   // published
echo $status->label(); // Diterbitkan
echo $status === Status::Published; // true

// Enum di database
$stmt = $pdo->prepare("INSERT INTO posts (status) VALUES (?)");
$stmt->execute([$status->value]);

// Readonly Classes (PHP 8.2)
readonly class Coordinates {
    public function __construct(
        public float $lat,
        public float $lng,
    ) {}
}

// Fibers (lightweight concurrency)
$fiber = new Fiber(function (): void {
    echo "Start\\n";
    $value = Fiber::suspend("fiber paused");
    echo "Resumed with: $value\\n";
});

$label = $fiber->start();    // Start, label = "fiber paused"
$fiber->resume("hello");     // Resumed with: hello

// Intersection Types
interface Loggable { public function toLog(): string; }
interface Cacheable { public function cacheKey(): string; }

function processItem(Loggable&Cacheable $item) {
    echo $item->toLog();
    echo $item->cacheKey();
}

// First-class callable
$fn = strlen(...);
echo $fn("Hello"); // 5
?>`,
    },
    { type: "h2", text: "PHP 8.2 & 8.3: Typed Constants & More" },
    {
      type: "code",
      lang: "php",
      filename: "php82-83.php",
      code: `<?php
// PHP 8.2: Typed class constants
class App {
    const string VERSION = "1.0.0";
    const int MAX_USERS = 100;
    const array ALLOWED_ROLES = ["admin", "user", "editor"];
}

echo App::VERSION; // 1.0.0

// PHP 8.2: readonly classes
readonly class UserData {
    public function __construct(
        public string $name,
        public string $email,
        public DateTimeImmutable $createdAt,
    ) {}
}

// PHP 8.2: DNF types (Disjunctive Normal Form)
function process(int|string $value): void {}
function process2((A&B)|null $value): void {}

// PHP 8.3: Typed class constants (enhanced)
interface Color {
    const string Red = "red";
    const string Blue = "blue";
}

// PHP 8.3: json_validate()
$json = '{"name": "Budi"}';
if (json_validate($json)) {
    $data = json_decode($json);
}

// PHP 8.3: #[Override] attribute
class Parent2 {
    public function getName(): string { return "Parent"; }
}

class Child2 extends Parent2 {
    #[Override]
    public function getName(): string { return "Child"; }
    // Jika method parent dihapus, compile error!
}

// Performance Tips
// 1. Gunakan strict types
declare(strict_types=1);

// 2. Gunakan typed properties
class Fast {
    private int $count = 0;
    private string $name = "";
}

// 3. Gunakan readonly untuk data yang tidak berubah
class Config {
    public function __construct(
        public readonly string $host,
        public readonly int $port,
    ) {}
}

// 4. Gunakan enum alih-alih constant
// 5. Gunakan match alih-alih switch (lebih cepat)
// 6. Gunakan Fiber alih-alih async library
?>`,
    },
    {
      type: "callout",
      title: "Upgrade ke PHP 8+",
      tone: "tip",
      text: "PHP 8.3 adalah versi terbaru dengan LTS (Long Term Support). Semua framework modern (Laravel 11, Symfony 7) sudah support. Update php.ini: opcache.enable=1 untuk performance maksimal. Gunakan opcache.jit=1255 untuk JIT compiler.",
    },
  ],
}
