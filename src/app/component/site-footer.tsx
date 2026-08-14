import { categories } from "@/lib/categories";
import { Code2 } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
    return (
        <footer className="mt-auto border-t">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
                <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
                    <div className="flex items-center gap-2">
                        <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <Code2 className="size-3.5" />
                        </span>
                        <span>Sinau Coding — panduan belajar coding dari nol</span>
                    </div>
                    <nav className="flex items-center gap-4">
                        <Link href="/roadmap" className="hover:text-foreground">
                            Roadmap
                        </Link>
                        <Link href="/dashboard" className="hover:text-foreground">
                            Tutorial
                        </Link>
                        <Link href="/start" className="hover:text-foreground">
                            Mulai dari Sini
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 border-t pt-6 text-sm text-muted-foreground sm:justify-between">
                    <span className="font-medium text-foreground">Topik Materi</span>
                    <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                        {categories.map(category => (
                            <Link key={category.slug} href={`/${category.slug}`} className="hover:text-foreground">
                                {category.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
