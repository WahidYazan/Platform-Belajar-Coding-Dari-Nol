"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
        <Card>
            <CardHeader>
                <CardTitle className="font-heading text-2xl">Masuk</CardTitle>
                <CardDescription>
                    Masuk ke akunmu untuk melanjutkan belajar dan menyimpan progres.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="nama@email.com"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">
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
                    </div>
                    {error && (
                        <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                            {error}
                        </p>
                    )}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Memproses..." : "Masuk"}
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                    Belum punya akun?{" "}
                    <Link href="/register" className="font-medium text-primary hover:underline">
                        Daftar di sini
                    </Link>
                </p>
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
