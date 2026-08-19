import type { LucideIcon } from "lucide-react";
import { Atom, BookOpen, Braces, Palette, Rocket, Server, Wrench, Zap, ShieldCheck, Globe, Code2 } from "lucide-react";
import { tutorials, type Tutorial } from "./tutorials";

export type CategoryKind = "Dasar" | "Frontend" | "Backend" | "Tools" | "Deployment";

export type Category = {
    slug: string;
    name: string;
    kind: CategoryKind;
    description: string;
    icon: LucideIcon;
    accent: string;
};

export const categories: Category[] = [
    {
        slug: "dasar",
        name: "Dasar",
        kind: "Dasar",
        icon: BookOpen,
        accent: "bg-sky-100 text-sky-700",
        description: "Fondasi sebelum menulis kode: cara kerja komputer dan web, serta menyiapkan lingkungan belajar.",
    },
    {
        slug: "html",
        name: "HTML",
        kind: "Frontend",
        icon: Braces,
        accent: "bg-orange-100 text-orange-700",
        description: "Struktur halaman web: judul, paragraf, gambar, tautan, dan formulir.",
    },
    {
        slug: "css",
        name: "CSS",
        kind: "Frontend",
        icon: Palette,
        accent: "bg-blue-100 text-blue-700",
        description: "Tampilan website: warna, layout Flexbox & Grid, sampai teknik lanjutan.",
    },
    {
        slug: "javascript",
        name: "JavaScript",
        kind: "Frontend",
        icon: Zap,
        accent: "bg-yellow-100 text-yellow-700",
        description: "Buat website interaktif: logika, data, manipulasi halaman, hingga API.",
    },
    {
        slug: "react",
        name: "React & Next.js",
        kind: "Frontend",
        icon: Atom,
        accent: "bg-cyan-100 text-cyan-700",
        description: "Framework frontend modern untuk membangun aplikasi web yang powerful.",
    },
    {
        slug: "nextjs",
        name: "Next.js",
        kind: "Frontend",
        icon: Globe,
        accent: "bg-slate-100 text-slate-700",
        description: "Framework React untuk produksi: App Router, Server Components, dan full-stack dalam satu aplikasi.",
    },
    {
        slug: "backend",
        name: "Backend",
        kind: "Backend",
        icon: Server,
        accent: "bg-emerald-100 text-emerald-700",
        description: "Sisi server: Node.js, REST API dengan Express, dan database SQL.",
    },
    {
        slug: "php",
        name: "PHP",
        kind: "Backend",
        icon: Code2,
        accent: "bg-indigo-100 text-indigo-700",
        description: "Bahasa pemrograman server-side paling populer untuk web: dasar, OOP, database, API, hingga project lengkap.",
    },
    {
        slug: "laravel",
        name: "Laravel",
        kind: "Backend",
        icon: ShieldCheck,
        accent: "bg-red-100 text-red-700",
        description: "Framework PHP untuk membangun aplikasi web modern: routing, Eloquent, auth, sampai API.",
    },
    {
        slug: "tools",
        name: "Tools & Git",
        kind: "Tools",
        icon: Wrench,
        accent: "bg-violet-100 text-violet-700",
        description: "Alat wajib developer: VS Code, terminal, dan Git.",
    },
    {
        slug: "deployment",
        name: "Deployment",
        kind: "Deployment",
        icon: Rocket,
        accent: "bg-rose-100 text-rose-700",
        description: "Publikasikan karyamu: deploy ke Vercel, domain, dan CI/CD.",
    },
];

// export default categories; { kind: CategoryKind; label: string; description: string }
export const categoryKinds: { kind: CategoryKind; label: string; description: string }[] = [
    { kind: "Dasar", label: "Dasar", description: "Benar-benar nol? Mulai dari sini." },
    { kind: "Frontend", label: "Frontend", description: "Semua yang terlihat dan berinteraksi dengan user." },
    { kind: "Backend", label: "Backend", description: "Logika server, API, dan penyimpanan data." },
    { kind: "Tools", label: "Tools", description: "Alat bantu yang dipakai developer setiap hari." },
    { kind: "Deployment", label: "Deployment", description: "Naikkan aplikasimu ke internet." },
];

const nameToSlug: Record<string, string> = Object.fromEntries(
    categories.map(c => [c.name, c.slug])
);

export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find(category => category.slug === slug);
}

export function getCategorySlug(categoryName: string): string {
    return nameToSlug[categoryName] ?? categoryName.toLowerCase().replaceAll(" ", "-");
}

export function getTutorialsInCategory(slug: string): Tutorial[] {
    return tutorials.filter(tutorial => getCategorySlug(tutorial.category) === slug);
}

export type CategoryGroup = {
    category: Category;
    items: Tutorial[];
};

export function getCategoryGroups(): CategoryGroup[] {
    return categories
        .map(category => ({ category, items: getTutorialsInCategory(category.slug) }))
        .filter(group => group.items.length > 0);
}
