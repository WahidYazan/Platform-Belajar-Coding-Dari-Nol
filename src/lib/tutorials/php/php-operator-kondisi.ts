import type { Tutorial } from "../types"

export const phpOperatorKondisi: Tutorial = {
  slug: "php-operator-kondisi",
  title: "PHP: Operator & Kondisi (if/else/switch)",
  description:
    "Pelajari operator PHP (aritmatika, perbandingan, logika) dan kontrol alur dengan if, else, elseif, switch, dan match.",
  category: "PHP",
  level: "Pemula",
  minutes: 20,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "Operator adalah simbol yang melakukan operasi pada data. Kondisi adalah cara PHP membuat keputusan berdasarkan evaluasi benar atau salah. Keduanya adalah fondasi logika pemrograman.",
    },
    { type: "h2", text: "Operator Aritmatika" },
    {
      type: "code",
      lang: "php",
      filename: "operator-aritmatika.php",
      code: `<?php
$a = 10;
$b = 3;

echo $a + $b;   // 13  (penjumlahan)
echo $a - $b;   // 7   (pengurangan)
echo $a * $b;   // 30  (perkalian)
echo $a / $b;   // 3.33 (pembagian)
echo $a % $b;   // 1   (sisa bagi/modulus)
echo $a ** $b;  // 1000 (pangkat)

// Increment & Decrement
$x = 5;
$x++;    // $x = 6 (post-increment)
++$x;    // $x = 7 (pre-increment)
$x--;    // $x = 6 (post-decrement)
--$x;    // $x = 5 (pre-decrement)

// Pembeda pre dan post
$n = 5;
echo $n++; // tampilkan 5, baru jadi 6
echo $n;   // sekarang 6

$m = 5;
echo ++$m; // jadi 6 dulu, baru tampilkan 6
?>`,
    },
    { type: "h2", text: "Operator Perbandingan" },
    {
      type: "code",
      lang: "php",
      filename: "operator-perbandingan.php",
      code: `<?php
$x = 10;
$y = "10";

// Perbandingan nilai (loose comparison)
echo $x == $y;   // true  (nilai sama, tipe beda juga oke)
echo $x != $y;   // false
echo $x === $y;  // false (nilai DAN tipe harus sama = strict)
echo $x !== $y;  // true  (nilai atau tipe beda)

// Perbandingan lainnya
echo $x > 5;     // true
echo $x >= 10;   // true
echo $x < 20;    // true
echo $x <= 10;   // true

// Perbandingan teks
echo "abc" <=> "def"; // -1 (kurang dari)
echo "abc" <=> "abc"; //  0 (sama dengan)
echo "def" <=> "abc"; //  1 (lebih dari)

// Tip: selalu pakai === (strict) untuk menghindari bug tipe data
$nilai = 0;
if ($nilai == false) { }  // BAHAYA! 0 dianggap false
if ($nilai === false) { } // AMAN! 0 bukan false
?>`,
    },
    { type: "h2", text: "Operator Logika" },
    {
      type: "code",
      lang: "php",
      filename: "operator-logika.php",
      code: `<?php
$a = true;
$b = false;

// AND (keduanya harus benar)
echo $a && $b;  // false
echo $a and $b; // false (sama, tapi precedence beda)

// OR (salah satu harus benar)
echo $a || $b;  // true
echo $a or $b;  // true

// NOT (balik nilai)
echo !$a;       // false

// XOR (hanya salah satu yang benar)
echo $a xor $b; // true

// Kombinasi
$umur = 25;
$nama = "Budi";
if ($umur >= 18 && $nama !== "") {
    echo "Bisa daftar";
}

// Short-circuit evaluation
// && berhenti di false pertama
// || berhenti di true pertama
$result = false && someFunction(); // someFunction() tidak dijalankan!
?>`,
    },
    { type: "h2", text: "Operator Lainnya" },
    {
      type: "code",
      lang: "php",
      filename: "operator-lainnya.php",
      code: `<?php
// String concatenation
$nama = "Budi" . " " . "Santoso"; // "Budi Santoso"

// Assignment operators
$x = 10;
$x += 5;  // $x = $x + 5  = 15
$x -= 3;  // $x = $x - 3  = 12
$x *= 2;  // $x = $x * 2  = 24
$x /= 4;  // $x = $x / 4  = 6
$x %= 4;  // $x = $x % 4  = 2

// Null coalescing operator (??)
$nama = $_GET["nama"] ?? "Tamu"; // jika null, pakai default
echo $nama;

// Spaceship operator (<=>)
echo 1 <=> 2; // -1
echo 2 <=> 2; // 0
echo 3 <=> 2; // 1

// Spread operator (...)
$arr1 = [1, 2, 3];
$arr2 = [...$arr1, 4, 5]; // [1, 2, 3, 4, 5]
?>`,
    },
    { type: "h2", text: "Kontrol Alur: if, elseif, else" },
    {
      type: "code",
      lang: "php",
      filename: "kondisi-if.php",
      code: `<?php
$nilai = 85;

// If sederhana
if ($nilai >= 70) {
    echo "Lulus!";
}

// If-else
if ($nilai >= 70) {
    echo "Lulus";
} else {
    echo "Tidak lulus";
}

// If-elseif-else
if ($nilai >= 90) {
    $grade = "A";
} elseif ($nilai >= 80) {
    $grade = "B";
} elseif ($nilai >= 70) {
    $grade = "C";
} elseif ($nilai >= 60) {
    $grade = "D";
} else {
    $grade = "E";
}
echo "Grade: " . $grade; // B

// Nested if (jangan terlalu banyak)
if ($nilai >= 70) {
    if ($nilai >= 90) {
        echo "Lulus dengan sempurna!";
    } else {
        echo "Lulus biasa";
    }
}

// Ternary operator (if dalam satu baris)
$umur = 25;
$status = ($umur >= 18) ? "Dewasa" : "Anak-anak";
echo $status; // Dewasa
?>`,
    },
    { type: "h2", text: "Switch & Match" },
    {
      type: "code",
      lang: "php",
      filename: "switch-match.php",
      code: `<?php
// SWITCH (cara lama, masih valid)
$hari = date("l");

switch ($hari) {
    case "Monday":
        echo "Senin - Mulai kerja!";
        break;
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
    case "Friday":
        echo "Hari kerja biasa";
        break;
    case "Saturday":
        echo "Sabtu - Hari libur!";
        break;
    case "Sunday":
        echo "Minggu - Istirahat!";
        break;
    default:
        echo "Hari tidak dikenal";
}

// MATCH (PHP 8+, lebih elegan & strict)
$kode = 200;

pesan = match ($kode) {
    200 => "OK",
    301 => "Redirect",
    404 => "Not Found",
    500 => "Server Error",
    default => "Unknown",
};

echo $pesan; // OK

// Match dengan kondisi (PHP 8.0+)
$umur = 25;
$kategori = match (true) {
    $umur < 13 => "Anak-anak",
    $umur < 18 => "Remaja",
    $umur < 60 => "Dewasa",
    default => "Lansia",
};
echo $kategori; // Dewasa

// Match lebih cepat dari switch karena === (strict comparison)
// dan mengembalikan nilai (bisa di-assign ke variabel)
?>`,
    },
    { type: "h2", text: "Null Coalescing & Elvis Operator" },
    {
      type: "code",
      lang: "php",
      filename: "null-coalescing.php",
      code: `<?php
// Null coalescing (??) - aman untuk input yang mungkin null
$nama = $_GET["nama"] ?? "Tamu";
$warna = $config["warna"] ?? "biru";

// Bisa chaining
$nilai = $_POST["nilai"] ?? $_GET["nilai"] ?? 0;

// Elvis operator (?:) - singkatan dari ? true : false
$nama = $input ? $input : "Anonim";

// Sebelum null coalescing (cara lama)
if (isset($nama)) {
    $tampil = $nama;
} else {
    $tampil = "Tamu";
}
// Sekarang cukup:
$tampil = $nama ?? "Tamu";

// Nullsafe operator (->?) PHP 8.0+
$negara = $user?->alamat?->negara;
// Jika $user atau $alamat null, hasilnya null (tidak error)
?>`,
    },
    {
      type: "callout",
      title: "Tips",
      tone: "tip",
      text: "Gunakan === (strict comparison) alih-alih == (loose) untuk menghindari bug. PHP akan melakukan type coercion yang tidak terduga dengan ==. Misalnya: 0 == false adalah true, tapi 0 === false adalah false.",
    },
    {
      type: "p",
      text: "Sekarang kamu bisa membuat keputusan dalam kode PHP. Lanjut ke bab Loop untuk memahami cara mengulang operasi.",
    },
  ],
}
