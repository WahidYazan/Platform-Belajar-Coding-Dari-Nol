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
                <Link href="/dashboard" className="hover:text-foreground">
                    Beranda
                </Link>
                <span>/</span>
                <span>{kind?.label ?? category.kind}</span>
                <span>/</span>
                <span className="font-medium text-foreground">{category.name}</span>
            </nav>

            <div className="mb-12">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className={`flex size-12 items-center justify-center rounded-2xl ${category.accent}`}>
                        <Icon className="size-6" />
                    </span>
                    <Badge variant="secondary">{kind?.label ?? category.kind}</Badge>
                </div>
                <h1 className="font-heading text-4xl font-semibold tracking-tight">Belajar {category.name}</h1>
                <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{category.description}</p>
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
                        <Button asChild size="lg">
                            <Link href={`/dashboard/tutorials/${firstTutorial.slug}`}>
                                Mulai dari Bab 1
                                <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>

            <div className="mb-14">
                <h2 className="mb-2 font-heading text-2xl font-semibold">Daftar Bab</h2>
                <p className="mb-6 text-muted-foreground">
                    Bab tersusun berurutan dari yang paling dasar. Ikuti dari atas, progres belajarmu tersimpan otomatis.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
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
                                    <CardTitle className="leading-snug group-hover:underline">{item.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="mt-auto flex items-center gap-1 text-sm font-medium text-primary">
                                    Baca bab
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {(previous || next) && (
                <div className="mb-14 grid gap-3 border-t pt-8 sm:grid-cols-2">
                    {previous ? (
                        <Link href={`/${previous.slug}`}>
                            <div className="group h-full rounded-xl border p-4 transition-colors hover:ring-1 hover:ring-primary/40">
                                <p className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                                    <ArrowLeft className="size-3.5" /> Topik sebelumnya
                                </p>
                                <p className="font-medium group-hover:underline">{previous.name}</p>
                            </div>
                        </Link>
                    ) : (
                        <div className="hidden sm:block" />
                    )}
                    {next && (
                        <Link href={`/${next.slug}`} className="sm:col-start-2">
                            <div className="group h-full rounded-xl border p-4 text-right transition-colors hover:ring-1 hover:ring-primary/40">
                                <p className="mb-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
                                    Topik selanjutnya <ArrowRight className="size-3.5" />
                                </p>
                                <p className="font-medium group-hover:underline">{next.name}</p>
                            </div>
                        </Link>
                    )}
                </div>
            )}

            <div>
                <h2 className="mb-2 font-heading text-2xl font-semibold">Topik Lain</h2>
                <p className="mb-6 text-muted-foreground">Pilih topik lain yang mau kamu pelajari.</p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {categories
                        .filter(item => item.slug !== category.slug)
                        .map(item => {
                            const ItemIcon = item.icon;
                            return (
                                <Link key={item.slug} href={`/${item.slug}`} className="group">
                                    <Card className="h-full transition-colors group-hover:ring-1 group-hover:ring-primary/40">
                                        <CardHeader>
                                            <span
                                                className={`mb-2 flex size-9 items-center justify-center rounded-xl ${item.accent}`}
                                            >
                                                <ItemIcon className="size-4" />
                                            </span>
                                            <CardTitle className="font-heading">{item.name}</CardTitle>
                                            <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="mt-auto flex items-center gap-1 text-sm font-medium text-primary">
                                            Buka topik
                                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
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
