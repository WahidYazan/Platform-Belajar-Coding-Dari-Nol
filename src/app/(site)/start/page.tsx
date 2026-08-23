import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Download,
  MousePointerClick,
  PencilRuler,
  ShieldAlert,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/app/component/code-block"

const tools = [
  {
    title: "Visual Studio Code",
    desc: "Code editor paling populer. Gratis, ringan, ekosistem plugin terbaik.",
    link: "https://code.visualstudio.com/",
  },
  {
    title: "Node.js (LTS)",
    desc: "Menjalankan JavaScript di komputer. Juga menyertakan NPM.",
    link: "https://nodejs.org/",
  },
  {
    title: "Browser (Chrome/Firefox)",
    desc: "Untuk melihat hasil kode dan memakai Developer Tools.",
    link: "https://www.google.com/chrome/",
  },
  {
    title: "Git",
    desc: "Version control yang wajib. Install dari git-scm.com.",
    link: "https://git-scm.com/",
  },
]

const mistakes = [
  {
    title: "Menonton tutorial tanpa praktik",
    desc: "Tubuh tidak bisa kuat hanya dengan menonton olahraga. Kode pun begitu tulis sendiri, jangan hanya tiru.",
  },
  {
    title: "Pindah-pindah bahasa/framework",
    desc: "Baru mulai HTML langsung tertarik Python, lalu mau coba React. Fokus satu jalur dulu sampai menghasilkan project.",
  },
  {
    title: "Menyimpan semua di memori",
    desc: "Developer tidak menghafal. Mereka paham konsep dan tahu cara mencari jawaban. Google, dokumentasi, dan ChatGPT adalah temanmu.",
  },
  {
    title: "Takut 'tidak berbakat'",
    desc: "Coding adalah keterampilan, bukan bakat. Yang membuat maju adalah konsistensi, bukan 'berbakat'.",
  },
]

export default function StartPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14">
      <div className="mb-12 max-w-2xl">
        <p className="mb-2 text-sm font-medium text-primary">Panduan Langkah Pertama</p>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
          Mulai dari Sini
        </h1>
        <p className="mt-4 leading-7 text-muted-foreground">
          Panduan lengkap untuk hari-hari pertamamu belajar coding: apa yang harus dipasang,
          bagaimana cara belajar yang benar, dan kesalahan yang harus dihindari.
        </p>
      </div>

      <div className="mb-14">
        <h2 className="mb-6 flex items-center gap-3 font-heading text-2xl font-bold text-foreground">
          <Download className="size-5 text-primary" />
          Langkah 1 Pasang Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => (
            <Card key={tool.title} className="flex h-full flex-col">
              <CardHeader>
                <CardTitle className="font-heading text-lg font-bold">{tool.title}</CardTitle>
                <CardDescription>{tool.desc}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button asChild variant="outline" size="sm">
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
            code={`node --version
100: npm --version`}
          />
          <p className="text-sm text-muted-foreground">
            Jika muncul angka versi (contoh v22.x.x), instalasi sukses.
          </p>
        </div>
      </div>

      <div className="mb-14">
        <h2 className="mb-6 flex items-center gap-3 font-heading text-2xl font-bold text-foreground">
          <PencilRuler className="size-5 text-primary" />
          Langkah 2 Pelajari Fondasi (dengan benar)
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Fondasi 1: HTML & CSS",
              desc: "Struktur dan tampilan website. Kerjakan 4-6 minggu. Cukup sampai kamu bisa membuat halaman profil yang rapi.",
            },
            {
              title: "Fondasi 2: JavaScript",
              desc: "Logika dan interaksi. Ini fondasi paling penting berikan 6-8 minggu sebelum menyentuh framework apa pun.",
            },
            {
              title: "Fondasi 3: Git & GitHub",
              desc: "Kelola versi kode. Bisa dipelajari paralel. Mulai menyimpan semua project di GitHub sejak sekarang.",
            },
            {
              title: "Fondasi 4: React + Next.js",
              desc: "Setelah JS lancar, baru ke framework. Ini keterampilan yang paling banyak dicari perusahaan.",
            },
          ].map((item) => (
            <Card key={item.title} className="h-full">
              <CardHeader>
                <CardTitle className="font-heading text-lg font-bold">{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-14">
        <h2 className="mb-6 flex items-center gap-3 font-heading text-2xl font-bold text-foreground">
          <MousePointerClick className="size-5 text-primary" />
          Langkah 3 Cara Belajar yang Efektif
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "1. Belajar aktif, bukan pasif",
              desc: "Setiap habis membaca/menonton, langsung tulis kodenya sendiri dari nol. Jangan copy-paste.",
            },
            {
              title: "2. Ikuti metode Feynman",
              desc: "Jelaskan konsep dengan kata-katamu sendiri, seolah mengajar orang lain. Jika buntu, berarti belum paham.",
            },
            {
              title: "3. Rusak kodenya",
              desc: "Ubah nilai, hapus baris, buat error lalu perbaiki. Ini cara tercepat membangun intuisi.",
            },
            {
              title: "4. Bangun project kecil",
              desc: "Setiap 1-2 minggu, buat satu project kecil yang memakai materi baru. Project mengikat semua yang kamu pelajari.",
            },
          ].map((item) => (
            <Card key={item.title} className="h-full">
              <CardHeader>
                <CardTitle className="font-heading text-lg font-bold">{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-14">
        <h2 className="mb-6 flex items-center gap-3 font-heading text-2xl font-bold text-foreground">
          <ShieldAlert className="size-5 text-primary" />
          Hindari Kesalahan Ini
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {mistakes.map((mistake) => (
            <Card key={mistake.title} className="h-full border-dashed border-border/70 bg-background/80 shadow-none">
              <CardHeader>
                <CardTitle className="font-heading text-lg font-bold">{mistake.title}</CardTitle>
                <CardDescription>{mistake.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-muted/50 p-8 shadow-sm backdrop-blur-sm">
        <h2 className="flex items-center gap-3 font-heading text-2xl font-bold text-foreground">
          <CheckCircle2 className="size-6 text-primary" />
          Checklist Minggu Pertamamu
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
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
            <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/roadmap">
              Lanjut ke Roadmap
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
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
