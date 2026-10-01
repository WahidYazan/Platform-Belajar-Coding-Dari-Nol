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
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      {/* Hero Billboard */}
      <div className="relative mb-14 overflow-hidden rounded-2xl border-3 border-black bg-[#ffde59] p-8 sm:p-12 shadow-[8px_8px_0px_0px_#000000]">
        <div className="inline-block rounded-md border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_0px_#000000] mb-4">
          ⚡ PANDUAN LANGKAH PERTAMA
        </div>
        <h1 className="font-heading text-4xl font-black tracking-tight text-black sm:text-6xl uppercase">
          Mulai dari Sini! 🚀
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg font-bold leading-relaxed text-black/90">
          Panduan lengkap untuk hari-hari pertamamu belajar coding: apa yang harus dipasang,
          bagaimana cara belajar yang benar, dan kesalahan yang wajib kamu hindari!
        </p>
      </div>

      {/* Tools */}
      <div className="mb-16">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl border-3 border-black bg-[#38bdf8] text-black shadow-[3px_3px_0px_0px_#000000]">
            <Download className="size-6 stroke-[2.5]" />
          </span>
          <h2 className="font-heading text-2xl font-black uppercase text-foreground sm:text-3xl">
            Langkah 1 — Pasang Tools
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {tools.map((tool) => (
            <div key={tool.title} className="group flex h-full flex-col rounded-xl border-3 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#000000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000000]">
              <div className="mb-2 text-3xl">{tool.emoji}</div>
              <h3 className="font-heading text-xl font-black uppercase text-black">{tool.title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black/80">{tool.desc}</p>
              <div className="mt-auto pt-5">
                <Button asChild variant="outline" size="sm" className="border-2 border-black bg-[#ffde59] text-black font-black uppercase shadow-[2px_2px_0px_0px_#000000] hover:bg-[#ff5b79]">
                  <a href={tool.link} target="_blank" rel="noreferrer">
                    Kunjungi situs
                    <ArrowRight className="size-4 stroke-[2.5]" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl border-3 border-black bg-[#fffdf5] p-5 shadow-[4px_4px_0px_0px_#000000]">
          <p className="mb-2 text-sm font-black uppercase text-black">Verifikasi instalasi Node.js di terminal:</p>
          <CodeBlock
            lang="bash"
            filename="terminal"
            code={`node --version\nnpm --version`}
          />
          <p className="text-xs font-bold text-black/70">
            ✓ Jika muncul angka versi (contoh v22.x.x), instalasi sukses 100%!
          </p>
        </div>
      </div>

      {/* Foundation */}
      <div className="mb-16">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl border-3 border-black bg-[#4ade80] text-black shadow-[3px_3px_0px_0px_#000000]">
            <PencilRuler className="size-6 stroke-[2.5]" />
          </span>
          <h2 className="font-heading text-2xl font-black uppercase text-foreground sm:text-3xl">
            Langkah 2 — Pelajari Fondasi
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              title: "Fondasi 1: HTML & CSS",
              desc: "Struktur dan tampilan website. Kerjakan 4-6 minggu. Cukup sampai kamu bisa membuat halaman profil yang rapi.",
              emoji: "🎨",
              bg: "bg-[#ff5b79]/20",
            },
            {
              title: "Fondasi 2: JavaScript",
              desc: "Logika dan interaksi. Ini fondasi paling penting berikan 6-8 minggu sebelum menyentuh framework apa pun.",
              emoji: "⚡",
              bg: "bg-[#ffde59]/25",
            },
            {
              title: "Fondasi 3: Git & GitHub",
              desc: "Kelola versi kode. Bisa dipelajari paralel. Mulai menyimpan semua project di GitHub sejak sekarang.",
              emoji: "📦",
              bg: "bg-[#38bdf8]/20",
            },
            {
              title: "Fondasi 4: React + Next.js",
              desc: "Setelah JS lancar, baru ke framework. Ini keterampilan yang paling banyak dicari perusahaan.",
              emoji: "⚛️",
              bg: "bg-[#c084fc]/20",
            },
          ].map((item) => (
            <div key={item.title} className={`rounded-xl border-3 border-black ${item.bg} p-6 shadow-[5px_5px_0px_0px_#000000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#000000]`}>
              <div className="mb-2 text-3xl">{item.emoji}</div>
              <h3 className="font-heading text-lg font-black uppercase text-black">{item.title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black/85">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Methods */}
      <div className="mb-16">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl border-3 border-black bg-[#ff5b79] text-black shadow-[3px_3px_0px_0px_#000000]">
            <MousePointerClick className="size-6 stroke-[2.5]" />
          </span>
          <h2 className="font-heading text-2xl font-black uppercase text-foreground sm:text-3xl">
            Langkah 3 — Cara Belajar yang Efektif
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
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
              desc: "Ubah nilai, hapus baris, buat error lalu perbaiki. Ini cara tercepat membangun intuisi coder tangguh.",
              emoji: "🔧",
            },
            {
              title: "4. Bangun project kecil",
              desc: "Setiap 1-2 minggu, buat satu project kecil yang memakai materi baru. Project mengikat semua yang kamu pelajari.",
              emoji: "🏗️",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border-3 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#000000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#000000]">
              <div className="mb-2 text-3xl">{item.emoji}</div>
              <h3 className="font-heading text-lg font-black uppercase text-black">{item.title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mistakes */}
      <div className="mb-16">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl border-3 border-black bg-[#ff3333] text-white shadow-[3px_3px_0px_0px_#000000]">
            <ShieldAlert className="size-6 stroke-[2.5]" />
          </span>
          <h2 className="font-heading text-2xl font-black uppercase text-foreground sm:text-3xl">
            Hindari Kesalahan Ini! 🚫
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {mistakes.map((mistake) => (
            <div key={mistake.title} className="rounded-xl border-3 border-black bg-[#fff5f5] p-6 shadow-[4px_4px_0px_0px_#000000] transition-all hover:-translate-x-1 hover:-translate-y-1">
              <div className="mb-2 text-3xl">{mistake.emoji}</div>
              <h3 className="font-heading text-lg font-black uppercase text-black">{mistake.title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black/80">{mistake.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="relative overflow-hidden rounded-2xl border-3 border-black bg-[#4deeea] p-8 sm:p-10 shadow-[8px_8px_0px_0px_#000000]">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_#000000]">
            <CheckCircle2 className="size-6 stroke-[2.5]" />
          </span>
          <h2 className="font-heading text-2xl font-black uppercase text-black sm:text-3xl">
            Checklist Minggu Pertamamu
          </h2>
        </div>
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
            <li key={item} className="flex items-center gap-2.5 rounded-lg border-2 border-black bg-white px-3.5 py-2 font-bold text-xs sm:text-sm text-black shadow-[2px_2px_0px_0px_#000000]">
              <CheckCircle2 className="size-4 shrink-0 text-black stroke-[3]" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild size="lg" className="border-3 border-black bg-[#ff5b79] text-black font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5">
            <Link href="/roadmap">
              Lanjut ke Roadmap
              <ArrowRight className="size-5 stroke-[2.5]" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-3 border-black bg-white text-black font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#000000] hover:bg-[#ffde59] hover:-translate-x-0.5 hover:-translate-y-0.5">
            <Link href="/dashboard">
              <BookOpen className="size-5 stroke-[2.5]" />
              Lihat Tutorial
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
