import type { Tutorial } from "../types"

export const javascriptFunctionArrayObject: Tutorial = {
    slug: "javascript-function-array-object",
    title: "Function, Array & Object di JavaScript",
    description:
      "Kelompokkan logika dengan function dan kelola data dengan array serta object — bekal wajib sebelum React.",
    category: "JavaScript",
    level: "Pemula",
    minutes: 16,
    date: "2026-08-12",
    content: [
      {
        type: "p",
        text: "Fungsi, array, dan object adalah tiga batu bata utama JavaScript. Semua aplikasi React, dari yang sederhana sampai enterprise, dibangun di atas konsep ini.",
      },
      { type: "h2", text: "Function: logika yang bisa dipanggil ulang" },
      {
        type: "code",
        lang: "javascript",
        filename: "function.js",
        code: `// Function declaration
function greet(name) {
  return \`Halo, \${name}!\`;
}

// Arrow function (modern, favorit React)
const multiply = (a, b) => a * b;

console.log(greet("Budi"));     // "Halo, Budi!"
console.log(multiply(4, 5));    // 20

// Default parameter
function welcome(name = "Teman") {
  return \`Selamat datang, \${name}\`;
}
console.log(welcome()); // "Selamat datang, Teman"`,
      },
      {
        type: "callout",
        title: "Kapan pakai return?",
        tone: "tip",
        text: "return mengirim nilai keluar dari fungsi. Tanpa return, fungsi mengembalikan undefined. Fungsi yang tidak mengembalikan nilai (hanya melakukan sesuatu) disebut void.",
      },
      { type: "h2", text: "Array: daftar data" },
      {
        type: "code",
        lang: "javascript",
        filename: "array.js",
        code: `const fruits = ["apel", "mangga", "jeruk"];

// Akses & tambah
console.log(fruits[0]);      // "apel"
fruits.push("durian");       // tambah di akhir
fruits.unshift("pisang");    // tambah di awal

// Cari
console.log(fruits.indexOf("mangga")); // 1

// Method favorit: map, filter, reduce
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4]

const total = numbers.reduce((acc, n) => acc + n, 0);
console.log(total); // 15`,
      },
      {
        type: "list",
        items: [
          "map: transformasi setiap item → array baru berukuran sama.",
          "filter: pilih item yang memenuhi syarat.",
          "reduce: ringkas semua item menjadi satu nilai.",
          "Array dari objek inilah yang paling sering kamu olah saat memuat data dari API.",
        ],
      },
      { type: "h2", text: "Object: data terstruktur" },
      {
        type: "code",
        lang: "javascript",
        filename: "object.js",
        code: `const user = {
  name: "Budi",
  age: 25,
  skills: ["HTML", "CSS", "JavaScript"],
  isActive: true,
};

// Akses properti
console.log(user.name);        // "Budi"
console.log(user["age"]);      // 25
user.age = 26;                 // ubah nilai

// Destructuring (sering dipakai React)
const { name, age } = user;
console.log(name, age);

// Array of objects = bentuk data dari API
const users = [
  { name: "Budi", age: 25 },
  { name: "Sari", age: 30 },
  { name: "Andi", age: 22 },
];

const adultNames = users
  .filter((u) => u.age >= 25)
  .map((u) => u.name);
console.log(adultNames); // ["Budi", "Sari"]`,
      },
      { type: "h2", text: "Latihan gabungan" },
      {
        type: "p",
        text: "Buat array berisi 5 object product (nama + harga). Tulis satu baris kode menggunakan filter dan map untuk mendapatkan nama semua produk dengan harga di atas 10000.",
      },
      {
        type: "callout",
        title: "Langkah berikutnya",
        text: "Konsep ini adalah fondasi React. Saat kamu belajar component, props (object), dan state — semuanya memakai function, array, dan object. Lanjut ke tutorial React Dasar.",
      },
    ],
  }
