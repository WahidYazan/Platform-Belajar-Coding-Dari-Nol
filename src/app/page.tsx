import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categoryKinds, getCategoryGroups } from "@/lib/categories";
import { tutorials } from "@/lib/tutorials";
import { ArrowRight, BookOpen, Clock, GraduationCap } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "./component/site-footer";
import { SiteHeader } from "./component/site-header";

export default function HomePage() {
    const groups = getCategoryGroups();
    const totalMinutes = tutorials.reduce((total, tutorial) => total + tutorial.minutes, 0);

    return (
        <div className="flex min-h-svh flex-col">
            <SiteHeader />
            <main className="flex-1">
                <div className="mx-auto w-full max-w-6xl px-4 py-14">
                    <div className="mb-16 max-w-3xl">
                        <p className="mb-3 text-sm font-medium text-primary">Sinau Coding</p>
                        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                            Belajar Coding dari Nol sampai Bisa
                        </h1>
                        <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                            Materi dipisah per topik — Frontend, Backend, Tools, sampai Deployment — dan disusun
                            berurutan. Pilih topik yang mau kamu pelajari, progres belajarmu tersimpan otomatis.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-4 text-sm">
                            <span className="flex items-center gap-2 rounded-full border px-3 py-1">
                                <GraduationCap className="size-4 text-primary" />
                                {tutorials.length} materi tersedia
                            </span>
                            <span className="flex items-center gap-2 rounded-full border px-3 py-1">
                                <Clock className="size-4 text-primary" />±{totalMinutes} menit materi inti
                            </span>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button asChild size="lg">
                                <Link href="/dashboard">
                                    Mulai Belajar
                                    <ArrowRight />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/start">
                                    <BookOpen />
                                    Panduan Mulai dari Sini
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="mb-14 space-y-14">
                        <div>
                            <h2 className="mb-2 font-heading text-2xl font-semibold">Pilih Materi</h2>
                            <p className="mb-8 text-muted-foreground">
                                Pilih dulu topiknya, lalu lihat daftar bab yang tersedia di halaman topik.
                            </p>
                        </div>

                        {categoryKinds
                            .map(kind => ({
                                kind,
                                groups: groups.filter(group => group.category.kind === kind.kind),
                            }))
                            .filter(item => item.groups.length > 0)
                            .map(({ kind, groups }) => (
                                <section key={kind.kind}>
                                    <div className="mb-4">
                                        <h3 className="font-heading text-xl font-semibold">{kind.label}</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">{kind.description}</p>
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {groups.map(({ category, items }) => {
                                            const Icon = category.icon;
                                            return (
                                                <Link key={category.slug} href={`/${category.slug}`} className="group">
                                                    <Card className="flex h-full flex-col transition-colors group-hover:ring-1 group-hover:ring-primary/40">
                                                        <CardHeader>
                                                            <span
                                                                className={`mb-3 flex size-10 items-center justify-center rounded-xl ${category.accent}`}
                                                            >
                                                                <Icon className="size-5" />
                                                            </span>
                                                            <CardTitle className="font-heading">
                                                                {category.name}
                                                            </CardTitle>
                                                            <CardDescription className="line-clamp-2">
                                                                {category.description}
                                                            </CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="mt-auto">
                                                            <p className="mb-3 text-xs text-muted-foreground">
                                                                {items.length} bab · ±
                                                                {items.reduce((total, item) => total + item.minutes, 0)}{" "}
                                                                menit
                                                            </p>
                                                            <p className="flex items-center gap-1 text-sm font-medium text-primary">
                                                                Buka topik
                                                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                                            </p>
                                                        </CardContent>
                                                    </Card>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </section>
                            ))}
                    </div>

                    <div className="rounded-2xl border bg-muted/50 p-8 text-center">
                        <h2 className="font-heading text-2xl font-semibold">Bingung mulai dari mana?</h2>
                        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                            Baca panduan langkah pertama: tools yang harus dipasang dan cara belajar yang benar.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <Button asChild size="lg">
                                <Link href="/start">
                                    Baca Panduan Mulai dari Sini
                                    <ArrowRight />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/roadmap">Lihat Roadmap</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
