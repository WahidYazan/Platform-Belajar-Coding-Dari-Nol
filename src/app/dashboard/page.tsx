import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategoryGroups } from "@/lib/categories";
import { tutorials } from "@/lib/tutorials";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";
import { OverviewProgress } from "@/app/component/overview-progress";

export default function DashboardPage() {
  const groups = getCategoryGroups();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 lg:py-16">
      <div className="mb-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary/80">
              Dashboard
            </p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Selamat Belajar
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Materi terstruktur dari Frontend hingga Deployment. Pilih topik
              dan lanjutkan progresmu secara otomatis.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full shadow-lg shadow-primary/20"
            >
              <Link href={`/dashboard/tutorials/${tutorials[0].slug}`}>
                Mulai Belajar
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <Link href="/start">
                <BookOpen className="mr-2 size-4" />
                Panduan
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Progress
        </h2>
        <OverviewProgress/>
      </div>

      <div className="mt-20 space-y-24">
        <div>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Topik Materi
          </h2>
          <p className="mt-2 text-muted-foreground">
            Eksplorasi kurikulum berdasarkan kategori. Ikuti urutan bab untuk
            hasil maksimal.
          </p>
        </div>

        {groups.map(({ category, items }) => {
          const Icon = category.icon;
          const totalMinutes = items.reduce(
            (total, item) => total + item.minutes,
            0,
          );
          return (
            <section key={category.slug} className="scroll-mt-20">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex size-12 items-center justify-center rounded-xl shadow-sm ${category.accent}`}
                  >
                    <Icon className="size-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="sm:ml-auto">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    <BookOpen className="size-3.5" />
                    {items.length} Bab · ±{totalMinutes} Menit
                  </span>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, index) => (
                  <Link
                    key={item.slug}
                    href={`/dashboard/tutorials/${item.slug}`}
                    className="group"
                  >
                    <Card className="flex h-full flex-col border-border/40 bg-background/50 transition-all duration-300 hover:border-primary/30 hover:bg-background hover:shadow-md">
                      <CardHeader className="pb-3">
                        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                          <span className="text-primary/80">
                            Bab {index + 1}
                          </span>
                          <span>·</span>
                          <span>{item.minutes} Menit</span>
                          <span>·</span>
                          <span className="rounded-sm bg-muted px-1.5 py-0.5">
                            {item.level}
                          </span>
                        </div>
                        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 mt-1 text-sm leading-relaxed">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="mt-auto pt-0 pb-6 flex items-center text-sm font-semibold text-primary/80 transition-colors group-hover:text-primary">
                        Lanjutkan Membaca
                        <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-24 rounded-3xl border border-primary/10 bg-primary/[0.02] p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 size-64 rounded-full bg-primary/5 blur-3xl" />
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Butuh Panduan Awal?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground leading-relaxed">
          Kami merekomendasikan untuk membaca panduan persiapan sebelum memulai
          materi teknis.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 shadow-md shadow-primary/10"
          >
            <Link href="/start">Baca Panduan Persiapan</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 bg-background"
          >
            <Link href="/roadmap">Lihat Roadmap Belajar</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
