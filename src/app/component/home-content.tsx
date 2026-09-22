"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowRight,
    BadgeCheck,
    Backpack,
    BookOpen,
    Braces,
    CheckCircle2,
    ChevronDown,
    CircleCheck,
    CloudUpload,
    Compass,
    FolderOpen,
    Languages,
    Layers,
    Laptop,
    Rocket,
    Route,
    UserRound,
    TrendingUp,
    Play,
    Check,
    Database,
    ShieldCheck,
    Cpu,
    Sparkles,
    Terminal,
    Globe,
    Layers3,
    Code2,
    CheckSquare,
    RefreshCw,
    Copy,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "./site-footer-home";

const techStack = [
    { name: "HTML", icon: Braces, color: "hover:border-orange-500/30 hover:text-orange-500" },
    { name: "CSS", icon: Layers3, color: "hover:border-blue-500/30 hover:text-blue-500" },
    { name: "JavaScript", icon: Code2, color: "hover:border-yellow-500/30 hover:text-yellow-500" },
    { name: "React", icon: Cpu, color: "hover:border-cyan-500/30 hover:text-cyan-500" },
    { name: "Next.js", icon: Globe, color: "hover:border-foreground/30 hover:text-foreground" },
    { name: "Node.js", icon: Terminal, color: "hover:border-emerald-500/30 hover:text-emerald-500" },
    { name: "TypeScript", icon: ShieldCheck, color: "hover:border-blue-600/30 hover:text-blue-600" },
    { name: "Git", icon: Route, color: "hover:border-red-500/30 hover:text-red-500" },
];

const features = [
    {
        icon: Route,
        title: "Roadmap Terstruktur",
        description:
            "Materi disusun berurutan dari dasar: HTML, CSS, JavaScript, React, backend, sampai deployment. Tidak ada loncat-loncat.",
        iconBg: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
        ring: "group-hover:ring-blue-500/20",
    },
    {
        icon: BadgeCheck,
        title: "Progres Tersimpan",
        description:
            "Buat akun gratis, tandai bab yang sudah selesai, dan lanjutkan belajar kapan saja dari perangkat mana pun.",
        iconBg: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
        ring: "group-hover:ring-emerald-500/20",
    },
    {
        icon: Languages,
        title: "Bahasa Indonesia",
        description:
            "Semua materi dijelaskan dengan bahasa santai dan mudah dipahami. Cocok untuk pemula tanpa latar belakang IT.",
        iconBg: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
        ring: "group-hover:ring-amber-500/20",
    },
    {
        icon: Compass,
        title: "Panduan & Roadmap",
        description:
            "Bingung mulai dari mana? Ada panduan langkah pertama dan roadmap yang menunjukkan arah belajarmu.",
        iconBg: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
        ring: "group-hover:ring-violet-500/20",
    },
    {
        icon: Braces,
        title: "Contoh Kode Praktis",
        description:
            "Setiap bab dilengkapi contoh kode yang bisa langsung kamu coba dan tiru, bukan cuma teori.",
        iconBg: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400",
        ring: "group-hover:ring-rose-500/20",
    },
    {
        icon: CloudUpload,
        title: "Sampai Deploy",
        description:
            "Belajar tidak berhenti di teori. Kamu diajak sampai deploy: website karyamu bisa dilihat orang lain.",
        iconBg: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400",
        ring: "group-hover:ring-cyan-500/20",
    },
];

const audiences = [
    {
        icon: UserRound,
        title: "Total Pemula",
        desc: "Baru mulai dan bingung dari mana? Materi disusun khusus untuk yang benar-benar nol, tanpa jargon yang menyeramkan.",
        iconBg: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
        gradient: "from-emerald-500/10 to-transparent",
        accent: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
        badge: "Mulai dari Nol",
    },
    {
        icon: Backpack,
        title: "Siswa & Mahasiswa",
        desc: "Pelengkap materi kuliah atau tugas sekolah dengan contoh kode praktis yang bisa langsung dipelajari dan diterapkan.",
        iconBg: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
        gradient: "from-blue-500/10 to-transparent",
        accent: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
        badge: "Penunjang Kuliah",
    },
    {
        icon: TrendingUp,
        title: "Profesional",
        desc: "Dari nol sampai siap deploy. Bekali dirimu dengan portofolio nyata untuk mendukung transisi karier ke dunia teknologi.",
        iconBg: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
        gradient: "from-violet-500/10 to-transparent",
        accent: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
        badge: "Transisi Karier",
    },
];

const stepsFeatures = [
    "Materi beginner-friendly",
    "Contoh kode real-world",
    "Progres tersimpan otomatis",
    "Fokus sampai bisa deploy",
];

const faqs = [
    {
        question: "Apakah saya perlu background IT?",
        answer: "Tidak sama sekali. Materi kami dirancang untuk benar-benar pemula. Semua dijelaskan dari nol dengan bahasa Indonesia yang santai, visual, dan mudah dipahami.",
    },
    {
        question: "Apakah ini benar-benar gratis?",
        answer: "Ya! Kamu bisa mengakses semua materi dasar secara gratis. Cukup buat akun untuk menyimpan progress belajarmu dan memantau bab yang sudah selesai.",
    },
    {
        question: "Berapa lama untuk bisa coding?",
        answer: "Tergantung kecepatan belajar masing-masing. Dengan konsistensi 30-45 menit per hari, dalam 2-3 bulan biasanya kamu sudah bisa membuat website interaktif sendiri.",
    },
    {
        question: "Teknologi apa saja yang dipelajari?",
        answer: "Kamu akan mempelajari HTML, CSS, JavaScript, React, Next.js, Node.js, PHP, Laravel, hingga Git & Deployment. Semua disusun runtut dan terpadu.",
    },
];

const roadmapStages = [
    {
        id: "dasar",
        title: "1. Web & HTML-CSS Dasar",
        categorySlugs: ["dasar", "html", "css"],
        desc: "Memahami cara kerja web, browser, dan menyusun layout website pertamamu yang rapi, responsif, dan indah dilihat.",
        stats: "12 Sub-materi · Estimasi 1-2 Minggu",
        icon: BookOpen,
        color: "text-orange-500 bg-orange-500/10 border-orange-500/20",
        badge: "Pemula",
        materi: ["Pengenalan Internet & Web", "Struktur HTML5 & Formulir", "Styling CSS, Flexbox & CSS Grid"],
    },
    {
        id: "js",
        title: "2. Logika JavaScript",
        categorySlugs: ["javascript"],
        desc: "Mulai belajar logika pemrograman. Membuat website 'hidup' dan interaktif lewat aksi klik, manipulasi DOM, data dinamis, dan integrasi API.",
        stats: "17 Sub-materi · Estimasi 2-3 Minggu",
        icon: Zap,
        color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
        badge: "Pemula - Menengah",
        materi: ["Variabel, Kondisi & Perulangan", "Function, Array, & Object", "DOM Manipulation & Async Fetch API"],
    },
    {
        id: "framework",
        title: "3. React & Next.js",
        categorySlugs: ["react", "nextjs"],
        desc: "Belajar standard industri. Menggunakan framework modern untuk membangun aplikasi web berskala besar yang cepat dengan modular component.",
        stats: "15 Sub-materi · Estimasi 3-4 Minggu",
        icon: Cpu,
        color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
        badge: "Menengah",
        materi: ["React Component & State", "Next.js App Router & Layouts", "Server Actions & Database Integration"],
    },
    {
        id: "backend",
        title: "4. Backend & Database",
        categorySlugs: ["backend", "php", "laravel"],
        desc: "Masuk ke balik layar. Membangun server API yang handal, otentikasi user (login/register), dan menyimpan data di database relational.",
        stats: "24 Sub-materi · Estimasi 3-5 Minggu",
        icon: Database,
        color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        badge: "Lanjutan",
        materi: ["Node.js Express & PostgreSQL", "PHP Dasar & Object Oriented", "Laravel Routing, Eloquent ORM & Auth"],
    },
    {
        id: "deploy",
        title: "5. Tools & Deployment",
        categorySlugs: ["tools", "deployment"],
        desc: "Mempublikasikan karyamu agar bisa diakses oleh dunia. Menggunakan Git untuk version control dan mendeploy website ke Vercel.",
        stats: "6 Sub-materi · Estimasi 1 Minggu",
        icon: Rocket,
        color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
        badge: "Rilis Publik",
        materi: ["Terminal & Git Command", "Github Repository Management", "Deploy Instan ke Vercel / Cloud"],
    },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-border/50 py-4 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between gap-4 text-left font-medium text-foreground transition-colors hover:text-primary py-2"
            >
                <span className="text-base sm:text-lg">{question}</span>
                <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground pb-2">{answer}</p>
                </div>
            </div>
        </div>
    );
}

function CodePlayground() {
    const [activeTab, setActiveTab] = useState<"html" | "js" | "react" | "deploy">("html");

    const [cardTheme, setCardTheme] = useState<"purple" | "emerald" | "amber" | "blue">("purple");

    const [jsCount, setJsCount] = useState(0);

    const [checklist, setChecklist] = useState({
        materi: true,
        paham: false,
        state: false,
        api: false,
    });
    const checklistCount = Object.values(checklist).filter(Boolean).length;
    const progressPercent = Math.round((checklistCount / 4) * 100);

    const [deployStatus, setDeployStatus] = useState<"idle" | "building" | "deploying" | "success">("idle");
    const [deployProgress, setDeployProgress] = useState(0);
    const [terminalLines, setTerminalLines] = useState<string[]>([]);

    const handleRunDeploy = () => {
        if (deployStatus !== "idle") return;
        setDeployStatus("building");
        setDeployProgress(0);
        setTerminalLines(["$ npm run deploy", ""]);
    };

    useEffect(() => {
        if (deployStatus === "building") {
            const timer = setInterval(() => {
                setDeployProgress((prev) => {
                    const next = prev + 15;
                    if (next >= 100) {
                        clearInterval(timer);
                        setDeployStatus("deploying");
                        setTerminalLines((prevLines) => [
                            ...prevLines,
                            "✓ Production build succeeded (0.9s)",
                            "✓ NextJS compilation successful",
                            "🚀 Uploading build artifacts...",
                        ]);
                        return 100;
                    }
                    return next;
                });
            }, 150);
            return () => clearInterval(timer);
        } else if (deployStatus === "deploying") {
            const timer = setTimeout(() => {
                setDeployStatus("success");
                setTerminalLines((prevLines) => [
                    ...prevLines,
                    "✓ Deployment completed to Vercel!",
                    "🔗 URL: https://sinau-belajar.vercel.app [active]",
                    "✨ Progres tersimpan ke profil kamu!",
                ]);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [deployStatus]);

    const handleResetDeploy = () => {
        setDeployStatus("idle");
        setDeployProgress(0);
        setTerminalLines([]);
    };

    return (
        <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-primary/30 via-sky-500/20 to-violet-500/30 opacity-70 blur-2xl -z-10" />

            <div className="grid gap-6 lg:grid-cols-12 overflow-hidden rounded-3xl border border-border/60 bg-card/65 shadow-2xl backdrop-blur-md">
                <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-border/50">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 bg-muted/30 px-4 py-3">
                        <div className="flex items-center gap-1.5">
                            <span className="size-3 rounded-full bg-rose-400/80" />
                            <span className="size-3 rounded-full bg-amber-400/80" />
                            <span className="size-3 rounded-full bg-emerald-400/80" />
                            <span className="ml-2 font-mono text-[11px] text-muted-foreground/80 hidden sm:inline">
                                sinau-editor — v2.0.0
                            </span>
                        </div>
                        <div className="flex gap-1">
                            {[
                                { id: "html", label: "index.html" },
                                { id: "js", label: "app.js" },
                                { id: "react", label: "Dashboard.tsx" },
                                { id: "deploy", label: "terminal" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`rounded-lg px-2.5 py-1 font-mono text-xs font-medium transition-all ${
                                        activeTab === tab.id
                                            ? "bg-primary/10 text-primary border border-primary/20"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-x-auto p-5 text-left font-mono text-xs sm:text-sm leading-6 min-h-[280px] bg-card/10">
                        {activeTab === "html" && (
                            <pre className="text-foreground">
                                <code>
                                    <span className="text-muted-foreground">{"<!-- Desain card HTML & CSS -->"}</span>{"\n"}
                                    <span className="text-rose-400">{"<div"}</span> <span className="text-amber-400">class</span>=<span className="text-emerald-400">"materi-card {cardTheme}"</span><span className="text-rose-400">{">"}</span>{"\n"}
                                    {"  "}<span className="text-rose-400">{"<div"}</span> <span className="text-amber-400">class</span>=<span className="text-emerald-400">"badge"</span><span className="text-rose-400">{">"}</span>Topik Baru<span className="text-rose-400">{"</div>"}</span>{"\n"}
                                    {"  "}<span className="text-rose-400">{"<h3>"}</span>Belajar HTML & CSS<span className="text-rose-400">{"</h3>"}</span>{"\n"}
                                    {"  "}<span className="text-rose-400">{"<p>"}</span>Rancang layout responsive menggunakan CSS Flexbox & Grid dengan mudah.<span className="text-rose-400">{"</p>"}</span>{"\n"}
                                    {"  "}<span className="text-rose-400">{"<button"}</span> <span className="text-amber-400">class</span>=<span className="text-emerald-400">"btn"</span><span className="text-rose-400">{">"}</span>Mulai Kelas<span className="text-rose-400">{"</button>"}</span>{"\n"}
                                    <span className="text-rose-400">{"</div>"}</span>
                                </code>
                            </pre>
                        )}

                        {activeTab === "js" && (
                            <pre className="text-foreground">
                                <code>
                                    <span className="text-muted-foreground">{"// app.js — Logika click counter"}</span>{"\n"}
                                    <span className="text-violet-400">let</span> count = <span className="text-amber-400">{jsCount}</span>;{"\n"}
                                    <span className="text-violet-400">const</span> btn = document.querySelector(<span className="text-emerald-400">'.btn'</span>);{"\n"}
                                    <span className="text-violet-400">const</span> status = document.querySelector(<span className="text-emerald-400">'.status'</span>);{"\n\n"}
                                    btn.onclick = () =&gt; {"{"}{"\n"}
                                    {"  "}count++;{"\n"}
                                    {"  "}status.innerHTML = <span className="text-emerald-400">`Kamu mengklik ${"{"}count{"}"} kali`</span>;{"\n"}
                                    {"  "}<span className="text-violet-400">if</span> (count &gt;= <span className="text-amber-400">5</span>) {"{"}{"\n"}
                                    {"    "}celebrate(); <span className="text-muted-foreground">{"// Mantap! 🚀"}</span>{"\n"}
                                    {"  "}{"}"}{"\n"}
                                    {"}"};
                                </code>
                            </pre>
                        )}

                        {activeTab === "react" && (
                            <pre className="text-foreground">
                                <code>
                                    <span className="text-muted-foreground">{"// Dashboard.tsx — React state & progress"}</span>{"\n"}
                                    <span className="text-violet-400">import</span> {"{"} useState {"}"} <span className="text-violet-400">from</span> <span className="text-emerald-400">'react'</span>;{"\n\n"}
                                    <span className="text-violet-400">export default function</span> Dashboard() {"{"}{"\n"}
                                    {"  "}<span className="text-violet-400">const</span> [materiSelesai, setMateriSelesai] = useState(<span className="text-amber-400">{checklistCount}</span>);{"\n"}
                                    {"  "}<span className="text-violet-400">const</span> progress = <span className="text-amber-400">{progressPercent}</span>; <span className="text-muted-foreground">{"// %"}</span>{"\n\n"}
                                    {"  "}<span className="text-violet-400">return</span> ({"\n"}
                                    {"    "}<span className="text-rose-400">{"<div"}</span> <span className="text-amber-400">className</span>=<span className="text-emerald-400">"progress-bar"</span><span className="text-rose-400">{">"}</span>{"\n"}
                                    {"      "}<span className="text-rose-400">{"<div"}</span> <span className="text-amber-400">style</span>={"{{"} width: <span className="text-emerald-400">{"`${progress}%`"}</span> {"}}"} <span className="text-rose-400">{" />"}</span>{"\n"}
                                    {"    "}<span className="text-rose-400">{"</div>"}</span>{"\n"}
                                    {"  "});{"\n"}
                                    {"}"}
                                </code>
                            </pre>
                        )}

                        {activeTab === "deploy" && (
                            <div className="flex flex-col gap-1.5 h-full font-mono text-xs leading-5">
                                <span className="text-muted-foreground"># Simulasi Deploy Website ke Vercel</span>
                                {terminalLines.length === 0 ? (
                                    <span className="text-muted-foreground italic">Klik tombol &quot;Jalankan Deploy&quot; di sisi kanan untuk memulai simulasi...</span>
                                ) : (
                                    terminalLines.map((line, i) => (
                                        <span
                                            key={i}
                                            className={
                                                line.startsWith("✓")
                                                    ? "text-emerald-400 font-semibold"
                                                    : line.startsWith("🚀") || line.startsWith("🔗")
                                                    ? "text-primary font-medium"
                                                    : "text-foreground"
                                            }
                                        >
                                            {line}
                                        </span>
                                    ))
                                )}
                                {deployStatus === "building" && (
                                    <div className="mt-2 flex items-center gap-3">
                                        <div className="h-2 w-48 overflow-hidden rounded-full bg-muted">
                                            <div
                                                className="h-full bg-primary transition-all duration-150"
                                                style={{ width: `${deployProgress}%` }}
                                            />
                                        </div>
                                        <span className="text-[11px] text-muted-foreground">Compiling... {deployProgress}%</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-5 flex flex-col bg-muted/10 p-6 justify-center">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                            <Sparkles className="size-3.5 text-primary" /> Live Preview
                        </span>
                        <div className="flex items-center gap-1">
                            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] text-muted-foreground">Interactive</span>
                        </div>
                    </div>

                    <div className="min-h-[250px] flex flex-col justify-center items-center rounded-2xl border border-border/40 bg-card/85 p-6 shadow-md">
                        {activeTab === "html" && (
                            <div className="w-full max-w-xs flex flex-col gap-4 text-center">
                                <div
                                    className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                                        cardTheme === "purple"
                                            ? "border-primary/30 bg-primary/[0.03] shadow-primary/5 shadow-lg"
                                            : cardTheme === "emerald"
                                            ? "border-emerald-500/30 bg-emerald-500/[0.03] shadow-emerald-500/5 shadow-lg"
                                            : cardTheme === "amber"
                                            ? "border-amber-500/30 bg-amber-500/[0.03] shadow-amber-500/5 shadow-lg"
                                            : "border-blue-500/30 bg-blue-500/[0.03] shadow-blue-500/5 shadow-lg"
                                    }`}
                                >
                                    <div className="mb-3 flex items-center justify-between">
                                        <Badge
                                            className={
                                                cardTheme === "purple"
                                                    ? "bg-primary/10 text-primary border-primary/20"
                                                    : cardTheme === "emerald"
                                                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                                    : cardTheme === "amber"
                                                    ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                                    : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                            }
                                            variant="outline"
                                        >
                                            Topik Baru
                                        </Badge>
                                        <span className="text-[10px] text-muted-foreground">Materi #1</span>
                                    </div>
                                    <h4 className="font-heading font-bold text-foreground text-base">Belajar HTML & CSS</h4>
                                    <p className="mt-1.5 text-xs text-muted-foreground leading-normal">
                                        Rancang layout responsive menggunakan CSS Flexbox & Grid dengan mudah.
                                    </p>
                                    <button
                                        className={`mt-4 w-full rounded-xl py-2 text-xs font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0 ${
                                            cardTheme === "purple"
                                                ? "bg-primary hover:bg-primary/95 shadow-primary/10"
                                                : cardTheme === "emerald"
                                                ? "bg-emerald-600 hover:bg-emerald-600/95 shadow-emerald-600/10"
                                                : cardTheme === "amber"
                                                ? "bg-amber-600 hover:bg-amber-600/95 shadow-amber-600/10"
                                                : "bg-blue-600 hover:bg-blue-600/95 shadow-blue-600/10"
                                        }`}
                                    >
                                        Mulai Kelas
                                    </button>
                                </div>

                                <div className="flex flex-col items-center gap-2 mt-2">
                                    <span className="text-[10px] font-medium text-muted-foreground">Ubah Tema CSS (Live):</span>
                                    <div className="flex gap-2">
                                        {[
                                            { id: "purple", color: "bg-primary border-primary/30" },
                                            { id: "emerald", color: "bg-emerald-500 border-emerald-500/30" },
                                            { id: "amber", color: "bg-amber-500 border-amber-500/30" },
                                            { id: "blue", color: "bg-blue-500 border-blue-500/30" },
                                        ].map((theme) => (
                                            <button
                                                key={theme.id}
                                                onClick={() => setCardTheme(theme.id as any)}
                                                aria-label={`Ubah tema ke ${theme.id}`}
                                                className={`size-6 rounded-full border-2 transition-transform hover:scale-115 active:scale-95 ${theme.color} ${
                                                    cardTheme === theme.id ? "ring-2 ring-foreground/20 scale-110" : ""
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "js" && (
                            <div className="w-full max-w-xs flex flex-col items-center text-center gap-4">
                                <div className="flex flex-col items-center justify-center size-24 rounded-2xl bg-muted/40 border border-border/40 mb-2">
                                    <span className="text-3xl font-extrabold font-mono tracking-tight text-foreground">{jsCount}</span>
                                    <span className="text-[10px] text-muted-foreground mt-0.5">Clicks</span>
                                </div>

                                <div className="flex gap-2 w-full">
                                    <Button
                                        onClick={() => setJsCount(jsCount + 1)}
                                        className="flex-1 rounded-xl font-medium shadow-sm transition-all hover:shadow"
                                    >
                                        Klik Saya! 👆
                                    </Button>
                                    {jsCount > 0 && (
                                        <Button
                                            variant="outline"
                                            onClick={() => setJsCount(0)}
                                            size="icon"
                                            className="rounded-xl border-border/60 hover:bg-muted"
                                            aria-label="Reset Click Counter"
                                        >
                                            <RefreshCw className="size-4 text-muted-foreground" />
                                        </Button>
                                    )}
                                </div>

                                <p className="text-xs text-muted-foreground font-medium min-h-[20px]">
                                    {jsCount === 0 && "Coba klik tombol di atas! ✨"}
                                    {jsCount > 0 && jsCount < 5 && "Mantap! Tambah lagi kliknya..."}
                                    {jsCount >= 5 && jsCount < 10 && "Gokil! Fungsi JavaScript-mu berjalan sempurna! ⚡"}
                                    {jsCount >= 10 && "Luar biasa! Kamu pemrogram berbakat! 🎉💻"}
                                </p>
                            </div>
                        )}

                        {activeTab === "react" && (
                            <div className="w-full max-w-xs flex flex-col gap-4">
                                <div className="rounded-xl border border-border/40 bg-muted/10 p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold text-foreground">Progress Belajar</span>
                                        <span className="text-xs font-bold text-primary">{progressPercent}% Selesai</span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted/80 border border-border/10">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all duration-300"
                                            style={{ width: `${progressPercent}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 bg-muted/20 rounded-xl p-3 border border-border/10">
                                    {[
                                        { key: "materi", label: "Baca Materi HTML Dasar" },
                                        { key: "paham", label: "Tonton Video Praktek CSS" },
                                        { key: "state", label: "Coba State Hooks di React" },
                                        { key: "api", label: "Koneksi ke Supabase API" },
                                    ].map((item) => (
                                        <label
                                            key={item.key}
                                            className="flex items-center gap-2.5 text-xs font-medium text-foreground cursor-pointer select-none"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={(checklist as any)[item.key]}
                                                onChange={(e) =>
                                                    setChecklist((prev) => ({
                                                        ...prev,
                                                        [item.key]: e.target.checked,
                                                    }))
                                                }
                                                className="rounded border-border text-primary focus:ring-primary size-4 accent-primary"
                                            />
                                            <span className={(checklist as any)[item.key] ? "line-through text-muted-foreground" : "text-foreground"}>
                                                {item.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>

                                <p className="text-[11px] text-center text-muted-foreground min-h-[16px]">
                                    {progressPercent === 100 ? (
                                        <span className="text-emerald-500 font-semibold flex items-center justify-center gap-1">
                                            <Sparkles className="size-3" /> Selamat! Bab Selesai! 🎓
                                        </span>
                                    ) : (
                                        "Tandai item di atas untuk simulasi belajar!"
                                    )}
                                </p>
                            </div>
                        )}

                        {activeTab === "deploy" && (
                            <div className="w-full max-w-xs flex flex-col items-center text-center gap-4">
                                {deployStatus === "idle" && (
                                    <div className="flex flex-col items-center justify-center p-6 border border-dashed border-border/60 rounded-2xl w-full bg-muted/5">
                                        <CloudUpload className="size-10 text-muted-foreground mb-2" />
                                        <h5 className="text-xs font-semibold text-foreground">Siap Rilis ke Publik</h5>
                                        <p className="text-[10px] text-muted-foreground mt-1 max-w-[180px]">
                                            Deploy karyamu ke server Vercel instan agar bisa diakses temanmu.
                                        </p>
                                        <Button
                                            onClick={handleRunDeploy}
                                            size="sm"
                                            className="mt-4 rounded-xl text-xs font-semibold flex items-center gap-1"
                                        >
                                            <Play className="size-3 fill-current" /> Jalankan Deploy
                                        </Button>
                                    </div>
                                )}

                                {deployStatus === "building" && (
                                    <div className="flex flex-col items-center justify-center p-6 rounded-2xl w-full">
                                        <RefreshCw className="size-8 text-primary animate-spin mb-3" />
                                        <h5 className="text-xs font-semibold text-foreground">Sedang Membangun...</h5>
                                        <p className="text-[10px] text-muted-foreground mt-1">
                                            Mengompilasi file TypeScript & JSX...
                                        </p>
                                    </div>
                                )}

                                {deployStatus === "deploying" && (
                                    <div className="flex flex-col items-center justify-center p-6 rounded-2xl w-full">
                                        <Globe className="size-8 text-blue-500 animate-pulse mb-3" />
                                        <h5 className="text-xs font-semibold text-foreground">Mempublikasikan...</h5>
                                        <p className="text-[10px] text-muted-foreground mt-1">
                                            Mengekspor halaman statis ke server...
                                        </p>
                                    </div>
                                )}

                                {deployStatus === "success" && (
                                    <div className="flex flex-col items-center justify-center p-4 border border-emerald-500/20 rounded-2xl w-full bg-emerald-500/[0.02]">
                                        <span className="flex size-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 mb-2">
                                            <Check className="size-5" />
                                        </span>
                                        <h5 className="text-xs font-bold text-foreground">Website Berhasil Online!</h5>
                                        <p className="text-[10px] text-muted-foreground mt-1">
                                            Bisa diakses dari perangkat mana saja.
                                        </p>
                                        <Link
                                            href="https://sinau-belajar.vercel.app"
                                            target="_blank"
                                            className="mt-3 text-[11px] font-mono text-primary hover:underline"
                                        >
                                            https://sinau-belajar.vercel.app
                                        </Link>
                                        <Button
                                            variant="outline"
                                            onClick={handleResetDeploy}
                                            size="sm"
                                            className="mt-3 rounded-xl text-[10px] px-3 h-7 border-border/50"
                                        >
                                            Reset Simulasi
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function RoadmapVisualizer() {
    const [selectedStage, setSelectedStage] = useState<string>("dasar");
    const currentStage = roadmapStages.find((s) => s.id === selectedStage) || roadmapStages[0];
    const StageIcon = currentStage.icon;

    return (
        <div id="roadmap" className="mx-auto w-full max-w-6xl px-4 py-24 sm:py-28">
            <div className="mb-16 text-center">
                <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs">
                    Kurikulum Terstruktur
                </Badge>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Alur Belajar Dari Nol Sampai Siap Kerja
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
                    Kami menyusun kurikulum ini khusus untuk pemula. Pelajari materi berurutan, selesaikan latihan, dan kumpulkan portofolio nyata.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-12 items-start mt-12">
                <div className="lg:col-span-5 flex flex-col gap-3.5">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-2 mb-1">
                        Pilih Langkah Belajar:
                    </span>
                    {roadmapStages.map((stage) => {
                        const Icon = stage.icon;
                        const isSelected = stage.id === selectedStage;
                        return (
                            <button
                                key={stage.id}
                                onClick={() => setSelectedStage(stage.id)}
                                className={`flex items-center gap-4 text-left p-4 rounded-2xl border transition-all duration-300 group ${
                                    isSelected
                                        ? "bg-card border-border/80 shadow-lg shadow-black/[0.02] translate-x-1"
                                        : "bg-card/40 border-border/30 hover:border-border/60 hover:bg-card/65"
                                }`}
                            >
                                <span
                                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                                        isSelected
                                            ? stage.color
                                            : "bg-muted text-muted-foreground group-hover:bg-muted/80 group-hover:text-foreground"
                                    }`}
                                >
                                    <Icon className="size-5" />
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className={`text-sm font-bold ${isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                                            {stage.title}
                                        </span>
                                        <Badge
                                            variant="outline"
                                            className={`text-[9px] font-semibold py-0 shrink-0 ${
                                                isSelected ? "bg-primary/5 text-primary border-primary/10" : "text-muted-foreground/60 border-border/40"
                                            }`}
                                        >
                                            {stage.badge}
                                        </Badge>
                                    </div>
                                    <span className="text-[11px] text-muted-foreground/85 line-clamp-1 mt-0.5">
                                        {stage.desc}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="lg:col-span-7 relative">
                    <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-primary/10 to-transparent opacity-60 blur-xl -z-10" />

                    <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 shadow-xl">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-5 mb-5">
                            <div className="flex items-center gap-3">
                                <span className={`flex size-12 items-center justify-center rounded-2xl ${currentStage.color}`}>
                                    <StageIcon className="size-6" />
                                </span>
                                <div>
                                    <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground">
                                        Detail Alur: {currentStage.title.split(". ")[1]}
                                    </h3>
                                    <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                        <ClockIcon className="size-3.5" /> {currentStage.stats}
                                    </span>
                                </div>
                            </div>
                            <Badge className="bg-primary/10 text-primary border-primary/25 rounded-full" variant="outline">
                                Ready To Learn
                            </Badge>
                        </div>

                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-6">
                            {currentStage.desc}
                        </p>

                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5">
                                <CheckSquare className="size-4 text-emerald-500" /> Yang Akan Kamu Pelajari:
                            </h4>
                            <div className="grid gap-2.5 sm:grid-cols-1">
                                {currentStage.materi.map((m, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/30 hover:border-border/50 transition-colors"
                                    >
                                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 font-mono text-[10px] font-bold">
                                            {i + 1}
                                        </span>
                                        <span className="text-xs sm:text-sm font-medium text-foreground">
                                            {m}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-border/40 flex flex-wrap gap-4 items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                                Akses gratis selamanya, belajar kapan saja.
                            </span>
                            <Button asChild size="sm" className="rounded-full shadow-sm">
                                <Link href="/start">
                                    Mulai Kelas Ini
                                    <ArrowRight className="ml-1.5 size-3.5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function FloatingSymbols() {
    return (
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <div className="absolute top-[15%] left-[10%] text-primary/15 font-mono text-4xl animate-float select-none">{"{"}</div>
            <div className="absolute top-[25%] right-[12%] text-blue-500/20 font-mono text-5xl animate-float-delayed delay-200 select-none">{"<>"}</div>
            <div className="absolute bottom-[25%] left-[15%] text-violet-500/15 font-mono text-3xl animate-float delay-500 select-none">{"#"}</div>
            <div className="absolute top-[45%] left-[8%] text-emerald-500/15 font-mono text-4xl animate-float-delayed select-none">{"();"}</div>
            <div className="absolute bottom-[35%] right-[15%] text-amber-500/15 font-mono text-6xl animate-float delay-700 select-none">{"*"}</div>
            <div className="absolute top-[60%] right-[8%] text-rose-500/10 font-mono text-3xl animate-float-delayed delay-300 select-none">{"$"}</div>
        </div>
    );
}

export default function HomeContent() {
    return (
        <>
            <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,transparent_30%,var(--background)),linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[radial-gradient(ellipse_at_top,transparent_30%,var(--background)),linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]" />
            </div>

            <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
                <FloatingSymbols />
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute top-[-20%] left-1/2 h-[750px] w-[1000px] -translate-x-1/2 rounded-full bg-primary/[0.09] blur-[125px]" />
                    <div className="absolute top-20 right-[-10%] h-[400px] w-[400px] rounded-full bg-blue-400/[0.08] blur-[100px]" />
                    <div className="absolute top-40 left-[-8%] h-[350px] w-[350px] rounded-full bg-violet-400/[0.07] blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-1/2 h-[250px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-400/[0.06] blur-[90px]" />
                </div>
                <div className="mx-auto w-full max-w-6xl px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.05] px-4.5 py-1.5 text-[11px] sm:text-xs font-semibold text-primary backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                            </span>
                            Platform Belajar Coding #1 Bahasa Indonesia 🇮🇩
                        </div>

                        <h1 className="animate-fade-in-up delay-100 font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl/tight lg:text-7xl/tight text-balance">
                            Belajar Coding Tanpa Pusing
                            <br />
                            <span className="bg-gradient-to-r from-primary via-sky-500 to-indigo-500 bg-clip-text text-transparent">
                                Dari Nol Sampai Siap Kerja
                            </span>
                        </h1>

                        <p className="animate-fade-in-up delay-200 mx-auto mt-7 max-w-2xl text-sm sm:text-lg leading-relaxed text-muted-foreground">
                            Sinau Coding adalah platform belajar pemrograman gratis yang disusun runut, visual, dan praktis.
                            Tanpa background IT, kamu bisa belajar mandiri langkah demi langkah sampai mempublikasikan website karyamu sendiri.
                        </p>

                        <div className="animate-fade-in-up delay-300 mt-10 flex flex-wrap justify-center gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="relative rounded-full px-8 text-sm sm:text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden group"
                            >
                                <Link href="/register">
                                    <span className="relative z-10">Mulai Belajar - Gratis</span>
                                    <ArrowRight className="relative z-10 ml-2 size-4.5 transition-transform group-hover:translate-x-1" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-sky-500 to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="rounded-full px-8 text-sm sm:text-base font-semibold border-border/60 hover:bg-muted/40 hover:border-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                            >
                                <a href="#roadmap">
                                    Lihat Alur Belajar
                                </a>
                            </Button>
                        </div>

                        <div className="animate-fade-in-up delay-400 mt-14 flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
                            <span className="text-xs font-bold text-muted-foreground/60 mr-1 uppercase tracking-wider font-mono">Topik:</span>
                            {techStack.map((tech) => {
                                const Icon = tech.icon;
                                return (
                                    <span
                                        key={tech.name}
                                        className={`flex items-center gap-1.5 rounded-full border border-border/50 bg-card/40 px-3.5 py-1.5 font-mono text-xs font-semibold text-muted-foreground backdrop-blur-sm transition-all duration-300 ${tech.color} hover:border-border hover:shadow-sm`}
                                    >
                                        <Icon className="size-3.5" />
                                        {tech.name}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    <CodePlayground />
                </div>
            </section>

            <section className="relative border-y border-border/45 bg-muted/20 backdrop-blur-sm">
                <div className="mx-auto w-full max-w-6xl px-4 py-10">
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                        {[
                            { value: "50+", label: "Modul Praktis", icon: Layers, desc: "Runtut & terstruktur" },
                            { value: "11", label: "Teknologi Utama", icon: Braces, desc: "Sesuai kebutuhan industri" },
                            { value: "100%", label: "Gratis Selamanya", icon: Rocket, desc: "Cukup buat akun saja" },
                            { value: "24/7", label: "Akses Mandiri", icon: Laptop, desc: "Belajar kapan saja" },
                        ].map((stat) => (
                            <div key={stat.label} className="group flex flex-col items-center gap-2.5 text-center transition-all duration-300">
                                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                                    <stat.icon className="size-5.5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{stat.value}</span>
                                    <span className="text-xs font-semibold text-foreground mt-0.5">{stat.label}</span>
                                    <span className="text-[10px] text-muted-foreground mt-0.5">{stat.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <RoadmapVisualizer />

            <section className="relative border-t border-border/40 bg-muted/5">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute top-[20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-blue-400/[0.04] blur-[100px]" />
                </div>
                <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:py-28">
                    <div className="mb-16 text-center">
                        <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs">
                            Sistem Belajar
                        </Badge>
                        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Belajar Efektif dalam 4 Langkah
                        </h2>
                        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
                            Kami merancang platform ini dengan sistem belajar mandiri yang fokus pada praktek, bukan sekadar membaca teori.
                        </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                step: "01",
                                icon: FolderOpen,
                                title: "Pilih Topik Belajar",
                                description: "Mulai dari HTML/CSS dasar atau langsung loncat ke topik yang kamu inginkan dari curriculum roadmap.",
                            },
                            {
                                step: "02",
                                icon: BookOpen,
                                title: "Pahami Konsep & Praktek",
                                description: "Setiap materi dilengkapi penjelasan bergambar dan contoh potongan kode interaktif siap uji.",
                            },
                            {
                                step: "03",
                                icon: CircleCheck,
                                title: "Tandai Progress Selesai",
                                description: "Simpan kemajuan belajarmu secara otomatis di akun pribadimu dan pantau grafik progresmu di dashboard.",
                            },
                            {
                                step: "04",
                                icon: Rocket,
                                title: "Build & Upload Karyamu",
                                description: "Gabungkan semua bab, selesaikan mini project nyata, dan deploy website pertamamu online ke internet.",
                            },
                        ].map((step, index, array) => (
                            <div key={step.step} className="relative group">
                                {index < array.length - 1 && (
                                    <div className="absolute top-10 left-[70%] hidden h-[2px] w-full bg-gradient-to-r from-border/80 to-transparent lg:block -z-10" />
                                )}
                                <div className="h-full flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/85 p-6 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-xl hover:shadow-black/[0.02]">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                            <step.icon className="size-6" />
                                        </span>
                                        <span className="font-mono text-base font-extrabold tracking-widest text-muted-foreground/30">
                                            {step.step}
                                        </span>
                                    </div>
                                    <h3 className="font-heading text-lg font-bold text-foreground">{step.title}</h3>
                                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground flex-1">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-y border-border/40 bg-muted/15">
                <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:py-28">
                    <div className="mb-14 text-center">
                        <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs">
                            Kecocokan Belajar
                        </Badge>
                        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Didesain Ramah untuk Semua Kalangan
                        </h2>
                        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
                            Kamu tidak butuh bakat khusus matematika atau logika rumit. Kurikulum kami disusun berurutan agar siapa pun bisa paham koding sejak hari pertama.
                        </p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-3">
                        {audiences.map((item) => (
                            <div
                                key={item.title}
                                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/85 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:bg-card hover:shadow-2xl hover:shadow-black/[0.03]"
                            >
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <div className="mb-5 flex items-center justify-between relative z-10">
                                    <div className={`flex size-12 items-center justify-center rounded-2xl ${item.iconBg} transition-transform duration-300 group-hover:scale-105`}>
                                        <item.icon className="size-6" />
                                    </div>
                                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${item.accent}`}>
                                        {item.badge}
                                    </span>
                                </div>
                                <h3 className="font-heading text-lg font-bold text-foreground relative z-10">{item.title}</h3>
                                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground relative z-10">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3.5 rounded-2xl border border-border/40 bg-card/65 px-6 py-5 backdrop-blur-sm">
                        {stepsFeatures.map((item) => (
                            <span key={item} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground">
                                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-6xl px-4 py-24 sm:py-28">
                <div className="mb-16 text-center">
                    <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs">
                        Keunggulan Kami
                    </Badge>
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Pengalaman Belajar Terbaik Bebas Hambatan
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
                        Lebih dari sekadar membaca tutorial biasa. Sinau Coding menyediakan ekosistem terpadu agar kamu tetap termotivasi dan belajar secara konsisten.
                    </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-card/85 p-7 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-xl hover:shadow-black/[0.02] ${feature.ring}`}
                            >
                                <div className={`mb-4 flex size-11 items-center justify-center rounded-xl ${feature.iconBg} transition-all duration-300 group-hover:scale-105`}>
                                    <Icon className="size-5" />
                                </div>
                                <h3 className="font-heading text-base font-bold text-foreground">{feature.title}</h3>
                                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>



            <section className="mx-auto w-full max-w-3xl px-4 py-24 sm:py-28">
                <div className="mb-12 text-center">
                    <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs">
                        Pertanyaan Umum
                    </Badge>
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Ada Pertanyaan? Kami Punya Jawaban
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
                        Masih ragu untuk mulai belajar koding? Baca FAQ di bawah ini atau hubungi admin di komunitas.
                    </p>
                </div>
                <div className="rounded-3xl border border-border/50 bg-card/85 px-6 sm:px-8 py-2 shadow-sm backdrop-blur-sm">
                    {faqs.map((faq) => (
                        <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </section>

            <section className="mx-auto w-full max-w-5xl px-4 pb-24">
                <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 text-center shadow-xl sm:p-16">
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute top-[-50%] left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.08] blur-[90px]" />
                        <div className="absolute bottom-[-30%] right-[-10%] h-[300px] w-[300px] rounded-full bg-blue-400/[0.06] blur-[70px]" />
                        <div className="absolute inset-0 bg-[radial-gradient(#80808005_1px,transparent_1px)] bg-[size:16px_16px] dark:bg-[radial-gradient(#ffffff02_1px,transparent_1px)]" />
                    </div>
                    <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary animate-bounce">
                        <Rocket className="size-7" />
                    </div>
                    <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                        Siap Memulai
                        <br />
                        <span className="bg-gradient-to-r from-primary via-primary/85 to-blue-500 bg-clip-text text-transparent">
                            Perjalanan Coding Kamu?
                        </span>
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                        Setiap programer handal kelas dunia selalu memulai karir mereka dari menulis baris kode pertama. Hari ini giliranmu untuk melangkah maju!
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="rounded-full px-10 text-sm sm:text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <Link href="/register">
                                Buat Akun Gratis Sekarang
                                <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                    </div>
                    <p className="mt-6 text-[10px] sm:text-xs text-muted-foreground/60">100% Gratis selamanya · Tidak butuh kartu kredit · Gabung bersama pelajar lain</p>
                </div>
            </section>
        </>
    );
}
