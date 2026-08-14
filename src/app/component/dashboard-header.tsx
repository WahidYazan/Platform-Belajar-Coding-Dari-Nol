"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getCategorySlug } from "@/lib/categories";
import { createClient } from "@/lib/supabase/client";
import { getTutorialBySlug } from "@/lib/tutorials";
import { LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export function DashboardHeader() {
    const pathname = usePathname();
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data }) => setUser(data.user));
    }, []);

    const match = pathname.match(/\/dashboard\/tutorials\/([\w-]+)/);
    const tutorial = match ? getTutorialBySlug(match[1]) : undefined;
    const categorySlug = tutorial ? getCategorySlug(tutorial.category) : undefined;

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Beranda</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {categorySlug && (
                            <>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={`/${categorySlug}`} className="capitalize">
                                            {tutorial?.category}
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </>
                        )}
                        {tutorial && (
                            <>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1">{tutorial.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {user && (
                <div className="flex shrink-0 items-center gap-3 px-3">
                    <span className="hidden max-w-48 truncate text-sm text-muted-foreground md:inline">
                        {user.email}
                    </span>
                    <form action="/auth/logout" method="post">
                        <Button type="submit" variant="ghost" size="sm" className="text-muted-foreground">
                            <LogOut className="size-4" />
                            Keluar
                        </Button>
                    </form>
                </div>
            )}
        </header>
    );
}
