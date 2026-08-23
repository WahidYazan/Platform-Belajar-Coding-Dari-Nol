"use client";

import { cn } from "@/lib/utils";
import { BookOpen, Home, Map } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
    { href: "/dashboard", label: "Beranda", icon: Home },
    // { href: "/dashboard", label: "Dashboard", icon: GraduationCap },
    { href: "/start", label: "Mulai", icon: BookOpen },
    { href: "/roadmap", label: "Roadmap", icon: Map },
];

export function MobileNavBar() {
    const pathname = usePathname();

    return (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/80 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
            <div className="mx-auto flex h-16 w-full max-w-lg items-stretch gap-1 px-2">
                {items.map(item => {
                    const Icon = item.icon;
                    const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-label={item.label}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                                "flex flex-1 flex-col items-center justify-center gap-1 rounded-xl text-muted-foreground transition-colors hover:text-foreground",
                                active && "text-primary",
                            )}
                        >
                            <Icon className="size-5" />
                            <span className={cn("text-[11px] leading-none", active && "font-medium")}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
