import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

function safeNext(value: string | null): string {
    if (!value) return "/reset-password";
    if (!value.startsWith("/") || value.startsWith("//")) return "/reset-password";
    return value;
}

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = safeNext(searchParams.get("next"));

    if (!code) {
        const url = new URL("/login", origin);
        url.searchParams.set("error", "Tautan reset tidak valid atau sudah kedaluwarsa.");
        return NextResponse.redirect(url);
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
        const url = new URL("/login", origin);
        url.searchParams.set("error", error.message);
        return NextResponse.redirect(url);
    }

    return NextResponse.redirect(new URL(next, origin));
}
