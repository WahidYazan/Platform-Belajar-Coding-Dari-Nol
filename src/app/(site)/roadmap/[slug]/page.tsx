import Link from "next/link"
import { ArrowRight, ArrowLeft, BookOpen, Check, Clock } from "lucide-react"
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
    <div className="mx-auto w-full max-w-6xl px-4 py-14">
      {/* Hero */}
      <div className="relative mb-10 overflow-hidden rounded-3xl border border-border/40 bg-card/60 p-8 sm:p-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-60%] right-[-10%] h-[250px] w-[350px] rounded-full bg-primary/[0.06] blur-[80px]" />
        </div>
        <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2 text-muted-foreground hover:text-foreground">
          <Link href="/roadmap">
            <ArrowLeft className="size-4" />
            Semua fase
          </Link>
        </Button>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-4xl">{phase.emoji}</span>
          <div>
            <p className="text-sm font-semibold text-primary">
              Fase {currentIndex + 1} dari {roadmapPhases.length}
            </p>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {phase.title}
            </h1>
          </div>
        </div>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{phase.description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            Durasi: <span className="font-medium text-foreground">{phase.duration}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="size-4" />
            Level: <span className="font-medium text-foreground">{phase.level}</span>
          </span>
        </div>
      </div>

      {/* Topics */}
      <div className="space-y-4">
        {phase.topics.map((topic, index) => {
          const tutorial = topic.tutorialSlug ? getTutorialBySlug(topic.tutorialSlug) : undefined
          return (
            <div key={topic.title} className="flex gap-4 rounded-2xl border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:border-border hover:shadow-md hover:shadow-black/[0.03]">
              <div className="flex flex-col items-center">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-sm font-bold text-primary ring-4 ring-background">
                  {index + 1}
                </span>
                {index < phase.topics.length - 1 && <span className="mt-1 flex-1 w-px bg-gradient-to-b from-border/70 to-transparent" />}
              </div>
              <div className="flex-1 pb-1">
                <h3 className="font-heading text-lg font-semibold text-foreground">{topic.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{topic.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {topic.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border/50 bg-background/60 px-2.5 py-0.5 text-xs text-muted-foreground backdrop-blur-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {tutorial && (
                  <Link
                    href={`/dashboard/tutorials/${tutorial.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary/80 transition-colors duration-200 hover:text-primary"
                  >
                    <BookOpen className="size-4" />
                    Baca tutorial: {tutorial.title}
                    <ArrowRight className="size-4" />
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Previous / Next */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {previous && (
          <Link href={`/roadmap/${previous.id}`}>
            <Card className="h-full border-border/50 bg-card/80 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-md">
              <CardHeader>
                <CardDescription className="flex items-center gap-1 text-muted-foreground">
                  <ArrowLeft className="size-4" /> Fase sebelumnya
                </CardDescription>
                <CardTitle className="font-heading text-lg font-bold text-foreground">
                  {previous.emoji} {previous.title}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        )}
        {next && (
          <Link href={`/roadmap/${next.id}`} className="sm:col-start-2">
            <Card className="h-full border-border/50 bg-card/80 text-right transition-all duration-300 hover:border-border hover:bg-card hover:shadow-md">
              <CardHeader>
                <CardDescription className="flex items-center justify-end gap-1 text-muted-foreground">
                  Fase selanjutnya <ArrowRight className="size-4" />
                </CardDescription>
                <CardTitle className="font-heading text-lg font-bold text-foreground">
                  {next.emoji} {next.title}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        )}
      </div>
    </div>
  )
}
