"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { AlertCircle, KeyRound, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function ResetPasswordPage() {
    const router = useRouter();

    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [checking, setChecking] = React.useState(true);
    const [hasSession, setHasSession] = React.useState(false);

    React.useEffect(() => {
        const supabase = createClient();
        supabase.auth.getSession().then(({ data }) => {
            setHasSession(Boolean(data.session));
            setChecking(false);
        });
    }, []);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError(null);

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
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        router.push("/dashboard");
        router.refresh();
    }

    if (checking) {
        return (
            <div className="w-full max-w-md">
                <Card className="border-border/50 bg-card/80 shadow-xl shadow-black/[0.04] backdrop-blur-xl">
                    <CardContent className="px-8 py-10 text-center text-sm text-muted-foreground">
                        Memeriksa tautan reset...
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!hasSession) {
        return (
            <div className="w-full max-w-md">
                <Card className="border-border/50 bg-card/80 shadow-xl shadow-black/[0.04] backdrop-blur-xl">
                    <CardHeader className="space-y-1 pb-6 pt-8 text-center">
                        <span className="mx-auto mb-2 flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                            <ShieldAlert className="size-6" />
                        </span>
                        <CardTitle className="text-2xl font-bold tracking-tight">Tautan Tidak Valid</CardTitle>
                        <CardDescription className="text-sm">
                            Tautan reset password sudah dipakai atau kedaluwarsa. Minta tautan baru untuk
                            melanjutkan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <Button
                            asChild
                            className="h-11 w-full rounded-xl font-semibold shadow-lg shadow-primary/15 transition-all hover:shadow-xl hover:shadow-primary/20"
                        >
                            <Link href="/forgot-password">Minta Tautan Baru</Link>
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
                        <KeyRound className="size-6" />
                    </span>
                    <CardTitle className="text-2xl font-bold tracking-tight">Password Baru</CardTitle>
                    <CardDescription className="text-sm">
                        Buat password baru untuk akun kamu. Setelah selesai, kamu langsung masuk.
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                                Password Baru
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
                                placeholder="Ulangi password baru"
                                className="h-11 rounded-xl border-border/50 bg-background/50 focus:bg-background transition-colors"
                                value={confirmPassword}
                                onChange={event => setConfirmPassword(event.target.value)}
                                required
                                autoComplete="new-password"
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
                            {loading ? "Menyimpan..." : "Simpan Password Baru"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
