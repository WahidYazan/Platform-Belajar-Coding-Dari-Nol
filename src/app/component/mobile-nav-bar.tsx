"use client";

import { cn } from "@/lib/utils";
import { BookOpen, Home, Map } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
    { href: "/dashboard", label: "Beranda", icon: Home },
    { href: "/start", label: "Mulai", icon: BookOpen },
    { href: "/roadmap", label: "Roadmap", icon: Map },
];

export function MobileNavBar() {
    const pathname = usePathname();

    return (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t-3 border-black bg-[#fffdf5] pb-[env(safe-area-inset-bottom)] md:hidden shadow-[0_-4px_0_0_#000000]">
            <div className="mx-auto flex h-16 w-full max-w-lg items-center justify-around gap-2 px-3">
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
                                "flex flex-1 flex-col items-center justify-center gap-1 py-1 rounded-lg border-2 transition-all font-black",
                                active
                                    ? "bg-[#ffde59] text-black border-black shadow-[2px_2px_0px_0px_#000000] -translate-y-0.5 scale-105"
                                    : "border-transparent text-black/70 hover:text-black hover:border-black hover:bg-white",
                            )}
                        >
                            <Icon className="size-5 stroke-[2.5]" />
                            <span className="text-[11px] uppercase tracking-wider">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
