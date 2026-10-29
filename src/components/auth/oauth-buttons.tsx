"use client";

import * as React from "react";
import { siGithub, siGoogle } from "simple-icons";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { canonicalOrigin } from "@/lib/auth/origin";

type Provider = "google" | "github";

const PROVIDERS: Array<{
    id: Provider;
    label: string;
    icon: typeof siGoogle;
}> = [
    { id: "google", label: "Google", icon: siGoogle },
    { id: "github", label: "GitHub", icon: siGithub },
];

export function OAuthButtons({ next }: { next: string }) {
    const [loading, setLoading] = React.useState<Provider | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    async function handleOAuth(provider: Provider) {
        setLoading(provider);
        setError(null);

        try {
            const supabase = createClient();
            const redirectTo = new URL("/auth/callback", canonicalOrigin());
            redirectTo.searchParams.set("next", next);

            const { error: oauthError } = await supabase.auth.signInWithOAuth({
                provider,
                options: { redirectTo: redirectTo.toString() },
            });

            if (oauthError) {
                setError(oauthError.message);
                setLoading(null);
            }
        } catch (cause) {
            setError(
                cause instanceof Error
                    ? cause.message
                    : "Tidak dapat memulai login. Silakan coba lagi.",
            );
            setLoading(null);
        }
    }

    return (
        <div className="grid gap-3">
            {error && (
                <p
                    role="alert"
                    className="rounded-lg border-2 border-black bg-[#ff5b79] px-3 py-2.5 text-xs font-black text-black shadow-[2px_2px_0px_0px_#000000]"
                >
                    {error}
                </p>
            )}
            {PROVIDERS.map(({ id, label, icon }) => (
                <Button
                    key={id}
                    type="button"
                    variant="outline"
                    className="h-12 w-full bg-white font-black uppercase tracking-wider text-black dark:bg-[#2a2a30] dark:text-white"
                    onClick={() => handleOAuth(id)}
                    disabled={loading !== null}
                >
                    <svg
                        role="img"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="size-4"
                        fill={icon.hex}
                    >
                        <path d={icon.path} />
                    </svg>
                    {loading === id ? "Menghubungkan..." : `Lanjut dengan ${label}`}
                </Button>
            ))}
        </div>
    );
}
