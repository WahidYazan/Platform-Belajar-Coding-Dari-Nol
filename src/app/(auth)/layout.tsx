import Link from "next/link";
import { Code2 } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-svh flex-col bg-muted/10">
            <header className="absolute inset-x-0 top-0 z-10">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20">
                            <Code2 className="size-4" />
                        </span>
                        <span className="text-base font-bold tracking-tight text-foreground">Sinau Coding</span>
                    </Link>
                    <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        Kembali ke Beranda
                    </Link>
                </div>
            </header>
            <main className="relative flex flex-1 items-center justify-center px-4 py-16">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-[-30%] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-[100px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] h-[300px] w-[300px] rounded-full bg-blue-400/[0.03] blur-[80px]" />
                </div>
                {children}
            </main>
        </div>
    );
}
