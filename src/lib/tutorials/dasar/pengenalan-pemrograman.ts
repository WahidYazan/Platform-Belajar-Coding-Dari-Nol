import type { Tutorial } from "../types"

export const pengenalanPemrograman: Tutorial = {
    slug: "pengenalan-pemrograman",
    title: "Pengenalan Pemrograman untuk Pemula",
    description:
      "Apa itu pemrograman, bagaimana komputer memahami kode, dan langkah pertama menyiapkan lingkungan belajarmu.",
    category: "Dasar",
    level: "Pemula",
    minutes: 8,
    date: "2026-08-10",
    content: [
      {
        type: "p",
        text: "Pemrograman adalah proses memberi instruksi kepada komputer untuk menyelesaikan tugas tertentu. Instruksi itu ditulis dalam bahasa yang bisa dipahami manusia (seperti JavaScript, Python, atau HTML) lalu diterjemahkan menjadi sesuatu yang bisa dieksekusi mesin.",
      },
      { type: "h2", text: "Bagaimana komputer 'mengerti' kode?" },
      {
        type: "p",
        text: "Komputer hanya mengerti dua angka: 0 dan 1 (sistem biner). Untungnya, kamu tidak perlu menulis biner. Kamu menulis kode yang mudah dibaca, lalu sebuah program bernama interpreter atau compiler menerjemahkannya menjadi biner.",
      },
      {
        type: "list",
        items: [
          "Interpreter: membaca dan menjalankan kode baris per baris (contoh: Node.js, browser).",
          "Compiler: menerjemahkan seluruh kode menjadi biner dulu, baru dijalankan (contoh: TypeScript, C).",
          "Kamu cukup fokus menulis kode — mesin yang mengurus sisanya.",
        ],
      },
      { type: "h2", text: "Kenapa belajar pemrograman?" },
      {
        type: "list",
        items: [
          "Karier: developer adalah salah satu profesi paling dibutuhkan dan bergaji tinggi.",
          "Kreativitas: kamu bisa membangun apa pun, dari website sampai aplikasi mobile.",
          "Problem solving: coding melatih cara berpikir logis dan sistematis.",
          "Bebas lokasi: banyak pekerjaan developer bisa dilakukan remote.",
        ],
      },
      { type: "h2", text: "Alat yang perlu kamu siapkan" },
      {
        type: "p",
        text: "Kamu tidak butuh laptop mahal. Laptop standar dengan 8GB RAM sudah cukup untuk belajar web development. Yang kamu butuhkan:",
      },
      {
        type: "list",
        items: [
          "Code editor: Visual Studio Code (VS Code) — gratis dan paling populer.",
          "Browser modern: Google Chrome atau Firefox (dengan developer tools).",
          "Node.js: untuk menjalankan JavaScript di luar browser.",
          "Git: untuk version control (akan dibahas di tutorial lain).",
        ],
      },
      { type: "h2", text: "Metode belajar yang benar" },
      {
        type: "p",
        text: "Kesalahan terbesar pemula adalah hanya menonton video tanpa praktik. Gunakan siklus belajar aktif ini:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Baca atau tonton konsepnya singkat (jangan berjam-jam).",
          "Tutup video/catatan, lalu tulis kodenya sendiri dari nol.",
          "Rusak kodenya dengan sengaja untuk melihat apa yang terjadi.",
          "Jelaskan ulang konsep itu dengan kata-katamu sendiri.",
        ],
      },
      {
        type: "callout",
        title: "Rahasia terbesar",
        tone: "tip",
        text: "Konsistensi jauh lebih penting daripada durasi. Belajar 30 menit setiap hari lebih baik daripada 5 jam sekali seminggu. Jangan menunda — langsung mulai dari halaman roadmap kami.",
      },
    ],
  }
