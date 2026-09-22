import Link from "next/link";
import { Code2 } from "lucide-react";

export function SiteFooter() {
    return (
        <footer className="relative mt-auto border-t border-border/50 bg-background/60">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
                <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2.5">
                            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20">
                                <Code2 className="size-3.5" />
                            </span>
                            <span className="text-sm font-semibold tracking-tight text-foreground">Sinau Coding</span>
                        </div>
                        <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
                            Platform belajar coding berbahasa Indonesia. Mulai dari nol, langkah demi langkah, sampai bisa deploy.
                        </p>
                    </div>

                    {/* Belajar */}
                    <div>
                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Belajar</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/dashboard" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                                    Tutorial
                                </Link>
                            </li>
                            <li>
                                <Link href="/roadmap" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                                    Roadmap
                                </Link>
                            </li>
                            <li>
                                <Link href="/start" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                                    Mulai dari Sini
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Platform</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/register" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                                    Daftar Akun
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                                    Masuk
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Hubungi */}
                    <div>
                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Hubungi</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="mailto:goakmal3@gmail.com" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                                    goakmal3@gmail.com
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border/50 py-6">
                    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                        <p className="text-xs text-muted-foreground/70">&copy; {new Date().getFullYear()} Sinau Coding. Dibuat dengan ❤️ untuk pelajar Indonesia.</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
                            <Link href="/dashboard" className="transition-colors hover:text-foreground">
                                Tutorial
                            </Link>
                            <Link href="/roadmap" className="transition-colors hover:text-foreground">
                                Roadmap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
