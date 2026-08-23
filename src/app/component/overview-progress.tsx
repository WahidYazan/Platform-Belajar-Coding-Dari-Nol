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

    // Group tutorials by category
    const categories = tutorials.reduce((acc, tutorial) => {
        if (!acc[tutorial.category]) {
            acc[tutorial.category] = [];
        }
        acc[tutorial.category].push(tutorial);
        return acc;
    }, {} as Record<string, typeof tutorials>);

    return (
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <Card className="lg:col-span-4 p-6 flex flex-col justify-center border-primary/10 bg-primary/[0.01]">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-primary/80">Keseluruhan</h3>
                        <span className="text-3xl font-extrabold text-foreground">{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                        <span className="font-bold text-foreground">{done}</span> dari {total} materi telah diselesaikan
                    </p>
                    {nextTutorial && (
                        <Button asChild variant="outline" className="w-full mt-4 bg-background hover:bg-primary/5 hover:text-primary border-primary/20">
                            <Link href={`/dashboard/tutorials/${nextTutorial.slug}`}>
                                Lanjutkan Belajar
                            </Link>
                        </Button>
                    )}
                </div>
            </Card>

            <Card className="lg:col-span-8 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80 mb-6">Progres per Kategori</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                    {Object.entries(categories).map(([category, categoryTutorials]) => {
                        const categoryDone = categoryTutorials.filter(t => 
                            completed.includes(t.slug)
                        ).length;
                        const categoryTotal = categoryTutorials.length;
                        const categoryPercentage = categoryTotal === 0 ? 0 : Math.round((categoryDone / categoryTotal) * 100);
                        const isCategoryComplete = categoryDone === categoryTotal;

                        return (
                            <div key={category} className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold text-foreground truncate max-w-[150px]">{category}</span>
                                    <span className="text-muted-foreground font-medium">{categoryPercentage}%</span>
                                </div>
                                <Progress value={categoryPercentage} className={`h-1.5 ${isCategoryComplete ? "[&>div]:bg-emerald-500" : ""}`} />
                            </div>
                        );
                    })}
                </div>
                {percentage === 100 && (
                    <div className="mt-6 p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium text-center border border-emerald-500/20">
                        🎉 Selamat! Kamu telah menyelesaikan seluruh kurikulum.
                    </div>
                )}
            </Card>
        </div>
    );
}
