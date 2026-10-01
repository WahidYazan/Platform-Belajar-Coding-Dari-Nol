import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { AlertCircle, Braces, CheckCircle2, Database, Plug, Table2, XCircle } from "lucide-react";

type ErrorLike = {
    message?: unknown;
    code?: unknown;
    details?: unknown;
    hint?: unknown;
    cause?: unknown;
};

function text(value: unknown): string | null {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

function describeError(error: unknown): string {
    if (error instanceof Error) {
        const cause = (error as ErrorLike).cause;
        const causeMessage =
            cause instanceof Error
                ? cause.message
                : (text(cause) ?? text((cause as ErrorLike | null)?.message));
        return causeMessage
            ? `${error.message} — ${causeMessage}`
            : error.message;
    }

    if (error && typeof error === "object") {
        const { message, code, details, hint } = error as ErrorLike;
        const parts = [
            text(message) ?? JSON.stringify(error),
            text(code) ? `code=${text(code)}` : null,
            text(details) ? `details=${text(details)}` : null,
            text(hint) ? `hint=${text(hint)}` : null,
        ].filter((part): part is string => part !== null);

        if (parts.length > 1) return parts.join(" — ");
        return parts[0] ?? String(error);
    }

    return String(error);
}

export default async function TestDatabase() {
    let result:
        | { status: "connected"; rowsFound: number}
        | { status: "error"; message: string };

    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("user_progress")
            .select("id")
            .limit(1);

        if (error) {
            throw error;
        }

        result = { status: "connected", rowsFound: data.length };
    } catch (error) {
        result = { status: "error", message: describeError(error) };
    }
    const connected = result.status === "connected";

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-14">
            {/* Hero */}
            <div className="relative mb-14 max-w-2xl overflow-hidden rounded-3xl border border-border/40 bg-card/60 p-8 sm:p-10">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute top-[-60%] right-[-10%] h-[250px] w-[350px] rounded-full bg-primary/[0.06] blur-[80px]" />
                </div>
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/70">
                    <Database className="size-4" />
                    Diagnostic
                </p>
                <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Koneksi Database
                </h1>
                <p className="mt-4 leading-relaxed text-muted-foreground">
            Memeriksa apakah aplikasi berhasil terhubung ke
            <code className="font-mono text-sm text-foreground/80"> Backend</code>.
                </p>
            </div>

            {/* Status */}
            <div className="mb-16">
                <h2 className="mb-6 flex items-center gap-3 font-heading text-2xl font-bold text-foreground">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Plug className="size-5" />
                    </span>
                    Hasil Pengecekan
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Card
                        className={
                            connected
                                ? "border-emerald-500/30 bg-card/80 shadow-sm"
                                : "border-destructive/30 bg-card/80 shadow-sm"
                        }
                    >
                        <CardHeader>
                            <div className="mb-1 flex items-center justify-between">
                                <span
                                    className={
                                        connected
                                            ? "flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600"
                                            : "flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive"
                                    }
                                >
                                    {connected ? (
                                        <CheckCircle2 className="size-5" />
                                    ) : (
                                        <XCircle className="size-5" />
                                    )}
                                </span>
                                <Badge
                                    variant={connected ? "default" : "destructive"}
                                    data-icon="inline-start"
                                >
                                    {connected ? (
                                        <CheckCircle2 />
                                    ) : (
                                        <XCircle />
                                    )}
                                    {connected ? "Terhubung" : "Gagal"}
                                </Badge>
                            </div>
                            <CardTitle className="font-heading text-lg font-bold">
                                Status Koneksi
                            </CardTitle>
                            <CardDescription className="leading-relaxed">
                                {connected
                                    ? "Database berhasil terhubung."
                                    : "Gagal mengecek koneksi database."}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card
                        className={
                            connected
                                ? "border-emerald-500/30 bg-card/80 shadow-sm"
                                : "border-destructive/30 bg-card/80 shadow-sm"
                        }
                    >
                        <CardHeader>
                            <div className="mb-1 flex items-center justify-between">
                                <span
                                    className={
                                        connected
                                            ? "flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600"
                                            : "flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive"
                                    }
                                >
                                    <Table2 className="size-5" />
                                </span>
                                <Badge
                                    variant={connected ? "secondary" : "destructive"}
                                    data-icon="inline-start"
                                >
                                    {connected ? <CheckCircle2 /> : <XCircle />}
                                    {connected ? "Sample" : "Gagal"}
                                </Badge>
                            </div>
                            <CardTitle className="font-heading text-lg font-bold">
                                Data Terbaca
                            </CardTitle>
                            <CardDescription className="leading-relaxed">
                                {connected && result.status === "connected"
                                    // ? `${result.rowsFound}
                                      ? `Berhasil terhubung ke backend `//user_progress.`
                                    : "Tidak ada data yang dapat dibaca karena koneksi gagal."}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
                {!connected && result.status === "error" && (
                    <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                        <AlertCircle className="mt-0.5 size-4 shrink-0" />
                        <span className="leading-relaxed break-words">{result.message}</span>
                    </div>
                )}
            </div>

            {/* Raw Details (Only shown in Development) */}
            {process.env.NODE_ENV === "development" && (
                <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 p-8 shadow-sm backdrop-blur-sm">
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute top-[-50%] right-[-10%] h-[250px] w-[350px] rounded-full bg-primary/[0.04] blur-[80px]" />
                    </div>
                    <h2 className="flex items-center gap-3 font-heading text-2xl font-bold text-foreground">
                        <span
                            className={
                                connected
                                    ? "flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600"
                                    : "flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive"
                            }
                        >
                            {connected ? <Braces className="size-5" /> : <AlertCircle className="size-5" />}
                        </span>
                        Detail Respons (Dev Only)
                    </h2>
                    <pre className="mt-4 overflow-x-auto rounded-2xl border border-border/50 bg-background/60 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
