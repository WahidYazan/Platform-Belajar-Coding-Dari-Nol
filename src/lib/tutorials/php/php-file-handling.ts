import type { Tutorial } from "../types"

export const phpFileHandling: Tutorial = {
  slug: "php-file-handling",
  title: "PHP: File Handling & I/O",
  description:
    "Pelajari cara membaca, menulis, dan mengelola file di PHP: text file, JSON, CSV, dan file system.",
  category: "PHP",
  level: "Menengah",
  minutes: 18,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "File handling memungkinkan PHP berinteraksi dengan sistem file: membaca konten file, menulis data baru, menghapus file, dan mengelola direktori. Ini berguna untuk menyimpan data tanpa database.",
    },
    { type: "h2", text: "Membaca File" },
    {
      type: "code",
      lang: "php",
      filename: "baca-file.php",
      code: `<?php
// Cara 1: file_get_contents (paling mudah)
$konten = file_get_contents("data.txt");
echo $konten;

// Baca dari URL juga bisa!
$html = file_get_contents("https://example.com");

// Cara 2: file() - baca per baris jadi array
$baris = file("data.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($baris as $i => $baris) {
    echo "Baris $i: $baris\\n";
}

// Cara 3: fopen + fread (untuk file besar)
$handle = fopen("data.txt", "r"); // r = read
if ($handle) {
    while (!feof($handle)) {
        $buffer = fgets($handle, 1024); // baca 1024 byte per baris
        echo $buffer;
    }
    fclose($handle); // SELALU tutup file handle!
}

// Cara 4: file() untuk membaca semua sekaligus
$semua = file_get_contents("data.json");
$data = json_decode($semua, true); // ubah jadi array PHP
?>`,
    },
    { type: "h2", text: "Menulis File" },
    {
      type: "code",
      lang: "php",
      filename: "tulis-file.php",
      code: `<?php
// Cara 1: file_put_contents (paling mudah)
file_put_contents("output.txt", "Halo Dunia!");

// Menulis di akhir file (append) dengan flag
file_put_contents("log.txt", "Log baru\\n", FILE_APPEND);

// Cara 2: fopen + fwrite
$handle = fopen("output.txt", "w"); // w = write (timpa), a = append
if ($handle) {
    fwrite($handle, "Baris pertama\\n");
    fwrite($handle, "Baris kedua\\n");
    fclose($handle);
}

// Cara 3: file_put_contents dengan array
$baris = ["Baris 1", "Baris 2", "Baris 3"];
file_put_contents("output.txt", implode("\\n", $baris));

// Copy file
copy("asal.txt", "tujuan.txt");

// Rename/Rename file
rename("lama.txt", "baru.txt");

// Hapus file
unlink("file_lama.txt");

// Cek apakah file ada
if (file_exists("data.txt")) {
    echo "File ada!";
    echo "Ukuran: " . filesize("data.txt") . " bytes";
    echo "Terakhir diubah: " . date("Y-m-d H:i:s", filemtime("data.txt"));
}
?>`,
    },
    { type: "h2", text: "JSON File" },
    {
      type: "code",
      lang: "php",
      filename: "json-file.php",
      code: `<?php
// Simpan data ke JSON
$users = [
    ["nama" => "Budi", "email" => "budi@mail.com", "umur" => 25],
    ["nama" => "Sari", "email" => "sari@mail.com", "umur" => 22],
    ["nama" => "Andi", "email" => "andi@mail.com", "umur" => 28],
];

// Encode: PHP array → JSON string
$json = json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
file_put_contents("users.json", $json);

// Decode: JSON string → PHP array
$json = file_get_contents("users.json");
$users = json_decode($json, true); // true = associative array

// Tampilkan
foreach ($users as $user) {
    echo $user["nama"] . " - " . $user["email"] . "\\n";
}

// Cek error JSON
$data = json_decode("invalid json", true);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo "JSON Error: " . json_last_error_msg();
}

// Update data tertentu
$users[0]["umur"] = 26; // Update umur Budi
file_put_contents("users.json", json_encode($users, JSON_PRETTY_PRINT));

// Hapus user tertentu
$users = array_filter($users, fn($u) => $u["nama"] !== "Andi");
file_put_contents("users.json", json_encode(array_values($users), JSON_PRETTY_PRINT));
?>`,
    },
    { type: "h2", text: "CSV File" },
    {
      type: "code",
      lang: "php",
      filename: "csv-file.php",
      code: `<?php
// Membaca CSV
$handle = fopen("data.csv", "r");
if ($handle) {
    // Header (baris pertama)
    $header = fgetcsv($handle);

    // Data (baris selanjutnya)
    while (($baris = fgetcsv($handle)) !== false) {
        $row = array_combine($header, $baris);
        echo $row["nama"] . " - " . $row["email"] . "\\n";
    }
    fclose($handle);
}

// Menulis CSV
$handle = fopen("output.csv", "w");
if ($handle) {
    // Header
    fputcsv($handle, ["Nama", "Email", "Umur"]);

    // Data
    fputcsv($handle, ["Budi", "budi@mail.com", 25]);
    fputcsv($handle, ["Sari", "sari@mail.com", 22]);

    fclose($handle);
}

// CSV ke array (mudah)
function readCSV(string $file): array {
    $data = [];
    $handle = fopen($file, "r");
    if ($handle) {
        $header = fgetcsv($handle);
        while (($row = fgetcsv($handle)) !== false) {
            $data[] = array_combine($header, $row);
        }
        fclose($handle);
    }
    return $data;
}

// Array ke CSV
function writeCSV(string $file, array $data): void {
    $handle = fopen($file, "w");
    if ($handle && !empty($data)) {
        fputcsv($handle, array_keys($data[0]));
        foreach ($data as $row) {
            fputcsv($handle, $row);
        }
        fclose($handle);
    }
}
?>`,
    },
    { type: "h2", text: "Manajemen Direktori" },
    {
      type: "code",
      lang: "php",
      filename: "directories.php",
      code: `<?php
// Buat direktori
mkdir("uploads/images", 0755, true); // true = recursive

// Hapus direktori (harus kosong)
rmdir("folder_kosong");

// Hapus direktori beserta isinya
function deleteDir($dir) {
    if (is_dir($dir)) {
        $objects = scandir($dir);
        foreach ($objects as $object) {
            if ($object != "." && $object != "..") {
                if (is_dir($dir . "/" . $object)) {
                    deleteDir($dir . "/" . $object);
                } else {
                    unlink($dir . "/" . $object);
                }
            }
        }
        rmdir($dir);
    }
}

// List isi direktori
$files = scandir("uploads");
foreach ($files as $file) {
    if ($file !== "." && $file !== "..") {
        $path = "uploads/" . $file;
        $type = is_dir($path) ? "DIR" : "FILE";
        $ukuran = is_file($path) ? filesize($path) : 0;
        echo "[$type] $file ($ukuran bytes)\\n";
    }
}

// Recursive scan
function scanAll($dir) {
    $results = [];
    $items = scandir($dir);
    foreach ($items as $item) {
        if ($item === "." || $item === "..") continue;
        $path = $dir . "/" . $item;
        if (is_dir($path)) {
            $results = array_merge($results, scanAll($path));
        } else {
            $results[] = $path;
        }
    }
    return $results;
}

$semuaFile = scanAll("uploads");
print_r($semuaFile);

// Path info
$path = "/var/www/uploads/image.jpg";
echo pathinfo($path, PATHINFO_DIRNAME);  // /var/www/uploads
echo pathinfo($path, PATHINFO_BASENAME); // image.jpg
echo pathinfo($path, PATHINFO_EXTENSION); // jpg
echo pathinfo($path, PATHINFO_FILENAME);  // image
?>`,
    },
    {
      type: "callout",
      title: "Tips Keamanan",
      tone: "warning",
      text: "Jangan pernah biarkan user mengupload file tanpa validasi. Selalu: (1) cek ekstensi & MIME type, (2) batasi ukuran, (3) generate nama unik, (4) simpan di luar public root jika memungkinkan, (5) jangan eksekuti file yang diupload.",
    },
    {
      type: "p",
      text: "File handling memungkinkan PHP berinteraksi dengan sistem file. Lanjut ke bab Database untuk menyimpan data secara persisten.",
    },
  ],
}
