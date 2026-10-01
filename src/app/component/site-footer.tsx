import { categories } from "@/lib/categories";
import { Code2 } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
    return (
        <footer className="mt-auto border-t-3 border-black bg-[#f4efe2] dark:bg-[#18181b]">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
                <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
                    <div className="flex items-center gap-2.5">
                        <span className="flex size-8 items-center justify-center rounded-md border-2 border-black bg-primary text-black shadow-[2px_2px_0px_0px_#000000]">
                            <Code2 className="size-4 stroke-[2.5]" />
                        </span>
                        <span className="text-base font-black tracking-tight text-foreground uppercase">Sinau Coding</span>
                        <span className="text-xs font-bold text-muted-foreground">· belajar coding dari nol</span>
                    </div>
                    <nav className="flex items-center gap-5">
                        <Link href="/roadmap" className="text-xs font-black uppercase text-foreground hover:underline">
                            Roadmap
                        </Link>
                        <Link href="/dashboard" className="text-xs font-black uppercase text-foreground hover:underline">
                            Tutorial
                        </Link>
                        <Link href="/start" className="text-xs font-black uppercase text-foreground hover:underline">
                            Mulai dari Sini
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 border-t-2 border-black pt-6 text-sm sm:justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-foreground">Topik Materi:</span>
                    <nav className="flex flex-wrap items-center justify-center gap-2">
                        {categories.map(category => (
                            <Link
                                key={category.slug}
                                href={`/${category.slug}`}
                                className="rounded border-2 border-black bg-white px-2.5 py-0.5 text-xs font-bold text-black shadow-[1.5px_1.5px_0px_0px_#000000] hover:bg-[#ffde59] transition-all"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
