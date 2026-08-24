import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Download,
  MousePointerClick,
  PencilRuler,
  ShieldAlert,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/app/component/code-block"

const tools = [
  {
    title: "Visual Studio Code",
    desc: "Code editor paling populer. Gratis, ringan, ekosistem plugin terbaik.",
    link: "https://code.visualstudio.com/",
    emoji: "💻",
  },
  {
    title: "Node.js (LTS)",
    desc: "Menjalankan JavaScript di komputer. Juga menyertakan NPM.",
    link: "https://nodejs.org/",
    emoji: "⚡",
  },
  {
    title: "Browser (Chrome/Firefox)",
    desc: "Untuk melihat hasil kode dan memakai Developer Tools.",
    link: "https://www.google.com/chrome/",
    emoji: "🌐",
  },
  {
    title: "Git",
    desc: "Version control yang wajib. Install dari git-scm.com.",
    link: "https://git-scm.com/",
    emoji: "📦",
  },
]

const mistakes = [
  {
    title: "Menonton tutorial tanpa praktik",
    desc: "Tubuh tidak bisa kuat hanya dengan menonton olahraga. Kode pun begitu tulis sendiri, jangan hanya tiru.",
    emoji: "🚫",
  },
  {
    title: "Pindah-pindah bahasa/framework",
    desc: "Baru mulai HTML langsung tertarik Python, lalu mau coba React. Fokus satu jalur dulu sampai menghasilkan project.",
    emoji: "🔄",
  },
  {
    title: "Menyimpan semua di memori",
    desc: "Developer tidak menghafal. Mereka paham konsep dan tahu cara mencari jawaban. Google, dokumentasi, dan ChatGPT adalah temanmu.",
    emoji: "🧠",
  },
  {
    title: "Takut 'tidak berbakat'",
    desc: "Coding adalah keterampilan, bukan bakat. Yang membuat maju adalah konsistensi, bukan 'berbakat'.",
    emoji: "💪",
  },
]

export default function StartPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14">
      {/* Hero */}
      <div className="relative mb-14 max-w-2xl overflow-hidden rounded-3xl border border-border/40 bg-card/60 p-8 sm:p-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-60%] right-[-10%] h-[250px] w-[350px] rounded-full bg-primary/[0.06] blur-[80px]" />
        </div>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary/70">Panduan Langkah Pertama</p>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Mulai dari Sini
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Panduan lengkap untuk hari-hari pertamamu belajar coding: apa yang harus dipasang,
          bagaimana cara belajar yang benar, dan kesalahan yang harus dihindari.
        </p>
      </div>

      {/* Tools */}
      <div className="mb-16">
        <h2 className="mb-6 flex items-center gap-3 font-heading text-2xl font-bold text-foreground">
          <span className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
            <Download className="size-5" />
          </span>
          Langkah 1 — Pasang Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => (
            <Card key={tool.title} className="group flex h-full flex-col border-border/50 bg-card/80 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-md hover:shadow-black/[0.03]">
              <CardHeader>
                <div className="mb-1 text-2xl">{tool.emoji}</div>
                <CardTitle className="font-heading text-lg font-bold">{tool.title}</CardTitle>
                <CardDescription className="leading-relaxed">{tool.desc}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button asChild variant="outline" size="sm" className="group-hover:border-primary/30 group-hover:text-primary transition-colors duration-200">
                  <a href={tool.link} target="_blank" rel="noreferrer">
                    Kunjungi situs
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-foreground">Verifikasi instalasi Node.js:</p>
          <CodeBlock
            lang="bash"
            filename="terminal"
            code={`node --version\n100: npm --version`}
          />
          <p className="text-sm text-muted-foreground">
            Jika muncul angka versi (contoh v22.x.x), instalasi sukses.
          </p>
        </div>
      </div>

      {/* Foundation */}
      <div className="mb-16">
        <h2 className="mb-6 flex items-center gap-3 font-heading text-2xl font-bold text-foreground">
          <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
            <PencilRuler className="size-5" />
          </span>
          Langkah 2 — Pelajari Fondasi
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Fondasi 1: HTML & CSS",
              desc: "Struktur dan tampilan website. Kerjakan 4-6 minggu. Cukup sampai kamu bisa membuat halaman profil yang rapi.",
              emoji: "🎨",
            },
            {
              title: "Fondasi 2: JavaScript",
              desc: "Logika dan interaksi. Ini fondasi paling penting berikan 6-8 minggu sebelum menyentuh framework apa pun.",
              emoji: "⚡",
            },
            {
              title: "Fondasi 3: Git & GitHub",
              desc: "Kelola versi kode. Bisa dipelajari paralel. Mulai menyimpan semua project di GitHub sejak sekarang.",
              emoji: "📦",
            },
            {
              title: "Fondasi 4: React + Next.js",
              desc: "Setelah JS lancar, baru ke framework. Ini keterampilan yang paling banyak dicari perusahaan.",
              emoji: "⚛️",
            },
          ].map((item) => (
            <Card key={item.title} className="group border-border/50 bg-card/80 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-md hover:shadow-black/[0.03]">
              <CardHeader>
                <div className="mb-1 text-2xl">{item.emoji}</div>
                <CardTitle className="font-heading text-lg font-bold">{item.title}</CardTitle>
                <CardDescription className="leading-relaxed">{item.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Learning Methods */}
      <div className="mb-16">
        <h2 className="mb-6 flex items-center gap-3 font-heading text-2xl font-bold text-foreground">
          <span className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
            <MousePointerClick className="size-5" />
          </span>
          Langkah 3 — Cara Belajar yang Efektif
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "1. Belajar aktif, bukan pasif",
              desc: "Setiap habis membaca/menonton, langsung tulis kodenya sendiri dari nol. Jangan copy-paste.",
              emoji: "✍️",
            },
            {
              title: "2. Ikuti metode Feynman",
              desc: "Jelaskan konsep dengan kata-katamu sendiri, seolah mengajar orang lain. Jika buntu, berarti belum paham.",
              emoji: "💡",
            },
            {
              title: "3. Rusak kodenya",
              desc: "Ubah nilai, hapus baris, buat error lalu perbaiki. Ini cara tercepat membangun intuisi.",
              emoji: "🔧",
            },
            {
              title: "4. Bangun project kecil",
              desc: "Setiap 1-2 minggu, buat satu project kecil yang memakai materi baru. Project mengikat semua yang kamu pelajari.",
              emoji: "🏗️",
            },
          ].map((item) => (
            <Card key={item.title} className="group border-border/50 bg-card/80 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-md hover:shadow-black/[0.03]">
              <CardHeader>
                <div className="mb-1 text-2xl">{item.emoji}</div>
                <CardTitle className="font-heading text-lg font-bold">{item.title}</CardTitle>
                <CardDescription className="leading-relaxed">{item.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Mistakes */}
      <div className="mb-16">
        <h2 className="mb-6 flex items-center gap-3 font-heading text-2xl font-bold text-foreground">
          <span className="flex size-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600">
            <ShieldAlert className="size-5" />
          </span>
          Hindari Kesalahan Ini
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {mistakes.map((mistake) => (
            <Card key={mistake.title} className="group border-dashed border-border/60 bg-background/60 shadow-none transition-all duration-300 hover:border-border/80 hover:bg-background/80">
              <CardHeader>
                <div className="mb-1 text-2xl">{mistake.emoji}</div>
                <CardTitle className="font-heading text-lg font-bold">{mistake.title}</CardTitle>
                <CardDescription className="leading-relaxed">{mistake.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 p-8 shadow-sm backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-50%] right-[-10%] h-[250px] w-[350px] rounded-full bg-primary/[0.04] blur-[80px]" />
        </div>
        <h2 className="flex items-center gap-3 font-heading text-2xl font-bold text-foreground">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CheckCircle2 className="size-5" />
          </span>
          Checklist Minggu Pertamamu
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            "Semua tools terpasang & terverifikasi",
            "Buat folder 'project' di komputer",
            "Buat file HTML pertama & buka di browser",
            "Tulis ulang tutorial HTML pertama tanpa melihat",
            "Pelajari 10 tag HTML paling umum",
            "Mulai biasakan git init + commit di tiap latihan",
            "Jadwalkan 30-60 menit belajar per hari",
            "Bergabung komunitas (Discord/komunitas lokal)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/15 transition-all hover:shadow-xl hover:shadow-primary/20">
            <Link href="/roadmap">
              Lanjut ke Roadmap
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full bg-background">
            <Link href="/dashboard">
              <BookOpen className="size-4" />
              Lihat Tutorial
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
