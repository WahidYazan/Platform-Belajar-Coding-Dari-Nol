"use client"

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
    <div className="group/code my-5 overflow-hidden rounded-xl border bg-muted/40">
      <div className="flex items-center justify-between gap-3 border-b bg-muted/60 px-4 py-2">
        <div className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
          <span className="shrink-0 rounded bg-background px-1.5 py-0.5 font-mono uppercase">{lang}</span>
          {filename && <span className="truncate font-mono">{filename}</span>}
        </div>
        <Button
          variant="ghost"
          size="xs"
          onClick={copyToClipboard}
          className="gap-1 opacity-100 md:opacity-0 md:group-hover/code:opacity-100"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? "Disalin" : "Salin"}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  )
}
