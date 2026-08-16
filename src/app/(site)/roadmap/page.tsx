import Link from "next/link"
import { ArrowRight, Check, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { roadmapPhases } from "@/lib/roadmap"

export default function RoadmapPage() {
  const totalDuration = roadmapPhases.reduce((total, phase) => {
    const match = phase.duration.match(/\d+/)
    return total + (match ? parseInt(match[0], 10) : 0)
  }, 0)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14">
      <div className="mb-12 max-w-2xl">
        <p className="mb-2 text-sm font-medium text-primary">Roadmap Lengkap</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight">
          Roadmap Belajar Coding dari Nol
        </h1>
        <p className="mt-4 leading-7 text-muted-foreground">
          Ada 8 fase yang harus kamu lewati secara berurutan kecuali fase Git & GitHub yang
          bisa dipelajari paralel dengan fase JavaScript. Setiap fase punya durasi estimasi dan
          project untuk menguji pemahamanmu.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-2 rounded-full border px-3 py-1">
            <Clock className="size-4 text-primary" />
            Total ±{totalDuration}+ minggu
          </span>
          <span className="flex items-center gap-2 rounded-full border px-3 py-1">
            <Check className="size-4 text-primary" />
            {roadmapPhases.length} fase, dari nol sampai kerja
          </span>
        </div>
      </div>

      <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-[19px] before:w-px before:bg-border">
        {roadmapPhases.map((phase, index) => (
          <div key={phase.id} className="relative flex gap-5">
            <div className="z-10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-background font-heading text-sm font-semibold ring-4 ring-background">
              {index + 1}
            </div>
            <Link href={`/roadmap/${phase.id}`} className="group flex-1">
              <div className="rounded-xl border bg-card p-5 transition-colors group-hover:ring-1 group-hover:ring-primary/40">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{phase.emoji}</span>
                    <h2 className="font-heading text-lg font-semibold group-hover:underline">
                      {phase.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-muted px-2.5 py-0.5 font-medium">{phase.level}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {phase.duration}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{phase.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {phase.topics.map((topic) => (
                    <span
                      key={topic.title}
                      className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {topic.title}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                  Detail fase
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border bg-muted/50 p-8 text-center">
        <h2 className="font-heading text-2xl font-semibold">Bingung mulai dari mana?</h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Baca panduan langkah-pertama kami: tools yang harus dipasang, cara belajar yang benar,
          dan kesalahan yang harus dihindari.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/start">
            Baca Panduan Mulai dari Sini
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  )
}
