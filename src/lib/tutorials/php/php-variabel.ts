import type { Tutorial } from "../types"

export const phpVariabel: Tutorial = {
  slug: "php-variabel",
  title: "PHP: Variabel & Tipe Data",
  description:
    "Pelajari cara menyimpan data dengan variabel, kenali tipe data di PHP, dan cara mengonversi antar tipe.",
  category: "PHP",
  level: "Pemula",
  minutes: 18,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "Variabel adalah wadah untuk menyimpan data di memori. Di PHP, variabel diawali dengan tanda $ dan tidak perlu dideklarasikan tipe datanya PHP akan mendeteksi otomatis.",
    },
    { type: "h2", text: "Deklarasi variabel" },
    {
      type: "code",
      lang: "php",
      filename: "variabel.php",
      code: `<?php
// Variabel string
$nama = "Budi";
$nama2 = 'Sari'; // single quote juga bisa

// Variabel angka
$umur = 25;
$tinggi = 170.5;

// Variabel boolean
$aktif = true;
$admin = false;

// Variabel array
$hobi = ["coding", "membaca", "games"];

// Variabel null
$tidak_ada = null;

// Cek isi variabel
echo $nama;       // Output: Budi
echo "\\n";
echo $umur;       // Output: 25

// Cek tipe data
echo "\\n";
echo gettype($nama);    // string
echo "\\n";
echo gettype($umur);    // integer
echo "\\n";
echo gettype($tinggi);  // double
echo "\\n";
echo gettype($aktif);   // boolean
?>`,
    },
    { type: "h2", text: "Aturan penamaan variabel" },
    {
      type: "list",
      items: [
        "Harus diawali dengan tanda $ diikuti huruf atau underscore.",
        "Boleh berisi huruf, angka, dan underscore.",
        "Tidak boleh diawali angka ($1name = salah).",
        "Sensitif huruf kecil/besar ($nama ≠ $Nama).",
        "Tidak boleh pakai spasi atau karakter khusus.",
      ],
    },
    {
      type: "code",
      lang: "php",
      filename: "penamaan.php",
      code: `<?php
// Benar
$nama = "Budi";
$nama_lengkap = "Budi Santoso";
$ nama2 = "Sari";   // underscore di depan juga boleh
$angka1 = 100;

// Salah (akan error)
// $1nama = " salah";  // diawali angka
// $nama-lengkap = "salah"; // pakai strip
// echo $nama lengkap; // spasi

// Constanta (tidak bisa diubah nilainya)
define("NAMA_APP", "MyWebsite");
define("MAX_USERS", 100);
echo NAMA_APP;  // MyWebsite
echo MAX_USERS; // 100

// Konstanta dengan const (lebih modern)
const PI = 3.14159;
echo PI;
?>`,
    },
    { type: "h2", text: "Tipe data di PHP" },
    {
      type: "h3",
      text: "1. String (teks)",
    },
    {
      type: "code",
      lang: "php",
      filename: "string.php",
      code: `<?php
$nama = "Budi";
$kalimat = "Nama saya $nama";  // double quote: variabel diekspansi
$kalimat2 = 'Nama saya $nama'; // single quote: teks mentah

echo $kalimat;   // Nama saya Budi
echo "\\n";
echo $kalimat2;  // Nama saya $nama

// Panjang string
echo strlen($nama); // 4

// Konkatenasi (penggabungan)
$sapaan = "Halo, " . $nama . "!";
echo $sapaan; // Halo, Budi!

// Multiline string
$teks = <<<TEXT
Ini teks
multi baris
pakai heredoc
TEXT;
echo $teks;
?>`,
    },
    {
      type: "h3",
      text: "2. Integer & Float (angka)",
    },
    {
      type: "code",
      lang: "php",
      filename: "angka.php",
      code: `<?php
// Integer
$positif = 42;
$negatif = -10;
$heksadesimal = 0xFF;  // 255
$oktal = 017;          // 15
$biner = 0b1010;       // 10

// Float (desimal)
$pi = 3.14159;
$suhu = -5.5;

// Operasi matematika
$hasil = 10 + 5;    // 15
$hasil2 = 10 - 3;   // 7
$hasil3 = 4 * 3;    // 12
$hasil4 = 10 / 3;   // 3.333...
$hasil5 = 10 % 3;   // 1 (sisa bagi)

// Fungsi matematika berguna
echo round(3.14159, 2); // 3.14
echo ceil(4.2);         // 5 (ke atas)
echo floor(4.8);        // 4 (ke bawah)
echo max(10, 20, 5);    // 20
echo min(10, 20, 5);    // 5
echo abs(-10);          // 10
?>`,
    },
    {
      type: "h3",
      text: "3. Boolean",
    },
    {
      type: "code",
      lang: "php",
      filename: "boolean.php",
      code: `<?php
$benar = true;
$salah = false;

// Boolean dari evaluasi
$umur = 20;
$bolehMasuk = $umur >= 18; // true

// Cek kebenaran (truthy/falsy)
// Nilai yang dianggap false di PHP:
// false, 0, 0.0, "0", "", null, []

if ($bolehMasuk) {
    echo "Selamat datang!";
} else {
    echo "Maaf, kamu belum cukup umur.";
}

// var_dump untuk debugging (tampilkan tipe + nilai)
var_dump($benar);  // bool(true)
var_dump($salah);  // bool(false)
?>`,
    },
    {
      type: "h3",
      text: "4. Array",
    },
    {
      type: "code",
      lang: "php",
      filename: "array-intro.php",
      code: `<?php
// Indexed array
$buah = ["Apel", "Mangga", "Jeruk"];
echo $buah[0]; // Apel

// Associative array
$profil = [
    "nama" => "Budi",
    "umur" => 25,
    "kota" => "Jakarta"
];
echo $profil["nama"]; // Budi

// Multidimensional array
$siswa = [
    ["nama" => "Budi", "nilai" => 85],
    ["nama" => "Sari", "nilai" => 92],
];
echo $siswa[0]["nama"]; // Budi

// Cek panjang array
echo count($buah); // 3

// Tambah elemen
$buah[] = "Pisang"; // tambah di akhir
?>`,
    },
    {
      type: "h3",
      text: "5. NULL",
    },
    {
      type: "code",
      lang: "php",
      filename: "null.php",
      code: `<?php
$var = null;

// Cek apakah null
echo is_null($var); // true (1)

// null dianggap false dalam kondisi
if (!$var) {
    echo "Variabel kosong";
}

// Reset variabel ke null
$nama = "Budi";
$nama = null; // sekarang kosong
?>`,
    },
    { type: "h2", text: "Type Juggling (Konversi tipe otomatis)" },
    {
      type: "code",
      lang: "php",
      filename: "type-juggling.php",
      code: `<?php
// PHP otomatis mengonversi tipe saat diperlukan
$angka = 10;
$teks = "Jumlah: " . $angka; // "Jumlah: 10"

// Casting manual (type casting)
$x = "100";
$y = (int) $x;      // ubah ke integer
$z = (float) $x;    // ubah ke float
$b = (bool) $x;     // ubah ke boolean
$s = (string) $angka; // ubah ke string

// Fungsi type checking
$val = 42;
echo is_int($val);     // true
echo is_float($val);   // false
echo is_string($val);  // false
echo is_bool($val);    // false
echo is_array($val);   // false
echo is_null($val);    // false

// Konversi eksplisit
echo intval("42");     // 42
echo floatval("3.14"); // 3.14
echo strval(100);      // "100"
?>`,
    },
    {
      type: "callout",
      title: "Tips debugging",
      tone: "tip",
      text: "Gunakan var_dump() untuk melihat tipe data dan nilai secara detail. echo hanya menampilkan nilai, var_dump() menampilkan tipe + nilai + panjang. Sangat berguna saat debug!",
    },
    {
      type: "p",
      text: "Sekarang kamu mengerti variabel dan tipe data di PHP. Lanjut ke bab Operator & Kondisi untuk memahami cara membuat keputusan dalam kode.",
    },
  ],
}
