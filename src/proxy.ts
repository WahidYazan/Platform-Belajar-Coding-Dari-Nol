import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
    const { supabaseResponse, user } = await updateSession(request);
    const pathname = request.nextUrl.pathname;

    if (user) {
        if (pathname === "/login" || pathname === "/register" || pathname === "/") {
            const url = request.nextUrl.clone();
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
        }
    } else {
        if (pathname === "/dashboard" || pathname === "/") {
            const url = request.nextUrl.clone();
            url.pathname = "/login";
            if (pathname === "/dashboard") {
                url.searchParams.set("next", pathname);
            }
            return NextResponse.redirect(url);
        }
    }

    return supabaseResponse;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
