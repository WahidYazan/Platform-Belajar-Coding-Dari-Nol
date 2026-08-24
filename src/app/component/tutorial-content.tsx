import type { ContentBlock } from "@/lib/tutorials"
import { CodeBlock } from "./code-block"
import { Info, Lightbulb, TriangleAlert } from "lucide-react"

function Callout({
  title,
  text,
  tone = "info",
}: {
  title: string
  text: string
  tone?: "info" | "tip" | "warning"
}) {
  const styles = {
    info: "border-blue-500/20 bg-blue-500/[0.04] [&_svg]:text-blue-500",
    tip: "border-emerald-500/20 bg-emerald-500/[0.04] [&_svg]:text-emerald-500",
    warning: "border-amber-500/20 bg-amber-500/[0.04] [&_svg]:text-amber-500",
  }[tone]

  const Icon = tone === "tip" ? Lightbulb : tone === "warning" ? TriangleAlert : Info

  return (
    <div className={`my-5 flex gap-3 rounded-xl border p-4 shadow-sm backdrop-blur ${styles}`}>
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
      </div>
    </div>
  )
}

export function TutorialContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "p":
            return (
              <p key={index} className="my-4 leading-relaxed text-muted-foreground">
                {block.text}
              </p>
            )
          case "h2":
            return (
              <h2 key={index} className="mt-10 mb-4 font-heading text-2xl font-bold text-foreground scroll-mt-24">
                {block.text}
              </h2>
            )
          case "h3":
            return (
              <h3 key={index} className="mt-8 mb-3 font-heading text-lg font-bold text-foreground">
                {block.text}
              </h3>
            )
          case "list":
            return block.ordered ? (
              <ol key={index} className="my-4 list-decimal space-y-2 pl-6 text-muted-foreground marker:font-semibold marker:text-foreground">
                {block.items.map((item, i) => (
                  <li key={i} className="leading-relaxed">{item}</li>
                ))}
              </ol>
            ) : (
              <ul key={index} className="my-4 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
                {block.items.map((item, i) => (
                  <li key={i} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            )
          case "code":
            return (
              <CodeBlock
                key={index}
                code={block.code}
                lang={block.lang}
                filename={block.filename}
              />
            )
          case "callout":
            return (
              <Callout
                key={index}
                title={block.title}
                text={block.text}
                tone={block.tone}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}
