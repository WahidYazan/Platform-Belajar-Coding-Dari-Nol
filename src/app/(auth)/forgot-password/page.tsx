"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { AlertCircle, CheckCircle2, MailCheck, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function ForgotPasswordPage() {
    const router = useRouter();

    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const [sent, setSent] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError(null);

        if (!email.trim()) {
            setError("Email tidak boleh kosong.");
            return;
        }

        setLoading(true);
        const supabase = createClient();
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
            redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        setSent(true);
        setLoading(false);
    }

    if (sent) {
        return (
            <div className="w-full max-w-md">
                <Card className="border-border/50 bg-card/80 shadow-xl shadow-black/[0.04] backdrop-blur-xl">
                    <CardHeader className="space-y-1 pb-6 pt-8 text-center">
                        <span className="mx-auto mb-2 flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                            <MailCheck className="size-6" />
                        </span>
                        <CardTitle className="text-2xl font-bold tracking-tight">Cek Email Kamu</CardTitle>
                        <CardDescription className="text-sm">
                            Kalau email terdaftar, kami sudah mengirim tautan untuk mengatur password baru.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 px-8 pb-8">
                        <div className="rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm text-foreground/80">
                            <span className="text-muted-foreground">Dikirim ke</span>
                            <br />
                            <span className="font-semibold text-foreground">{email.trim()}</span>
                        </div>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                            Tautan hanya berlaku beberapa menit. Kalau tidak masuk, cek folder spam atau
                            coba kirim ulang.
                        </p>
                        <Button
                            type="button"
                            variant="outline"
                            className="h-11 w-full rounded-xl font-semibold transition-colors"
                            onClick={() => {
                                setSent(false);
                                setError(null);
                            }}
                        >
                            Kirim Ulang
                        </Button>
                        <Button
                            type="button"
                            className="h-11 w-full rounded-xl font-semibold shadow-lg shadow-primary/15 transition-all hover:shadow-xl hover:shadow-primary/20"
                            onClick={() => router.push("/login")}
                        >
                            Kembali ke Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md">
            <Card className="border-border/50 bg-card/80 shadow-xl shadow-black/[0.04] backdrop-blur-xl">
                <CardHeader className="space-y-1 pb-6 pt-8 text-center">
                    <span className="mx-auto mb-2 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Send className="size-6" />
                    </span>
                    <CardTitle className="text-2xl font-bold tracking-tight">Lupa Password</CardTitle>
                    <CardDescription className="text-sm">
                        Masukkan email yang kamu pakai daftar, lalu kami kirim tautan reset password.
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
                        {error && (
                            <div className="flex items-start gap-2.5 rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
                                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                                <span className="leading-relaxed">{error}</span>
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="mt-2 h-11 w-full rounded-xl font-semibold shadow-lg shadow-primary/15 transition-all hover:shadow-xl hover:shadow-primary/20"
                            disabled={loading}
                        >
                            {loading ? "Mengirim..." : "Kirim Tautan Reset"}
                        </Button>
                    </form>
                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">Ingat passwordnya?</span>{" "}
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-1 font-semibold text-primary transition-colors hover:text-primary/80"
                        >
                            <CheckCircle2 className="size-3.5" />
                            Kembali ke Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
