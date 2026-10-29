import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function publicOrigin(request: Request): string {
    const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

    if (configured) {
        try {
            const url = new URL(configured);
            if (url.protocol === "https:" || url.protocol === "http:") {
                return url.origin;
            }
        } catch {
            // Fall back to the proxy headers if the configured URL is invalid.
        }
    }

    const forwardedHost = request.headers
        .get("x-forwarded-host")
        ?.split(",")[0]
        .trim();
    const forwardedProto = request.headers
        .get("x-forwarded-proto")
        ?.split(",")[0]
        .trim();

    if (
        forwardedHost &&
        (forwardedProto === "https" || forwardedProto === "http")
    ) {
        return new URL(`${forwardedProto}://${forwardedHost}`).origin;
    }

    return new URL(request.url).origin;
}

export async function POST(request: Request) {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/", publicOrigin(request)), { status: 303 });
}
