export type RoadmapTopic = {
  title: string
  description: string
  skills: string[]
  tutorialSlug?: string
}

export type RoadmapPhase = {
  id: string
  title: string
  emoji: string
  tagline: string
  description: string
  duration: string
  level: string
  topics: RoadmapTopic[]
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: "persiapan",
    title: "Persiapan & Mindset",
    emoji: "🧭",
    tagline: "Siapkan mental dan peralatanmu",
    description:
      "Sebelum menulis baris kode pertama, kamu perlu tahu tujuan belajar, menyiapkan peralatan yang tepat, dan memahami cara kerja komputer. Fase ini pendek tapi paling penting.",
    duration: "1–2 minggu",
    level: "Pemula",
    topics: [
      {
        title: "Kenali alasan & tujuan belajar",
        description:
          "Tuliskan kenapa kamu ingin belajar coding: ganti karier, buat website sendiri, atau jadi developer profesional. Tujuan yang jelas membuatmu tetap konsisten.",
        skills: ["Mindset", "Perencanaan"],
      },
      {
        title: "Pasang tools dasar",
        description:
          "Install code editor (VS Code), browser modern, dan Node.js. Ini adalah alat wajib yang akan kamu pakai sepanjang perjalanan.",
        skills: ["VS Code", "Terminal"],
      },
      {
        title: "Pahami cara kerja komputer",
        description:
          "Pelajari konsep dasar seperti file, folder, dan bagaimana program berjalan. Tidak perlu dalam — cukup pahami mental modelnya.",
        skills: ["Dasar Komputer"],
      },
      {
        title: "Belajar cara belajar",
        description:
          "Gunakan metode belajar aktif: baca → tulis kode sendiri → breakdown → jelaskan ulang. Jangan hanya menonton tutorial.",
        skills: ["Learning Method"],
      },
    ],
  },
  {
    id: "html-css",
    title: "HTML & CSS",
    emoji: "🎨",
    tagline: "Bangun kerangka dan tampilan website",
    description:
      "HTML adalah struktur halaman web dan CSS adalah tampilannya. Di fase ini kamu belajar membuat halaman web statis yang rapi dan responsif. Ini fondasi semua karier frontend.",
    duration: "4–6 minggu",
    level: "Pemula",
    topics: [
      {
        title: "HTML dasar & struktur semantik",
        description:
          "Kenali tag, atribut, dan elemen semantik seperti header, nav, main, dan footer. Belajar membuat halaman yang terstruktur dan mudah dibaca.",
        skills: ["HTML", "Semantik"],
        tutorialSlug: "html-dasar",
      },
      {
        title: "CSS dasar: selektor & properti",
        description:
          "Pelajari cara mewarnai, memberi jarak, dan mengatur font. Pahami cascade, specificity, dan box model.",
        skills: ["CSS", "Box Model"],
        tutorialSlug: "css-dasar",
      },
      {
        title: "Flexbox & Grid",
        description:
          "Dua sistem layout utama di CSS. Flexbox untuk satu arah, Grid untuk dua arah. Ini kunci membuat layout modern dan responsif.",
        skills: ["Flexbox", "Grid"],
        tutorialSlug: "css-flexbox-grid",
      },
      {
        title: "Responsive design",
        description:
          "Gunakan media query, unit relatif, dan mobile-first agar website tampil baik di semua ukuran layar.",
        skills: ["Media Query", "Mobile-first"],
      },
      {
        title: "Project: website profil",
        description:
          "Buat website portofolio pribadi dengan 3–5 halaman. Gunakan semua yang sudah dipelajari: layout, responsif, dan semantik.",
        skills: ["Project", "Kreativitas"],
      },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript",
    emoji: "⚡",
    tagline: "Jadikan website interaktif",
    description:
      "JavaScript mengubah website dari statis menjadi dinamis. Ini bahasa pemrograman yang paling penting untuk dikuasai — dipakai di frontend dan backend.",
    duration: "6–8 minggu",
    level: "Pemula",
    topics: [
      {
        title: "Variabel, tipe data & operator",
        description:
          "Mulai dari let, const, string, number, boolean, hingga operator aritmatika dan perbandingan.",
        skills: ["Variabel", "Tipe Data"],
        tutorialSlug: "javascript-dasar",
      },
      {
        title: "Control flow: if/else & loop",
        description:
          "Buat program yang mengambil keputusan dengan kondisi dan mengulang pekerjaan dengan for/while.",
        skills: ["Kondisi", "Perulangan"],
      },
      {
        title: "Function, array & object",
        description:
          "Fungsi untuk mengelompokkan logika, array untuk daftar data, dan object untuk data terstruktur.",
        skills: ["Function", "Array", "Object"],
        tutorialSlug: "javascript-function-array-object",
      },
      {
        title: "Manipulasi DOM",
        description:
          "Pilih elemen HTML, ubah konten, dan tangani event seperti klik. Ini jembatan antara JavaScript dan halaman web.",
        skills: ["DOM", "Event"],
      },
      {
        title: "ES6+: async/await & fetch API",
        description:
          "Belajar promise, async/await, dan memanggil API dengan fetch untuk mengambil data.",
        skills: ["Async", "Fetch"],
      },
      {
        title: "Project: aplikasi todo list",
        description:
          "Bangun todo list interaktif yang bisa menambah, menghapus, dan menandai tugas. Simpan data di localStorage.",
        skills: ["Project", "CRUD"],
      },
    ],
  },
  {
    id: "git",
    title: "Git & GitHub",
    emoji: "🌿",
    tagline: "Kelola versi kode dan kolaborasi",
    description:
      "Git adalah sistem version control yang wajib dikuasai semua developer. Fase ini bisa dijalankan paralel dengan fase JavaScript — makin cepat dikuasai makin baik.",
    duration: "1–2 minggu",
    level: "Pemula",
    topics: [
      {
        title: "Konsep dasar Git",
        description:
          "Pahami repository, commit, branch, dan cara kerja git sebagai 'mesin waktu' kode kamu.",
        skills: ["Repo", "Commit"],
      },
      {
        title: "Workflow sehari-hari",
        description:
          "Kuasai add, commit, push, pull, dan merge. Rutinitas ini akan kamu lakukan ribuan kali.",
        skills: ["Git Command"],
        tutorialSlug: "git-dasar",
      },
      {
        title: "GitHub & kolaborasi",
        description:
          "Upload kode ke GitHub, buat pull request, dan review kode teman untuk berkolaborasi.",
        skills: ["GitHub", "Pull Request"],
      },
      {
        title: "Praktik: simpan semua project",
        description:
          "Biasakan menginisialisasi git di setiap project. Bikin README yang rapi dan push secara rutin.",
        skills: ["Habit", "Dokumentasi"],
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Framework",
    emoji: "🧩",
    tagline: "Bangun aplikasi dengan React",
    description:
      "Setelah JavaScript lancar, saatnya belajar framework. React adalah yang paling populer dan permintaannya tinggi di industri. Di Indonesia, React/Next.js adalah pilihan terbaik.",
    duration: "6–8 minggu",
    level: "Menengah",
    topics: [
      {
        title: "React: component & props",
        description:
          "Ubah cara berpikir jadi 'semua adalah komponen'. Pelajari JSX, props, dan komposisi komponen.",
        skills: ["React", "JSX"],
        tutorialSlug: "react-dasar",
      },
      {
        title: "State & lifecycle",
        description:
          "Kelola data dinamis dengan useState dan useEffect. Pahami kapan komponen di-render ulang.",
        skills: ["useState", "useEffect"],
      },
      {
        title: "Routing & fetching data",
        description:
          "Pelajari React Router dan cara mengambil data dari API di dalam aplikasi React.",
        skills: ["Router", "Data Fetching"],
      },
      {
        title: "Next.js: framework React",
        description:
          "Next.js memberikan server-side rendering, file-based routing, dan optimasi di luar kotak. Ini yang paling banyak dipakai perusahaan.",
        skills: ["Next.js", "App Router"],
      },
      {
        title: "Project: aplikasi React penuh",
        description:
          "Bangun aplikasi dengan multi-halaman, state, dan data API. Contoh: weather app atau blog sederhana.",
        skills: ["Project", "Integrasi"],
      },
    ],
  },
  {
    id: "backend",
    title: "Backend & Database",
    emoji: "🗄️",
    tagline: "Logika server, API, dan penyimpanan data",
    description:
      "Backend mengurus logika bisnis, autentikasi, dan data. Mulai dari Node.js, buat API sendiri, lalu koneksikan ke database.",
    duration: "8–10 minggu",
    level: "Menengah",
    topics: [
      {
        title: "Node.js & NPM",
        description:
          "Jalankan JavaScript di server dan kelola dependency dengan NPM. Kenali juga runtime dan module system.",
        skills: ["Node.js", "NPM"],
        tutorialSlug: "nodejs-dasar",
      },
      {
        title: "Express & REST API",
        description:
          "Buat server dengan Express, definisikan route, dan bangun REST API dengan metode HTTP (GET, POST, PUT, DELETE).",
        skills: ["Express", "REST API"],
      },
      {
        title: "Database & SQL",
        description:
          "Pelajari konsep database relasional, tabel, query SQL, dan relasi antar tabel.",
        skills: ["SQL", "Database"],
      },
      {
        title: "ORM & migrasi",
        description:
          "Gunakan ORM seperti Prisma untuk berinteraksi dengan database tanpa menulis SQL mentah.",
        skills: ["Prisma", "Migrasi"],
      },
      {
        title: "Autentikasi & keamanan",
        description:
          "Implementasikan login/register, hash password, JWT, dan prinsip keamanan dasar web.",
        skills: ["Auth", "JWT"],
      },
      {
        title: "Project: fullstack app",
        description:
          "Gabungkan frontend dan backend: aplikasi CRUD lengkap dengan autentikasi dan database.",
        skills: ["Fullstack", "CRUD"],
      },
    ],
  },
  {
    id: "deployment",
    title: "Deployment & DevOps",
    emoji: "🚀",
    tagline: "Publikasikan karya ke dunia",
    description:
      "Kode yang tidak dideploy tidak berguna. Fase ini mengajarkan cara meng-upload aplikasi ke internet, otomasi, dan praktik ops dasar.",
    duration: "2–4 minggu",
    level: "Menengah",
    topics: [
      {
        title: "Deploy ke Vercel/Netlify",
        description:
          "Deploy website dan aplikasi Next.js dengan sekali klik. Kenali environment variables.",
        skills: ["Vercel", "Deploy"],
        tutorialSlug: "deploy-vercel",
      },
      {
        title: "Deploy backend ke server",
        description:
          "Deploy API ke platform seperti Railway, Render, atau VPS. Kelola proses dengan PM2.",
        skills: ["Railway", "VPS"],
      },
      {
        title: "Domain & HTTPS",
        description:
          "Hubungkan custom domain dan pastikan HTTPS aktif dengan sertifikat SSL gratis.",
        skills: ["Domain", "SSL"],
      },
      {
        title: "CI/CD dasar",
        description:
          "Otomatiskan build dan test dengan GitHub Actions agar setiap push otomatis ter-deploy.",
        skills: ["CI/CD", "GitHub Actions"],
      },
    ],
  },
  {
    id: "spesialisasi",
    title: "Spesialisasi & Karier",
    emoji: "💼",
    tagline: "Pilih jalur dan bangun portofolio",
    description:
      "Setelah fondasi kuat, pilih spesialisasi yang paling kamu suka, perkuat portofolio, dan siapkan diri menghadapi dunia kerja.",
    duration: "berkelanjutan",
    level: "Lanjutan",
    topics: [
      {
        title: "Frontend Specialist",
        description:
          "Dalami TypeScript, test, performa, animasi, dan aksesibilitas untuk menjadi frontend engineer.",
        skills: ["TypeScript", "Testing"],
      },
      {
        title: "Backend & DevOps",
        description:
          "Dalami arsitektur API, Docker, cloud, dan sistem terdistribusi.",
        skills: ["Docker", "Cloud"],
      },
      {
        title: "Mobile Development",
        description:
          "Mulai dari React Native untuk membangun aplikasi iOS & Android dengan skill JavaScript yang sudah ada.",
        skills: ["React Native"],
      },
      {
        title: "Data Science & AI",
        description:
          "Pelajari Python, statistik, dan machine learning untuk jalur data.",
        skills: ["Python", "ML"],
      },
      {
        title: "Bangun portofolio & CV",
        description:
          "Pilih 3–4 project terbaik, tulis studi kasus, dan siapkan profil LinkedIn serta CV yang kuat.",
        skills: ["Portofolio", "Karier"],
      },
      {
        title: "Rekrutmen & interview",
        description:
          "Latih soal algoritma, ikut test coding, dan siapkan jawaban untuk pertanyaan teknis dan behavioral.",
        skills: ["Interview", "Algoritma"],
      },
    ],
  },
]

export function getPhaseById(id: string) {
  return roadmapPhases.find((phase) => phase.id === id)
}
