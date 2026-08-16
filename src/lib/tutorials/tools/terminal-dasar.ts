import type { Tutorial } from "../types"

export const terminalDasar: Tutorial = {
    slug: "terminal-dasar",
    title: "Terminal & Command Line untuk Pemula",
    description:
      "Kuasai perintah terminal yang paling sering dipakai developer: navigasi, manipulasi file, dan menjalankan program.",
    category: "Tools",
    level: "Pemula",
    minutes: 12,
    date: "2026-08-14",
    content: [
      {
        type: "p",
        text: "Terminal terlihat menakutkan, tapi sebenarnya hanya cara mengetik perintah alih-alih mengklik. Banyak hal di developer yang hanya bisa dilakukan lewat terminal dari git sampai menjalankan server.",
      },
      { type: "h2", text: "Navigasi: ke mana pun kamu mau" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `pwd            # di folder mana saya? (print working dir)
ls             # apa isi folder ini?
ls -la         # detail lengkap + file tersembunyi
cd documents   # pindah ke folder documents
cd ..          # naik satu folder
cd ~           # ke folder utama (home)
cd -           # kembali ke folder sebelumnya</code>`,
      },
      {
        type: "callout",
        title: "Pintasan ajaib",
        tone: "tip",
        text: "Tekan Tab untuk auto-complete, dan panah atas untuk mengulang perintah sebelumnya. Kedua hal ini akan menyelamatkanmu ribuan kali.",
      },
      { type: "h2", text: "Membuat, menyalin, memindah, menghapus" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `mkdir project        # buat folder
touch index.html     # buat file kosong
cp index.html backup.html   # salin file
cp -r src dist       # salin folder
mv index.html src/   # pindahkan file
mv lama.txt baru.txt # sekaligus ganti nama
rm file.txt          # hapus file
rmdir folder-kosong  # hapus folder kosong
rm -r folder         # hapus folder beserta isinya</code>`,
      },
      {
        type: "callout",
        title: "Hati-hati dengan rm",
        tone: "warning",
        text: "Tidak ada tombol undo di terminal. File yang dihapus dengan rm benar-benar hilang. Periksa path sekali lagi sebelum menekan Enter terutama saat memakai rm -rf.",
      },
      { type: "h2", text: "Melihat dan menulis isi file" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `cat index.html      # tampilkan isi file
less index.html     # lihat file panjang (q untuk keluar)
head -10 file.txt   # 10 baris pertama
tail -20 file.log   # 20 baris terakhir (log!)
echo "teks" >> file.txt   # tambahkan baris ke file
echo "teks" > file.txt    # tulis ulang file</code>`,
      },
      { type: "h2", text: "Menjalankan program" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `node app.js         # jalankan file JavaScript
npm run dev         # jalankan script dari package.json
git status          # cek status git
code .              # buka folder saat ini di VS Code

# Hentikan program yang berjalan
# tekan Ctrl+C`,
      },
      { type: "h2", text: "Pipa dan redirect" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `# Pipa: hasil perintah pertama jadi input perintah kedua
ls | grep ".js"     # cari file .js di daftar ls

# Redirect: simpan output ke file
npm run build > build.log 2>&1

# Cari di dalam file
grep "error" server.log

# History
history
history | grep "docker"   # pernah ngetik apa?`,
      },
      {
        type: "callout",
        title: "Amankan diri: jangan copy-paste membabi buta",
        tone: "warning",
        text: "Sebelum menjalankan perintah dari internet, pahami dulu apa fungsinya. Perintah seperti curl ... | sh bisa mengeksekusi kode berbahaya.",
      },
      {
        type: "p",
        text: "Itu 80% perintah yang kamu butuhkan. Sisanya akan datang seiring kebutuhan dan selalu bisa dicari di Google dengan mengetik 'bash [apa yang ingin kamu lakukan]'.",
      },
    ],
  }
