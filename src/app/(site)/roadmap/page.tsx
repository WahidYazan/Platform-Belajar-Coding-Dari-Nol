import Link from "next/link"
import { ArrowRight, Check, HelpCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { roadmapPhases } from "@/lib/roadmap"

export default function RoadmapPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      {/* Hero Billboard */}
      <div className="relative mb-12 overflow-hidden rounded-2xl border-3 border-black bg-[#4ade80] p-8 sm:p-12 shadow-[8px_8px_0px_0px_#000000]">
        <div className="inline-block rounded-md border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_0px_#000000] mb-4">
          🗺️ KURIKULUM LENGKAP
        </div>
        <h1 className="font-heading text-4xl font-black tracking-tight text-black sm:text-6xl uppercase">
          Roadmap Belajar Coding! 🚀
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg font-bold leading-relaxed text-black/90">
          Ada 8 fase yang harus kamu lewati secara berurutan. Setiap fase dirancang dengan durasi estimasi dan project nyata untuk menguji pemahamanmu!
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-white px-4 py-1.5 text-xs font-black uppercase text-black shadow-[2px_2px_0px_0px_#000000]">
            <Check className="size-4 stroke-[3] text-black" />
            {roadmapPhases.length} FASE · DARI NOL SAMPAI KERJA!
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-[21px] before:w-[4px] before:bg-black">
        {roadmapPhases.map((phase, index) => (
          <div key={phase.id} className="relative flex gap-5">
            <div className="z-10 flex size-11 shrink-0 items-center justify-center rounded-xl border-3 border-black bg-[#ffde59] font-heading text-base font-black text-black shadow-[3px_3px_0px_0px_#000000]">
              {index + 1}
            </div>
            <Link href={`/roadmap/${phase.id}`} className="group flex-1">
              <div className="overflow-hidden rounded-xl border-3 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#000000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000000] hover:bg-[#fffdf5]">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{phase.emoji}</span>
                    <h2 className="font-heading text-xl font-black uppercase text-black group-hover:text-primary transition-colors">
                      {phase.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded border-2 border-black bg-[#ff5b79] px-2.5 py-0.5 text-xs font-black uppercase text-black shadow-[1.5px_1.5px_0px_0px_#000000]">
                      {phase.level}
                    </span>
                  </div>
                </div>
                <p className="text-sm font-medium leading-relaxed text-black/80">{phase.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {phase.topics.map((topic) => (
                    <span
                      key={topic.title}
                      className="rounded border-2 border-black bg-neutral-100 px-2.5 py-0.5 text-xs font-bold text-black"
                    >
                      {topic.title}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-sm font-black uppercase text-black group-hover:text-primary">
                  Detail fase
                  <ArrowRight className="size-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* CTA Billboard */}
      <div className="mt-16 relative overflow-hidden rounded-2xl border-3 border-black bg-[#ffde59] p-8 sm:p-12 text-center shadow-[8px_8px_0px_0px_#000000]">
        <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border-3 border-black bg-white text-black shadow-[3px_3px_0px_0px_#000000]">
          <HelpCircleIcon className="size-8 stroke-[2.5]" />
        </span>
        <h2 className="font-heading text-3xl font-black uppercase text-black sm:text-4xl">Bingung mulai dari mana?</h2>
        <p className="mx-auto mt-3 max-w-lg text-black font-bold leading-relaxed">
          Baca panduan langkah-pertama kami: tools yang harus dipasang, cara belajar yang benar,
          dan kesalahan fatal yang wajib kamu hindari.
        </p>
        <Button asChild size="lg" className="mt-7 border-3 border-black bg-[#ff5b79] text-black font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5">
          <Link href="/start">
            Baca Panduan Mulai dari Sini
            <ArrowRight className="size-5 stroke-[2.5]" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
