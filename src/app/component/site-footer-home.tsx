import Link from "next/link";

const exploreLinks = [
    { href: "/start", label: "Mulai dari Sini" },
    { href: "/roadmap", label: "Roadmap Belajar" },
    { href: "/tutorials", label: "Semua Tutorial" },
    { href: "/dashboard", label: "Dashboard" },
];

export function SiteFooter() {
    return (
        <footer className="relative mt-auto overflow-hidden border-t bg-muted/40">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-muted/60 to-background" />
            <div className="relative w-full px-6 sm:px-10">
                <div className="flex flex-col items-center justify-between gap-3 border-t py-6 text-md text-muted-foreground md:flex-row">
                    <p>© {new Date().getFullYear()} Sinau Coding. Semua materi gratis untuk mulai belajar.</p>
                    <div className="flex items-center gap-4">
                        <Link href="mailto:goakmal3@gmail.com" className="transition-colors hover:text-foreground">
                            Hubungi Kami
                        </Link>
                        <Link href="/dashboard" className="transition-colors hover:text-foreground">
                            Tutorial
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
