"use client";

import { useProgress } from "@/hooks/progress-context";
import { tutorials } from "@/lib/tutorials";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function OverviewProgress() {
    const { completed } = useProgress();

    const total = tutorials.length;
    const done = tutorials.filter(tutorial => completed.includes(tutorial.slug)).length;
    const percentage = total === 0 ? 0 : Math.round((done / total) * 100);
    const nextTutorial = tutorials.find(tutorial => !completed.includes(tutorial.slug));

    return (
        <div className="mt-8 rounded-2xl border bg-card p-5">
            <div className="mb-3 flex items-center justify-between text-sm">
                <p className="font-medium">
                    Progres kamu:{" "}
                    <span className="font-semibold text-primary">
                        {done}/{total}
                    </span>{" "}
                    bab selesai
                </p>
                <span className="font-heading text-2xl font-semibold">{percentage}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {nextTutorial && (
                <Link
                    href={`/dashboard/tutorials/${nextTutorial.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                    <CheckCircle2 className="size-4" />
                    Lanjutkan: {nextTutorial.title}
                </Link>
            )}
            {percentage === 100 && (
                <p className="mt-4 text-sm font-medium text-emerald-600">
                    🎉 Selamat! Kamu menuntaskan seluruh bab. Buat Projectmu Sendiri Agar Skill Bisa Meningkat Lebih
                    Baik.
                </p>
            )}
        </div>
    );
}
