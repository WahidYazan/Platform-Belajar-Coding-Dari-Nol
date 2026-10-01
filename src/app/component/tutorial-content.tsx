import type { ContentBlock } from "@/lib/tutorials"
import { WebEditor } from "./web-editor"
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
    info: "border-black bg-[#38bdf8]/20 shadow-[4px_4px_0px_0px_#000000] text-black [&_svg]:text-black",
    tip: "border-black bg-[#4ade80]/20 shadow-[4px_4px_0px_0px_#000000] text-black [&_svg]:text-black",
    warning: "border-black bg-[#ffde59]/30 shadow-[4px_4px_0px_0px_#000000] text-black [&_svg]:text-black",
  }[tone]

  const Icon = tone === "tip" ? Lightbulb : tone === "warning" ? TriangleAlert : Info

  return (
    <div className={`my-6 flex gap-3.5 rounded-xl border-3 p-4.5 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 ${styles}`}>
      <span className="flex size-7 shrink-0 items-center justify-center rounded border-2 border-black bg-white shadow-[1.5px_1.5px_0px_0px_#000000]">
        <Icon className="size-4 stroke-[2.5]" />
      </span>
      <div>
        <p className="font-heading font-black uppercase text-sm tracking-wide text-black">{title}</p>
        <p className="mt-1 text-sm font-medium leading-relaxed text-black/85">{text}</p>
      </div>
    </div>
  )
}

export function TutorialContent({ blocks }: { blocks: ContentBlock[] }) {
  // Extract all code blocks to build the Combo playground
  const codeBlocks = blocks.filter((b): b is Extract<ContentBlock, { type: "code" }> => b.type === "code");
  const comboCode = codeBlocks.map((b) => b.code).join("\n\n");
  const mainLang = codeBlocks[0]?.lang || "html";

  let codeBlockCounter = 0;

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
          case "code": {
            codeBlockCounter++;
            return (
              <div key={index} className="my-6">
                {/* Embedded Interactive VSCode Web Editor for this specific code snippet */}
                <WebEditor
                  initialCode={block.code}
                  lang={block.lang}
                  filename={block.filename || `snippet-${codeBlockCounter}.${block.lang || 'html'}`}
                  title={`Uji Coba Kode #${codeBlockCounter}: ${block.filename || block.lang.toUpperCase()}`}
                />
              </div>
            )
          }
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
