import type { Tutorial } from "../types"

export const gitDasar: Tutorial = {
    slug: "git-dasar",
    title: "Git & GitHub untuk Pemula",
    description:
      "Kelola riwayat kode dengan Git dan kolaborasi dengan GitHub — skill wajib sebelum melamar kerja.",
    category: "Tools",
    level: "Pemula",
    minutes: 12,
    date: "2026-08-14",
    content: [
      {
        type: "p",
        text: "Git adalah version control system: ia merekam setiap perubahan kode seperti 'mesin waktu'. GitHub adalah platform online untuk menyimpan repositori Git dan berkolaborasi.",
      },
      { type: "h2", text: "Setup awal" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `# Install dulu dari git-scm.com, lalu:
git --version

# Konfigurasi identitas (sekali saja)
git config --global user.name "Namamu"
git config --global user.email "email@kamu.com"`,
      },
      { type: "h2", text: "Workflow dasar" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `# 1. Inisialisasi repo di folder project
git init

# 2. Lihat status file
git status

# 3. Stage: tandai file yang mau di-commit
git add .                # semua file
git add src/page.tsx     # satu file

# 4. Commit: simpan snapshot
git commit -m "feat: tambah halaman login"

# 5. Lihat riwayat
git log --oneline

# 6. Bandingkan perubahan
git diff`,
      },
      {
        type: "list",
        items: [
          "Working directory → tempat kamu mengedit file.",
          "Staging area → file yang 'diantrikan' lewat git add.",
          "Repository → snapshot permanen lewat git commit.",
        ],
      },
      { type: "h2", text: "Branch: bekerja tanpa mengganggu" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `# Buat branch baru dan pindah ke sana
git checkout -b fitur-login

# Kerja di branch... lalu kembali ke main
git checkout main

# Gabungkan branch fitur ke main
git merge fitur-login

# Hapus branch yang sudah digabung
git branch -d fitur-login`,
      },
      {
        type: "callout",
        title: "Kenapa branch?",
        text: "Bayangkan mengerjakan fitur besar tanpa mengacaukan kode yang sudah berjalan. Setiap fitur punya branch sendiri, diuji, lalu di-merge. Ini cara kerja semua tim profesional.",
      },
      { type: "h2", text: "Push ke GitHub & clone" },
      {
        type: "code",
        lang: "bash",
        filename: "terminal",
        code: `# Upload ke GitHub (buat repo dulu di github.com)
git remote add origin https://github.com/username/repo.git
git push -u origin main

# Salin project orang lain ke lokal
git clone https://github.com/username/repo.git

# Ambil update terbaru
git pull`,
      },
      { type: "h2", text: "Pull Request (kolaborasi)" },
      {
        type: "p",
        text: "Saat bekerja dalam tim (atau berkontribusi ke open source), kamu tidak push langsung ke main. Kamu membuat branch, push, lalu membuka Pull Request di GitHub. Anggota tim lain mereview sebelum di-merge.",
      },
      {
        type: "callout",
        title: "Praktik terbaik commit message",
        tone: "tip",
        text: "Tulis pesan commit yang menjelaskan apa dan mengapa: 'fix: perbaiki bug login saat password salah'. Jangan tulis 'update' atau 'asdf'. Gunakan konvensi seperti feat:, fix:, refactor:, docs:.",
      },
      {
        type: "p",
        text: "Mulai sekarang, inisialisasi Git di setiap project dan push ke GitHub. Riwayat commit yang rapi adalah bagian dari portofolio yang dinilai perusahaan.",
      },
    ],
  }
