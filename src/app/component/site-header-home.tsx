"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/categories";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";
import { ChevronDown, Code2, LogOut, Menu, UserRound, X } from "lucide-react";
import Link from "next/link";
import * as React from "react";

// const navLinks = [
//     { href: "/", label: "Beranda" },
//     { href: "/start", label: "Mulai dari Sini" },
//     { href: "/roadmap", label: "Roadmap" },
//     { href: "/dashboard", label: "Tutorial" },
// ];

export function SiteHeader() {
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        const supabase = createClient();

        supabase.auth.getUser().then(({ data }) => setUser(data.user));

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 font-heading text-lg font-semibold">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Code2 className="size-4" />
                    </span>
                    Sinau Coding
                </Link>

                <nav className="hidden items-center gap-1 md:flex">
                    {/* {navLinks.map(link => (
                        <Button key={link.href} asChild variant="ghost" size="sm">
                            <Link href={link.href}>{link.label}</Link>
                        </Button>
                    ))} */}
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="group mx-1 max-w-40 text-muted-foreground"
                                    aria-label="Menu akun"
                                >
                                    <span className="truncate">{user.email}</span>
                                    <ChevronDown className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel className="truncate text-muted-foreground">
                                    {user.email}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <form action="/auth/logout" method="post">
                                    <DropdownMenuItem asChild variant="destructive">
                                        <button type="submit" className="flex w-full items-center">
                                            <LogOut className="size-4" />
                                            Keluar
                                        </button>
                                    </DropdownMenuItem>
                                </form>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/login">
                                    <UserRound className="size-4" />
                                    Masuk
                                </Link>
                            </Button>
                            <Button asChild size="sm">
                                <Link href="/register">Daftar</Link>
                            </Button>
                        </>
                    )}
                </nav>

                <Button
                    className="md:hidden"
                    variant="ghost"
                    size="icon"
                    aria-label="Buka menu"
                    onClick={() => setOpen(value => !value)}
                >
                    {open ? <X /> : <Menu />}
                </Button>
            </div>

            {/* <nav className="hidden overflow-x-auto border-t md:flex">
                <div className="mx-auto flex w-full max-w-6xl items-center gap-1 px-4">
                    {categories.map(category => (
                        <Button
                            key={category.slug}
                            asChild
                            variant="ghost"
                            size="sm"
                            className="shrink-0 text-muted-foreground"
                        >
                            <Link href={`/${category.slug}`}>{category.name}</Link>
                        </Button>
                    ))}
                </div>
            </nav> */}

            <div
                className={cn(
                    "overflow-hidden border-b transition-all md:hidden",
                    open ? "max-h-[calc(100svh-4rem)] overflow-y-auto" : "max-h-0 border-b-0",
                )}
            >
                <nav className="flex flex-col gap-1 p-4">
                    {/* {navLinks.map(link => (
                        <Button
                            key={link.href}
                            asChild
                            variant="ghost"
                            size="default"
                            className="justify-start"
                            onClick={() => setOpen(false)}
                        >
                            <Link href={link.href}>{link.label}</Link>
                        </Button>
                    ))} */}
                    <div className="my-2 border-t" />
                    {categories.map(category => (
                        <Button
                            key={category.slug}
                            asChild
                            variant="ghost"
                            size="default"
                            className="justify-start text-muted-foreground"
                            onClick={() => setOpen(false)}
                        >
                            <Link href={`/${category.slug}`}>{category.name}</Link>
                        </Button>
                    ))}
                    <div className="my-2 border-t" />
                    {user ? (
                        <>
                            <p className="px-3 text-sm text-muted-foreground">{user.email}</p>
                            <Button asChild variant="ghost" size="default" className="justify-start">
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                            <form action="/auth/logout" method="post">
                                <Button
                                    type="submit"
                                    variant="ghost"
                                    size="default"
                                    className="justify-start text-muted-foreground"
                                >
                                    <LogOut className="size-4" />
                                    Keluar
                                </Button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Button asChild variant="ghost" size="default" className="justify-start">
                                <Link href="/login">Masuk</Link>
                            </Button>
                            <Button asChild size="default" className="justify-start">
                                <Link href="/register">Daftar</Link>
                            </Button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
