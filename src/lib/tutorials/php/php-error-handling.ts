import type { Tutorial } from "../types"

export const phpErrorHandling: Tutorial = {
  slug: "php-error-handling",
  title: "PHP: Error Handling & Exception",
  description:
    "Pelajari cara menangani error dan exception di PHP: try-catch, custom exception, dan error reporting.",
  category: "PHP",
  level: "Menengah",
  minutes: 15,
  date: "2026-08-17",
  content: [
    {
      type: "p",
      text: "Error handling yang baik membedakan aplikasi yang stabil dari yang sering crash. PHP menyediakan mekanisme exception untuk menangani error secara terstruktur dan gracefully.",
    },
    { type: "h2", text: "Try-Catch-Finally" },
    {
      type: "code",
      lang: "php",
      filename: "try-catch.php",
      code: `<?php
// Dasar try-catch
try {
    $angka = 10;
    $hasil = $angka / 0; // Division by zero
    echo $hasil;
} catch (DivisionByZeroError $e) {
    echo "Error: " . $e->getMessage();
} finally {
    // Selalu dijalankan, error atau tidak
    echo " (blok finally dijalankan)";
}

// Multiple catch
try {
    $data = json_decode("invalid json", true);
    if ($data === null) {
        throw new InvalidArgumentException("JSON tidak valid");
    }
    $nama = $data["nama"] ?? throw new RuntimeException("Key 'nama' tidak ditemukan");
} catch (InvalidArgumentException $e) {
    echo "Invalid arg: " . $e->getMessage();
} catch (RuntimeException $e) {
    echo "Runtime: " . $e->getMessage();
} catch (Exception $e) {
    echo "Umum: " . $e->getMessage();
} finally {
    echo "Selesai";
}

// Multi-catch (PHP 8.0+)
try {
    // kode...
} catch (InvalidArgumentException|RuntimeException $e) {
    echo "Error: " . $e->getMessage();
}
?>`,
    },
    { type: "h2", text: "Custom Exception" },
    {
      type: "code",
      lang: "php",
      filename: "custom-exception.php",
      code: `<?php
// Buat exception khusus
class UserNotFoundException extends Exception {
    public function __construct(int $id, string $message = "") {
        parent::__construct($message ?: "User dengan ID $id tidak ditemukan");
    }
}

class ValidationException extends Exception {
    private array $errors;

    public function __construct(array $errors) {
        $this->errors = $errors;
        parent::__construct("Validasi gagal: " . implode(", ", $errors));
    }

    public function getErrors(): array {
        return $this->errors;
    }
}

class InsufficientBalanceException extends Exception {}

// Penggunaan
function findUser(int $id): array {
    $users = [1 => ["nama" => "Budi"], 2 => ["nama" => "Sari"]];
    if (!isset($users[$id])) {
        throw new UserNotFoundException($id);
    }
    return $users[$id];
}

function transfer(float $from, float $to, float $amount): void {
    if ($amount > $from) {
        throw new InsufficientBalanceException("Saldo tidak cukup");
    }
    // proses transfer...
}

try {
    $user = findUser(99);
} catch (UserNotFoundException $e) {
    echo $e->getMessage(); // User dengan ID 99 tidak ditemukan
}

try {
    transfer(100000, 200000, 150000);
} catch (InsufficientBalanceException $e) {
    echo $e->getMessage(); // Saldo tidak cukup
}
?>`,
    },
    { type: "h2", text: "Error Reporting & Debugging" },
    {
      type: "code",
      lang: "php",
      filename: "error-reporting.php",
      code: `<?php
// Error reporting level
error_reporting(E_ALL); // Tampilkan semua error
ini_set("display_errors", 1); // Tampilkan di browser (development)
ini_set("log_errors", 1); // Simpan ke log file
ini_set("error_log", "php_errors.log"); // Lokasi log

// Error levels:
// E_ERROR    - fatal error (script berhenti)
// E_WARNING  - warning (script jalan terus)
// E_NOTICE   - notice (info kecil)
// E_PARSE    - parse error (syntax salah)
// E_DEPRECATED - fitur deprecated

// Set error handler kustom
set_error_handler(function ($errno, $errstr, $errfile, $errline) {
    $msg = date("Y-m-d H:i:s") . " [$errno] $errstr in $errfile:$errline\\n";
    error_log($msg);

    if (error_reporting() & $errno) {
        throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
    }
});

// Set exception handler (last resort)
set_exception_handler(function (Throwable $e) {
    error_log($e->getMessage() . " in " . $e->getFile() . ":" . $e->getLine());
    http_response_code(500);
    echo "Terjadi kesalahan. Silakan coba lagi.";
});

// Shutdown function (untuk fatal error)
register_shutdown_function(function () {
    $error = error_get_last();
    if ($error && in_array($error["type"], [E_ERROR, E_PARSE])) {
        error_log("FATAL: " . $error["message"]);
    }
});

// Assertion (development only)
assert_options(ASSERT_ACTIVE, 1);
assert_options(ASSERT_CALLBACK, function ($file, $line, $code) {
    error_log("Assertion failed: $code in $file:$line");
});

$umur = -5;
assert($umur >= 0, "Umur tidak boleh negatif");
?>`,
    },
    {
      type: "callout",
      title: "Tips Error Handling",
      tone: "tip",
      text: "Di produksi: jangan tampilkan error ke user (display_errors = 0), tapi log ke file. Buat halaman error 500 yang ramah user. Di development: tampilkan semua error untuk debugging. Selalu gunakan try-critical operation.",
    },
  ],
}
