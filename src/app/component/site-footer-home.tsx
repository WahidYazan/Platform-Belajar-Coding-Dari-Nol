import Link from "next/link";
import { Code2 } from "lucide-react";

export function SiteFooter() {
    return (
        <footer className="relative mt-auto border-t border-border/50 bg-background/60">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
                <div className="flex flex-col items-center justify-between gap-4 border-t border-border/50 py-8 md:flex-row">
                    <div className="flex items-center gap-2.5">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20">
                            <Code2 className="size-3.5" />
                        </span>
                        <span className="text-sm font-semibold tracking-tight text-foreground">Sinau Coding</span>
                    </div>
                    <div className="flex items-center gap-5 text-sm text-muted-foreground">
                        <Link href="mailto:goakmal3@gmail.com" className="transition-colors hover:text-foreground">
                            Hubungi Kami
                        </Link>
                        <Link href="/dashboard" className="transition-colors hover:text-foreground">
                            Tutorial
                        </Link>
                        <Link href="/roadmap" className="transition-colors hover:text-foreground">
                            Roadmap
                        </Link>
                    </div>
                    <p className="text-xs text-muted-foreground/70">&copy; {new Date().getFullYear()} Sinau Coding</p>
                </div>
            </div>
        </footer>
    );
}
