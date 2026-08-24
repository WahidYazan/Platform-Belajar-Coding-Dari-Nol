import { ChapterActions } from "@/app/component/chapter-actions";
import { TutorialContent } from "@/app/component/tutorial-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTutorialBySlug, tutorials } from "@/lib/tutorials";
import { ArrowLeft, ArrowRight, Clock, ListChecks } from "lucide-react";
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

    return (
        <div className="mx-auto w-full max-w-3xl px-4 py-10">
            {/* Header */}
            <div className="mb-8 border-b border-border/50 pb-8">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{tutorial.category}</Badge>
                    <Badge variant="outline">{tutorial.level}</Badge>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="size-3.5" />
                        {tutorial.minutes} menit baca
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <ListChecks className="size-3.5" />
                        Bab {currentIndex + 1} dari {tutorials.length}
                    </span>
                </div>
                <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">{tutorial.title}</h1>
                <p className="mt-3 leading-relaxed text-muted-foreground">{tutorial.description}</p>
            </div>

            {/* Content */}
            <TutorialContent blocks={tutorial.content} />

            {/* Actions */}
            <div className="mt-10">
                <ChapterActions slug={tutorial.slug} />
            </div>

            {/* Navigation */}
            <div className="mt-8 grid gap-3 border-t border-border/50 pt-8 sm:grid-cols-2">
                {previous ? (
                    <Link href={`/dashboard/tutorials/${previous.slug}`}>
                        <div className="group h-full rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:border-border hover:bg-card hover:shadow-md">
                            <p className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                                <ArrowLeft className="size-3.5" /> Bab sebelumnya
                            </p>
                            <p className="font-heading text-base font-medium text-foreground group-hover:text-primary transition-colors duration-200">{previous.title}</p>
                        </div>
                    </Link>
                ) : (
                    <div className="hidden sm:block" />
                )}
                {next && (
                    <div className="sm:col-start-2">
                        <Button asChild size="lg" className="h-full w-full px-6 py-5 rounded-2xl shadow-lg shadow-primary/15 transition-all hover:shadow-xl hover:shadow-primary/20">
                            <Link
                                href={`/dashboard/tutorials/${next.slug}`}
                                className="flex h-full w-full flex-col items-end justify-center gap-1 sm:text-right"
                            >
                                <span className="text-xs font-normal opacity-80">Lanjut ke bab berikutnya</span>
                                <span className="flex items-center gap-2 text-sm font-medium">
                                    <span className="line-clamp-2">{next.title}</span>
                                    <ArrowRight className="shrink-0 size-4" />
                                </span>
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
