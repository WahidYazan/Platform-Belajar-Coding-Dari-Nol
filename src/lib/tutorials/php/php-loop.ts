import type { Tutorial } from "../types"

export const phpLoop: Tutorial = {
  slug: "php-loop",
  title: "PHP: Loop (Perulangan)",
  description:
    "Pelajari for, while, do-while, foreach, break, continue, dan cara mengulang operasi di PHP.",
  category: "PHP",
  level: "Pemula",
  minutes: 18,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "Loop adalah cara menjalankan kode berulang kali. Tanpa loop, kamu harus menulis kode yang sama puluhan atau ratusan kali. PHP punya beberapa jenis loop yang bisa kamu pilih sesuai kebutuhan.",
    },
    { type: "h2", text: "1. Perulangan for" },
    {
      type: "p",
      text: "for cocok ketika kamu tahu pasti berapa kali ingin mengulang.",
    },
    {
      type: "code",
      lang: "php",
      filename: "loop-for.php",
      code: `<?php
// for (inisialisasi; kondisi; update)

// Cetak angka 1 sampai 5
for ($i = 1; $i <= 5; $i++) {
    echo $i . " "; // 1 2 3 4 5
}

echo "\\n";

// Hitung jumlah genap dari 1 sampai 20
$genap = 0;
for ($i = 2; $i <= 20; $i += 2) {
    $genap++;
}
echo "Jumlah genap: " . $genap; // 10

echo "\\n";

// Nested loop (loop di dalam loop)
for ($i = 1; $i <= 3; $i++) {
    for ($j = 1; $j <= 3; $j++) {
        echo "$i,$j ";
    }
    echo "\\n";
}
// 1,1 1,2 1,3
// 2,1 2,2 2,3
// 3,1 3,2 3,3
?>`,
    },
    { type: "h2", text: "2. Perulangan while" },
    {
      type: "p",
      text: "while cocok ketika kamu tidak tahu pasti kapan berhenti, tergantung kondisi tertentu.",
    },
    {
      type: "code",
      lang: "php",
      filename: "loop-while.php",
      code: `<?php
// while (kondisi) { ... }

// Hitung mundur dari 5
$angka = 5;
while ($angka > 0) {
    echo $angka . " "; // 5 4 3 2 1
    $angka--;
}

echo "\\n";

// Input user sampai benar (simulasi)
$benar = false;
$percobaan = 0;
$secret = 7;

// Simulasi input
$input = [3, 9, 7]; // tebakan user
$index = 0;

while (!$benar && $index < count($input)) {
    $tebakan = $input[$index];
    $percobaan++;

    if ($tebakan == $secret) {
        $benar = true;
        echo "Benar dalam $percobaan percobaan!";
    } else {
        echo "Salah ($tebakan). Coba lagi.\\n";
    }
    $index++;
}

// while(true) dengan break untuk loop tak terbatas
$count = 0;
while (true) {
    $count++;
    if ($count >= 10) break; // keluar dari loop
}
echo "Selesai: $count iterasi";
?>`,
    },
    { type: "h2", text: "3. Perulangan do-while" },
    {
      type: "p",
      text: "do-while selalu menjalankan kode minimal 1 kali sebelum mengecek kondisi.",
    },
    {
      type: "code",
      lang: "php",
      filename: "loop-dowhile.php",
      code: `<?php
// do { ... } while (kondisi);

$angka = 100;

// while biasa: tidak dijalankan karena 100 > 5
while ($angka < 5) {
    echo "Ini tidak akan tampil";
}

// do-while: dijalankan 1 kali meski kondisi false
do {
    echo "Ini pasti tampil! "; // tampil 1 kali
} while ($angka < 5);

// Contoh praktis: menu sederhana
$pilihan = 0;
do {
    echo "\\n--- MENU ---\\n";
    echo "1. Lihat Data\\n";
    echo "2. Tambah Data\\n";
    echo "3. Keluar\\n";

    // Simulasi user input
    $pilihan = [1, 3][$index++ ?? 0] ?? 3;

    switch ($pilihan) {
        case 1: echo "Menampilkan data...\\n"; break;
        case 2: echo "Menambah data...\\n"; break;
        case 3: echo "Terima kasih!\\n"; break;
    }
} while ($pilihan != 3);
?>`,
    },
    { type: "h2", text: "4. Perulangan foreach (untuk array)" },
    {
      type: "p",
      text: "foreach adalah loop khusus untuk array. Ini adalah loop yang paling sering dipakai di PHP.",
    },
    {
      type: "code",
      lang: "php",
      filename: "loop-foreach.php",
      code: `<?php
// Indexed array
$buah = ["Apel", "Mangga", "Jeruk"];

// foreach ($array as $value)
foreach ($buah as $item) {
    echo $item . "\\n";
}
// Apel
// Mangga
// Jeruk

// foreach ($array as $key => $value)
$profil = [
    "nama" => "Budi",
    "umur" => 25,
    "kota" => "Jakarta"
];

foreach ($profil as $key => $value) {
    echo "$key: $value\\n";
}
// nama: Budi
// umur: 25
// kota: Jakarta

// Nested foreach
$siswa = [
    ["nama" => "Budi", "nilai" => 85],
    ["nama" => "Sari", "nilai" => 92],
    ["nama" => "Andi", "nilai" => 78],
];

foreach ($siswa as $s) {
    echo $s["nama"] . ": " . $s["nilai"] . "\\n";
}
// Budi: 85
// Sari: 92
// Andi: 78

// Foreach dengan reference (&) untuk mengubah array langsung
$angka = [1, 2, 3, 4, 5];
foreach ($angka as &$val) {
    $val *= 2; // gandakan setiap elemen
}
unset($val); // penting! lepas reference
// $angka sekarang [2, 4, 6, 8, 10]
?>`,
    },
    { type: "h2", text: "5. Break & Continue" },
    {
      type: "code",
      lang: "php",
      filename: "break-continue.php",
      code: `<?php
// BREAK: keluar dari loop sepenuhnya
for ($i = 1; $i <= 10; $i++) {
    if ($i == 6) break; // berhenti di 6
    echo $i . " "; // 1 2 3 4 5
}

echo "\\n";

// CONTINUE: skip iterasi ini, lanjut ke berikutnya
for ($i = 1; $i <= 10; $i++) {
    if ($i % 2 == 0) continue; // skip genap
    echo $i . " "; // 1 3 5 7 9
}

echo "\\n";

// Break di nested loop (dengan label)
 OUTER:
for ($i = 1; $i <= 5; $i++) {
    for ($j = 1; $j <= 5; $j++) {
        if ($j == 3) break OUTER; // keluar dari kedua loop
        echo "$i,$j ";
    }
}
// 1,1 1,2

// Continue di nested loop
for ($i = 1; $i <= 3; $i++) {
    for ($j = 1; $j <= 3; $j++) {
        if ($j == 2) continue; // skip kolom 2
        echo "$i,$j ";
    }
    echo "\\n";
}
// 1,1 1,3
// 2,1 2,3
// 3,1 3,3
?>`,
    },
    { type: "h2", text: "6. Contoh Praktis" },
    {
      type: "code",
      lang: "php",
      filename: "contoh-praktis.php",
      code: `<?php
// Tabel perkalian
echo "Tabel Perkalian 5:\\n";
for ($i = 1; $i <= 10; $i++) {
    echo "5 x $i = " . (5 * $i) . "\\n";
}

// Cari bilangan prima dari 1 sampai 50
echo "\\nBilangan Prima: ";
for ($n = 2; $n <= 50; $n++) {
    $prima = true;
    for ($i = 2; $i <= sqrt($n); $i++) {
        if ($n % $i == 0) {
            $prima = false;
            break;
        }
    }
    if ($prima) echo $n . " ";
}
// 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47

// Reverse array
$ angka = [1, 2, 3, 4, 5];
$reverse = [];
for ($i = count($angka) - 1; $i >= 0; $i--) {
    $reverse[] = $angka[$i];
}
// [5, 4, 3, 2, 1]
?>`,
    },
    {
      type: "callout",
      title: "Kapan pakai yang mana?",
      tone: "info",
      text: "for: tahu pasti berapa kali ulang. while: tidak tahu kapan berhenti (tergantung kondisi). do-while: minimal jalan 1 kali. foreach: khusus untuk array selalu pakai ini untuk array!",
    },
    {
      type: "p",
      text: "Sekarang kamu bisa mengulang operasi dengan loop. Lanjut ke bab Array & String untuk mempelajari cara kerja data koleksi di PHP.",
    },
  ],
}
