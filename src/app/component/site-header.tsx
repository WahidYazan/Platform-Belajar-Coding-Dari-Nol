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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { ChevronDown, Code2, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export function SiteHeader({ showTrigger = true }: { showTrigger?: boolean }) {
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
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center border-b bg-background/80 backdrop-blur">
            <div className="flex w-full items-center justify-between gap-2 px-4">
                <div className="flex items-center gap-2">
                    {showTrigger && <SidebarTrigger className="-ml-1" aria-label="Buka menu" />}
                    <Link href="/" className="flex items-center gap-2 font-heading text-lg font-semibold">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Code2 className="size-4" />
                        </span>
                        Sinau Coding
                    </Link>
                </div>

                {/* {user ? (
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
                    <div className="flex items-center gap-1">
                        <Button asChild variant="ghost" size="sm">
                            <Link href="/login">
                                <UserRound className="size-4" />
                                Masuk
                            </Link>
                        </Button>
                        <Button asChild size="sm">
                            <Link href="/register">Daftar</Link>
                        </Button>
                    </div>
                )} */}
            </div>
        </header>
    );
}
