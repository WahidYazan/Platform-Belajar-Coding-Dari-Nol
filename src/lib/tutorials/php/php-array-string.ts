import type { Tutorial } from "../types"

export const phpArrayString: Tutorial = {
  slug: "php-array-string",
  title: "PHP: Array & String Lengkap",
  description:
    "Kuasai array (indexed, associative, multidimensional) dan manipulasi string di PHP dengan semua fungsi penting.",
  category: "PHP",
  level: "Pemula",
  minutes: 25,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "Array adalah struktur data paling penting di PHP. Array bisa menyimpan banyak nilai dalam satu variabel. String adalah tipe data teks yang paling sering digunakan. Keduanya wajib dikuasai.",
    },
    { type: "h2", text: "Array: Tiga Jenis Utama" },
    {
      type: "h3",
      text: "1. Indexed Array (bernomor)",
    },
    {
      type: "code",
      lang: "php",
      filename: "array-indexed.php",
      code: `<?php
// Cara membuat
$buah = ["Apel", "Mangga", "Jeruk"];
$angka = array(10, 20, 30);

// Akses elemen (mulai dari 0)
echo $buah[0]; // Apel
echo $buah[2]; // Jeruk

// Tambah elemen
$buah[] = "Pisang";          // di akhir
$buah[] = "Semangka";        // di akhir lagi
array_push($buah, "Durian"); // cara explicit
array_unshift($buah, "Melon"); // di awal

// Hapus elemen
$last = array_pop($buah);     // hapus dari akhir
$first = array_shift($buah); // hapus dari awal
unset($buah[1]);              // hapus index tertentu

// Slice (ambil sebagian)
$slice = array_slice($buah, 1, 2); // dari index 1, ambil 2

// Reverse
$reverse = array_reverse($buah);

// Sort
sort($buah);         // ascending
rsort($buah);        // descending

// Cek apakah ada di array
echo in_array("Apel", $buah); // true

// Cari index
$key = array_search("Mangga", $buah);

// Panjang array
echo count($buah);   // atau sizeof($buah)
?>`,
    },
    {
      type: "h3",
      text: "2. Associative Array (bernama)",
    },
    {
      type: "code",
      lang: "php",
      filename: "array-associative.php",
      code: `<?php
// Array dengan key bernama
$profil = [
    "nama" => "Budi Santoso",
    "umur" => 25,
    "kota" => "Jakarta",
    "hobi" => ["coding", "membaca", "games"]
];

// Akses
echo $profil["nama"]; // Budi Santoso
echo $profil["hobi"][0]; // coding

// Tambah/update
$profil["email"] = "budi@mail.com";
$profil["umur"] = 26; // update

// Hapus
unset($profil["kota"]);

// Loop associative array
foreach ($profil as $key => $value) {
    if (is_array($value)) {
        echo "$key: " . implode(", ", $value) . "\\n";
    } else {
        echo "$key: $value\\n";
    }
}

// Ambil semua keys dan values
$keys = array_keys($profil);   // ["nama", "umur", "hobi", "email"]
$values = array_values($profil);

// Cek apakah key ada
echo array_key_exists("nama", $profil); // true
echo isset($profil["nama"]);            // true
?>`,
    },
    {
      type: "h3",
      text: "3. Multidimensional Array",
    },
    {
      type: "code",
      lang: "php",
      filename: "array-multi.php",
      code: `<?php
// Array 2D (seperti tabel)
$siswa = [
    ["nama" => "Budi", "nilai" => 85, "lulus" => true],
    ["nama" => "Sari", "nilai" => 92, "lulus" => true],
    ["nama" => "Andi", "nilai" => 65, "lulus" => false],
    ["nama" => "Rina", "nilai" => 78, "lulus" => true],
];

// Akses elemen
echo $siswa[0]["nama"]; // Budi

// Loop 2D
foreach ($siswa as $s) {
    $status = $s["lulus"] ? "Lulus" : "Tidak Lulus";
    echo $s["nama"] . ": " . $s["nilai"] . " ($status)\\n";
}

// Filter: hanya yang lulus
$lulus = array_filter($siswa, fn($s) => $s["lulus"]);
echo "Lulus: " . count($lulus) . " orang";

// Map: ambil semua nama
$nama = array_map(fn($s) => $s["nama"], $siswa);
echo implode(", ", $nama); // Budi, Sari, Andi, Rina

// Array 3D (lebih dari 2D jarang dipakai)
$kelas = [
    "X-A" => [
        ["nama" => "Budi"],
        ["nama" => "Sari"]
    ],
    "X-B" => [
        ["nama" => "Andi"],
        ["nama" => "Rina"]
    ]
];
echo $kelas["X-A"][0]["nama"]; // Budi
?>`,
    },
    { type: "h2", text: "Fungsi Array Penting" },
    {
      type: "code",
      lang: "php",
      filename: "fungsi-array.php",
      code: `<?php
$angka = [3, 1, 4, 1, 5, 9, 2, 6];

// Sort & Order
sort($angka);           // ascending: [1, 1, 2, 3, 4, 5, 6, 9]
rsort($angka);          // descending
asort($angka);          // sort by value, keep key
arsort($angka);         // sort by value desc, keep key
ksort($angka);          // sort by key
usort($angka, fn($a, $b) => $a - $b); // custom sort

// Transform
$mapped = array_map(fn($x) => $x * 2, $angka); // gandakan semua
$filtered = array_filter($angka, fn($x) => $x > 3); // ambil > 3
$reduced = array_reduce($angka, fn($carry, $x) => $carry + $x, 0); // jumlah semua

// Gabung & Pisah
$a = [1, 2, 3];
$b = [4, 5, 6];
$gabung = array_merge($a, $b); // [1,2,3,4,5,6]
$gabung2 = [...$a, ...$b];     // spread operator (modern)

// Flip (tukar key-value)
$flip = array_flip(["a" => 1, "b" => 2]); // [1 => "a", 2 => "b"]

// Unique
$duplikat = [1, 2, 2, 3, 3, 3];
$unique = array_unique($duplikat); // [1, 2, 3]

// Implode & Explode (array <-> string)
$teks = implode(", ", ["a", "b", "c"]); // "a, b, c"
$pecah = explode(", ", "a, b, c");     // ["a", "b", "c"]

// Array chunk (pecah jadi beberapa bagian)
$chunks = array_chunk([1,2,3,4,5,6], 2); // [[1,2],[3,4],[5,6]]

// Array key exists & search
echo in_array(5, $angka);    // true/false
echo array_search(5, $angka); // index atau false

// Array walk (loop dengan callback)
array_walk($angka, function (&$val, $key) {
    $val = $val * 10;
});
?>`,
    },
    { type: "h2", text: "Manipulasi String" },
    {
      type: "code",
      lang: "php",
      filename: "string-manipulasi.php",
      code: `<?php
$teks = "  Halo, Selamat Datang di PHP!  ";

// Panjang string
echo strlen($teks); // 30

// Trim (hapus spasi di awal/akhir)
echo trim($teks); // "Halo, Selamat Datang di PHP!"
echo ltrim($teks); // hapus spasi kiri
echo rtrim($teks); // hapus spasi kanan

// Case (ubah huruf)
echo strtolower($teks); // " halo, selamat datang di php! "
echo strtoupper($teks); // " HALO, SELAMAT DATANG DI PHP! "
echo ucfirst("hello"); // "Hello"
echo lcfirst("Hello"); // "hello"
echo ucwords("hello world"); // "Hello World"

// Substring (potong teks)
$teks = "Hello, World!";
echo substr($teks, 0, 5);  // "Hello"
echo substr($teks, 7);     // "World!"
echo substr($teks, -6);    // "orld!"
echo mb_substr($teks, 0, 5, "UTF-8"); // multibyte safe

// Pencarian
echo strpos("Hello World", "World"); // 6 (index)
echo strrpos("Hello World", "l");    // 9 (index terakhir)
echo str_contains("Hello World", "World"); // true (PHP 8+)
echo str_starts_with("Hello", "He");       // true (PHP 8+)
echo str_ends_with("Hello", "lo");         // true (PHP 8+)

// Replace (ganti)
echo str_replace("World", "PHP", "Hello World"); // "Hello PHP"
echo str_ireplace("hello", "Hi", "Hello World"); // case-insensitive

// Split (pecah)
$kata = explode(" ", "Ini adalah kalimat");
// ["Ini", "adalah", "kalimat"]

$gabung = implode(" ", $kata); // "Ini adalah kalimat"

// Padding
echo str_pad("42", 5, "0", STR_PAD_LEFT); // "00042"
echo str_pad("Hi", 10, "-"); // "Hi--------"

// Repeat
echo str_repeat("Ha", 3); // "HaHaHa"

// Reverse
echo strrev("Hello"); // "olleH"

// Number formatting
echo number_format(1234567.891, 2, ",", "."); // "1.234.567,89"
?>`,
    },
    {
      type: "h3",
      text: "Regular Expression (Regex) di PHP",
    },
    {
      type: "code",
      lang: "php",
      filename: "regex.php",
      code: `<?php
$email = "budi@example.com";

// Pencarian pola dengan regex
if (preg_match("/^[\\w.-]+@[\\w.-]+\\.\\w+$/", $email)) {
    echo "Email valid!";
}

// preg_match: cari satu kecocokan
$text = "Halo 123 dunia 456";
preg_match("/\\d+/", $text, $match);
echo $match[0]; // 123

// preg_match_all: cari semua kecocokan
preg_match_all("/\\d+/", $text, $matches);
print_r($matches[0]); // [123, 456]

// preg_replace: ganti berdasarkan pola
$clean = preg_replace("/[^a-zA-Z0-9]/", "", "Hello World! 123");
echo $clean; // "HelloWorld123"

// Validasi dengan regex
function validasiNoHP($no) {
    return preg_match("/^(\\+62|62|0)8[1-9][0-9]{6,9}$/", $no);
}

echo validasiNoHP("081234567890") ? "Valid" : "Invalid";
?>`,
    },
    {
      type: "callout",
      title: "Multibyte String",
      tone: "warning",
      text: "Untuk teks Bahasa Indonesia/Unicode, selalu pakai mb_* fungsi (mb_strlen, mb_substr, dll.) dan set charset ke UTF-8. Fungsi biasa (strlen, substr) menghitung byte, bukan karakter.",
    },
    {
      type: "p",
      text: "Kamu sudah menguasai array dan string di PHP. Lanjut ke bab Function untuk belajar cara membuat kode yang bisa dipakai ulang.",
    },
  ],
}
