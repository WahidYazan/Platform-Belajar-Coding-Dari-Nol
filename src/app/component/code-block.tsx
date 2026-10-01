"use client";

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CodeBlock({
  code,
  lang,
  filename,
}: {
  code: string
  lang: string
  filename?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copyToClipboard() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group/code my-6 overflow-hidden rounded-xl border-3 border-black bg-[#18181b] shadow-[4px_4px_0px_0px_#000000]">
      <div className="flex items-center justify-between gap-3 border-b-3 border-black bg-[#27272a] px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2 text-xs">
          <span className="shrink-0 rounded border-2 border-black bg-[#ffde59] px-2 py-0.5 font-mono text-[11px] font-black uppercase text-black shadow-[1.5px_1.5px_0px_0px_#000000]">
            {lang}
          </span>
          {filename && <span className="truncate font-mono text-xs font-bold text-white/90">{filename}</span>}
        </div>
        <Button
          variant="ghost"
          size="xs"
          onClick={copyToClipboard}
          className="gap-1 border-2 border-black bg-white text-black font-black uppercase text-[10px] shadow-[2px_2px_0px_0px_#000000] hover:bg-[#4ade80] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
        >
          {copied ? <Check className="size-3 stroke-[3]" /> : <Copy className="size-3 stroke-[2.5]" />}
          {copied ? "Disalin!" : "Salin"}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-[#4deeea]">
        <code>{code}</code>
      </pre>
    </div>
  )
}
