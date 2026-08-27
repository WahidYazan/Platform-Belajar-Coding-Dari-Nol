import { Button } from "@/components/ui/button";
import AppShell from "@/components/app-shell";
import { ArrowRight, BookOpen, CheckCircle2, Goal, GraduationCap, Map, Rocket, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "./component/site-footer-home";

const features = [
    {
        icon: Map,
        title: "Langkah terstruktur dari nol",
        description:
            "Materi disusun berurutan: mulai dari cara kerja web, HTML, CSS, JavaScript, React, backend, sampai deployment. Tidak ada loncat-loncat yang bikin bingung.",
        color: "from-emerald-500/10 to-teal-500/10",
        iconBg: "bg-blue-500/10 text-blue-600",
        border: "hover:border-amber-500/20",
    },
    {
        icon: CheckCircle2,
        title: "Progres tersimpan per akun",
        description:
            "Buat akun gratis, tandai bab yang sudah selesai, dan lanjutkan belajarmu kapan saja dari perangkat mana pun.",
        color: "from-emerald-500/10 to-teal-500/10",
        iconBg: "bg-emerald-500/10 text-emerald-600",
        border: "hover:border-amber-500/20",
    },
    {
        icon: GraduationCap,
        title: "Bahasa Indonesia yang mudah",
        description:
            "Semua materi dijelaskan dengan bahasa yang santai dan mudah dipahami, cocok untuk pemula tanpa latar belakang IT.",
        color: "from-emerald-500/10 to-teal-500/10",
        iconBg: "bg-amber-500/10 text-amber-600",
        border: "hover:border-amber-500/20",
    },
    {
        icon: BookOpen,
        title: "Panduan & roadmap yang jelas",
        description:
            "Bingung mulai dari mana? Ada panduan langkah pertama dan roadmap yang menunjukkan arah belajarmu sampai bisa bikin website sendiri.",
        color: "from-emerald-500/10 to-teal-500/10",
        iconBg: "bg-violet-500/10 text-violet-600",
        border: "hover:border-amber-500/20",
    },
    {
        icon: ThumbsUp,
        title: "Kode contoh siap dipakai",
        description: "Setiap bab dilengkapi contoh kode yang bisa langsung kamu coba dan tiru, bukan cuma teori.",
        color: "from-emerald-500/10 to-teal-500/10",
        iconBg: "bg-rose-500/10 text-rose-600",
        border: "hover:border-amber-500/20",
    },
    {
        icon: Rocket,
        title: "Sampai bisa publish",
        description:
            "Belajarnya tidak berhenti di teori. Kamu diajak sampai tahap deploy: website hasil karyamu bisa dilihat orang lain di internet.",
        color: "from-emerald-500/10 to-teal-500/10",
        iconBg: "bg-cyan-500/10 text-cyan-600",
        border: "hover:border-amber-500/20",
    },
];

export default function HomePage() {
    return (
        <AppShell footer={<SiteFooter />}>
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute top-[-40%] left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[100px]" />
                    <div className="absolute top-10 right-[-10%] h-[300px] w-[300px] rounded-full bg-blue-400/[0.05] blur-[80px]" />
                    <div className="absolute top-20 left-[-5%] h-[250px] w-[250px] rounded-full bg-violet-400/[0.04] blur-[80px]" />
                </div>
                <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-28 sm:pt-36">
                    <div className="mx-auto max-w-3xl text-center">
                        {/* <div className="animate-fade-in-up mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.04] px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                            </span>
                            Platform Belajar Terstruktur
                        </div> */}
                        <h1 className="animate-fade-in-up delay-100 font-heading text-5xl font-bold tracking-tight text-foreground sm:text-7xl/tight">
                            Belajar Coding
                            <br />
                            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                                Dari Nol Sampai Mahir
                            </span>
                        </h1>
                        <p className="animate-fade-in-up delay-200 mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
                            Sinau Coding adalah platform belajar pemrograman dalam Bahasa Indonesia.
                            Tanpa background IT, kamu bisa belajar langkah demi langkah dari dasar sampai mempublikasikan website karyamu sendiri.
                        </p>
                        <div className="animate-fade-in-up delay-300 mt-10 flex flex-wrap items-center justify-center gap-4">
                            <Button asChild size="lg" className="rounded-full px-9 text-base font-medium shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/25">
                                <Link href="/register">
                                    Mulai Belajar Gratis
                                    <ArrowRight className="ml-2 size-4" />
                                </Link>
                            </Button>
                            {/* <Button asChild variant="ghost" size="lg" className="rounded-full px-8 text-base text-muted-foreground">
                                <Link href="/start">
                                    Lihat Panduan
                                </Link>
                            </Button> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Audience */}
            <section className="relative border-y border-border/40 bg-muted/15">
                <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-24">
                    <div className="mb-14 text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary/70">Untuk Siapa</p>
                        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Didesain untuk semua kalangan
                        </h2>
                        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Mulai dari siswa hingga profesional yang ingin berganti karier.
                            Kurikulum kami disusun untuk memastikan siapa pun bisa mulai koding hari ini.
                        </p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-3">
                        {[
                            {
                                // emoji: "🌱",
                                title: "Total Pemula",
                                desc: "Tidak tahu harus mulai dari mana? Materi disusun khusus untuk yang benar-benar baru, tanpa jargon yang membingungkan.",
                            },
                            {
                                // emoji: "🎓",
                                title: "Siswa & Mahasiswa",
                                desc: "Pelengkap materi kuliah atau tugas sekolah dengan contoh kode praktis yang bisa langsung dipelajari dan diterapkan.",
                            },
                            {
                                // emoji: "🚀",
                                title: "Profesional",
                                desc: "Dari nol sampai siap deploy. Bekali dirimu dengan portofolio nyata untuk mendukung transisi karier ke dunia teknologi.",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-7 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-lg hover:shadow-black/[0.03]"
                            >
                                {/* <div className="mb-4 text-3xl">{item.emoji}</div> */}
                                <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                    {item.desc}
                                </p>
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="mx-auto w-full max-w-6xl px-4 py-24">
                <div className="mb-16 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary/70">Fitur Unggulan</p>
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Pengalaman belajar terbaik
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Lebih dari sekadar artikel. Kami menyediakan ekosistem pendukung untuk memastikan progres belajarmu tetap konsisten.
                    </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-7 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/[0.04] ${feature.border}`}
                            >
                                <div className={`mb-4 flex size-11 items-center justify-center rounded-xl ${feature.iconBg}`}>
                                    <Icon className="size-5" />
                                </div>
                                <h3 className="font-heading text-base font-bold text-foreground">{feature.title}</h3>
                                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                                    {feature.description}
                                </p>
                                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto w-full max-w-5xl px-4 pb-24">
                <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-10 sm:p-16 text-center shadow-lg shadow-black/[0.03]">
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute top-[-50%] left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[80px]" />
                        <div className="absolute bottom-[-30%] right-[-10%] h-[250px] w-[250px] rounded-full bg-blue-400/[0.04] blur-[60px]" />
                    </div>
                    <span className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <GraduationCap className="size-7" />
                    </span>
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Siap memulai
                        <br />
                        <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                            perjalananmu?
                        </span>
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
                        Setiap developer hebat berawal dari baris kode pertama. Hari ini giliranmu untuk melangkah lebih jauh.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg" className="rounded-full px-10 text-base font-medium shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/25">
                            <Link href="/register">
                                Daftar Sekarang
                                <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </AppShell>
    );
}
