"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/progress-context";
import { Card, CardContent } from "@/components/ui/card";

export function ChapterActions({ slug }: { slug: string }) {
  const { completed, toggle } = useProgress();
  const done = completed.includes(slug);

  return (
    <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-foreground">{done ? "Bab selesai! 🎉" : "Sudah paham bab ini?"}</p>
        <p className="text-xs text-muted-foreground">
          {done
            ? "Kamu bisa menandai ulang jika ingin mengulang."
            : "Tandai untuk menyimpan progres belajarmu."}
        </p>
      </div>
      <Button variant={done ? "outline" : "default"} onClick={() => toggle(slug)} className="w-full shrink-0 sm:w-auto">
        {done ? (
          <>
            <Circle className="size-4" />
            Tandai belum selesai
          </>
        ) : (
          <>
            <CheckCircle2 className="size-4" />
            Tandai Selesai
          </>
        )}
      </Button>
    </Card>
  );
}
