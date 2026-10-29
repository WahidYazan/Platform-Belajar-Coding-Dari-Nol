"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
    const router = useRouter();
    const [loading, setLoading] = React.useState<Provider | null>(null);

    async function handleOAuth(provider: Provider) {
        setLoading(provider);

        const supabase = createClient();
        const redirectTo = new URL("/auth/callback", canonicalOrigin());
        redirectTo.searchParams.set("next", next);

        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: { redirectTo: redirectTo.toString() },
        });

        if (error) {
            const url = new URL("/login", window.location.origin);
            url.searchParams.set("error", error.message);
            router.replace(url.toString());
            setLoading(null);
            return;
        }
    }

    return (
        <div className="grid gap-3">
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