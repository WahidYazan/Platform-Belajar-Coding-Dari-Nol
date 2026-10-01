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
            <Card className="border-3 border-black bg-white dark:bg-[#202024] shadow-[8px_8px_0px_0px_#000000]">
                <CardHeader className="space-y-1 pb-6 pt-8 text-center border-b-2 border-black bg-[#ff5b79]">
                    <CardTitle className="text-2xl font-black uppercase tracking-tight text-black">Daftar Akun Baru 🚀</CardTitle>
                    <CardDescription className="text-xs font-bold text-neutral-900">
                        Mulai perjalanan codingmu hari ini, 100% gratis!
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
                                placeholder="Minimal 6 karakter"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="confirm-password" className="text-xs font-black uppercase tracking-wider text-foreground">
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
                            <div className="rounded-lg border-2 border-black bg-[#ff5b79] px-3 py-2.5 text-xs font-black text-black shadow-[2px_2px_0px_0px_#000000]">
                                {error}
                            </div>
                        )}
                        {info && (
                            <div className="rounded-lg border-2 border-black bg-[#4ade80] px-3 py-2.5 text-xs font-black text-black shadow-[2px_2px_0px_0px_#000000]">
                                {info}
                            </div>
                        )}
                        <Button type="submit" className="mt-2 h-12 w-full font-black uppercase tracking-wider" disabled={loading}>
                            {loading ? "Memproses..." : "Buat Akun Sekarang ✨"}
                        </Button>
                    </form>
                    <div className="mt-6 text-center text-sm font-medium">
                        <span className="text-muted-foreground">Sudah punya akun?</span>{" "}
                        <Link href="/login" className="font-black text-foreground underline hover:text-primary">
                            Masuk di sini
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
