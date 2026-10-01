import { ChapterActions } from "@/app/component/chapter-actions";
import { TutorialContent } from "@/app/component/tutorial-content";
import { WebEditor } from "@/app/component/web-editor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTutorialBySlug, tutorials } from "@/lib/tutorials";
import type { ContentBlock } from "@/lib/tutorials";
import { ArrowLeft, ArrowRight, ListChecks } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return tutorials.map(tutorial => ({ slug: tutorial.slug }));
}

export default async function ChapterPage({ params }: PageProps<"/dashboard/tutorials/[slug]">) {
    const { slug } = await params;
    const tutorial = getTutorialBySlug(slug);

    if (!tutorial) {
        notFound();
    }

    const currentIndex = tutorials.findIndex(item => item.slug === tutorial.slug);
    const previous = currentIndex > 0 ? tutorials[currentIndex - 1] : undefined;
    const next = currentIndex < tutorials.length - 1 ? tutorials[currentIndex + 1] : undefined;

    // Extract code for standalone playground
    const codeBlocks = tutorial.content.filter((b): b is Extract<ContentBlock, { type: "code" }> => b.type === "code");
    const comboCode = codeBlocks.map((b) => b.code).join("\n\n");
    const mainLang = codeBlocks[0]?.lang || "html";

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-10">
            {/* Header */}
            <div className="mb-10 rounded-2xl border-3 border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000000] relative overflow-hidden">
                <div className="absolute top-3 right-4 rotate-3">
                    <span className="rounded-md border-2 border-black bg-[#ffde59] px-2.5 py-1 text-[11px] font-black uppercase text-black shadow-[2px_2px_0px_0px_#000000]">
                        ⚡ BAB #{currentIndex + 1}
                    </span>
                </div>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="border-2 border-black bg-[#ff5b79] text-black shadow-[2px_2px_0px_0px_#000000] font-black uppercase">
                        {tutorial.category}
                    </Badge>
                    <Badge variant="outline" className="border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_#000000] font-bold">
                        {tutorial.level}
                    </Badge>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-black/70">
                        <ListChecks className="size-4 stroke-[2.5]" />
                        Bab {currentIndex + 1} dari {tutorials.length}
                    </span>
                </div>
                <h1 className="font-heading text-3xl font-black tracking-tight text-foreground md:text-5xl uppercase">
                    {tutorial.title}
                </h1>
                <p className="mt-3 text-base font-medium leading-relaxed text-black/80">{tutorial.description}</p>
            </div>

            {/* Content */}
            <div className="rounded-2xl border-3 border-black bg-[#fffdf5] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000000]">
                <TutorialContent blocks={tutorial.content} />
            </div>

            {/* Standalone Playground - Separate from content */}
            {codeBlocks.length > 0 && (
                <div className="mt-10">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <span className="rounded border-2 border-black bg-[#ffde59] px-2.5 py-0.5 text-xs font-black uppercase text-black shadow-[2px_2px_0px_0px_#000000]">
                                🎯 PLAYGROUND PRAKTEK
                            </span>
                            <h3 className="mt-2 font-heading text-xl font-black uppercase text-black">
                                VSCode Web: Editor Praktek Bebas
                            </h3>
                            <p className="mt-1 text-sm font-medium text-black/80">
                                Gunakan editor ini untuk praktek bebas! Klik tombol Full Screen untuk mode full.
                            </p>
                        </div>
                    </div>
                    <WebEditor
                        initialCode={comboCode}
                        lang={mainLang}
                        filename={`practice.${mainLang || 'html'}`}
                        title="PLAYGROUND PRAKTEK: Editor Bebas untuk Eksperimen"
                        isCombo={false}
                    />
                </div>
            )}

            {/* Actions */}
            <div className="mt-8">
                <ChapterActions slug={tutorial.slug} />
            </div>

            {/* Navigation */}
            <div className="mt-8 grid gap-4 border-t-3 border-black pt-8 sm:grid-cols-2">
                {previous ? (
                    <Link href={`/dashboard/tutorials/${previous.slug}`}>
                        <div className="group h-full rounded-xl border-3 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000000] hover:bg-[#ffde59]">
                            <p className="mb-1.5 flex items-center gap-1.5 text-xs font-black uppercase text-black">
                                <ArrowLeft className="size-4 stroke-[2.5]" /> Bab sebelumnya
                            </p>
                            <p className="font-heading text-base font-black text-black">{previous.title}</p>
                        </div>
                    </Link>
                ) : (
                    <div className="hidden sm:block" />
                )}
                {next && (
                    <div className="sm:col-start-2">
                        <Button asChild size="lg" className="h-full w-full px-6 py-5 rounded-xl border-3 border-black bg-[#ff5b79] text-black shadow-[4px_4px_0px_0px_#000000] transition-all hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#ff5b79]">
                            <Link
                                href={`/dashboard/tutorials/${next.slug}`}
                                className="flex h-full w-full flex-col items-end justify-center gap-1 sm:text-right"
                            >
                                <span className="text-xs font-black uppercase tracking-wider text-black/80">Lanjut ke bab berikutnya</span>
                                <span className="flex items-center gap-2 text-base font-black text-black uppercase">
                                    <span className="line-clamp-2">{next.title}</span>
                                    <ArrowRight className="shrink-0 size-5 stroke-[2.5]" />
                                </span>
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
