import type { Tutorial } from "../types"

export const javascriptDasar: Tutorial = {
    slug: "javascript-dasar",
    title: "JavaScript Dasar: Variabel, Tipe Data & Operator",
    description:
      "Mulai perjalanan JavaScript: variabel, tipe data, operator, dan control flow dengan contoh nyata.",
    category: "JavaScript",
    level: "Pemula",
    minutes: 15,
    date: "2026-08-12",
    content: [
      {
        type: "p",
        text: "JavaScript adalah bahasa pemrograman yang membuat website bisa berpikir dan bertindak: merespons klik, mengambil data, dan mengubah tampilan. Ini juga bahasa yang sama untuk backend (Node.js).",
      },
      { type: "h2", text: "Variabel: menyimpan data" },
      {
        type: "p",
        text: "Variabel seperti kotak berlabel untuk menyimpan nilai. Ada tiga cara mendeklarasikan variabel:",
      },
      {
        type: "code",
        lang: "javascript",
        filename: "variabel.js",
        code: `// let: bisa diubah nilainya
let count = 0;
count = count + 1; // OK

// const: tetap, tidak bisa diubah
const pi = 3.14;
pi = 3.15; // Error!

// var: usang, hindari (masalah scoping)
var lama = "hindari ini";`,
      },
      {
        type: "callout",
        title: "Aturan praktis",
        tone: "tip",
        text: "Gunakan const secara default. Ganti ke let hanya jika nilai memang harus berubah. Jangan pakai var.",
      },
      { type: "h2", text: "Tipe data primitif" },
      {
        type: "code",
        lang: "javascript",
        filename: "tipe-data.js",
        code: `const name = "Budi";        // string: teks
const age = 25;              // number: angka
const isActive = true;       // boolean: true/false
const nothing = null;        // null: sengaja kosong
let belumAda;                // undefined: belum diisi

// Cek tipe data
console.log(typeof name);    // "string"
console.log(typeof age);     // "number"

// String template literals (backtick)
console.log(\`Halo, \${name}! Kamu berusia \${age} tahun\`);`,
      },
      { type: "h2", text: "Operator" },
      {
        type: "code",
        lang: "javascript",
        filename: "operator.js",
        code: `const a = 10;
const b = 3;

// Aritmatika
console.log(a + b);  // 13
console.log(a - b);  // 7
console.log(a * b);  // 30
console.log(a / b);  // 3.33
console.log(a % b);  // 1 (sisa bagi)

// Perbandingan
console.log(a > b);     // true
console.log(a === b);   // false (persis)
console.log(a !== b);   // true

// Logika
const isLoggedIn = true;
const isAdmin = false;
console.log(isLoggedIn && isAdmin); // false (keduanya harus true)
console.log(isLoggedIn || isAdmin); // true  (salah satu cukup)`,
      },
      {
        type: "callout",
        title: "=== vs ==",
        tone: "warning",
        text: "Selalu gunakan === (strict equality) yang membandingkan nilai dan tipe. Operator == melakukan konversi tipe implisit yang sering menghasilkan bug tak terduga.",
      },
      { type: "h2", text: "Control flow" },
      {
        type: "code",
        lang: "javascript",
        filename: "kondisi.js",
        code: `const score = 85;

if (score >= 90) {
  console.log("Grade A");
} else if (score >= 75) {
  console.log("Grade B");
} else {
  console.log("Belajar lagi yuk!");
}

// Ternary (singkat)
const status = score >= 75 ? "Lulus" : "Tidak lulus";
console.log(status); // "Lulus"`,
      },
      { type: "h2", text: "Perulangan" },
      {
        type: "code",
        lang: "javascript",
        filename: "loop.js",
        code: `// for: berulang dengan hitungan
for (let i = 0; i < 5; i++) {
  console.log(\`Iterasi ke-\${i}\`);
}

// while: berulang selama kondisi benar
let n = 0;
while (n < 3) {
  console.log(n);
  n++;
}

// Array & for...of (paling nyaman)
const buah = ["apel", "mangga", "jeruk"];
for (const item of buah) {
  console.log(item);
}`,
      },
      {
        type: "p",
        text: "Coba jalankan setiap contoh di DevTools browser (F12 → Console) atau di Node.js. Ubah angka dan teksnya sendiri — semakin sering kamu 'merusak' kode, semakin cepat paham.",
      },
    ],
  }
