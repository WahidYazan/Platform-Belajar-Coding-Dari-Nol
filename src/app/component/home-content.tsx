"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  Zap,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Animated background with particles
function AnimatedBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.sin(i * 0.5) * 50 + 50,
        y: Math.cos(i * 0.3) * 50 + 50,
        size: Math.sin(i * 0.7) * 2 + 3,
        delay: i % 5,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,transparent_30%,var(--background)),linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[radial-gradient(ellipse_at_top,transparent_30%,var(--background)),linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-20%] left-1/2 h-[750px] w-[1000px] -translate-x-1/2 rounded-full bg-primary/[0.09] blur-[125px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-20 right-[-10%] h-[400px] w-[400px] rounded-full bg-blue-400/[0.08] blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-40 left-[-8%] h-[350px] w-[350px] rounded-full bg-violet-400/[0.07] blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[-10%] left-1/2 h-[250px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-400/[0.06] blur-[90px]"
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [particle.y, particle.y - 30, particle.y],
          }}
          transition={{
            duration: 4 + particle.delay,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
    </div>
  );
}

const techStack = [
  {
    name: "HTML",
    icon: Braces,
    color: "hover:border-orange-500/30 hover:text-orange-500",
  },
  {
    name: "CSS",
    icon: Layers3,
    color: "hover:border-blue-500/30 hover:text-blue-500",
  },
  {
    name: "JavaScript",
    icon: Code2,
    color: "hover:border-yellow-500/30 hover:text-yellow-500",
  },
  {
    name: "React",
    icon: Cpu,
    color: "hover:border-cyan-500/30 hover:text-cyan-500",
  },
  {
    name: "Next.js",
    icon: Globe,
    color: "hover:border-foreground/30 hover:text-foreground",
  },
  {
    name: "Node.js",
    icon: Terminal,
    color: "hover:border-emerald-500/30 hover:text-emerald-500",
  },
  {
    name: "TypeScript",
    icon: ShieldCheck,
    color: "hover:border-blue-600/30 hover:text-blue-600",
  },
  {
    name: "Git",
    icon: Route,
    color: "hover:border-red-500/30 hover:text-red-500",
  },
];

const features = [
  {
    icon: Route,
    title: "Roadmap Terstruktur",
    description:
      "Materi disusun berurutan dari dasar: HTML, CSS, JavaScript, React, backend, sampai deployment. Tidak ada loncat-loncat.",
    iconBg:
      "bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
    ring: "group-hover:ring-blue-500/20",
  },
  {
    icon: BadgeCheck,
    title: "Progres Tersimpan",
    description:
      "Buat akun gratis, tandai bab yang sudah selesai, dan lanjutkan belajar kapan saja dari perangkat mana pun.",
    iconBg:
      "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
    ring: "group-hover:ring-emerald-500/20",
  },
  {
    icon: Languages,
    title: "Bahasa Indonesia",
    description:
      "Semua materi dijelaskan dengan bahasa santai dan mudah dipahami. Cocok untuk pemula tanpa latar belakang IT.",
    iconBg:
      "bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
    ring: "group-hover:ring-amber-500/20",
  },
  {
    icon: Compass,
    title: "Panduan & Roadmap",
    description:
      "Bingung mulai dari mana? Ada panduan langkah pertama dan roadmap yang menunjukkan arah belajarmu.",
    iconBg:
      "bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
    ring: "group-hover:ring-violet-500/20",
  },
  {
    icon: Braces,
    title: "Contoh Kode Praktis",
    description:
      "Setiap bab dilengkapi contoh kode yang bisa langsung kamu coba dan tiru, bukan cuma teori.",
    iconBg:
      "bg-rose-500/10 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400",
    ring: "group-hover:ring-rose-500/20",
  },
  {
    icon: CloudUpload,
    title: "Sampai Deploy",
    description:
      "Belajar tidak berhenti di teori. Kamu diajak sampai deploy: website karyamu bisa dilihat orang lain.",
    iconBg:
      "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400",
    ring: "group-hover:ring-cyan-500/20",
  },
];

const audiences = [
  {
    icon: UserRound,
    title: "Total Pemula",
    desc: "Baru mulai dan bingung dari mana? Materi disusun khusus untuk yang benar-benar nol, tanpa jargon yang menyeramkan.",
    iconBg:
      "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
    gradient: "from-emerald-500/10 to-transparent",
    accent: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    badge: "Mulai dari Nol",
  },
  {
    icon: Backpack,
    title: "Siswa & Mahasiswa",
    desc: "Pelengkap materi kuliah atau tugas sekolah dengan contoh kode praktis yang bisa langsung dipelajari dan diterapkan.",
    iconBg:
      "bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
    gradient: "from-blue-500/10 to-transparent",
    accent: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
    badge: "Penunjang Kuliah",
  },
  {
    icon: TrendingUp,
    title: "Profesional",
    desc: "Dari nol sampai siap deploy. Bekali dirimu dengan portofolio nyata untuk mendukung transisi karier ke dunia teknologi.",
    iconBg:
      "bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
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
    answer:
      "Tidak sama sekali. Materi kami dirancang untuk benar-benar pemula. Semua dijelaskan dari nol dengan bahasa Indonesia yang santai, visual, dan mudah dipahami.",
  },
  {
    question: "Apakah ini benar-benar gratis?",
    answer:
      "Ya! Kamu bisa mengakses semua materi dasar secara gratis. Cukup buat akun untuk menyimpan progress belajarmu dan memantau bab yang sudah selesai.",
  },
  {
    question: "Berapa lama untuk bisa coding?",
    answer:
      "Tergantung kecepatan belajar masing-masing. Dengan konsistensi 30-45 menit per hari, dalam 2-3 bulan biasanya kamu sudah bisa membuat website interaktif sendiri.",
  },
  {
    question: "Teknologi apa saja yang dipelajari?",
    answer:
      "Kamu akan mempelajari HTML, CSS, JavaScript, React, Next.js, Node.js, PHP, Laravel, hingga Git & Deployment. Semua disusun runtut dan terpadu.",
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
    materi: [
      "Pengenalan Internet & Web",
      "Struktur HTML5 & Formulir",
      "Styling CSS, Flexbox & CSS Grid",
    ],
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
    materi: [
      "Variabel, Kondisi & Perulangan",
      "Function, Array, & Object",
      "DOM Manipulation & Async Fetch API",
    ],
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
    materi: [
      "React Component & State",
      "Next.js App Router & Layouts",
      "Server Actions & Database Integration",
    ],
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
    materi: [
      "Node.js Express & PostgreSQL",
      "PHP Dasar & Object Oriented",
      "Laravel Routing, Eloquent ORM & Auth",
    ],
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
    materi: [
      "Terminal & Git Command",
      "Github Repository Management",
      "Deploy Instan ke Vercel / Cloud",
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border/50 py-4 last:border-b-0">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 text-left font-medium text-foreground transition-colors hover:text-primary py-2"
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-base sm:text-lg">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown
            className={`size-5 shrink-0 ${isOpen ? "text-primary" : "text-muted-foreground"}`}
          />
        </motion.div>
      </motion.button>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-base leading-relaxed text-muted-foreground pb-2"
            >
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CodePlayground() {
  type TabId = "html" | "js" | "react" | "deploy";

  const [activeTab, setActiveTab] = useState<TabId>("html");

  const [cardTheme, setCardTheme] = useState<
    "purple" | "emerald" | "amber" | "blue"
  >("purple");

  const [jsCount, setJsCount] = useState(0);

  const [checklist, setChecklist] = useState({
    materi: true,
    paham: false,
    state: false,
    api: false,
  });
  const checklistCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((checklistCount / 4) * 100);

  const [deployStatus, setDeployStatus] = useState<
    "idle" | "building" | "deploying" | "success"
  >("idle");
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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto mt-16 max-w-5xl"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="grid gap-0 lg:grid-cols-12 overflow-hidden rounded-xl border-3 border-black bg-white dark:bg-[#202024] shadow-[8px_8px_0px_0px_#000000]"
      >
        <div className="lg:col-span-7 flex flex-col border-b-3 lg:border-b-0 lg:border-r-3 border-black">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-3 border-black bg-[#ffde59] px-4 py-3 text-black">
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="size-3.5 rounded-full border-2 border-black bg-[#ff5b79]"
              />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="size-3.5 rounded-full border-2 border-black bg-[#ffde59]"
              />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                className="size-3.5 rounded-full border-2 border-black bg-[#4ade80]"
              />
              <span className="ml-2 font-mono text-xs font-black tracking-wider uppercase text-black hidden sm:inline">
                sinau-editor.sh
              </span>
            </div>
            <div className="flex gap-1.5">
              {[
                { id: "html", label: "index.html" },
                { id: "js", label: "app.js" },
                { id: "react", label: "Dashboard.tsx" },
                { id: "deploy", label: "terminal" },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabId)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-md px-2.5 py-1 font-mono text-xs font-bold transition-all border-2 border-black ${
                    activeTab === tab.id
                      ? "bg-black text-white shadow-[2px_2px_0px_0px_#ff5b79]"
                      : "bg-white text-black hover:bg-neutral-100 shadow-[2px_2px_0px_0px_#000000]"
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-x-auto p-5 text-left font-mono text-xs sm:text-sm leading-6 min-h-[280px] bg-card/10">
            <AnimatePresence mode="wait">
              {activeTab === "html" && (
                <motion.pre
                  key="html"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="text-foreground"
                >
                  <code>
                    <span className="text-muted-foreground">
                      {"<!-- Desain card HTML & CSS -->"}
                    </span>
                    {"\n"}
                    <span className="text-rose-400">{"<div"}</span>{" "}
                    <span className="text-amber-400">class</span>=
                    <span className="text-emerald-400">
                      &quot;materi-card {cardTheme}&quot;
                    </span>
                    <span className="text-rose-400">{">"}</span>
                    {"\n"}
                    {"  "}
                    <span className="text-rose-400">{"<div"}</span>{" "}
                    <span className="text-amber-400">class</span>=
                    <span className="text-emerald-400">&quot;badge&quot;</span>
                    <span className="text-rose-400">{">"}</span>Topik Baru
                    <span className="text-rose-400">{"</div>"}</span>
                    {"\n"}
                    {"  "}
                    <span className="text-rose-400">{"<h3>"}</span>Belajar HTML
                    & CSS<span className="text-rose-400">{"</h3>"}</span>
                    {"\n"}
                    {"  "}
                    <span className="text-rose-400">{"<p>"}</span>Rancang layout
                    responsive menggunakan CSS Flexbox & Grid dengan mudah.
                    <span className="text-rose-400">{"</p>"}</span>
                    {"\n"}
                    {"  "}
                    <span className="text-rose-400">{"<button"}</span>{" "}
                    <span className="text-amber-400">class</span>=
                    <span className="text-emerald-400">&quot;btn&quot;</span>
                    <span className="text-rose-400">{">"}</span>Mulai Kelas
                    <span className="text-rose-400">{"</button>"}</span>
                    {"\n"}
                    <span className="text-rose-400">{"</div>"}</span>
                  </code>
                </motion.pre>
              )}

              {activeTab === "js" && (
                <motion.pre
                  key="js"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="text-foreground"
                >
                  <code>
                    <span className="text-muted-foreground">
                      {"// app.js — Logika click counter"}
                    </span>
                    {"\n"}
                    <span className="text-violet-400">let</span> count ={" "}
                    <span className="text-amber-400">{jsCount}</span>;{"\n"}
                    <span className="text-violet-400">const</span> btn =
                    document.querySelector(
                    <span className="text-emerald-400">&apos;.btn&apos;</span>);
                    {"\n"}
                    <span className="text-violet-400">const</span> status =
                    document.querySelector(
                    <span className="text-emerald-400">
                      &apos;.status&apos;
                    </span>
                    );{"\n\n"}
                    btn.onclick = () =&gt; {"{"}
                    {"\n"}
                    {"  "}count++;{"\n"}
                    {"  "}status.innerHTML ={" "}
                    <span className="text-emerald-400">
                      `Kamu mengklik ${"{"}count{"}"} kali`
                    </span>
                    ;{"\n"}
                    {"  "}
                    <span className="text-violet-400">if</span> (count &gt;={" "}
                    <span className="text-amber-400">5</span>) {"{"}
                    {"\n"}
                    {"    "}celebrate();{" "}
                    <span className="text-muted-foreground">
                      {"// Mantap! 🚀"}
                    </span>
                    {"\n"}
                    {"  "}
                    {"}"}
                    {"\n"}
                    {"}"};
                  </code>
                </motion.pre>
              )}

              {activeTab === "react" && (
                <motion.pre
                  key="react"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="text-foreground"
                >
                  <code>
                    <span className="text-muted-foreground">
                      {"// Dashboard.tsx — React state & progress"}
                    </span>
                    {"\n"}
                    <span className="text-violet-400">import</span> {"{"}{" "}
                    useState {"}"} <span className="text-violet-400">from</span>{" "}
                    <span className="text-emerald-400">&apos;react&apos;</span>;
                    {"\n\n"}
                    <span className="text-violet-400">
                      export default function
                    </span>{" "}
                    Dashboard() {"{"}
                    {"\n"}
                    {"  "}
                    <span className="text-violet-400">const</span>{" "}
                    [materiSelesai, setMateriSelesai] = useState(
                    <span className="text-amber-400">{checklistCount}</span>);
                    {"\n"}
                    {"  "}
                    <span className="text-violet-400">const</span> progress ={" "}
                    <span className="text-amber-400">{progressPercent}</span>;{" "}
                    <span className="text-muted-foreground">{"// %"}</span>
                    {"\n\n"}
                    {"  "}
                    <span className="text-violet-400">return</span> ({"\n"}
                    {"    "}
                    <span className="text-rose-400">{"<div"}</span>{" "}
                    <span className="text-amber-400">className</span>=
                    <span className="text-emerald-400">
                      &quot;progress-bar&quot;
                    </span>
                    <span className="text-rose-400">{">"}</span>
                    {"\n"}
                    {"      "}
                    <span className="text-rose-400">{"<div"}</span>{" "}
                    <span className="text-amber-400">style</span>={"{{"} width:{" "}
                    <span className="text-emerald-400">{"`${progress}%`"}</span>{" "}
                    {"}}"} <span className="text-rose-400">{" />"}</span>
                    {"\n"}
                    {"    "}
                    <span className="text-rose-400">{"</div>"}</span>
                    {"\n"}
                    {"  "});{"\n"}
                    {"}"}
                  </code>
                </motion.pre>
              )}

              {activeTab === "deploy" && (
                <motion.div
                  key="deploy"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-1.5 h-full font-mono text-xs leading-5"
                >
                  <span className="text-muted-foreground">
                    # Simulasi Deploy Website ke Vercel
                  </span>
                  {terminalLines.length === 0 ? (
                    <span className="text-muted-foreground italic">
                      Klik tombol &quot;Jalankan Deploy&quot; di sisi kanan
                      untuk memulai simulasi...
                    </span>
                  ) : (
                    terminalLines.map((line, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={
                          line.startsWith("✓")
                            ? "text-emerald-400 font-semibold"
                            : line.startsWith("🚀") || line.startsWith("🔗")
                              ? "text-primary font-medium"
                              : "text-foreground"
                        }
                      >
                        {line}
                      </motion.span>
                    ))
                  )}
                  {deployStatus === "building" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 flex items-center gap-3"
                    >
                      <div className="h-2 w-48 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className="h-full bg-primary"
                          animate={{ width: `${deployProgress}%` }}
                          transition={{ duration: 0.15 }}
                        />
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        Compiling... {deployProgress}%
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col bg-[#fffdf5] dark:bg-[#18181b] p-6 justify-center">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-black dark:text-white flex items-center gap-1.5">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                <Code2 className="size-4 text-primary fill-primary" />
              </motion.div>
              Live Preview
            </span>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1.5 rounded-full border-2 border-black bg-[#4ade80] px-2.5 py-0.5 shadow-[1.5px_1.5px_0px_0px_#000000]"
            >
              <span className="size-2 rounded-full bg-black animate-pulse" />
              <span className="text-[10px] font-black uppercase text-black">
                Active
              </span>
            </motion.div>
          </div>

          <div className="min-h-[250px] flex flex-col justify-center items-center rounded-xl border-3 border-black bg-white dark:bg-[#27272a] p-6 shadow-[5px_5px_0px_0px_#000000]">
            <AnimatePresence mode="wait">
              {activeTab === "html" && (
                <motion.div
                  key="html-preview"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-xs flex flex-col gap-4 text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    className={`group relative overflow-hidden rounded-xl border-3 border-black p-5 text-left transition-all ${
                      cardTheme === "purple"
                        ? "bg-[#ff5b79]/15 shadow-[5px_5px_0px_0px_#ff5b79]"
                        : cardTheme === "emerald"
                          ? "bg-[#4ade80]/20 shadow-[5px_5px_0px_0px_#4ade80]"
                          : cardTheme === "amber"
                            ? "bg-[#ffde59]/25 shadow-[5px_5px_0px_0px_#ffde59]"
                            : "bg-[#38bdf8]/20 shadow-[5px_5px_0px_0px_#38bdf8]"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <Badge
                        className={
                          cardTheme === "purple"
                            ? "bg-primary text-black border-2 border-black"
                            : cardTheme === "emerald"
                              ? "bg-[#4ade80] text-black border-2 border-black"
                              : cardTheme === "amber"
                                ? "bg-[#ffde59] text-black border-2 border-black"
                                : "bg-[#38bdf8] text-black border-2 border-black"
                        }
                        variant="outline"
                      >
                        Topik Baru
                      </Badge>
                      <span className="text-[10px] font-mono font-bold text-black dark:text-white">
                        Materi #1
                      </span>
                    </div>
                    <h4 className="font-heading font-black text-foreground text-base">
                      Belajar HTML & CSS
                    </h4>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-normal">
                      Rancang layout responsive menggunakan CSS Flexbox & Grid
                      dengan mudah.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`mt-4 w-full rounded-xl py-2 text-xs font-semibold text-white shadow-sm transition-all ${
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
                    </motion.button>
                  </motion.div>

                  <div className="flex flex-col items-center gap-2 mt-2">
                    <span className="text-[10px] font-medium text-muted-foreground">
                      Ubah Tema CSS (Live):
                    </span>
                    <div className="flex gap-2">
                      {[
                        { id: "purple", color: "bg-primary border-primary/30" },
                        {
                          id: "emerald",
                          color: "bg-emerald-500 border-emerald-500/30",
                        },
                        {
                          id: "amber",
                          color: "bg-amber-500 border-amber-500/30",
                        },
                        { id: "blue", color: "bg-blue-500 border-blue-500/30" },
                      ].map((theme) => (
                        <motion.button
                          key={theme.id}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            setCardTheme(
                              theme.id as
                                | "purple"
                                | "emerald"
                                | "amber"
                                | "blue",
                            )
                          }
                          aria-label={`Ubah tema ke ${theme.id}`}
                          className={`size-6 rounded-full border-2 transition-transform ${theme.color} ${
                            cardTheme === theme.id
                              ? "ring-2 ring-foreground/20 scale-110"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "js" && (
                <motion.div
                  key="js-preview"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-xs flex flex-col items-center text-center gap-4"
                >
                  <motion.div
                    animate={{ scale: jsCount > 0 ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center size-24 rounded-2xl bg-muted/40 border border-border/40 mb-2"
                  >
                    <motion.span
                      key={jsCount}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl font-extrabold font-mono tracking-tight text-foreground"
                    >
                      {jsCount}
                    </motion.span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">
                      Clicks
                    </span>
                  </motion.div>

                  <div className="flex gap-2 w-full">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1"
                    >
                      <Button
                        onClick={() => setJsCount(jsCount + 1)}
                        className="w-full rounded-xl font-medium shadow-sm transition-all hover:shadow"
                      >
                        Klik Saya! 👆
                      </Button>
                    </motion.div>
                    {jsCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          onClick={() => setJsCount(0)}
                          size="icon"
                          className="rounded-xl border-border/60 hover:bg-muted"
                          aria-label="Reset Click Counter"
                        >
                          <RefreshCw className="size-4 text-muted-foreground" />
                        </Button>
                      </motion.div>
                    )}
                  </div>

                  <motion.p
                    key={jsCount}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-muted-foreground font-medium min-h-[20px]"
                  >
                    {jsCount === 0 && "Coba klik tombol di atas! ✨"}
                    {jsCount > 0 &&
                      jsCount < 5 &&
                      "Mantap! Tambah lagi kliknya..."}
                    {jsCount >= 5 &&
                      jsCount < 10 &&
                      "Gokil! Fungsi JavaScript-mu berjalan sempurna! ⚡"}
                    {jsCount >= 10 &&
                      "Luar biasa! Kamu pemrogram berbakat! 🎉💻"}
                  </motion.p>
                </motion.div>
              )}

              {activeTab === "react" && (
                <motion.div
                  key="react-preview"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-xs flex flex-col gap-4"
                >
                  <div className="rounded-xl border border-border/40 bg-muted/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-foreground">
                        Progress Belajar
                      </span>
                      <motion.span
                        key={progressPercent}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-xs font-bold text-primary"
                      >
                        {progressPercent}% Selesai
                      </motion.span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted/80 border border-border/10">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
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
                      <motion.label
                        key={item.key}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-2.5 text-xs font-medium text-foreground cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={
                            checklist[item.key as keyof typeof checklist]
                          }
                          onChange={(e) =>
                            setChecklist((prev) => ({
                              ...prev,
                              [item.key]: e.target.checked,
                            }))
                          }
                          className="rounded border-border text-primary focus:ring-primary size-4 accent-primary"
                        />
                        <motion.span
                          animate={
                            checklist[item.key as keyof typeof checklist]
                              ? { opacity: 0.5 }
                              : { opacity: 1 }
                          }
                          className={
                            checklist[item.key as keyof typeof checklist]
                              ? "line-through text-muted-foreground"
                              : "text-foreground"
                          }
                        >
                          {item.label}
                        </motion.span>
                      </motion.label>
                    ))}
                  </div>

                  <motion.p
                    key={progressPercent}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] text-center text-muted-foreground min-h-[16px]"
                  >
                    {progressPercent === 100 ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-emerald-500 font-semibold flex items-center justify-center gap-1"
                      >
                        <Sparkles className="size-3" /> Selamat! Bab Selesai! 🎓
                      </motion.span>
                    ) : (
                      "Tandai item di atas untuk simulasi belajar!"
                    )}
                  </motion.p>
                </motion.div>
              )}

              {activeTab === "deploy" && (
                <motion.div
                  key="deploy-preview"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-xs flex flex-col items-center text-center gap-4"
                >
                  {deployStatus === "idle" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center p-6 border border-dashed border-border/60 rounded-2xl w-full bg-muted/5"
                    >
                      <CloudUpload className="size-10 text-muted-foreground mb-2" />
                      <h5 className="text-xs font-semibold text-foreground">
                        Siap Rilis ke Publik
                      </h5>
                      <p className="text-[10px] text-muted-foreground mt-1 max-w-[180px]">
                        Deploy karyamu ke server Vercel instan agar bisa diakses
                        temanmu.
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={handleRunDeploy}
                          size="sm"
                          className="mt-4 rounded-xl text-xs font-semibold flex items-center gap-1"
                        >
                          <Play className="size-3 fill-current" /> Jalankan
                          Deploy
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}

                  {deployStatus === "building" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center p-6 rounded-2xl w-full"
                    >
                      <RefreshCw className="size-8 text-primary animate-spin mb-3" />
                      <h5 className="text-xs font-semibold text-foreground">
                        Sedang Membangun...
                      </h5>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Mengompilasi file TypeScript & JSX...
                      </p>
                    </motion.div>
                  )}

                  {deployStatus === "deploying" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center p-6 rounded-2xl w-full"
                    >
                      <Globe className="size-8 text-blue-500 animate-pulse mb-3" />
                      <h5 className="text-xs font-semibold text-foreground">
                        Mempublikasikan...
                      </h5>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Mengekspor halaman statis ke server...
                      </p>
                    </motion.div>
                  )}

                  {deployStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center p-4 border border-emerald-500/20 rounded-2xl w-full bg-emerald-500/[0.02]"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="flex size-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 mb-2"
                      >
                        <Check className="size-5" />
                      </motion.span>
                      <h5 className="text-xs font-bold text-foreground">
                        Website Berhasil Online!
                      </h5>
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
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          onClick={handleResetDeploy}
                          size="sm"
                          className="mt-3 rounded-xl text-[10px] px-3 h-7 border-border/50"
                        >
                          Reset Simulasi
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function RoadmapVisualizer() {
  const [selectedStage, setSelectedStage] = useState<string>("dasar");
  const currentStage =
    roadmapStages.find((s) => s.id === selectedStage) || roadmapStages[0];
  const StageIcon = currentStage.icon;

  return (
    <motion.div
      id="roadmap"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="mx-auto w-full max-w-6xl px-4 py-24 sm:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs">
            Kurikulum Terstruktur
          </Badge>
        </motion.div>
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Alur Belajar Dari Nol Sampai Siap
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
          Kami menyusun kurikulum ini khusus untuk pemula. Pelajari materi
          berurutan, selesaikan latihan, dan kumpulkan portofolio nyata.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-12 items-start mt-12">
        <div className="lg:col-span-5 flex flex-col gap-3.5">
          <span className="text-xs font-black text-black dark:text-white uppercase tracking-widest pl-1 mb-1">
            Pilih Langkah Belajar:
          </span>
          {roadmapStages.map((stage, index) => {
            const Icon = stage.icon;
            const isSelected = stage.id === selectedStage;
            return (
              <motion.button
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedStage(stage.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-4 text-left p-4 rounded-xl border-3 border-black transition-all ${
                  isSelected
                    ? "bg-[#ffde59] text-black shadow-[5px_5px_0px_0px_#000000] -translate-x-0.5 -translate-y-0.5"
                    : "bg-white text-black hover:bg-neutral-50 shadow-[3px_3px_0px_0px_#000000]"
                }`}
              >
                <motion.span
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`flex size-11 shrink-0 items-center justify-center rounded-lg border-2 border-black ${
                    isSelected
                      ? "bg-black text-white"
                      : "bg-[#ff5b79] text-black"
                  }`}
                >
                  <Icon className="size-5 stroke-[2.5]" />
                </motion.span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-black text-black">
                      {stage.title}
                    </span>
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="text-[10px] font-black uppercase tracking-wider rounded border-2 border-black bg-white px-2 py-0.5 text-black shadow-[1.5px_1.5px_0px_0px_#000000]"
                    >
                      {stage.badge}
                    </motion.span>
                  </div>
                  <span className="text-xs font-semibold text-neutral-700 line-clamp-1 mt-0.5">
                    {stage.desc}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 relative"
        >
          <motion.div
            key={selectedStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border-3 border-black bg-white dark:bg-[#202024] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000000]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-black pb-5 mb-5">
              <div className="flex items-center gap-3">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="flex size-12 items-center justify-center rounded-lg border-2 border-black bg-[#ff5b79] text-black shadow-[2px_2px_0px_0px_#000000]"
                >
                  <StageIcon className="size-6 stroke-[2.5]" />
                </motion.span>
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-black text-foreground">
                    Detail Alur: {currentStage.title.split(". ")[1]}
                  </h3>
                  <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <ClockIcon className="size-3.5 stroke-[2.5]" />{" "}
                    {currentStage.stats}
                  </span>
                </div>
              </div>
              <Badge
                className="bg-[#4ade80] text-black border-2 border-black"
                variant="outline"
              >
                Ready To Learn
              </Badge>
            </div>

            <p className="text-sm sm:text-base font-medium leading-relaxed text-foreground mb-6">
              {currentStage.desc}
            </p>

            <div className="space-y-4">
              <h4 className="text-xs font-black text-foreground uppercase tracking-widest flex items-center gap-1.5">
                <CheckSquare className="size-4 stroke-[2.5] text-black" /> Yang
                Akan Kamu Pelajari:
              </h4>
              <div className="grid gap-2.5 sm:grid-cols-1">
                {currentStage.materi.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3.5 rounded-lg border-2 border-black bg-[#f4efe2] dark:bg-[#27272a] shadow-[2px_2px_0px_0px_#000000]"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded border-2 border-black bg-[#ffde59] text-black font-mono text-xs font-black">
                      {i + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-foreground">
                      {m}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-3 border-black flex flex-wrap gap-4 items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground">
                Akses gratis selamanya, belajar kapan saja.
              </span>
              <Button
                asChild
                size="default"
                className="bg-primary text-black border-2 border-black shadow-[3px_3px_0px_0px_#000000] font-black uppercase"
              >
                <Link href="/start">
                  Mulai Kelas Ini
                  <ArrowRight className="ml-1.5 size-4 stroke-[2.5]" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
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
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[10%] text-primary/15 font-mono text-4xl select-none"
      >
        {"{"}
      </motion.div>
      <motion.div
        animate={{ y: [0, -25, 0], rotate: [0, -5, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-[25%] right-[12%] text-blue-500/20 font-mono text-5xl select-none"
      >
        {"<>"}
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[25%] left-[15%] text-violet-500/15 font-mono text-3xl select-none"
      >
        {"#"}
      </motion.div>
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute top-[45%] left-[8%] text-emerald-500/15 font-mono text-4xl select-none"
      >
        {"();"}
      </motion.div>
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[35%] right-[15%] text-amber-500/15 font-mono text-6xl select-none"
      >
        {"*"}
      </motion.div>
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, -8, 0] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute top-[60%] right-[8%] text-rose-500/10 font-mono text-3xl select-none"
      >
        {"$"}
      </motion.div>
    </div>
  );
}

export default function HomeContent() {
  return (
    <>
      {/* Crazy Neobrutalism Running Marquee Banner */}
      <div className="relative w-full overflow-hidden border-b-3 border-black bg-[#ffde59] py-2 text-black font-mono font-black text-xs uppercase tracking-widest select-none z-30 shadow-[0_4px_0_0_#000000]">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span>⚡ BELAJAR CODING DARI NOL HINGGA DEPLOY!</span>
          <span>★ 100% GRATIS TANPA RIBET</span>
          <span>💻 HTML · CSS · JAVASCRIPT · REACT · NEXT.JS · SUPABASE</span>
          <span>🚀 SIAPKAN PORTOFOLIO & KERJA NYATA!</span>
          <span>⚡ BELAJAR CODING DARI NOL HINGGA DEPLOY!</span>
          <span>★ 100% GRATIS TANPA RIBET</span>
          <span>💻 HTML · CSS · JAVASCRIPT · REACT · NEXT.JS · SUPABASE</span>
          <span>🚀 SIAPKAN PORTOFOLIO & KERJA NYATA!</span>
          <span>⚡ BELAJAR CODING DARI NOL HINGGA DEPLOY!</span>
          <span>★ 100% GRATIS TANPA RIBET</span>
          <span>💻 HTML · CSS · JAVASCRIPT · REACT · NEXT.JS · SUPABASE</span>
          <span>🚀 SIAPKAN PORTOFOLIO & KERJA NYATA!</span>
          <span>⚡ BELAJAR CODING DARI NOL HINGGA DEPLOY!</span>
          <span>★ 100% GRATIS TANPA RIBET</span>
          <span>💻 HTML · CSS · JAVASCRIPT · REACT · NEXT.JS · SUPABASE</span>
          <span>🚀 SIAPKAN PORTOFOLIO & KERJA NYATA!</span>
        </div>
      </div>

      <AnimatedBackground />

      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        <FloatingSymbols />
        <div className="mx-auto w-full max-w-6xl px-4 relative">
          {/* Crazy Floating Neobrutalist Stickers */}
          <motion.div
            animate={{ rotate: [-8, -6, -8], y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="hidden lg:block absolute -top-12 left-4 z-20"
          >
            <div className="rounded-lg border-3 border-black bg-[#4deeea] px-3.5 py-1.5 font-black text-xs uppercase tracking-wider text-black shadow-[4px_4px_0px_0px_#000000]">
              🔥 GRATIS 100%
            </div>
          </motion.div>
          <motion.div
            animate={{ rotate: [10, 12, 10], y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            className="hidden lg:block absolute -top-8 right-6 z-20"
          >
            <div className="rounded-lg border-3 border-black bg-[#ff5b79] px-3.5 py-1.5 font-black text-xs uppercase tracking-wider text-black shadow-[4px_4px_0px_0px_#000000]">
              ✨ PEMULA FRIENDLY!
            </div>
          </motion.div>
          <motion.div
            animate={{ rotate: [-6, -4, -6], y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
            className="hidden xl:block absolute top-72 -right-4 z-20"
          >
            <div className="rounded-lg border-3 border-black bg-[#4ade80] px-4 py-2 font-mono font-black text-xs text-black shadow-[5px_5px_0px_0px_#000000]">
              npm run build: SUCCESS 🚀
            </div>
          </motion.div>

          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-md border-2 border-black bg-[#ffde59] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-black shadow-[3px_3px_0px_0px_#000000]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inline-flex h-full w-full rounded-full bg-black"
                />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff5b79] border border-black" />
              </span>
              Platform Belajar Coding #1 Bahasa Indonesia 🇮🇩
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl font-black tracking-tight text-foreground sm:text-6xl/tight lg:text-7xl/tight text-balance"
            >
              Belajar Coding Tanpa Pusing
              <br />
              <motion.span
                whileHover={{ rotate: [0, -2, 2, 0] }}
                transition={{ duration: 0.3 }}
                className="inline-block mt-2 rounded-lg border-3 border-black bg-[#ff5b79] px-4 py-1 text-black shadow-[6px_6px_0px_0px_#000000] rotate-[-1deg]"
              >
                Dari Nol! 🚀
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-8 max-w-2xl text-base sm:text-lg font-medium leading-relaxed text-foreground"
            >
              Sinau Coding adalah platform belajar pemrograman gratis yang
              disusun runut, visual, dan praktis. Tanpa latar belakang IT pun,
              kamu dipandu langkah demi langkah sampai mempublikasikan website
              karyamu ke internet.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-black border-3 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 text-sm sm:text-base font-black uppercase tracking-wider"
                >
                  <Link href="/register">
                    <span>Mulai Belajar — Gratis</span>
                    <ArrowRight className="ml-2 size-5 stroke-[2.5]" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white text-black border-3 border-black shadow-[4px_4px_0px_0px_#000000] hover:bg-[#ffde59] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 text-sm sm:text-base font-black uppercase tracking-wider"
                >
                  <Link href="#roadmap">
                    <span>Lihat Alur Belajar 🧭</span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-14 flex flex-col items-center justify-center gap-3.5 max-w-3xl mx-auto"
            >
              <span className="text-lg font-black text-black dark:text-white mr-1 uppercase tracking-wider font-mono">
                Materi Yang Tersedia
              </span>
              <div className="flex flex-row flex-wrap items-center justify-center gap-2.5">
                {techStack.map((tech, index) => {
                  const Icon = tech.icon;
                  return (
                    <motion.span
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="flex items-center gap-1.5 rounded-md border-2 border-black bg-white px-3.5 py-1.5 font-mono text-xs font-black text-black shadow-[2px_2px_0px_0px_#000000] hover:bg-[#ffde59] hover:shadow-[3px_3px_0px_0px_#000000] transition-all cursor-default"
                    >
                      <Icon className="size-3.5 stroke-[2.5]" />
                      {tech.name}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <CodePlayground />
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative border-y-3 border-black bg-[#ffde59] text-black"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              {
                value: "50+",
                label: "Modul Praktis",
                icon: Layers,
                desc: "Runtut & terstruktur",
              },
              {
                value: "11",
                label: "Teknologi Utama",
                icon: Braces,
                desc: "Sesuai kebutuhan industri",
              },
              {
                value: "100%",
                label: "Gratis Selamanya",
                icon: Rocket,
                desc: "Cukup buat akun saja",
              },
              {
                value: "24/7",
                label: "Akses Mandiri",
                icon: Laptop,
                desc: "Belajar kapan saja",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center gap-2 text-center rounded-xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] transition-all cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="flex size-11 items-center justify-center rounded-lg border-2 border-black bg-[#ff5b79] text-black shadow-[2px_2px_0px_0px_#000000]"
                >
                  <stat.icon className="size-5.5 stroke-[2.5]" />
                </motion.div>
                <div className="flex flex-col">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="text-3xl font-black tracking-tight text-black"
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-xs font-black text-black uppercase tracking-wide mt-0.5">
                    {stat.label}
                  </span>
                  <span className="text-[11px] font-bold text-neutral-600 mt-0.5">
                    {stat.desc}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <RoadmapVisualizer />

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative border-t-3 border-black bg-[#fffdf5] dark:bg-[#18181b]"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className="mb-3 inline-block rounded border-2 border-black bg-[#4ade80] px-3 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_0px_#000000]">
              Sistem Belajar
            </span>
            <h2 className="font-heading text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Belajar Efektif dalam 4 Langkah
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm sm:text-base font-medium">
              Kami merancang platform ini dengan sistem belajar mandiri yang
              fokus pada praktek, bukan sekadar membaca teori.
            </p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                icon: FolderOpen,
                title: "Pilih Topik Belajar",
                description:
                  "Mulai dari HTML/CSS dasar atau langsung loncat ke topik yang kamu inginkan dari curriculum roadmap.",
                bg: "bg-[#ff5b79]",
              },
              {
                step: "02",
                icon: BookOpen,
                title: "Pahami Konsep & Praktek",
                description:
                  "Setiap materi dilengkapi penjelasan bergambar dan contoh potongan kode interaktif siap uji.",
                bg: "bg-[#ffde59]",
              },
              {
                step: "03",
                icon: CircleCheck,
                title: "Tandai Progress Selesai",
                description:
                  "Simpan kemajuan belajarmu secara otomatis di akun pribadimu dan pantau grafik progresmu di dashboard.",
                bg: "bg-[#38bdf8]",
              },
              {
                step: "04",
                icon: Rocket,
                title: "Build & Upload Karyamu",
                description:
                  "Gabungkan semua bab, selesaikan mini project nyata, dan deploy website pertamamu online ke internet.",
                bg: "bg-[#4ade80]",
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -8 }}
                  className="h-full flex flex-col rounded-xl border-3 border-black bg-white dark:bg-[#202024] p-6 shadow-[5px_5px_0px_0px_#000000] hover:shadow-[7px_7px_0px_0px_#000000] transition-all cursor-pointer"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <motion.span
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`flex size-12 items-center justify-center rounded-lg border-2 border-black ${step.bg} text-black shadow-[2px_2px_0px_0px_#000000]`}
                    >
                      <step.icon className="size-6 stroke-[2.5]" />
                    </motion.span>
                    <span className="font-mono text-2xl font-black text-neutral-300 dark:text-neutral-700">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-black text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground flex-1 font-medium">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-y-3 border-black bg-[#f4efe2] dark:bg-[#18181b]"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className="mb-3 inline-block rounded border-2 border-black bg-[#ff5b79] px-3 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_0px_#000000]">
              Kecocokan Belajar
            </span>
            <h2 className="font-heading text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Didesain Ramah untuk Semua Kalangan
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm sm:text-base font-medium">
              Kamu tidak butuh bakat khusus matematika atau logika rumit.
              Kurikulum kami disusun berurutan agar siapa pun bisa paham koding
              sejak hari pertama.
            </p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-3">
            {audiences.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="rounded-xl border-3 border-black bg-white dark:bg-[#202024] p-7 shadow-[6px_6px_0px_0px_#000000] hover:shadow-[8px_8px_0px_0px_#000000] transition-all cursor-pointer"
              >
                <div className="mb-5 flex items-center justify-between">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`flex size-12 items-center justify-center rounded-lg border-2 border-black ${
                      idx === 0
                        ? "bg-[#4ade80]"
                        : idx === 1
                          ? "bg-[#38bdf8]"
                          : "bg-[#c084fc]"
                    } text-black shadow-[2px_2px_0px_0px_#000000]`}
                  >
                    <item.icon className="size-6 stroke-[2.5]" />
                  </motion.div>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="rounded border-2 border-black bg-[#ffde59] px-2.5 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[1.5px_1.5px_0px_0px_#000000]"
                  >
                    {item.badge}
                  </motion.span>
                </div>
                <h3 className="font-heading text-lg font-black text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3.5 rounded-xl border-3 border-black bg-white dark:bg-[#202024] px-6 py-5 shadow-[4px_4px_0px_0px_#000000]"
          >
            {stepsFeatures.map((item, index) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-xs sm:text-sm font-black text-foreground cursor-pointer"
              >
                <CheckCircle2 className="size-4 stroke-[3] text-black shrink-0" />
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-block rounded border-2 border-black bg-[#ffde59] px-3 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_0px_#000000]">
            Keunggulan
          </span>
          <h2 className="font-heading text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Pengalaman Belajar Terbaik Bebas Hambatan
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm sm:text-base font-medium">
            Lebih dari sekadar membaca tutorial biasa. Sinau Coding menyediakan
            ekosistem terpadu agar kamu tetap termotivasi dan belajar secara
            konsisten.
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const colors = [
              "bg-[#ff5b79]",
              "bg-[#4ade80]",
              "bg-[#ffde59]",
              "bg-[#c084fc]",
              "bg-[#38bdf8]",
              "bg-[#fb923c]",
            ];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="rounded-xl border-3 border-black bg-white dark:bg-[#202024] p-7 shadow-[5px_5px_0px_0px_#000000] hover:shadow-[7px_7px_0px_0px_#000000] transition-all cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`mb-4 flex size-12 items-center justify-center rounded-lg border-2 border-black ${colors[i % colors.length]} text-black shadow-[2px_2px_0px_0px_#000000]`}
                >
                  <Icon className="size-6 stroke-[2.5]" />
                </motion.div>
                <h3 className="font-heading text-base font-black text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground font-medium">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto w-full max-w-3xl px-4 py-20 sm:py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-block rounded border-2 border-black bg-[#38bdf8] px-3 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_0px_#000000]">
            Pertanyaan Umum
          </span>
          <h2 className="font-heading text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Ada Pertanyaan? Kami Punya Jawaban
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed text-sm sm:text-base font-medium">
            Masih ragu untuk mulai belajar koding? Baca FAQ di bawah ini atau
            hubungi admin di komunitas.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border-3 border-black bg-white dark:bg-[#202024] px-6 sm:px-8 py-3 shadow-[6px_6px_0px_0px_#000000]"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto w-full max-w-5xl px-4 pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="rounded-2xl border-4 border-black bg-[#ffde59] p-8 text-center text-black shadow-[10px_10px_0px_0px_#000000] sm:p-16"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mx-auto mb-6 flex size-16 items-center justify-center rounded-xl border-3 border-black bg-white text-black shadow-[3px_3px_0px_0px_#000000]"
          >
            <Rocket className="size-8 stroke-[2.5]" />
          </motion.div>
          <h2 className="font-heading text-3xl font-black tracking-tight sm:text-5xl uppercase">
            Siap Memulai Perjalanan Coding Kamu?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm sm:text-base font-bold leading-relaxed text-neutral-800">
            Setiap programer handal kelas dunia selalu memulai karier mereka
            dari menulis baris kode pertama. Hari ini giliranmu untuk melangkah
            maju!
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-black text-white hover:bg-neutral-800 border-3 border-black shadow-[4px_4px_0px_0px_#ffffff] font-black uppercase text-sm sm:text-base px-8 h-12"
              >
                <Link href="/register">
                  Buat Akun Gratis Sekarang
                  <ArrowRight className="ml-2 size-5 stroke-[2.5]" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          <p className="mt-6 text-xs font-black text-black uppercase tracking-wider">
            100% Gratis selamanya · Tidak butuh kartu kredit · Akses sepuasnya
          </p>
        </motion.div>
      </motion.section>
    </>
  );
}
