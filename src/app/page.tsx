import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories, getCategoryGroups } from "@/lib/categories";
import { tutorials } from "@/lib/tutorials";
import { ArrowRight, BookOpen, CheckCircle2, Goal, GraduationCap, Map, Rocket, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { MobileNavBar } from "./component/mobile-nav-bar";
import { SiteFooter } from "./component/site-footer-home";
import { SiteHeader } from "./component/site-header-home";

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
    const groups = getCategoryGroups();
    const totalMinutes = tutorials.reduce((total, tutorial) => total + tutorial.minutes, 0);

    return (
        <div className="flex min-h-svh flex-col pb-16 md:pb-0">
            <SiteHeader />
            <main className="flex-1">
                <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-20 sm:pt-24">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-lg font-extrabold text-primary">
                            {/* <Sparkles className="size-4" /> */}
                            Website Sinau Coding
                        </p>
                        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-6xl">
                            Belajar Coding Dari Nol
                            <span className="block text-primary">Sampai Bisa</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                            Sinau Coding adalah platform belajar pemrograman dalam Bahasa Indonesia. Tanpa perlu
                            background IT, kamu belajar langkah demi langkah dari pengenalan dasar sampai bisa membuat
                            dan mempublikasikan website buatanmu sendiri.
                        </p>
                        <div className="mt-10 flex flex-wrap justify-center gap-3">
                            <Button asChild size="lg" className="px-8 text-2xl">
                                <Link href="/register">
                                    Mulai Belajar Gratis
                                    <ArrowRight />
                                </Link>
                            </Button>
                        </div>
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-lg text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <GraduationCap className="size-4 text-primary" />
                                {tutorials.length} materi yang stersedia
                            </span>
                            {/* <span className="flex items-center gap-2">
                                <Clock className="size-4 text-primary" />±{totalMinutes} menit materi inti
                            </span> */}
                            <span className="flex items-center gap-2">
                                <BookOpen className="size-4 text-primary" />
                                {categories.length} topik belajar
                            </span>
                        </div>
                    </div>
                </section>

                <section className="border-y bg-muted/40">
                    <div className="mx-auto w-full max-w-6xl px-4 py-16">
                        <div className="mb-10 text-center">
                            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                                Sinau Coding itu buat siapa?
                            </h2>
                            <p className="mt-3 leading-7 text-muted-foreground">
                                Buat kamu yang ingin pindah karier ke dunia IT, pelajar yang baru kenal koding, sampai
                                pekerja yang mau upgrade skill. Yang penting niat, soal latar belakang di sini semua
                                dimulai dari nol.
                            </p>
                        </div>
                        <div className="text-center grid gap-6 sm:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-heading">Total pemula</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm leading-6 text-muted-foreground">
                                    Tidak tahu harus mulai dari mana? Materi disusun khusus untuk yang benar-benar baru,
                                    tanpa jargon yang bikin pusing.
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-heading">Siswa & mahasiswa</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm leading-6 text-muted-foreground">
                                    Pelengkap materi kuliah atau tugas sekolah. Contoh kode siap pakai yang bisa
                                    langsung dicoba.
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-heading">Karyawan yang mau switch</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm leading-6 text-muted-foreground">
                                    Dari nol sampai bisa deploy website sendiri, modal buat portofolio dan karier
                                    barumu.
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-full max-w-6xl px-4 py-16">
                    <div className="text-center mb-10">
                        <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                            Fitur yang bikin belajar makin gampang
                        </h2>
                        <p className="mt-3 leading-7 text-muted-foreground">
                            Bukan sekadar kumpulan artikel. Semua dirancang supaya kamu konsisten sampai selesai.
                        </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map(feature => {
                            const Icon = feature.icon;
                            return (
                                <Card key={feature.title} className="flex h-full flex-col">
                                    <CardHeader>
                                        <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <Icon className="size-5" />
                                        </span>
                                        <CardTitle className="font-heading">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm leading-6 text-muted-foreground">
                                        {feature.description}
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                {/* <section className="border-y bg-muted/40">
                    <div className="mx-auto w-full max-w-6xl px-4 py-16">
                        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                            <div className="max-w-2xl">
                                <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                                    Pilih topik, langsung mulai
                                </h2>
                                <p className="mt-3 leading-7 text-muted-foreground">
                                    Semua topik dibuka gratis. Kamu bebas pilih, tapi kalau baru mulai, ikuti urutannya
                                    dari Dasar.
                                </p>
                            </div>
                            <Button asChild variant="outline">
                                <Link href="/dashboard">
                                    Lihat semua materi
                                    <ArrowRight />
                                </Link>
                            </Button>
                        </div>

                        {categoryKinds
                            .map(kind => ({
                                kind,
                                groups: groups.filter(group => group.category.kind === kind.kind),
                            }))
                            .filter(item => item.groups.length > 0)
                            .map(({ kind, groups }) => (
                                <div key={kind.kind} className="mb-8">
                                    <div className="mb-3 flex items-baseline gap-3">
                                        <h3 className="font-heading text-lg font-semibold">{kind.label}</h3>
                                        <p className="text-sm text-muted-foreground">{kind.description}</p>
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                        {groups.map(({ category }) => {
                                            const Icon = category.icon;
                                            return (
                                                <Link
                                                    key={category.slug}
                                                    href={`/${category.slug}`}
                                                    className="group rounded-xl border p-4 transition-colors hover:ring-1 hover:ring-primary/40"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span
                                                            className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${category.accent}`}
                                                        >
                                                            <Icon className="size-4" />
                                                        </span>
                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-medium">
                                                                {category.name}
                                                            </p>
                                                            <p className="truncate text-xs text-muted-foreground">
                                                                {groups.find(
                                                                    group => group.category.slug === category.slug,
                                                                )?.items.length ?? 0}{" "}
                                                                bab
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                    </div>
                </section> */}

                <section className="mx-auto w-full max-w-4xl px-4 py-20 text-center">
                    <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Goal className="size-6" />
                        {/* <span className="text-3xl leading-none">🔰</span> */}
                    </span>
                    <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                        Karier di dunia IT dimulai dari satu langkah
                    </h2>
                    <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                        Mulai perjalanan codingmu hari ini
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
                        Setiap developer hebat pernah jadi pemula. Hari ini giliran kamu. Mulai dari bab pertama, tandai
                        progresmu, dan lihat seberapa jauh kamu bisa melangkah.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Button asChild size="lg" className="px-8 text-2xl">
                            <Link href="/register">
                                Daftar & Mulai Sekarang
                                <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                </section>
            </main>
            <SiteFooter />
            <MobileNavBar />
        </div>
    );
}
