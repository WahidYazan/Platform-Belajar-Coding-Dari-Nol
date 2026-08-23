import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppShell from "@/components/app-shell";
import { categories } from "@/lib/categories";
import { tutorials } from "@/lib/tutorials";
import { ArrowRight, BookOpen, CheckCircle2, Goal, GraduationCap, Map, Rocket, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "./component/site-footer-home";

const features = [
    {
        icon: Map,
        title: "Langkah terstruktur dari nol",
        description:
            "Materi disusun berurutan: mulai dari cara kerja web, HTML, CSS, JavaScript, React, backend, sampai deployment. Tidak ada loncat-loncat yang bikin bingung.",
    },
    {
        icon: CheckCircle2,
        title: "Progres tersimpan per akun",
        description:
            "Buat akun gratis, tandai bab yang sudah selesai, dan lanjutkan belajarmu kapan saja dari perangkat mana pun.",
    },
    {
        icon: GraduationCap,
        title: "Bahasa Indonesia yang mudah",
        description:
            "Semua materi dijelaskan dengan bahasa yang santai dan mudah dipahami, cocok untuk pemula tanpa latar belakang IT.",
    },
    {
        icon: BookOpen,
        title: "Panduan & roadmap yang jelas",
        description:
            "Bingung mulai dari mana? Ada panduan langkah pertama dan roadmap yang menunjukkan arah belajarmu sampai bisa bikin website sendiri.",
    },
    {
        icon: ThumbsUp,
        title: "Kode contoh siap dipakai",
        description: "Setiap bab dilengkapi contoh kode yang bisa langsung kamu coba dan tiru, bukan cuma teori.",
    },
    {
        icon: Rocket,
        title: "Sampai bisa publish",
        description:
            "Belajarnya tidak berhenti di teori. Kamu diajak sampai tahap deploy: website hasil karyamu bisa dilihat orang lain di internet.",
    },
];

export default function HomePage() {
    return (
        <AppShell footer={<SiteFooter />}>
            <section className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-24 sm:pt-32">
                <div className="absolute inset-x-0 top-0 -z-10 h-96 overflow-hidden [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                        </span>
                        Platform Belajar Terstruktur
                    </div>
                    <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-6xl/tight">
                        Belajar Coding Dari Nol
                        <span className="block text-primary">Sampai Mahir</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                        Sinau Coding adalah platform belajar pemrograman dalam Bahasa Indonesia.
                        Tanpa background IT, kamu bisa belajar langkah demi langkah dari dasar sampai mempublikasikan website karyamu sendiri.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg" className="rounded-full px-8 text-base font-medium">
                            <Link href="/register">
                                Mulai Belajar Gratis
                                <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                        {/* <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base font-medium">
                            <Link href="/start">
                                Lihat Roadmap
                            </Link>
                        </Button> */}
                    </div>
                </div>
            </section>

            <section className="border-y border-border/40 bg-muted/20">
                <div className="mx-auto w-full max-w-6xl px-4 py-20">
                    <div className="mb-12 text-center">
                        <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            Didesain untuk semua kalangan
                        </h2>
                        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                            Mulai dari siswa hingga profesional yang ingin berganti karier.
                            Kurikulum kami disusun untuk memastikan siapa pun bisa mulai koding hari ini.
                        </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-3">
                        <div className="group relative rounded-xl border border-border/40 bg-background/50 p-6 transition-all hover:bg-background hover:shadow-sm">
                            <h3 className="font-heading text-base font-bold text-foreground">Total Pemula</h3>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                Tidak tahu harus mulai dari mana? Materi disusun khusus untuk yang benar-benar baru, tanpa jargon yang membingungkan.
                            </p>
                        </div>
                        <div className="group relative rounded-xl border border-border/40 bg-background/50 p-6 transition-all hover:bg-background hover:shadow-sm">
                            <h3 className="font-heading text-base font-bold text-foreground">Siswa & Mahasiswa</h3>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                Pelengkap materi kuliah atau tugas sekolah dengan contoh kode praktis yang bisa langsung dipelajari dan diterapkan.
                            </p>
                        </div>
                        <div className="group relative rounded-xl border border-border/40 bg-background/50 p-6 transition-all hover:bg-background hover:shadow-sm">
                            <h3 className="font-heading text-base font-bold text-foreground">Profesional</h3>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                Dari nol sampai siap deploy. Bekali dirimu dengan portofolio nyata untuk mendukung transisi karier ke dunia teknologi.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-6xl px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Pengalaman belajar terbaik
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        Lebih dari sekadar artikel. Kami menyediakan ekosistem pendukung untuk memastikan progres belajarmu tetap konsisten.
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map(feature => {
                        const Icon = feature.icon;
                        return (
                            <div key={feature.title} className="flex flex-col items-start">
                                <span className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon className="size-5" />
                                </span>
                                <h3 className="font-heading text-base font-bold text-foreground">{feature.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="mx-auto w-full max-w-5xl px-4 py-24">
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-16 text-center overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0,transparent_70%)]" />
                    </div>
                    <span className="mx-auto mb-6 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Goal className="size-6" />
                    </span>
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Siap memulai perjalananmu?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                        Setiap developer hebat berawal dari baris kode pertama. Hari ini giliranmu untuk melangkah lebih jauh.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg" className="rounded-full px-10 text-base font-medium">
                            <Link href="/register">
                                Daftar Sekarang
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </AppShell>
    );
}
