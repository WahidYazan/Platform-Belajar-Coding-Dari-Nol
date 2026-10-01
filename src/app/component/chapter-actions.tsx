"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/progress-context";
import { Card } from "@/components/ui/card";

export function ChapterActions({ slug }: { slug: string }) {
  const { completed, toggle } = useProgress();
  const done = completed.includes(slug);

  return (
    <div className="flex flex-col gap-4 rounded-xl border-3 border-black bg-[#ffde59] p-5 sm:flex-row sm:items-center sm:justify-between shadow-[5px_5px_0px_0px_#000000]">
      <div>
        <p className="text-base font-black text-black uppercase tracking-tight">{done ? "Bab selesai! 🎉 Mantap Jiwa!" : "Sudah paham materi bab ini? ⚡"}</p>
        <p className="text-xs font-bold text-black/80 leading-relaxed mt-0.5">
          {done
            ? "Kamu bisa menandai ulang jika ingin mengulang materinya."
            : "Tandai untuk menyimpan progres belajarmu ke dashboard!"}
        </p>
      </div>
      <Button
        variant={done ? "outline" : "default"}
        onClick={() => toggle(slug)}
        className={`w-full shrink-0 sm:w-auto font-black text-xs uppercase tracking-wider border-2 border-black ${
          done
            ? "bg-white text-black shadow-[3px_3px_0px_0px_#000000] hover:bg-neutral-100"
            : "bg-[#ff5b79] text-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5"
        }`}
      >
        {done ? (
          <>
            <Circle className="size-4 stroke-[2.5]" />
            Tandai belum selesai
          </>
        ) : (
          <>
            <CheckCircle2 className="size-4 stroke-[2.5]" />
            Tandai Selesai 🚀
          </>
        )}
      </Button>
    </div>
  );
}
