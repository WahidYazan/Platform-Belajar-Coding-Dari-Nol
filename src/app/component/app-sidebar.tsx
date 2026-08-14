"use client";

import { CheckCircle2, Circle, Code2, GraduationCap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { useProgress } from "@/hooks/progress-context";
import { categories, getCategoryBySlug, getCategorySlug, getTutorialsInCategory } from "@/lib/categories";
import { getTutorialBySlug } from "@/lib/tutorials";
import { cn } from "@/lib/utils";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const { completed } = useProgress();

    const match = pathname.match(/\/dashboard\/tutorials\/([\w-]+)/);
    const tutorial = match ? getTutorialBySlug(match[1]) : undefined;
    const activeCategorySlug = tutorial ? getCategorySlug(tutorial.category) : undefined;
    const activeCategory = activeCategorySlug ? getCategoryBySlug(activeCategorySlug) : undefined;

    const isChapterPage = Boolean(tutorial);
    const chapterItems = activeCategorySlug ? getTutorialsInCategory(activeCategorySlug) : [];

    const doneInCategory = activeCategorySlug ? chapterItems.filter(item => completed.includes(item.slug)).length : 0;

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Code2 className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="text-lg font-extrabold">Sinau Coding</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {isChapterPage && activeCategory ? (
                    <>
                        <SidebarGroup>
                            <SidebarGroupLabel>
                                {activeCategory.name} ({doneInCategory}/{chapterItems.length} selesai)
                            </SidebarGroupLabel>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild isActive={pathname === `/${activeCategory.slug}`}>
                                        <Link href={`/${activeCategory.slug}`}>
                                            <GraduationCap />
                                            <span>Semua Bab</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                {chapterItems.map((item, index) => {
                                    const active = pathname === `/dashboard/tutorials/${item.slug}`;
                                    const done = completed.includes(item.slug);
                                    return (
                                        <SidebarMenuSubItem key={item.slug}>
                                            <SidebarMenuSubButton asChild isActive={active}>
                                                <Link href={`/dashboard/tutorials/${item.slug}`} className="gap-2">
                                                    {done ? (
                                                        <CheckCircle2 className="size-3.5 text-emerald-500" />
                                                    ) : (
                                                        <Circle className="size-3.5 text-muted-foreground/50" />
                                                    )}
                                                    <span className="shrink-0 text-xs text-muted-foreground">
                                                        {index + 1}.
                                                    </span>
                                                    <span className={cn("line-clamp-2", active && "font-medium")}>
                                                        {item.title}
                                                    </span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroup>

                        <SidebarGroup>
                            <SidebarGroupLabel>Topik Lain</SidebarGroupLabel>
                            <SidebarMenu>
                                {categories
                                    .filter(category => category.slug !== activeCategorySlug)
                                    .map(category => {
                                        const Icon = category.icon;
                                        return (
                                            <SidebarMenuItem key={category.slug}>
                                                <SidebarMenuButton asChild>
                                                    <Link href={`/${category.slug}`}>
                                                        <Icon />
                                                        <span>{category.name}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    })}
                            </SidebarMenu>
                        </SidebarGroup>
                    </>
                ) : (
                    <SidebarGroup>
                        <SidebarGroupLabel>Topik ({completed.length} selesai)</SidebarGroupLabel>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                                    <Link href="/dashboard">
                                        <GraduationCap />
                                        <span>Mulai Belajar</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {categories.map(category => {
                                const Icon = category.icon;
                                return (
                                    <SidebarMenuItem key={category.slug}>
                                        <SidebarMenuButton asChild className="justify-center">
                                            <Link href={`/${category.slug}`}>
                                                <Icon />
                                                <span>{category.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                )}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
