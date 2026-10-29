"use client";

import * as React from "react";
import { Camera, UserRound } from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export default function AccountSettingsPage() {
    const [user, setUser] = React.useState<User | null>(null);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [avatarUrl, setAvatarUrl] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [loadingUser, setLoadingUser] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [message, setMessage] = React.useState<string | null>(null);

    React.useEffect(() => {
        let active = true;

        async function loadUser() {
            const supabase = createClient();
            const { data, error: userError } = await supabase.auth.getUser();
            if (!active) return;

            if (userError || !data.user) {
                setError(userError?.message ?? "Sesi akun tidak ditemukan. Silakan masuk kembali.");
                setLoadingUser(false);
                return;
            }

            const currentUser = data.user;
            const metadata = currentUser.user_metadata;
            setUser(currentUser);
            setName(
                (typeof metadata.full_name === "string" && metadata.full_name) ||
                (typeof metadata.name === "string" && metadata.name) ||
                "",
            );
            setEmail(currentUser.email ?? "");
            setAvatarUrl(
                (typeof metadata.avatar_url === "string" && metadata.avatar_url) ||
                (typeof metadata.picture === "string" && metadata.picture) ||
                "",
            );
            setLoadingUser(false);
        }

        void loadUser();
        return () => {
            active = false;
        };
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setMessage(null);

        if (!user) {
            setError("Sesi akun tidak ditemukan. Silakan masuk kembali.");
            return;
        }

        if (!name.trim()) {
            setError("Nama tidak boleh kosong.");
            return;
        }

        if (avatarUrl.trim()) {
            try {
                const parsedAvatarUrl = new URL(avatarUrl.trim());
                if (parsedAvatarUrl.protocol !== "https:" && parsedAvatarUrl.protocol !== "http:") {
                    setError("URL avatar harus menggunakan HTTP atau HTTPS.");
                    return;
                }
            } catch {
                setError("Masukkan URL avatar yang valid.");
                return;
            }
        }

        if (password && password.length < 6) {
            setError("Password baru minimal 6 karakter.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Konfirmasi password tidak cocok.");
            return;
        }

        setSaving(true);
        const supabase = createClient();
        const emailChanged = email.trim() !== (user.email ?? "");
        const attributes: {
            data: { full_name: string; avatar_url: string | null };
            email?: string;
            password?: string;
        } = {
            data: {
                full_name: name.trim(),
                avatar_url: avatarUrl.trim() || null,
            },
        };

        if (emailChanged) attributes.email = email.trim();
        if (password) attributes.password = password;

        const { data, error: updateError } = await supabase.auth.updateUser(attributes);
        setSaving(false);

        if (updateError) {
            setError(updateError.message);
            return;
        }

        if (data.user) setUser(data.user);
        setPassword("");
        setConfirmPassword("");
        setMessage(
            emailChanged
                ? "Profil tersimpan. Periksa email baru untuk mengonfirmasi perubahan alamat email."
                : "Pengaturan akun berhasil disimpan.",
        );
    }

    return (
        <main className="mx-auto w-full max-w-3xl px-4 py-10 lg:py-14">
            <div className="mb-8">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                    Akun
                </p>
                <h1 className="font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">
                    Pengaturan Akun
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Perbarui nama, email, password, dan avatar akunmu.
                </p>
            </div>

            <Card className="border-3 border-black bg-white shadow-[6px_6px_0px_0px_#000000] dark:bg-[#202024]">
                <CardHeader className="border-b-2 border-black bg-[#ffde59]">
                    <CardTitle className="font-black uppercase text-black">Profil dan keamanan</CardTitle>
                    <CardDescription className="font-medium text-neutral-800">
                        Perubahan disimpan ke akun Supabase yang sedang digunakan.
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-6 py-6 sm:px-8">
                    {loadingUser ? (
                        <p className="text-sm text-muted-foreground">Memuat pengaturan akun...</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="grid gap-6">
                            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                                <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-3 border-black bg-[#ffde59] shadow-[3px_3px_0px_0px_#000000]">
                                    {avatarUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={avatarUrl} alt="Preview avatar akun" className="size-full object-cover" />
                                    ) : (
                                        <UserRound className="size-9" />
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="avatar-url" className="flex items-center gap-2 text-xs font-black uppercase tracking-wider">
                                        <Camera className="size-4" /> URL Avatar
                                    </label>
                                    <Input
                                        id="avatar-url"
                                        type="url"
                                        placeholder="https://contoh.com/avatar.jpg"
                                        value={avatarUrl}
                                        onChange={event => setAvatarUrl(event.target.value)}
                                        autoComplete="url"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Tempel tautan gambar publik. Avatar Google/GitHub akan digunakan jika tautan ini dikosongkan.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="full-name" className="text-xs font-black uppercase tracking-wider">Nama</label>
                                <Input
                                    id="full-name"
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                    placeholder="Nama kamu"
                                    autoComplete="name"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="account-email" className="text-xs font-black uppercase tracking-wider">Email / Gmail</label>
                                <Input
                                    id="account-email"
                                    type="email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    placeholder="nama@gmail.com"
                                    autoComplete="email"
                                    required
                                />
                                <p className="text-xs text-muted-foreground">
                                    Supabase mungkin meminta konfirmasi melalui email baru sebelum perubahan berlaku.
                                </p>
                            </div>

                            <div className="grid gap-4 rounded-xl border-2 border-black bg-muted/30 p-4">
                                <div>
                                    <h2 className="text-sm font-black uppercase tracking-wider">Ubah password</h2>
                                    <p className="mt-1 text-xs text-muted-foreground">Kosongkan jika tidak ingin mengubah password.</p>
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="new-password" className="text-xs font-bold">Password baru</label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        value={password}
                                        onChange={event => setPassword(event.target.value)}
                                        autoComplete="new-password"
                                        minLength={6}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="confirm-password" className="text-xs font-bold">Konfirmasi password baru</label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={event => setConfirmPassword(event.target.value)}
                                        autoComplete="new-password"
                                        minLength={6}
                                    />
                                </div>
                            </div>

                            {error && (
                                <p role="alert" className="rounded-lg border-2 border-black bg-[#ff5b79] px-3 py-2.5 text-sm font-bold text-black">
                                    {error}
                                </p>
                            )}
                            {message && (
                                <p role="status" className="rounded-lg border-2 border-black bg-[#4ade80] px-3 py-2.5 text-sm font-bold text-black">
                                    {message}
                                </p>
                            )}

                            <Button type="submit" className="w-full sm:w-auto" disabled={saving || !user}>
                                {saving ? "Menyimpan..." : "Simpan Pengaturan"}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
