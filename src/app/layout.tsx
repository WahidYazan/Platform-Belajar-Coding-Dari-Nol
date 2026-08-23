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
        default: "Sinau Coding",
        template: "%s · Sinau Coding",
    },
    description:
        "Platform belajar coding berbahasa Indonesia dengan roadmap yang jelas, progres tersimpan otomatis, dan tampilan yang nyaman dipakai.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
            <body className="min-h-full bg-background text-foreground">{children}</body>
        </html>
    );
}
