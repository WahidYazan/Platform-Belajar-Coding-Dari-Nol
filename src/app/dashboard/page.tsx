import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurriculum } from "@/lib/curriculum";
import { tutorials } from "@/lib/tutorials";
import { ArrowRight, BookOpen, Clock, Map } from "lucide-react";
import Link from "next/link";
import { OverviewProgress } from "../component/overview-progress";

export default function DashboardPage() {
    const curriculum = getCurriculum();
    const totalMinutes = tutorials.reduce((total, tutorial) => total + tutorial.minutes, 0);
    const totalTutorials = tutorials.length;

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-10">
            <div className="mb-10">
                <p className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                    <Map />
                    Sinau Koding
                </p>
                <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
                    Belajar step by step, dari nol sampai bisa
                </h1>
                <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                    {totalTutorials} bab tersusun berurutan. Ikuti dari bab pertama, klik &quot;Tandai Selesai&quot;
                    setelah tuntas, dan pantau progresmu di sini.
                </p>
                <div className="mt-5 flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                        <BookOpen className="size-4" />
                        <span className="font-medium text-foreground">{totalTutorials} bab</span> total
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="size-4" />±{totalMinutes} menit materi inti
                    </span>
                </div>
                <OverviewProgress />
            </div>

            <div className="space-y-10">
                {curriculum.map((group, groupIndex) => (
                    <section key={group.category} id={group.category.toLowerCase()} className="scroll-mt-24">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted font-heading text-sm font-semibold">
                                {groupIndex + 1}
                            </span>
                            <h2 className="font-heading text-xl font-semibold">{group.category}</h2>
                            <Badge variant="secondary">{group.items.length} bab</Badge>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {group.items.map((tutorial, index) => (
                                <Link
                                    key={tutorial.slug}
                                    href={`/dashboard/tutorials/${tutorial.slug}`}
                                    className="group"
                                >
                                    <Card className="h-full transition-colors group-hover:ring-primary/40">
                                        <CardHeader>
                                            <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                <span className="font-medium text-foreground">Bab {index + 1}</span>
                                                <span>·</span>
                                                <span>{tutorial.minutes} menit</span>
                                                <span>·</span>
                                                <span>{tutorial.level}</span>
                                            </div>
                                            <CardTitle className="group-hover:underline">{tutorial.title}</CardTitle>
                                            <CardDescription className="line-clamp-2">
                                                {tutorial.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="mt-auto flex items-center gap-2 text-sm">
                                            <span className="text-primary font-medium">Buka bab</span>
                                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <div className="mt-14 rounded-2xl border bg-muted/50 p-8 text-center">
                <h2 className="font-heading text-2xl font-semibold">Mulai dari bab pertama</h2>
                <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                    Jangan loncat-loncat. Urutan bab dirancang agar konsep lama jadi fondasi konsep baru.
                </p>
                <Link
                    href={`/dashboard/tutorials/${tutorials[0].slug}`}
                    className="mt-6 inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
                >
                    Mulai: {tutorials[0].title}
                    <ArrowRight />
                </Link>
            </div>
        </div>
    );
}
