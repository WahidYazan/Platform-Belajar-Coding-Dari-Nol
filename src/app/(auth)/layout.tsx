import Link from "next/link";
import { Code2 } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-svh flex-col">
            <header className="border-b">
                <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
                    <Link href="/" className="flex items-center gap-2 font-heading text-lg font-semibold">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Code2 className="size-4" />
                        </span>
                        Sinau Coding
                    </Link>
                    <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                        Kembali ke Beranda
                    </Link>
                </div>
            </header>
            <main className="flex flex-1 items-center justify-center px-4 py-14">{children}</main>
        </div>
    );
}
