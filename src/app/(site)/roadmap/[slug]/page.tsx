import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft, BookOpen, Check, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getPhaseById, roadmapPhases } from "@/lib/roadmap"
import { getTutorialBySlug } from "@/lib/tutorials"

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
      <div className="mb-10">
        <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
          <Link href="/roadmap">
            <ArrowLeft />
            Semua fase
          </Link>
        </Button>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-4xl">{phase.emoji}</span>
          <div>
            <p className="text-sm font-medium text-primary">
              Fase {currentIndex + 1} dari {roadmapPhases.length}
            </p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              {phase.title}
            </h1>
          </div>
        </div>
        <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{phase.description}</p>
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

      <div className="space-y-4">
        {phase.topics.map((topic, index) => {
          const tutorial = topic.tutorialSlug ? getTutorialBySlug(topic.tutorialSlug) : undefined
          return (
            <div key={topic.title} className="flex gap-4 rounded-xl border bg-card p-5">
              <div className="flex flex-col items-center">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                  {index + 1}
                </span>
                {index < phase.topics.length - 1 && <span className="mt-1 flex-1 w-px bg-border" />}
              </div>
              <div className="flex-1 pb-1">
                <h3 className="font-semibold">{topic.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{topic.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {topic.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {tutorial && (
                  <Link
                    href={`/dashboard/tutorials/${tutorial.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
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

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {previous && (
          <Link href={`/roadmap/${previous.id}`}>
            <Card className="h-full transition-colors hover:ring-primary/40">
              <CardHeader>
                <CardDescription className="flex items-center gap-1">
                  <ArrowLeft className="size-4" /> Fase sebelumnya
                </CardDescription>
                <CardTitle>
                  {previous.emoji} {previous.title}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        )}
        {next && (
          <Link href={`/roadmap/${next.id}`} className="sm:col-start-2">
            <Card className="h-full text-right transition-colors hover:ring-primary/40">
              <CardHeader>
                <CardDescription className="flex items-center justify-end gap-1">
                  Fase selanjutnya <ArrowRight className="size-4" />
                </CardDescription>
                <CardTitle>
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
