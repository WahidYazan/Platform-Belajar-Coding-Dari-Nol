import { SidebarTrigger } from "@/components/ui/sidebar";
import { Code2 } from "lucide-react";
import Link from "next/link";

export function SiteHeader({ showTrigger = true }: { showTrigger?: boolean }) {
    return (
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center border-b-3 border-black bg-[#fffdf5]/95 backdrop-blur-md dark:bg-[#18181b]/95">
            <div className="flex w-full items-center justify-between gap-2 px-4 sm:px-6">
                <div className="flex items-center gap-3">
                    {showTrigger && <SidebarTrigger className="-ml-1 border-2 border-black shadow-[2px_2px_0px_0px_#000000] hover:bg-secondary" aria-label="Buka menu" />}
                    <Link href="/" className="flex items-center gap-2.5 font-heading group">
                        <span className="flex size-8 items-center justify-center rounded-md border-2 border-black bg-primary text-black shadow-[2px_2px_0px_0px_#000000] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                            <Code2 className="size-5 stroke-[2.5]" />
                        </span>
                        <span className="text-lg font-black tracking-tight text-foreground uppercase">Sinau Coding</span>
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard"
                        className="hidden sm:inline-flex items-center gap-1.5 rounded-md border-2 border-black bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-black shadow-[2px_2px_0px_0px_#000000] hover:bg-secondary hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-1.5 rounded-md border-2 border-black bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black shadow-[3px_3px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                    >
                        Masuk ⚡
                    </Link>
                </div>
            </div>
        </header>
    );
}
