import { categories } from "@/lib/categories";
import { Code2 } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
    return (
        <footer className="mt-auto border-t border-border/50 bg-background/60">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
                <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
                    <div className="flex items-center gap-2.5">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20">
                            <Code2 className="size-3.5" />
                        </span>
                        <span className="text-sm font-semibold tracking-tight text-foreground">Sinau Coding</span>
                        <span className="text-xs text-muted-foreground/70">· panduan belajar coding dari nol</span>
                    </div>
                    <nav className="flex items-center gap-5">
                        <Link href="/roadmap" className="transition-colors hover:text-foreground">
                            Roadmap
                        </Link>
                        <Link href="/dashboard" className="transition-colors hover:text-foreground">
                            Tutorial
                        </Link>
                        <Link href="/start" className="transition-colors hover:text-foreground">
                            Mulai dari Sini
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-border/50 pt-6 text-sm text-muted-foreground sm:justify-between">
                    <span className="font-medium text-foreground">Topik Materi</span>
                    <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                        {categories.map(category => (
                            <Link key={category.slug} href={`/${category.slug}`} className="transition-colors hover:text-foreground">
                                {category.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
