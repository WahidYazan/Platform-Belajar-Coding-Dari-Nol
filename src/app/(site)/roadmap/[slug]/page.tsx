import Link from "next/link"
import { ArrowRight, ArrowLeft, BookOpen, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getPhaseById, roadmapPhases } from "@/lib/roadmap"
import { getTutorialBySlug } from "@/lib/tutorials"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return roadmapPhases.map((phase) => ({ slug: phase.id }))
}

export default async function RoadmapDetailPage({ params }: PageProps<"/roadmap/[slug]">) {
  const { slug } = await params
  const phase = getPhaseById(slug)

  if (!phase) {
    notFound()
  }

  const currentIndex = roadmapPhases.findIndex((item) => item.id === phase.id)
  const previous = currentIndex > 0 ? roadmapPhases[currentIndex - 1] : undefined
  const next = currentIndex < roadmapPhases.length - 1 ? roadmapPhases[currentIndex + 1] : undefined

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12">
      {/* Hero Billboard */}
      <div className="relative mb-10 overflow-hidden rounded-2xl border-3 border-black bg-[#ffde59] p-8 sm:p-12 shadow-[8px_8px_0px_0px_#000000]">
        <Button asChild variant="outline" size="sm" className="mb-6 border-2 border-black bg-white text-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000000] hover:bg-[#ff5b79]">
          <Link href="/roadmap">
            <ArrowLeft className="size-4 stroke-[2.5]" />
            Semua fase
          </Link>
        </Button>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-5xl">{phase.emoji}</span>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-black/80">
              ⚡ FASE {currentIndex + 1} DARI {roadmapPhases.length}
            </p>
            <h1 className="font-heading text-3xl font-black uppercase tracking-tight text-black md:text-5xl">
              {phase.title}
            </h1>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-base font-bold leading-relaxed text-black/90">{phase.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-white px-3.5 py-1.5 text-xs font-black uppercase text-black shadow-[2px_2px_0px_0px_#000000]">
            <Check className="size-4 stroke-[3] text-black" />
            LEVEL: {phase.level}
          </span>
        </div>
      </div>

      {/* Topics */}
      <div className="space-y-5">
        {phase.topics.map((topic, index) => {
          const tutorial = topic.tutorialSlug ? getTutorialBySlug(topic.tutorialSlug) : undefined
          return (
            <div key={topic.title} className="flex gap-4 rounded-xl border-3 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#000000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#000000]">
              <div className="flex flex-col items-center">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-[#4ade80] text-sm font-black text-black shadow-[2px_2px_0px_0px_#000000]">
                  {index + 1}
                </span>
                {index < phase.topics.length - 1 && <span className="mt-2 flex-1 w-[3px] bg-black" />}
              </div>
              <div className="flex-1 pb-1">
                <h3 className="font-heading text-xl font-black uppercase text-black">{topic.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-black/80">{topic.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {topic.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border-2 border-black bg-[#fffdf5] px-2.5 py-0.5 text-xs font-bold text-black"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {tutorial && (
                  <Link
                    href={`/dashboard/tutorials/${tutorial.slug}`}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg border-2 border-black bg-[#ff5b79] px-4 py-2 text-xs font-black uppercase text-black shadow-[3px_3px_0px_0px_#000000] hover:shadow-[5px_5px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                  >
                    <BookOpen className="size-4 stroke-[2.5]" />
                    Baca tutorial: {tutorial.title}
                    <ArrowRight className="size-4 stroke-[2.5]" />
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Previous / Next */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {previous && (
          <Link href={`/roadmap/${previous.id}`}>
            <div className="h-full rounded-xl border-3 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000000] hover:bg-[#ffde59]">
              <p className="flex items-center gap-1.5 text-xs font-black uppercase text-black mb-1">
                <ArrowLeft className="size-4 stroke-[2.5]" /> Fase sebelumnya
              </p>
              <p className="font-heading text-base font-black uppercase text-black">
                {previous.emoji} {previous.title}
              </p>
            </div>
          </Link>
        )}
        {next && (
          <Link href={`/roadmap/${next.id}`} className="sm:col-start-2">
            <div className="h-full rounded-xl border-3 border-black bg-white p-5 text-right shadow-[4px_4px_0px_0px_#000000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000000] hover:bg-[#4ade80]">
              <p className="flex items-center justify-end gap-1.5 text-xs font-black uppercase text-black mb-1">
                Fase selanjutnya <ArrowRight className="size-4 stroke-[2.5]" />
              </p>
              <p className="font-heading text-base font-black uppercase text-black">
                {next.emoji} {next.title}
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
