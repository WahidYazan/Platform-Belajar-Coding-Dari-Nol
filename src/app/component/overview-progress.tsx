"use client";

import { useProgress } from "@/hooks/progress-context";
import { tutorials } from "@/lib/tutorials";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function OverviewProgress() {
    const { completed } = useProgress();

    const total = tutorials.length;
    const done = tutorials.filter(tutorial => completed.includes(tutorial.slug)).length;
    const percentage = total === 0 ? 0 : Math.round((done / total) * 100);
    const nextTutorial = tutorials.find(tutorial => !completed.includes(tutorial.slug));

    const categories = tutorials.reduce((acc, tutorial) => {
        if (!acc[tutorial.category]) {
            acc[tutorial.category] = [];
        }
        acc[tutorial.category].push(tutorial);
        return acc;
    }, {} as Record<string, typeof tutorials>);

    return (
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <Card className="lg:col-span-4 p-6 flex flex-col justify-center border-3 border-black bg-white dark:bg-[#202024] shadow-[6px_6px_0px_0px_#000000] relative overflow-hidden">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-widest rounded border-2 border-black bg-[#ffde59] px-2 py-0.5 text-black shadow-[1.5px_1.5px_0px_0px_#000000]">
                            Keseluruhan
                        </span>
                        <span className="text-3xl font-black text-foreground">{percentage}%</span>
                    </div>
                    <div className="h-4 w-full overflow-hidden rounded-md border-2 border-black bg-[#f4efe2] shadow-[2px_2px_0px_0px_#000000]">
                        <div
                            className="h-full bg-[#4ade80] transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                    <p className="text-sm font-bold text-muted-foreground">
                        <span className="font-black text-foreground">{done}</span> dari {total} materi telah diselesaikan
                    </p>
                    {nextTutorial && (
                        <Button asChild className="w-full mt-4 bg-primary text-black border-2 border-black shadow-[3px_3px_0px_0px_#000000] font-black uppercase">
                            <Link href={`/dashboard/tutorials/${nextTutorial.slug}`}>
                                Lanjutkan Belajar ⚡
                            </Link>
                        </Button>
                    )}
                </div>
            </Card>

            <Card className="lg:col-span-8 p-6 border-3 border-black bg-white dark:bg-[#202024] shadow-[6px_6px_0px_0px_#000000]">
                <span className="inline-block text-xs font-black uppercase tracking-widest rounded border-2 border-black bg-[#38bdf8] px-2.5 py-0.5 text-black shadow-[1.5px_1.5px_0px_0px_#000000] mb-6">
                    Progres per Kategori
                </span>
                <div className="grid gap-4 sm:grid-cols-2">
                    {Object.entries(categories).map(([category, categoryTutorials]) => {
                        const categoryDone = categoryTutorials.filter(t =>
                            completed.includes(t.slug)
                        ).length;
                        const categoryTotal = categoryTutorials.length;
                        const categoryPercentage = categoryTotal === 0 ? 0 : Math.round((categoryDone / categoryTotal) * 100);
                        const isCategoryComplete = categoryDone === categoryTotal;

                        return (
                            <div key={category} className="rounded-lg border-2 border-black bg-[#f4efe2] dark:bg-[#18181b] p-3 shadow-[2px_2px_0px_0px_#000000]">
                                <div className="flex items-center justify-between text-xs mb-1.5">
                                    <span className="font-black uppercase text-foreground truncate max-w-[150px]">{category}</span>
                                    <span className="font-mono font-bold text-foreground">{categoryPercentage}%</span>
                                </div>
                                <div className="h-3 w-full overflow-hidden rounded border border-black bg-white">
                                    <div
                                        className={`h-full ${isCategoryComplete ? "bg-[#4ade80]" : "bg-[#ffde59]"} transition-all duration-300`}
                                        style={{ width: `${categoryPercentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                {percentage === 100 && (
                    <div className="mt-6 p-3 rounded-lg bg-[#4ade80] text-black text-xs font-black uppercase text-center border-2 border-black shadow-[3px_3px_0px_0px_#000000] animate-wiggle">
                        🎉 Selamat! Kamu telah menyelesaikan seluruh kurikulum! 🎓
                    </div>
                )}
            </Card>
        </div>
    );
}
