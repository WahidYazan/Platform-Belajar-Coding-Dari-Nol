"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

        // Jika email confirmation aktif, Supabase tidak langsung login
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
            <Card>
                <CardHeader>
                    <CardTitle className="font-heading text-2xl">Daftar Akun</CardTitle>
                    <CardDescription>
                        Buat akun gratis untuk menyimpan progres belajar per akun.
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
                                placeholder="Minimal 6 karakter"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="confirm-password" className="text-sm font-medium">
                                Konfirmasi Password
                            </label>
                            <Input
                                id="confirm-password"
                                type="password"
                                placeholder="Ulangi password"
                                value={confirmPassword}
                                onChange={event => setConfirmPassword(event.target.value)}
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        {error && (
                            <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                                {error}
                            </p>
                        )}
                        {info && (
                            <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-sm text-emerald-600">
                                {info}
                            </p>
                        )}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Memproses..." : "Daftar"}
                        </Button>
                    </form>
                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        Sudah punya akun?{" "}
                        <Link href="/login" className="font-medium text-primary hover:underline">
                            Masuk di sini
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
