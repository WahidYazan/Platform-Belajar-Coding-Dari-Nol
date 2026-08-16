import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./src/lib/supabase/middleware";

const PUBLIC_PATHS = ["/", "/login", "/register", "/api", "/auth", "/favicon.ico", "/robots.txt", "/sitemap.xml"];

function isPublic(pathname: string) {
    if (pathname.startsWith("/_next") || pathname.startsWith("/static") || pathname.startsWith("/public")) return true;
    return PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p + "/"));
}

export async function middleware(request: NextRequest) {
    const { supabaseResponse, user } = await updateSession(request);

    const pathname = new URL(request.url).pathname;

    // Allow public assets and pages
    if (isPublic(pathname)) {
        return supabaseResponse;
    }

    // If no user, redirect to home
    if (!user) {
        const url = new URL("/", request.url);
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}

export const config = {
    matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
