import type { Tutorial } from "../types"

export const phpOOP: Tutorial = {
  slug: "php-oop",
  title: "PHP: Object-Oriented Programming (OOP)",
  description:
    "Kuasai OOP di PHP: class, object, inheritance, interface, trait, visibility, dan fitur modern PHP 8.",
  category: "PHP",
  level: "Menengah",
  minutes: 30,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "OOP (Object-Oriented Programming) mengorganisasi kode ke dalam class dan object. PHP modern didominasi oleh OOP: Laravel, Symfony, semua framework dibangun di atas konsep ini.",
    },
    { type: "h2", text: "Class & Object" },
    {
      type: "code",
      lang: "php",
      filename: "class-object.php",
      code: `<?php
class User {
    public string $nama;
    public string $email;
    private int $umur;
    protected string $role = "user";

    public function __construct(string $nama, string $email, int $umur) {
        $this->nama = $nama;
        $this->email = $email;
        $this->umur = $umur;
    }

    public function getNama(): string {
        return $this->nama;
    }

    public function getInfo(): string {
        return "$this->nama ($this->email)";
    }

    public function setUmur(int $umur): void {
        if ($umur > 0 && $umur < 150) {
            $this->umur = $umur;
        }
    }

    public function getUmur(): int {
        return $this->umur;
    }

    public static function create(string $nama, string $email, int $umur): self {
        return new self($nama, $email, $umur);
    }
}

$user1 = new User("Budi", "budi@mail.com", 25);
$user2 = User::create("Sari", "sari@mail.com", 22);

echo $user1->getNama(); // Budi
$user1->setUmur(30);
echo $user1->getUmur(); // 30
?>`,
    },
    { type: "h2", text: "Visibility (public, protected, private)" },
    {
      type: "code",
      lang: "php",
      filename: "visibility.php",
      code: `<?php
class Account {
    public string $name;         // bisa diakses dari mana saja
    protected string $password;  // class ini + child class
    private float $balance;      // hanya class ini saja

    public function __construct(string $name, string $password, float $balance) {
        $this->name = $name;
        $this->password = $password;
        $this->balance = $balance;
    }

    public function getBalance(): float {
        return $this->balance;
    }

    protected function validatePassword(string $pw): bool {
        return $this->password === $pw;
    }

    public function withdraw(float $amount, string $pw): bool {
        if (!$this->validatePassword($pw)) return false;
        if ($amount > $this->balance) return false;
        $this->balance -= $amount;
        return true;
    }
}

$acc = new Account("Budi", "secret123", 1000000);
echo $acc->name;           // OK (public)
// echo $acc->password;    // ERROR: protected!
// echo $acc->balance;     // ERROR: private!
echo $acc->getBalance();   // OK via public method
?>`,
    },
    { type: "h2", text: "Inheritance & Abstract Class" },
    {
      type: "code",
      lang: "php",
      filename: "inheritance.php",
      code: `<?php
abstract class Shape {
    abstract public function area(): float;
    abstract public function perimeter(): float;

    public function describe(): string {
        return "Luas: {$this->area()}, Keliling: {$this->perimeter()}";
    }
}

class Circle extends Shape {
    public function __construct(private float $radius) {}

    public function area(): float {
        return pi() * $this->radius ** 2;
    }

    public function perimeter(): float {
        return 2 * pi() * $this->radius;
    }
}

class Rectangle extends Shape {
    public function __construct(
        private float $width,
        private float $height
    ) {}

    public function area(): float {
        return $this->width * $this->height;
    }

    public function perimeter(): float {
        return 2 * ($this->width + $this->height);
    }
}

$circle = new Circle(5);
echo $circle->describe(); // Luas: 78.54, Keliling: 31.42

$rect = new Rectangle(4, 6);
echo $rect->describe(); // Luas: 24, Keliling: 20

echo $circle instanceof Shape; // true
?>`,
    },
    { type: "h2", text: "Interface & Trait" },
    {
      type: "code",
      lang: "php",
      filename: "interface-trait.php",
      code: `<?php
interface Loggable {
    public function toLog(): string;
}

trait HasTimestamps {
    public string $createdAt;
    public string $updatedAt;

    public function touch(): void {
        $this->updatedAt = date("Y-m-d H:i:s");
    }
}

trait SoftDelete {
    public ?string $deletedAt = null;

    public function delete(): void {
        $this->deletedAt = date("Y-m-d H:i:s");
    }

    public function restore(): void {
        $this->deletedAt = null;
    }

    public function isDeleted(): bool {
        return $this->deletedAt !== null;
    }
}

class Post implements Loggable {
    use HasTimestamps, SoftDelete;

    public function __construct(
        public string $title,
        public string $content
    ) {
        $this->createdAt = date("Y-m-d H:i:s");
        $this->updatedAt = $this->createdAt;
    }

    public function toLog(): string {
        return "[Post] {$this->title}";
    }
}

$post = new Post("Judul", "Konten");
$post->touch();
$post->delete();
echo $post->isDeleted(); // true
?>`,
    },
    { type: "h2", text: "Magic Methods & PHP 8 Fitur Baru" },
    {
      type: "code",
      lang: "php",
      filename: "magic-modern.php",
      code: `<?php
class Model {
    private array $data = [];

    public function __get(string $name) {
        return $this->data[$name] ?? null;
    }

    public function __set(string $name, mixed $value): void {
        $this->data[$name] = $value;
    }

    public function __toString(): string {
        return json_encode($this->data);
    }

    public function __invoke(string $key): mixed {
        return $this->data[$key] ?? null;
    }
}

$model = new Model();
$model->name = "Budi";
echo $model->name; // Budi
echo $model;       // __toString

// PHP 8.0: Constructor Promotion
class UserBaru {
    public function __construct(
        public string $nama,
        public string $email,
        public int $umur,
        public string $role = "user"
    ) {}
}

$user = new UserBaru(nama: "Budi", email: "budi@mail.com", umur: 25);

// PHP 8.1: Enum
enum Status: string {
    case Active = "active";
    case Inactive = "inactive";
    case Pending = "pending";

    public function label(): string {
        return match($this) {
            self::Active => "Aktif",
            self::Inactive => "Tidak Aktif",
            self::Pending => "Menunggu",
        };
    }
}

$status = Status::Active;
echo $status->value;   // active
echo $status->label(); // Aktif

// PHP 8.1: Readonly
class Point {
    public function __construct(
        public readonly float $x,
        public readonly float $y
    ) {}
}

$p = new Point(1.0, 2.0);
// $p->x = 5.0; // ERROR: readonly!
?>`,
    },
    {
      type: "callout",
      title: "OOP di Framework",
      tone: "info",
      text: "Setelah menguasai OOP dasar ini, kamu siap belajar Laravel. Di Laravel, semua komponen (Model, Controller, Service) adalah class. OOP adalah bahasa yang wajib dikuasai sebelum masuk ke framework.",
    },
  ],
}
