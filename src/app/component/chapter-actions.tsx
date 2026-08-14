"use client"

import { CheckCircle2, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProgress } from "@/hooks/progress-context"

export function ChapterActions({ slug }: { slug: string }) {
  const { completed, toggle } = useProgress()
  const done = completed.includes(slug)

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4">
      <div>
        <p className="text-sm font-medium">{done ? "Bab selesai! 🎉" : "Sudah paham bab ini?"}</p>
        <p className="text-xs text-muted-foreground">
          {done
            ? "Kamu bisa menandai ulang jika ingin mengulang."
            : "Tandai untuk menyimpan progres belajarmu."}
        </p>
      </div>
      <Button variant={done ? "outline" : "default"} onClick={() => toggle(slug)} className="shrink-0">
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
    </div>
  )
}
