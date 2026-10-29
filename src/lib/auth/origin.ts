const LOCAL_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(:\d+)?$/;

export function canonicalOrigin(): string {
    if (typeof window === "undefined") return "";

    const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

    if (configured && !LOCAL_ORIGIN.test(configured)) {
        return configured.replace(/\/+$/, "");
    }

    return window.location.origin;
}