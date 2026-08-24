import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    categories,
    categoryKinds,
    getCategoryBySlug,
    getTutorialsInCategory,
} from "@/lib/categories";
import { ArrowLeft, ArrowRight, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
    return categories.map(category => ({ category: category.slug }));
}

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
    const { category: slug } = await params;
    const category = getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const items = getTutorialsInCategory(category.slug);
    const totalMinutes = items.reduce((total, item) => total + item.minutes, 0);
    const kind = categoryKinds.find(kind => kind.kind === category.kind);
    const currentIndex = categories.findIndex(item => item.slug === category.slug);
    const previous = categories[currentIndex - 1];
    const next = categories[currentIndex + 1];
    const Icon = category.icon;
    const firstTutorial = items[0];

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-14">
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Link href="/dashboard" className="transition-colors hover:text-foreground">
                    Beranda
                </Link>
                <span>/</span>
                <span>{kind?.label ?? category.kind}</span>
                <span>/</span>
                <span className="font-medium text-foreground">{category.name}</span>
            </nav>

            {/* Hero */}
            <div className="relative mb-12 overflow-hidden rounded-3xl border border-border/40 bg-card/60 p-8 sm:p-10">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute top-[-60%] right-[-10%] h-[250px] w-[350px] rounded-full bg-primary/[0.06] blur-[80px]" />
                </div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className={`flex size-12 items-center justify-center rounded-2xl ${category.accent}`}>
                        <Icon className="size-6" />
                    </span>
                    <Badge variant="secondary">{kind?.label ?? category.kind}</Badge>
                </div>
                <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Belajar {category.name}</h1>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{category.description}</p>
                <div className="mt-5 flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                        <BookOpen className="size-4" />
                        <span className="font-medium text-foreground">{items.length} bab</span> materi
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="size-4" />±{totalMinutes} menit materi inti
                    </span>
                </div>
                {firstTutorial && (
                    <div className="mt-6">
                        <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/15 transition-all hover:shadow-xl hover:shadow-primary/20">
                            <Link href={`/dashboard/tutorials/${firstTutorial.slug}`}>
                                Mulai dari Bab 1
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>

            {/* Chapter List */}
            <div className="mb-14">
                <h2 className="mb-2 font-heading text-2xl font-bold text-foreground">Daftar Bab</h2>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                    Bab tersusun berurutan dari yang paling dasar. Ikuti dari atas, progres belajarmu tersimpan otomatis.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                    {items.map((item, index) => (
                        <Link
                            key={item.slug}
                            href={`/dashboard/tutorials/${item.slug}`}
                            className="group"
                        >
                            <Card className="h-full border-border/50 bg-card/80 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-md hover:shadow-black/[0.03]">
                                <CardHeader>
                                    <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground/60">
                                        <span className="font-bold uppercase tracking-widest text-primary/80">Bab {index + 1}</span>
                                        <span>·</span>
                                        <span>{item.minutes} menit</span>
                                        <span>·</span>
                                        <span>{item.level}</span>
                                    </div>
                                    <CardTitle className="leading-snug group-hover:text-primary transition-colors duration-200">{item.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="mt-auto flex items-center gap-1 text-sm font-semibold text-primary/80 transition-colors duration-200 group-hover:text-primary">
                                    Baca bab
                                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Previous / Next */}
            {(previous || next) && (
                <div className="mb-14 grid gap-3 border-t border-border/50 pt-8 sm:grid-cols-2">
                    {previous ? (
                        <Link href={`/${previous.slug}`}>
                            <Card className="h-full border-border/50 bg-card/80 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-md">
                                <CardHeader>
                                    <CardDescription className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                                        <ArrowLeft className="size-3.5" /> Topik sebelumnya
                                    </CardDescription>
                                    <CardTitle className="font-heading text-base font-bold text-foreground">{previous.name}</CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                    ) : (
                        <div className="hidden sm:block" />
                    )}
                    {next && (
                        <Link href={`/${next.slug}`} className="sm:col-start-2">
                            <Card className="h-full border-border/50 bg-card/80 text-right transition-all duration-300 hover:border-border hover:bg-card hover:shadow-md">
                                <CardHeader>
                                    <CardDescription className="mb-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
                                        Topik selanjutnya <ArrowRight className="size-3.5" />
                                    </CardDescription>
                                    <CardTitle className="font-heading text-base font-bold text-foreground">{next.name}</CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                    )}
                </div>
            )}

            {/* Other Topics */}
            <div>
                <h2 className="mb-2 font-heading text-2xl font-bold text-foreground">Topik Lain</h2>
                <p className="mb-6 text-muted-foreground">Pilih topik lain yang mau kamu pelajari.</p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {categories
                        .filter(item => item.slug !== category.slug)
                        .map(item => {
                            const ItemIcon = item.icon;
                            return (
                                <Link key={item.slug} href={`/${item.slug}`} className="group">
                                    <Card className="h-full border-border/50 bg-card/80 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-md hover:shadow-black/[0.03]">
                                        <CardHeader>
                                            <span
                                                className={`mb-2 flex size-9 items-center justify-center rounded-xl ${item.accent}`}
                                            >
                                                <ItemIcon className="size-4" />
                                            </span>
                                            <CardTitle className="font-heading text-lg font-bold">{item.name}</CardTitle>
                                            <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="mt-auto flex items-center gap-1 text-sm font-semibold text-primary/80 transition-colors duration-200 group-hover:text-primary">
                                            Buka topik
                                            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
