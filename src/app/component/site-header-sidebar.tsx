"use client";

import * as React from "react";
import { BookOpen, ChevronRight, Code2, GraduationCap, LogOut, Map, MoreVertical, Rocket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories, getTutorialsInCategory } from "@/lib/categories";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const data = {
    navMain: [
        { title: "Dashboard", url: "/dashboard", icon: GraduationCap },
        { title: "Mulai dari Sini", url: "/start", icon: Rocket },
        { title: "Roadmap", url: "/roadmap", icon: Map },
    ],
};

function NavMain() {
    const pathname = usePathname();
    const { setOpenMobile } = useSidebar();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {data.navMain.map(item => {
                    const active = pathname.startsWith(item.url);
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                tooltip={item.title}
                                isActive={active}
                                onClick={() => setOpenMobile(false)}
                            >
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function NavCategories() {
    const pathname = usePathname();
    const { setOpenMobile } = useSidebar();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Topik Materi</SidebarGroupLabel>
            <SidebarMenu>
                {categories.map(category => {
                    const items = getTutorialsInCategory(category.slug);
                    const categoryActive =
                        pathname === `/${category.slug}` ||
                        items.some(item => pathname === `/dashboard/tutorials/${item.slug}`);
                    return (
                        <Collapsible
                            key={category.slug}
                            asChild
                            defaultOpen={categoryActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip={category.name}
                                        isActive={categoryActive}
                                        onClick={() => setOpenMobile(false)}
                                    >
                                        <category.icon />
                                        <span>{category.name}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {items.map((item, index) => {
                                            const itemActive = pathname === `/dashboard/tutorials/${item.slug}`;
                                            return (
                                                <SidebarMenuSubItem key={item.slug}>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={itemActive}
                                                        onClick={() => setOpenMobile(false)}
                                                    >
                                                        <Link href={`/dashboard/tutorials/${item.slug}`}>
                                                            {/* <span>Bab {index + 1}</span> */}
                                                            <span>{index + 1}</span>
                                                            <span className="truncate">{item.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            );
                                        })}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function NavUser({ user }: { user: User | null }) {
    const { setOpenMobile } = useSidebar();

    if (!user) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild onClick={() => setOpenMobile(false)}>
                        <Link href="/login">
                            <BookOpen />
                            <span>Masuk</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild onClick={() => setOpenMobile(false)}>
                        <Link href="/register">
                            <GraduationCap />
                            <span>Daftar</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                                <Code2 className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.email?.split("@")[0]}</span>
                                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                            </div>
                            <MoreVertical className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 rounded-xl" side="top" align="end">
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Code2 className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.email?.split("@")[0]}</span>
                                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <form action="/auth/logout" method="post">
                            <DropdownMenuItem asChild>
                                <button type="submit" className="flex w-full items-center">
                                    <LogOut className="mr-2 size-4" />
                                    Keluar
                                </button>
                            </DropdownMenuItem>
                        </form>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

function TeamSwitcher() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="flex aspect-square size-7 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <Code2 className="size-4" />
                        </div>
                        <span className="truncate font-semibold text-base">Sinau Coding</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <TooltipProvider delayDuration={0}>
            <Sidebar collapsible="icon" {...props}>
                <SidebarHeader>
                    <TeamSwitcher />
                </SidebarHeader>
                <SidebarContent>
                    <NavMain />
                    <NavCategories />
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={user} />
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
        </TooltipProvider>
    );
}
