import { SidebarTrigger } from "@/components/ui/sidebar";
import { Code2 } from "lucide-react";
import Link from "next/link";

export function SiteHeader({ showTrigger = true }: { showTrigger?: boolean }) {
    return (
        <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center border-b border-border/40 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50">
            <div className="flex w-full items-center justify-between gap-2 px-4">
                <div className="flex items-center gap-2">
                    {showTrigger && <SidebarTrigger className="-ml-1" aria-label="Buka menu" />}
                    <Link href="/" className="flex items-center gap-2.5 font-heading transition-opacity hover:opacity-90">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20">
                            <Code2 className="size-4" />
                        </span>
                        <span className="text-base font-bold tracking-tight">Sinau Coding</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
