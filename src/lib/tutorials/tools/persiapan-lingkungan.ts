import type { Tutorial } from "../types";

export const persiapanLingkungan: Tutorial = {
    slug: "persiapan-lingkungan",
    title: "Persiapan Lingkungan: VS Code, Terminal & Node.js",
    description:
        "Setup lengkap perangkat kerja developer: install VS Code, ekstensi penting, kuasai terminal, dan verifikasi Node.js.",
    category: "Tools",
    level: "Pemula",
    minutes: 11,
    date: "2026-08-14",
    content: [
        {
            type: "p",
            text: "Developer profesional punya 'lingkungan kerja' yang nyaman: editor yang cepat, terminal yang dikuasai, dan runtime yang terpasang benar. Tutorial ini memandumu menyiapkan semuanya sekali, untuk dipakai seterusnya.",
        },
        { type: "h2", text: "Langkah 1 Install Visual Studio Code" },
        {
            type: "p",
            text: "Kunjungi code.visualstudio.com dan unduh versi untuk sistem operasimu (Windows/macOS/Linux). Setelah terpasang, buka dan akrabi tiga area utama:",
        },
        {
            type: "list",
            items: [
                "Explorer (kiri) daftar file dan folder project.",
                "Editor (tengah) tempat menulis kode.",
                "Terminal (bawah) menjalankan perintah (buka dengan Ctrl+`).",
            ],
        },
        { type: "h2", text: "Langkah 2 Ekstensi wajib" },
        {
            type: "p",
            text: "Buka panel Extensions (Ctrl+Shift+X) dan install yang ini dulu:",
        },
        {
            type: "list",
            items: [
                "Prettier merapikan format kode otomatis.",
                "ESLint mendeteksi kesalahan JavaScript.",
                "Tailwind CSS IntelliSense autocomplete Tailwind.",
                "Live Server membuka HTML dengan auto-reload.",
            ],
        },
        { type: "h2", text: "Langkah 3 Kenali Terminal" },
        {
            type: "p",
            text: "Terminal adalah cara berkomunikasi dengan komputer memakai teks, bukan klik. Buat kamu akan sangat sering memakainya. Mulai dengan perintah navigasi:",
        },
        {
            type: "code",
            lang: "bash",
            filename: "terminal",
            code: `# Lihat folder sekarang (Print Working Directory)
pwd

# Daftar isi folder (List)
ls
ls -a    # termasuk file tersembunyi
ls -la   # detail lengkap

# Pindah folder (Change Directory)
cd Documents
cd ..           # naik satu level
cd ~            # ke folder utama

# Buat folder & file
mkdir project
touch index.html</code>`,
        },
        {
            type: "callout",
            title: "Tab auto-complete",
            tone: "tip",
            text: "Ketik cd pro lalu tekan Tab terminal melengkapi otomatis menjadi 'cd project'. Ini menghemat ribuan penekanan tombol. Biasakan sejak awal.",
        },
        { type: "h2", text: "Langkah 4 Install Node.js & NPM" },
        {
            type: "p",
            text: "Unduh versi LTS dari nodejs.org, install, lalu verifikasi. Buka terminal baru dan jalankan:",
        },
        {
            type: "code",
            lang: "bash",
            filename: "terminal",
            code: `node --version
# v22.x.x (atau lebih baru)

npm --version
# 10.x.x</code>`,
        },
        {
            type: "p",
            text: "Jika muncul angka versi, berarti sukses. Coba buat file JavaScript pertama:",
        },
        {
            type: "code",
            lang: "javascript",
            filename: "halo.js",
            code: `console.log("Halo, dunia! Ini JavaScript pertamaku di terminal.");`,
        },
        {
            type: "code",
            lang: "bash",
            filename: "terminal",
            code: `node halo.js
# Halo, dunia! Ini JavaScript pertamaku di terminal.</code>`,
        },
        { type: "h2", text: "Langkah 5 Susun struktur folder" },
        {
            type: "code",
            lang: "bash",
            filename: "terminal",
            code: `# Buat folder master untuk semua project
mkdir ~/coding
cd ~/coding

# Setiap project punya folder sendiri
mkdir project-1
mkdir project-2</code>`,
        },
        {
            type: "callout",
            title: "Selesai!",
            text: "Lingkunganmu sudah siap. Dari sini kamu tinggal fokus belajar HTML dan CSS tools tidak akan jadi penghalang lagi. Jika macet di langkah mana pun, error yang muncul bisa langsung dicari di Google.",
        },
    ],
};
