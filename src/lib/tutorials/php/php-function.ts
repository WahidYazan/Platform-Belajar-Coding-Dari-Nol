import type { Tutorial } from "../types"

export const phpFunction: Tutorial = {
  slug: "php-function",
  title: "PHP: Function (Fungsi)",
  description:
    "Pelajari cara membuat fungsi, parameter, return value, variadic, anonymous function, dan closure di PHP.",
  category: "PHP",
  level: "Pemula",
  minutes: 20,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "Fungsi adalah blok kode yang bisa dipanggil berulang kali. Dengan fungsi, kamu menghindari duplikasi kode, membuat kode lebih rapi, dan lebih mudah di-maintain.",
    },
    { type: "h2", text: "Fungsi Dasar" },
    {
      type: "code",
      lang: "php",
      filename: "function-dasar.php",
      code: `<?php
// Fungsi tanpa parameter, tanpa return
function sapa() {
    echo "Halo, Selamat Datang!\\n";
}
sapa(); // panggil fungsi

// Fungsi dengan parameter
function sapaNama($nama) {
    echo "Halo, $nama!\\n";
}
sapaNama("Budi"); // Halo, Budi!

// Fungsi dengan return value
function tambah($a, $b) {
    return $a + $b;
}
$hasil = tambah(10, 20); // 30
echo $hasil;

// Fungsi mengembalikan beberapa nilai (pakai array)
function getInfo($nama, $umur) {
    return [
        "nama" => $nama,
        "umur" => $umur,
        "status" => $umur >= 18 ? "Dewasa" : "Anak"
    ];
}
$info = getInfo("Budi", 25);
echo $info["nama"];  // Budi
echo $info["status"]; // Dewasa
?>`,
    },
    { type: "h2", text: "Parameter Default & Type Hinting" },
    {
      type: "code",
      lang: "php",
      filename: "parameter.php",
      code: `<?php
// Parameter default
function greet($nama = "Tamu", $sapaan = "Halo") {
    echo "$sapaan, $nama!\\n";
}
greet();                // Halo, Tamu!
greet("Budi");          // Halo, Budi!
greet("Budi", "Selamat Pagi"); // Selamat Pagi, Budi!

// Type hinting (PHP 7+)
function tambah(int $a, int $b): int {
    return $a + $b;
}

function namaLengkap(string $depan, string $belakang): string {
    return "$depan $belakang";
}

function aktif(bool $status): bool {
    return $status;
}

// Nullable type (bisa null)
function cariUser(int $id): ?string {
    if ($id === 1) return "Budi";
    return null; // return null juga boleh
}

// Union type (PHP 8.0+)
function format($nilai): string|int {
    if (is_int($nilai)) return $nilai;
    return (string) $nilai;
}

// Typed properties (PHP 7.4+)
// Sudah dibahas di OOP nanti

// Named arguments (PHP 8.0+)
function createOrder(string $item, int $qty, string $note = "") {
    echo "Order: $item x$qty $note\\n";
}
createOrder(item: "Laptop", qty: 1, note: "Warna silver");
// Tidak perlu urut, asalkan nama parameter sama
?>`,
    },
    { type: "h2", text: "Variadic Function (banyak parameter)" },
    {
      type: "code",
      lang: "php",
      filename: "variadic.php",
      code: `<?php
// Operator ... (splat operator)
function total(...$angka) {
    $sum = 0;
    foreach ($angka as $a) {
        $sum += $a;
    }
    return $sum;
}

echo total(1, 2, 3, 4, 5); // 15
echo total(10, 20);         // 30

// Gabungkan dengan parameter biasa
function belanja(string $item, ...$opsi) {
    echo "Item: $item\\n";
    echo "Opsi: " . implode(", ", $opsi) . "\\n";
}
belanja("Laptop", "Garansi 2 tahun", "Bonus tas", "Free ongkir");

// Spread operator saat memanggil
$items = [1, 2, 3, 4, 5];
echo total(...$items); // spread array jadi argument

// Named variadic (PHP 8.0+)
function info(string $name, string ...$skills) {
    echo "$name punya skill: " . implode(", ", $skills) . "\\n";
}
info(name: "Budi", skills: "PHP", "MySQL", "Laravel");
?>`,
    },
    { type: "h2", text: "Anonymous Function & Closure" },
    {
      type: "code",
      lang: "php",
      filename: "anonymous.php",
      code: `<?php
// Anonymous function (tanpa nama)
$tambah = function ($a, $b) {
    return $a + $b;
};
echo $tambah(10, 20); // 30

// Closure: anonymous function yang bisa akses variabel luar
$greeting = "Halo";
$sapa = function ($nama) use ($greeting) {
    echo "$greeting, $nama!\\n";
};
$sapa("Budi"); // Halo, Budi!

// Closure by reference (bisa mengubah variabel luar)
$counter = 0;
$increment = function () use (&$counter) {
    $counter++;
};
$increment();
$increment();
echo $counter; // 2

// Arrow function (PHP 7.4+) - singkat, otomatis return
$kuadrat = fn($x) => $x * $x;
echo $kuadrat(5); // 25

$tambah = fn($a, $b) => $a + $b;
echo $tambah(10, 20); // 30

// Arrow function bisa akses variabel luar otomatis (tanpa use)
$nama = "Budi";
$greet = fn() => "Halo, $nama!";
echo $greet(); // Halo, Budi!

// Closure sebagai callback
$angka = [1, 2, 3, 4, 5];
$genap = array_filter($angka, fn($x) => $x % 2 === 0);
// [2, 4]
?>`,
    },
    { type: "h2", text: "First-Class Callable & Higher-Order Functions" },
    {
      type: "code",
      lang: "php",
      filename: "callable.php",
      code: `<?php
// First-class callable syntax (PHP 8.1+)
function tambah($a, $b) { return $a + $b; }

// Ambil fungsi sebagai callable
$fn = tambah(...); // Closure dari fungsi tambah
echo $fn(10, 20); // 30

// Higher-order function: fungsi yang menerima/fungsi mengembalikan fungsi
function repeat(int $times, callable $fn): array {
    $results = [];
    for ($i = 0; $i < $times; $i++) {
        $results[] = $fn($i);
    }
    return $results;
}

$dikali = repeat(5, fn($i) => $i * 2);
// [0, 2, 4, 6, 8]

// Closure sebagai class method
class Calculator {
    public function tambah($a, $b) {
        return $a + $b;
    }
}

$calc = new Calculator();
$fn = $calc->tambah(...);
echo $fn(10, 20); // 30

// array_map, array_filter, array_reduce dengan closure
$angka = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

$hasil = $angka
    |> fn($arr) => array_filter($arr, fn($x) => $x % 2 === 0) // genap
    |> fn($arr) => array_map(fn($x) => $x ** 2, $arr)          // kuadrat
    |> fn($arr) => array_reduce($arr, fn($c, $x) => $c + $x, 0); // jumlah

echo $hasil; // 220 (4+16+36+64+100)
?>`,
    },
    { type: "h2", text: "Built-in Function Penting" },
    {
      type: "code",
      lang: "php",
      filename: "builtin-functions.php",
      code: `<?php
// String functions
echo strlen("Hello");           // 5
echo substr("Hello World", 6);  // "World"
echo str_replace("a", "o", "banana"); // "bonono"
echo strtolower("HELLO");       // "hello"
echo strtoupper("hello");       // "HELLO"
echo trim("  hi  ");            // "hi"
echo strpos("Hello", "ll");    // 2
echo str_contains("Hello", "el"); // true (PHP 8+)

// Array functions
$count = count([1, 2, 3]);         // 3
$has = in_array("a", ["a", "b"]);   // true
$merged = array_merge([1], [2]);     // [1, 2]
$flipped = array_flip(["a" => 1]);   // [1 => "a"]
$unique = array_unique([1, 1, 2]);   // [1, 2]

// Math functions
echo abs(-5);           // 5
echo round(3.14159, 2); // 3.14
echo ceil(4.2);         // 5
echo floor(4.8);        // 4
echo max(1, 2, 3);      // 3
echo min(1, 2, 3);      // 1
echo sqrt(16);          // 4
echo pow(2, 10);        // 1024
echo rand(1, 100);      // angka random 1-100

// Type checking
$val = 42;
echo is_int($val);      // true
echo is_string($val);   // false
echo is_array($val);    // false
echo is_null($val);     // false
echo is_bool($val);     // false
echo is_numeric($val);  // true
echo empty($val);       // false (42 bukan kosong)
echo isset($val);       // true
?>`,
    },
    {
      type: "callout",
      title: "Tips",
      tone: "tip",
      text: "PHP punya 1000+ built-in fungsi. Jangan dihafal! Ketahui yang dasar (string, array, math, type check), sisanya googling saat butuh. php.net selalu jadi referensi utama.",
    },
    {
      type: "p",
      text: "Fungsi adalah fondasi kode yang bisa dipakai ulang. Lanjut ke bab OOP untuk memahami pemrograman berorientasi objek di PHP.",
    },
  ],
}
