"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import * as React from "react";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const [info, setInfo] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError(null);
        setInfo(null);

        if (password.length < 6) {
            setError("Password minimal 6 karakter.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Konfirmasi password tidak cocok.");
            return;
        }

        setLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        if (!data.session) {
            setInfo(
                "Pendaftaran berhasil! Cek email kamu untuk verifikasi, lalu masuk lewat halaman login.",
            );
            setLoading(false);
            return;
        }

        router.push("/dashboard");
        router.refresh();
    }

    return (
        <div className="w-full max-w-md">
            <Card className="border-border/50 bg-card/80 shadow-xl shadow-black/[0.04] backdrop-blur-xl">
                <CardHeader className="space-y-1 pb-6 pt-8 text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight">Daftar Akun</CardTitle>
                    <CardDescription className="text-sm">
                        Mulai perjalanan codingmu hari ini
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
                                className="h-11 rounded-xl border-border/50 bg-background/50 focus:bg-background transition-colors"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Minimal 6 karakter"
                                className="h-11 rounded-xl border-border/50 bg-background/50 focus:bg-background transition-colors"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="confirm-password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                                Konfirmasi Password
                            </label>
                            <Input
                                id="confirm-password"
                                type="password"
                                placeholder="Ulangi password"
                                className="h-11 rounded-xl border-border/50 bg-background/50 focus:bg-background transition-colors"
                                value={confirmPassword}
                                onChange={event => setConfirmPassword(event.target.value)}
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        {error && (
                            <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
                                {error}
                            </div>
                        )}
                        {info && (
                            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5 text-sm text-emerald-600">
                                {info}
                            </div>
                        )}
                        <Button type="submit" className="mt-2 h-11 w-full rounded-xl font-semibold shadow-lg shadow-primary/15 transition-all hover:shadow-xl hover:shadow-primary/20" disabled={loading}>
                            {loading ? "Memproses..." : "Buat Akun Gratis"}
                        </Button>
                    </form>
                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">Sudah punya akun?</span>{" "}
                        <Link href="/login" className="font-semibold text-primary transition-colors hover:text-primary/80">
                            Masuk di sini
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
