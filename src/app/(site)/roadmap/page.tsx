import Link from "next/link"
import { ArrowRight, Check, HelpCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { roadmapPhases } from "@/lib/roadmap"

export default function RoadmapPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14">
      {/* Hero */}
      <div className="relative mb-12 max-w-2xl overflow-hidden rounded-3xl border border-border/40 bg-card/60 p-8 sm:p-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-60%] right-[-10%] h-[250px] w-[350px] rounded-full bg-primary/[0.06] blur-[80px]" />
        </div>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary/70">Roadmap Lengkap</p>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Roadmap Belajar Coding dari Nol
        </h1>
        <p className="mt-4 leading-7 text-muted-foreground">
          Ada 8 fase yang harus kamu lewati secara berurutan kecuali fase Git & GitHub yang
          bisa dipelajari paralel dengan fase JavaScript. Setiap fase punya durasi estimasi dan
          project untuk menguji pemahamanmu.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-3.5 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
            <Check className="size-4 text-primary" />
            {roadmapPhases.length} fase, dari nol sampai kerja
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-[19px] before:w-px before:bg-gradient-to-b before:from-border/70 before:via-primary/20 before:to-border/70">
        {roadmapPhases.map((phase, index) => (
          <div key={phase.id} className="relative flex gap-5">
            <div className="z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 font-heading text-sm font-bold text-primary ring-4 ring-background">
              {index + 1}
            </div>
            <Link href={`/roadmap/${phase.id}`} className="group flex-1">
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:border-border hover:shadow-md hover:shadow-black/[0.03]">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{phase.emoji}</span>
                    <h2 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                      {phase.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-primary/5 px-2.5 py-0.5 font-medium text-primary">
                      {phase.level}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{phase.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {phase.topics.map((topic) => (
                    <span
                      key={topic.title}
                      className="rounded-full border border-border/50 bg-background/60 px-2.5 py-0.5 text-xs text-muted-foreground backdrop-blur-sm"
                    >
                      {topic.title}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary/80 transition-colors duration-200 group-hover:text-primary">
                  Detail fase
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-14 relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 p-8 text-center shadow-sm">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-50%] left-1/2 h-[300px] w-[400px] -translate-x-1/2 rounded-full bg-primary/[0.05] blur-[80px]" />
        </div>
        <span className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <HelpCircleIcon className="size-8" />
          
        </span>
        <h2 className="font-heading text-2xl font-bold text-foreground">Bingung mulai dari mana?</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground leading-relaxed">
          Baca panduan langkah-pertama kami: tools yang harus dipasang, cara belajar yang benar,
          dan kesalahan yang harus dihindari.
        </p>
        <Button asChild size="lg" className="mt-7 rounded-full shadow-lg shadow-primary/15 transition-all hover:shadow-xl hover:shadow-primary/20">
          <Link href="/start">
            Baca Panduan Mulai dari Sini
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
