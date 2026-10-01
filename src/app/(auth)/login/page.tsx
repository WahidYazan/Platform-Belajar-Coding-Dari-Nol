"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import Link from "next/link";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const rawNext = searchParams.get("next");
    // Prevent open redirect attacks (must start with / and not // or /\\)
    const next = rawNext && rawNext.startsWith("/") && !rawNext.startsWith("//") && !rawNext.startsWith("/\\")
        ? rawNext
        : "/dashboard";
    const urlError = searchParams.get("error");

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        router.push(next);
        router.refresh();
    }

    return (
        <Card className="w-full max-w-md border-3 border-black bg-white dark:bg-[#202024] shadow-[8px_8px_0px_0px_#000000]">
            <CardHeader className="space-y-1 pb-6 pt-8 text-center border-b-2 border-black bg-[#ffde59]">
                <CardTitle className="text-2xl font-black uppercase tracking-tight text-black">Selamat Datang 👋</CardTitle>
                <CardDescription className="text-xs font-bold text-neutral-800">
                    Masuk untuk melanjutkan perjalanan codingmu
                </CardDescription>
            </CardHeader>
            <CardContent className="px-8 py-8">
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-xs font-black uppercase tracking-wider text-foreground">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="nama@contoh.com"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="password" className="text-xs font-black uppercase tracking-wider text-foreground">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                        />
                            <div className="flex justify-end">
                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-bold text-foreground hover:underline"
                                >
                                    Lupa password?
                                </Link>
                            </div>
                        </div>
                        {(error || urlError) && (
                        <div className="rounded-lg border-2 border-black bg-[#ff5b79] px-3 py-2.5 text-xs font-black text-black shadow-[2px_2px_0px_0px_#000000]">
                            {error ?? urlError}
                        </div>
                    )}
                    <Button type="submit" className="mt-2 h-12 w-full font-black uppercase tracking-wider" disabled={loading}>
                        {loading ? "Memproses..." : "Masuk ke Akun 🚀"}
                    </Button>
                </form>
                <div className="mt-6 text-center text-sm font-medium">
                    <span className="text-muted-foreground">Belum punya akun?</span>{" "}
                    <Link href="/register" className="font-black text-foreground underline hover:text-primary">
                        Daftar sekarang
                    </Link>
                </div>
                <div className="mt-6 text-center text-sm">
                    {/*<span className="text-muted-foreground">Belum punya akun?</span>{" "}*/}
                    <Link href="/forgot-password" className="font-semibold text-primary transition-colors hover:text-primary/80">
                        Lupa Password
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default function LoginPage() {
    return (
        <div className="w-full max-w-md">
            <React.Suspense fallback={<div className="text-sm text-muted-foreground">Memuat...</div>}>
                <LoginForm />
            </React.Suspense>
        </div>
    );
}
