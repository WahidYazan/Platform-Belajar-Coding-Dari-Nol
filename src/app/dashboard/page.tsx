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
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { OverviewProgress } from "@/app/component/overview-progress";

export default function DashboardPage() {
  const groups = getCategoryGroups();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 lg:py-16">
      {/* Crazy Neobrutalism Billboard Banner */}
      <div className="relative mb-16 overflow-hidden rounded-2xl border-4 border-black bg-[#ffde59] p-8 text-black shadow-[8px_8px_0px_0px_#000000] sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="mb-3 inline-block rounded border-2 border-black bg-[#ff5b79] px-3 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_0px_#000000] animate-wiggle">
              DASHBOARD BELAJAR
            </span>
            <h1 className="font-heading text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Selamat Belajar, Calon Programmer Handal! ⚡
            </h1>
            <p className="mt-4 text-base font-bold leading-relaxed text-neutral-800">
              Materi terstruktur dari dasar Frontend hingga Deployment ke internet. Pilih materi favoritmu dan lanjutkan progres secara otomatis.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-black text-white hover:bg-neutral-800 border-3 border-black shadow-[4px_4px_0px_0px_#ffffff] font-black uppercase tracking-wider"
            >
              <Link href={`/dashboard/tutorials/${tutorials[0].slug}`}>
                Mulai Belajar Sekarang
                <ArrowRight className="ml-2 size-5 stroke-[2.5]" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white text-black border-3 border-black shadow-[4px_4px_0px_0px_#000000] hover:bg-[#4ade80] font-black uppercase tracking-wider"
            >
              <Link href="/start">
                <BookOpen className="mr-2 size-5 stroke-[2.5]" />
                Panduan
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div>
        <h2 className="mb-2 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Progress
        </h2>
        <OverviewProgress />
      </div>

      {/* Topics */}
      <div className="mt-20 space-y-20">
        <div>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Topik Materi
          </h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Eksplorasi kurikulum berdasarkan kategori. Ikuti urutan bab untuk
            hasil maksimal.
          </p>
        </div>

        {groups.map(({ category, items }) => {
          const Icon = category.icon;
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
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, index) => (
                  <Link
                    key={item.slug}
                    href={`/dashboard/tutorials/${item.slug}`}
                    className="group"
                  >
                    <Card className="flex h-full flex-col border-border/50 bg-card/80 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-md hover:shadow-black/[0.03]">
                      <CardHeader className="pb-3">
                        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                          <span className="text-primary/80">
                            Bab {index + 1}
                          </span>
                          {/* <span>·</span>
                          <span>{item.minutes} Menit</span>
                          <span>·</span> */}
                          <span className="rounded-sm bg-muted/80 px-1.5 py-0.5">
                            {item.level}
                          </span>
                        </div>
                        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors duration-200">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 mt-1 text-sm leading-relaxed">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="mt-auto pt-0 pb-6 flex items-center text-sm font-semibold text-primary/80 transition-colors duration-200 group-hover:text-primary">
                        Lanjutkan Membaca
                        <ArrowRight className="ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-24 relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 p-8 sm:p-12 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-50%] right-[-10%] h-[300px] w-[400px] rounded-full bg-primary/[0.05] blur-[80px]" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
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
            className="rounded-full px-8 shadow-lg shadow-primary/15 transition-all hover:shadow-xl hover:shadow-primary/20"
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
