import Link from "next/link";
import { Code2 } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-svh flex-col bg-muted/20">
            <header className="absolute inset-x-0 top-0 z-10">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Code2 className="size-4" />
                        </span>
                        <span className="text-base font-semibold tracking-tight text-foreground">Sinau Coding</span>
                    </Link>
                    <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        Kembali ke Beranda
                    </Link>
                </div>
            </header>
            <main className="relative flex flex-1 items-center justify-center px-4 py-16">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>
                {children}
            </main>
        </div>
    );
}
