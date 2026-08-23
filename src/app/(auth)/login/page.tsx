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
    const next = searchParams.get("next") ?? "/dashboard";

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
        <Card className="border-border/60 bg-background/50 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
            <CardHeader className="space-y-1 pb-6 pt-8 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight">Selamat Datang</CardTitle>
                <CardDescription className="text-sm">
                    Masuk untuk melanjutkan perjalanan codingmu
                </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="nama@contoh.com"
                            className="h-10 rounded-lg border-border/60 bg-background/50 focus:bg-background"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                                Password
                            </label>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="h-10 rounded-lg border-border/60 bg-background/50 focus:bg-background"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    {error && (
                        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                            {error}
                        </div>
                    )}
                    <Button type="submit" className="mt-2 h-10 w-full rounded-lg font-semibold" disabled={loading}>
                        {loading ? "Memproses..." : "Masuk ke Akun"}
                    </Button>
                </form>
                <div className="mt-6 text-center text-sm">
                    <span className="text-muted-foreground">Belum punya akun?</span>{" "}
                    <Link href="/register" className="font-semibold text-primary transition-colors hover:text-primary/80">
                        Daftar sekarang
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
