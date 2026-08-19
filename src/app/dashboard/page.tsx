import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryGroups } from "@/lib/categories";
import { tutorials } from "@/lib/tutorials";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const groups = getCategoryGroups();

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-10">
            <div className="mb-14 max-w-3xl">
                <p className="mb-3 text-sm font-medium text-primary">Sinau Coding</p>
                <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                    Belajar Coding dari Nol sampai Bisa
                </h1>
                <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                    Materi dipisah per topik Frontend, Backend, Tools, sampai Deployment dan disusun
                    berurutan. Pilih topik yang mau kamu pelajari, progres belajarmu tersimpan otomatis.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-2 rounded-full border px-3 py-1">
                        <GraduationCap className="size-4 text-primary" />
                        {tutorials.length} materi tersedia
                    </span>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild size="lg">
                        <Link href={`/dashboard/tutorials/${tutorials[0].slug}`}>
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
                        Materi dikelompokkan per topik. Pilih topiknya, lalu ikuti bab-babnya secara berurutan.
                    </p>
                </div>

                {groups.map(({ category, items }) => {
                    const Icon = category.icon;
                    const totalMinutes = items.reduce((total, item) => total + item.minutes, 0);
                    return (
                        <section key={category.slug} className="scroll-mt-20">
                            <div className="mb-4 flex flex-wrap items-center gap-3">
                                <span
                                    className={`flex size-10 items-center justify-center rounded-xl ${category.accent}`}
                                >
                                    <Icon className="size-5" />
                                </span>
                                <div className="min-w-0">
                                    <h3 className="font-heading text-xl font-semibold">{category.name}</h3>
                                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                                        {category.description}
                                    </p>
                                </div>
                                <span className="ml-auto flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                                    <BookOpen className="size-3.5" />
                                    {items.length} bab · ±{totalMinutes} menit
                                </span>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {items.map((item, index) => (
                                    <Link
                                        key={item.slug}
                                        href={`/dashboard/tutorials/${item.slug}`}
                                        className="group"
                                    >
                                        <Card className="h-full transition-colors group-hover:ring-1 group-hover:ring-primary/40">
                                            <CardHeader>
                                                <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                    <span className="font-medium text-foreground">Bab {index + 1}</span>
                                                    <span>·</span>
                                                    <span>{item.minutes} menit</span>
                                                    <span>·</span>
                                                    <span>{item.level}</span>
                                                </div>
                                                <CardTitle className="leading-snug group-hover:underline">
                                                    {item.title}
                                                </CardTitle>
                                                <CardDescription className="line-clamp-2">
                                                    {item.description}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="mt-auto flex items-center gap-1 text-sm font-medium text-primary">
                                                Baca bab
                                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    );
                })}
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
        </main>
    );
}
