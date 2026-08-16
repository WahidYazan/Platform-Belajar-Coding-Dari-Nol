import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "Sinau Coding Belajar Coding dari Nol",
        template: "%s Sinau Coding",
    },
    description:
        "Roadmap belajar coding lengkap dari nol dalam Bahasa Indonesia: HTML, CSS, JavaScript, React, backend, hingga deployment. Mulai dari mana dan ke mana arahmu, semua di sini.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
