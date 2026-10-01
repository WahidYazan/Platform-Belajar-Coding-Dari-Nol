import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    categories,
    categoryKinds,
    getCategoryBySlug,
    getTutorialsInCategory,
} from "@/lib/categories";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
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
    const kind = categoryKinds.find(kind => kind.kind === category.kind);
    const currentIndex = categories.findIndex(item => item.slug === category.slug);
    const previous = categories[currentIndex - 1];
    const next = categories[currentIndex + 1];
    const Icon = category.icon;
    const firstTutorial = items[0];

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-12">
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-black uppercase text-black">
                <Link href="/dashboard" className="hover:underline">
                    Beranda
                </Link>
                <span>/</span>
                <span>{kind?.label ?? category.kind}</span>
                <span>/</span>
                <span className="rounded border-2 border-black bg-[#ffde59] px-2 py-0.5 text-black shadow-[1.5px_1.5px_0px_0px_#000000]">
                    {category.name}
                </span>
            </nav>

            {/* Hero Billboard */}
            <div className="relative mb-12 overflow-hidden rounded-2xl border-3 border-black bg-white p-8 sm:p-12 shadow-[8px_8px_0px_0px_#000000]">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="flex size-14 items-center justify-center rounded-2xl border-3 border-black bg-[#ff5b79] text-black shadow-[3px_3px_0px_0px_#000000]">
                        <Icon className="size-7 stroke-[2.5]" />
                    </span>
                    <Badge variant="secondary" className="border-2 border-black bg-[#ffde59] text-black font-black uppercase shadow-[2px_2px_0px_0px_#000000]">
                        {kind?.label ?? category.kind}
                    </Badge>
                </div>
                <h1 className="font-heading text-4xl font-black uppercase tracking-tight text-black sm:text-6xl">
                    Belajar {category.name}
                </h1>
                <p className="mt-3 max-w-2xl text-base sm:text-lg font-bold leading-relaxed text-black/85">
                    {category.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-xs font-black uppercase text-black">
                    <span className="flex items-center gap-2 rounded-lg border-2 border-black bg-[#4ade80] px-3.5 py-1.5 shadow-[2px_2px_0px_0px_#000000]">
                        <BookOpen className="size-4 stroke-[2.5]" />
                        <span>{items.length} BAB MATERI LENGKAP</span>
                    </span>
                </div>
                {firstTutorial && (
                    <div className="mt-7">
                        <Button asChild size="lg" className="border-3 border-black bg-[#ff5b79] text-black font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5">
                            <Link href={`/dashboard/tutorials/${firstTutorial.slug}`}>
                                Mulai dari Bab 1
                                <ArrowRight className="size-5 stroke-[2.5]" />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>

            {/* Chapter List */}
            <div className="mb-16">
                <h2 className="mb-2 font-heading text-2xl font-black uppercase text-foreground sm:text-3xl">Daftar Bab</h2>
                <p className="mb-6 font-medium text-black/80 leading-relaxed">
                    Bab tersusun berurutan dari yang paling dasar. Ikuti dari atas, progres belajarmu tersimpan otomatis!
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                    {items.map((item, index) => (
                        <Link
                            key={item.slug}
                            href={`/dashboard/tutorials/${item.slug}`}
                            className="group"
                        >
                            <div className="flex h-full flex-col justify-between rounded-xl border-3 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#000000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000000] hover:bg-[#fffdf5]">
                                <div>
                                    <div className="mb-2 flex items-center gap-2 text-xs">
                                        <span className="rounded border-2 border-black bg-[#ffde59] px-2 py-0.5 font-black uppercase tracking-wider text-black shadow-[1.5px_1.5px_0px_0px_#000000]">
                                            Bab {index + 1}
                                        </span>
                                        <span className="font-bold text-black/60">·</span>
                                        <span className="font-bold text-black/80">{item.minutes} menit</span>
                                        <span className="font-bold text-black/60">·</span>
                                        <span className="font-bold text-black/80">{item.level}</span>
                                    </div>
                                    <h3 className="font-heading text-xl font-black uppercase text-black group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm font-medium line-clamp-2 text-black/75">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="mt-5 flex items-center gap-1.5 text-xs font-black uppercase text-black group-hover:text-primary">
                                    Baca bab
                                    <ArrowRight className="size-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Previous / Next */}
            {(previous || next) && (
                <div className="mb-16 grid gap-4 border-t-3 border-black pt-8 sm:grid-cols-2">
                    {previous ? (
                        <Link href={`/${previous.slug}`}>
                            <div className="h-full rounded-xl border-3 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000000] hover:bg-[#ffde59]">
                                <p className="mb-1 flex items-center gap-1.5 text-xs font-black uppercase text-black">
                                    <ArrowLeft className="size-4 stroke-[2.5]" /> Topik sebelumnya
                                </p>
                                <p className="font-heading text-lg font-black uppercase text-black">{previous.name}</p>
                            </div>
                        </Link>
                    ) : (
                        <div className="hidden sm:block" />
                    )}
                    {next && (
                        <Link href={`/${next.slug}`} className="sm:col-start-2">
                            <div className="h-full rounded-xl border-3 border-black bg-white p-5 text-right shadow-[4px_4px_0px_0px_#000000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000000] hover:bg-[#4ade80]">
                                <p className="mb-1 flex items-center justify-end gap-1.5 text-xs font-black uppercase text-black">
                                    Topik selanjutnya <ArrowRight className="size-4 stroke-[2.5]" />
                                </p>
                                <p className="font-heading text-lg font-black uppercase text-black">{next.name}</p>
                            </div>
                        </Link>
                    )}
                </div>
            )}

            {/* Other Topics */}
            <div>
                <h2 className="mb-2 font-heading text-2xl font-black uppercase text-foreground sm:text-3xl">Topik Lain</h2>
                <p className="mb-6 font-medium text-black/80">Pilih topik lain yang mau kamu pelajari selanjutnya!</p>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {categories
                        .filter(item => item.slug !== category.slug)
                        .map(item => {
                            const ItemIcon = item.icon;
                            return (
                                <Link key={item.slug} href={`/${item.slug}`} className="group">
                                    <div className="flex h-full flex-col justify-between rounded-xl border-3 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#000000] hover:bg-[#ffde59]">
                                        <div>
                                            <span className="mb-3 flex size-10 items-center justify-center rounded-lg border-2 border-black bg-[#ff5b79] text-black shadow-[2px_2px_0px_0px_#000000]">
                                                <ItemIcon className="size-5 stroke-[2.5]" />
                                            </span>
                                            <h3 className="font-heading text-lg font-black uppercase text-black">{item.name}</h3>
                                            <p className="mt-1.5 text-xs font-medium line-clamp-2 text-black/80">{item.description}</p>
                                        </div>
                                        <div className="mt-4 flex items-center gap-1.5 text-xs font-black uppercase text-black">
                                            Buka topik
                                            <ArrowRight className="size-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
