import Link from "next/link";
import { Code2 } from "lucide-react";

export function SiteFooter() {
    return (
        <footer className="relative mt-auto border-t-3 border-black bg-[#f4efe2] dark:bg-[#18181b]">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
                <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2.5">
                            <span className="flex size-8 items-center justify-center rounded-md border-2 border-black bg-primary text-black shadow-[2px_2px_0px_0px_#000000]">
                                <Code2 className="size-4 stroke-[2.5]" />
                            </span>
                            <span className="text-base font-black tracking-tight text-foreground uppercase">Sinau Coding</span>
                        </div>
                        <p className="mt-3 max-w-xs text-xs font-medium leading-relaxed text-muted-foreground">
                            Platform belajar coding berbahasa Indonesia. Mulai dari nol, langkah demi langkah, sampai bisa deploy.
                        </p>
                    </div>

                    {/* Belajar */}
                    <div>
                        <h4 className="mb-3 inline-block border-b-2 border-black text-xs font-black uppercase tracking-wider text-foreground">Belajar</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/dashboard" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-black hover:underline">
                                    Tutorial
                                </Link>
                            </li>
                            <li>
                                <Link href="/roadmap" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-black hover:underline">
                                    Roadmap
                                </Link>
                            </li>
                            <li>
                                <Link href="/start" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-black hover:underline">
                                    Mulai dari Sini
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 className="mb-3 inline-block border-b-2 border-black text-xs font-black uppercase tracking-wider text-foreground">Platform</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/register" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-black hover:underline">
                                    Daftar Akun
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-black hover:underline">
                                    Masuk
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Hubungi */}
                    <div>
                        <h4 className="mb-3 inline-block border-b-2 border-black text-xs font-black uppercase tracking-wider text-foreground">Hubungi</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="mailto:goakmal3@gmail.com" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-black hover:underline">
                                    goakmal3@gmail.com
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t-2 border-black py-6">
                    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                        <p className="text-xs font-bold text-muted-foreground">&copy; {new Date().getFullYear()} Sinau Coding. Dibuat dengan 💖 untuk pelajar Indonesia.</p>
                        <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                            <Link href="/dashboard" className="hover:text-black hover:underline">
                                Tutorial
                            </Link>
                            <Link href="/roadmap" className="hover:text-black hover:underline">
                                Roadmap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
